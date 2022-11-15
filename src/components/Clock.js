const Clock = ({ secs, ms }) => {
  return (
    <div className="clock">
        {secs > 10 && <div className="timer">{secs}.</div> }
        <div className="timer">{ms}</div>
    </div>
  )
}

export default Clock