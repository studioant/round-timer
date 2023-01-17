import { useEffect } from "react";

const Timer = ({ min, sec, ms, setTime }) => {
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

  useEffect(() => {
    
  })

  const zeroPad = (num, places) => {
    String(num).padStart(places, '0')
  }

  const initialMin = () => {
    if(min < 10)
      setTime({m:"0"+min, s:sec, ms: ms})
  }

  const setMin = (event) => {
    var minutes = zeroPad(event.target.innerText, 2)
    setTime({ m: parseInt(minutes), s:sec, ms: ms })
  }

  const setSec = (event) => {
    setTime({ m:min, s:parseInt(event.target.innerText), ms: ms })
  }

  return (
    <div className="clock">
      <div
        id="min"
        contentEditable={true}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: min }}
        onInput={setMin}
        className="timer"
      />
      <span>:</span>
      <div id="sec"
        contentEditable={true}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: sec }}
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
