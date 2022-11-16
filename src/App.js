import { useEffect, useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header"
import Round from "./components/Round";
import Clock from "./components/Clock";
import Timer from "./components/Timer";

function App() {
  var timer = 0;
  // States for clock and round
  const [round, setRound] = useState(0)
  const [time, setTime] = useState({ms:0, s:0, m:0})
  const [started, setStarted] = useState(false)

  const start = () => {
    run()
    // Flip started flag 
    setStarted(!started)
    // Run function at interval of 10 ms
    setInterval(run, 10)
  }

  var updatedMs = time.ms, updatedSec = time.s, updatedMin = time.m
  
  const run = () => {
    if(updatedSec >= 60 ){
      updatedMin++
      updatedSec = 0
    }
    if(updatedMs >= 100 ){
      updatedSec++
      updatedMs = 0
    }
    updatedMs++
    return setTime({ms:updatedMs, s:updatedSec, m:updatedMin})
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
        <Clock min={time.m} sec={time.s} ms={time.ms}/>
        <Timer s={start}/>
        <div className="btn-clock">
          <Button color='#06c258' text={started ? 'Stop' : 'Start'} onClick={start}/>
          <Button color='#567' text='Pause' />
          <Button color='#567' text='Reset' />
          <Button color='#567' text='+1 sec'/>
          <Button color='#567' text='-1 sec'/>
        </div>
      </div>
    </div>
  );
}

export default App;
