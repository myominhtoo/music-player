import { Container } from "react-bootstrap";
import { SongControl } from "./components/SongControl";
import SongTime from "./components/SongTime";
import {  useEffect, useRef , useState } from 'react';
import songs from './data/songs.json';
import { Time } from "./types/custom-type";

function App() {

  const [ isPlay , setIsPlay ] = useState<boolean>(false);
  const [ curSong , setCurSong ] = useState<number>(0);
  const [ time , setTime ] = useState<Time>(() => {
    return { current : 0 , total : 0 }
  });

  const songRef = useRef<HTMLAudioElement>( null );
  const imageContainerRef = useRef<HTMLDivElement>(null);

  function handlePlay(){
    setIsPlay(true);
    songRef.current?.play();
  }

  function handlePause(){
    let prevRotation = window.getComputedStyle( imageContainerRef.current as Element , null ).getPropertyValue('transform');

    imageContainerRef.current!.style.transform = `${prevRotation}`;
    
    setIsPlay(false);
    songRef.current?.pause();
  }

  function goNext( shouldGoTop : boolean ){
    setCurSong( prevCurSong => {
      if( shouldGoTop ){
        return 0;
      }
      return  prevCurSong + 1;
    } );
  }

  function goPrev( shouldGoLast : boolean ){
    setCurSong( prevCurSong => {

      if( shouldGoLast ){
        return songs.length - 1;
      }
      return prevCurSong - 1;
    });
  }

  function handlePlaying(){
    // console.log(songRef.current?.currentTime)
    setTime(( prevTime ) =>{
      return { ...prevTime , current : songRef.current?.currentTime! };
    });
  }

  function handleChangeTime( target : number ){
    setTime(( prevTime ) => {
      let targetTime = (target/100) * time.total;
      songRef.current!.currentTime = targetTime;
      return { ...prevTime , current : (target/100) * time.total };
    });
  }

  function handleEndMusic( e : React.SyntheticEvent<HTMLAudioElement,Event> ){
    setIsPlay(false);
    setCurSong( prevCur => {
       return prevCur === songs.length - 1
              ? 0
              : prevCur + 1;
    });
    setTimeout(() => {
      setIsPlay(true);
      songRef.current?.play();
    }, 1000);
  }

  useEffect(() => {
    if( isPlay ){
      songRef.current?.play();
    }
    setTimeout(() => {
      let duration = songRef.current?.duration;
      
      setTime(( prevTime ) => {
        return { current : 0 , total : duration! }
      });

    } , 2000 );
  } , [curSong] );


  return (
    <div id="App">
      <Container id="main-container" className='d-flex justify-content-center align-items-center flex-column'>
        <div ref={imageContainerRef} id="image-container"  className={ 'shadowm-sm '.concat( isPlay ? 'playing' : '' )} >
          <img 
            src={'/images/'+songs[curSong].imageUrl} alt="cover"
          />
          <div id="image-center">
            <div></div>
          </div>
        </div>

        <audio onTimeUpdate={handlePlaying} onEnded={ e  => handleEndMusic(e) } className="d-none" src={'/songs/'+songs[curSong].songUrl} ref={songRef} controls ></audio>

        <SongTime 
         current={time.current}
         total={time.total}
         handleChangeTime={handleChangeTime}
        />

        <small className="fw-bold text-muted my-1">{ songs[curSong].songName } ( {songs[curSong].singer} )</small>

        <SongControl
         isPlay={isPlay} 
         handlePlay={handlePlay} 
         handlePause={handlePause} 
         goNext={goNext}
         goPrev={goPrev}
         minId={0}
         maxId={songs.length - 1 }
         curId={curSong}
         />
      </Container>
    </div>
  )
}

export default App
