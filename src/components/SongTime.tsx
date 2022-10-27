import { useMemo } from "react";
import { Time } from "../types/custom-type";
import { getTimeInAdvance } from "../utils/getTime";

type SongTimeProp = {
  current : number,
  total : number,
  handleChangeTime : ( target : number ) => void,
}

export default function SongTime( { current , total , handleChangeTime } : SongTimeProp ) {

  const realTotal = useMemo(() => {
    return getTimeInAdvance(total);
  } , [total] );

  const realCurrent = useMemo(() => {
    return  Math.floor((current/total) * 100);
  } , [current] );

  return (
    <div id="song-time">
      <div className="text-end p-0">
        <small className="fw-bold text-muted">{realTotal}</small>
       </div>
      <input type="range"
        className="w-100"
        value={isNaN(realCurrent) ? 0 : realCurrent}
        onChange={(e) => handleChangeTime(Number(e.target.value)) }
        min='0'
        max='100'
        style={{ background : 'rgba(0,0,0,0.55)', }}
       /> 
       <div className="w-100 d-flex justify-content-between">
        <small className="text-muted fw-bold">{getTimeInAdvance(current)}</small>
       </div>
    </div>
  )
}
