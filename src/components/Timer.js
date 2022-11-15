import { useEffect, useState } from "react";
import Clock from "./Clock";

const Timer = () => {
  const [seconds, setSeconds] = useState(90)

  useEffect(() => {
      seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000); 
  }, [seconds])

  return (
    <div>
      <Clock secs={seconds}/>
    </div>
  )
}

export default Timer