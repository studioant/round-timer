const Clock = ({ secs, ms }) => {
  return (
    <div className="clock">
        {secs > 10 ? (<div className="timer">{secs}.</div>) : (<div className="timer">0{secs}.</div>) }
        {ms > 10 ? (<div className="timer">{ms}</div>) : (<div className="timer">0{ms}</div>)}
    </div>
  )
}

export default Clock