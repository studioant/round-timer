import { useEffect, useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header"
import Round from "./components/Round";
import Clock from "./components/Clock";
import AlarmSound from "./sounds/alarm.mp3"

function App() {

  // States for clock and round
  const [round, setRound] = useState(0)
  const [time, setTime] = useState({ms:0, s:3, m:0})
  const [started, setStarted] = useState(false)
  const [inter, setInter] = useState(1)

  useEffect(()=>{
    if(!started){
      clearInterval(inter)
    } else {
      setInter(setInterval(run, 10))
    }
  }, [started])

  const start = () => {
    if(time.ms > 0 || time.s > 0 || time.m > 0){
      setStarted(!started)
    }
  }

  const stop = () => {
    setStarted(!started)
  }

  const reset = () => {
    setTime({ms:0, s:30, m:1})
  }

  const playAlarm = () => {
    var alarm = new Audio(AlarmSound)
    alarm.play()
  }

  const inc = () => {
    if(time.s < 59) 
      setTime({ms:time.ms, s:time.s + 1, m:time.m})
    else
      setTime({ms:time.ms, s:0, m:time.m + 1})
  }
  
  const dec = () => {
    if(time.s > 0)
      setTime({ms:time.ms, s:time.s - 1, m:time.m})
    else
      setTime({ms:time.ms, s:59, m:time.m - 1})
  }

  var updatedMs = time.ms, updatedSec = time.s, updatedMin = time.m
  
  const run = () => {
    if(updatedMs !== 0 || updatedSec !== 0 || updatedMin !== 0){
      if(updatedSec === 0 && updatedMs === 0 && updatedMin !== 0){
        updatedMin--
        updatedSec = 60
      }
      if(updatedMs === 0 && updatedSec !== 0){
        updatedSec--
        updatedMs = 100
      }
      if(updatedMs !== 0){
        updatedMs--
      }

      return setTime({ms:updatedMs, s:updatedSec, m:updatedMin})
    }
    stop()
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
        <Header title={'Countdown Timer'}/>
        <Clock min={time.m} sec={time.s} ms={time.ms}/>
        <div className="btn-clock">
          <Button color={started ? '#ca3433' :'#06a94d'} text={started ? 'Stop' : 'Start'} onClick={started ? stop : start}/>
          <Button color='#567' text='Reset' onClick={reset} state={started}/>
          <Button color='#567' text='+1 sec' onClick={inc}/>
          <Button color='#567' text='-1 sec' onClick={dec}/>
          <Button color='#567' text='Play' onClick={()=>playAlarm()}/>
        </div>
      </div>
    </div>
  );
}

export default App;
