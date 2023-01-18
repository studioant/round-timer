import { useEffect } from "react";

const Timer = ({ min, sec, ms, setTime, setChanged, setLastTime }) => {
  var minute = min.toString().padStart(2, "0");
  var second = sec.toString().padStart(2, "0");

  const validateInput = (e) => {
    var input = e.target;
    if (!isNaN(input.innerText)) {
      console.log("Is a number: " + input)
      console.log(min)
    } else {
      console.log("Not a number: " + input)
      e.preventDefault()
      input.innerText = 0
    }
  }

  useEffect(() => {
    var min = document.getElementById("min")
    var sec = document.getElementById("sec")
    min.addEventListener("input", validateInput)
    sec.addEventListener("input", validateInput)
  })

  const setMin = (event) => {
    setTime({ m: event.target.innerText, s:sec, ms: 0 })
    setLastTime({ m: event.target.innerText, s:sec, ms: 0 })
    setChanged(true)
  }

  const setSec = (event) => {
    setTime({ m:min, s:parseInt(event.target.innerText), ms: 0 })
    setLastTime({ m:min, s:parseInt(event.target.innerText), ms: 0 })
    setChanged(true)
  }

  return (
    <div className="clock">
      <div
        id="min"
        contentEditable={true}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: minute }}
        onInput={setMin}
        className="timer"
      />
      <span>:</span>
      <div id="sec"
        contentEditable={true}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: second }}
        onInput={setSec}
        className="timer"
      />
      <span>.</span>
      {ms > 9 ? (
      <div className="timer">
        {ms}
      </div>
      ) : (
      <div className="timer">
        0{ms}
      </div>
      )}
    </div>
  );
};

export default Timer;
