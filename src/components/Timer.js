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
    var input = document.getElementById("min");
    input.addEventListener("input", validateInput)
  })

  const setMin = (event) => {
    setTime({ m: parseInt(event.target.innerText), s:sec, ms: ms })
    console.log(parseInt(event.target.innerText))
    console.log('setTime')
  }

  return (
    <div className="clock">
      {min >= 10 ? (
        <div
          id="min"
          contentEditable={true}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: min }}
          onInput={setMin}
          className="timer"
        />
      ) : (
        <div
          id="min"
          contentEditable={true}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: min }}
          onInput={setMin}
          className="timer"
        />
      )}
      <span>:</span>
      {sec >= 10 ? (
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="timer"
        >
          {sec}
        </div>
      ) : (
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="timer"
        >
          0{sec}
        </div>
      )}
      <span>.</span>
      {ms >= 10 ? (
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="timer"
        >
          {ms}
        </div>
      ) : (
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="timer"
        >
          0{ms}{" "}
        </div>
      )}
    </div>
  );
};

export default Timer;
