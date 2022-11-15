const Clock = ({ secs, ms }) => {
  return (
    <div className="clock">
        {secs > 10 && <div className="timer">0{secs}.</div> }
        <div className="timer">{ms}</div>
    </div>
  )
}

export default Clock