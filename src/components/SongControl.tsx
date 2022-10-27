
type SongControlProp = {
    isPlay : boolean,
    handlePlay : () => void,
    handlePause : () => void,
    goNext : ( shouldGoTop : boolean ) => void,
    goPrev : ( shouldGoLast : boolean ) => void,
    minId : number,
    maxId : number,
    curId : number,
}

export function SongControl( { isPlay , handlePlay , handlePause , goNext , goPrev , minId , maxId , curId } : SongControlProp ){
    return (
        <div id='song-control'>
            <div className="w-auto h-auto p-1 d-flex justify-content-center  align-items-center gap-3">
                <div>
                    <i onClick={() => goPrev( curId == minId ? true : false ) } className="fa-regular fa-circle-left text-muted"></i>
                </div>
                <div>
                    { isPlay ? <i onClick={handlePause} className="fa-regular fa-circle-pause text-muted "></i> : <i onClick={handlePlay} className="fa-solid fa-square-caret-right text-muted"></i> }
                </div>
                <div>   
                    <i onClick={() => goNext( curId == maxId ? true : false ) } className="fa-regular fa-circle-right text-muted"></i>
                </div>
            </div>
        </div>
    )
}
