import { useEffect } from "react";

const Timer = ({ min, sec, ms, setTime, setChanged, setLastTime }) => {

  var minute = min.toString().padStart(2, "0");
  var second = sec.toString().padStart(2, "0");

  const validateInput = (e) => {
    var input = e.target;
    if (isNaN(input.innerText)) {
      e.preventDefault()
      alert(input.innerText + " is not a number. Please enter a number")
      input.innerText = 0
    }
  }

  // Get timer text 
  const minText = document.getElementById("min");
  const secText = document.getElementById("sec");

  if(minText){
    minText.addEventListener("input", () => {
      minText.innerText = minText.innerText.substring(0,2);
    });
  }
  
  if(secText){
    secText.addEventListener("input", () => {
      secText.innerText = secText.innerText.substring(0,2);
    });
  }

  useEffect(() => {
    var min = document.getElementById("min")
    var sec = document.getElementById("sec")
    min.addEventListener("input", validateInput)
    sec.addEventListener("input", validateInput)
  })

  const setMin = (event) => {
    setTime({ m:parseInt(event.target.innerText), s:sec, ms: 0 })
    setLastTime({ m:parseInt(event.target.innerText), s:sec, ms: 0 })
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
