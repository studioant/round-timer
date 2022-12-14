const Timer = ({ min, sec, ms }) => {

  return (
    <div className="clock">
        {min >= 10 ? (<div contentEditable="true" className="timer">{min}</div>) : (<div className="timer">0{min}</div>)}<span>:</span>
        {sec >= 10 ? (<div className="timer">{sec}</div>) : (<div className="timer">0{sec}</div>)}<span>.</span>
        {ms  >= 10 ? (<div className="timer">{ms}</div>)  : (<div className="timer">0{ms} </div>)}
    </div>
  )
}

export default Timer