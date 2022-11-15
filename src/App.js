import { useEffect, useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header"
import Round from "./components/Round";
import Clock from "./components/Clock";
import Timer from "./components/Timer";

function App() {
  // Total of 90 seconds
  const totalTime = 90
  // States for clock and round
  const [seconds, setSeconds] = useState(totalTime)
  const [millis, setMillis] = useState(0)
  const [round, setRound] = useState(0)
  const [start, setStart] = useState(false)
  
  const Dec = () => {
    console.log("h");
    // Decrement seconds
    useEffect(() => {
      if(start){
        seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000); 
        setMillis(60)
      }
    }, [seconds])
  }
  // Decrement milliseconds
  useEffect(() => {
    if(start){
      millis > 0 && setTimeout(() => setMillis(millis - 1), 10)
    }
  }, [millis])

  const isStart = () => {
    setStart(!start)
    console.log(start)
  }
  

  return (
    <div className="container">
      <div className="container-round">
        <Header title={'Round'}/>
        <Round round={round}/>
        <div className="btn-round">
          <Button color='#567' text='Decrement' onClick={()=>setRound(round => round - 1)}/>
          <Button color='#345' text='Increment' onClick={()=>setRound(round => round + 1)}/>
        </div>
      </div>
      <div className="container-clock">
        <Header title={'Clock'}/>
        {start && <Timer />}
        <div className="btn-clock">
          <Button color='#567' text='Start' onClick={isStart}/>
          <Button color='#567' text='Pause'/>
          <Button color='#567' text='Reset'/>
          <Button color='#567' text='+1 sec'/>
          <Button color='#567' text='-1 sec'/>
        </div>
      </div>
    </div>
  );
}

export default App;
