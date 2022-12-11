import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Button from "./components/Button";
import Header from "./components/Header"
import Round from "./components/Round";
import Clock from "./components/Clock";
import Navbar from "./components/Navbar";
import AlarmSound from "./sounds/alarm.mp3"

function App() {

  // States for clock and round
  const [round, setRound] = useState(0)
  const [time, setTime] = useState({ms:0, s:30, m:1})
  const [started, setStarted] = useState(false)
  const [inter, setInter] = useState(1)
  const [paramsPresent, setParamsPresent] = useState(false);

  useEffect(()=>{
    const url_params = new URLSearchParams(window.location.search)
    if (url_params.has('min') || url_params.has('sec')){
      let min = url_params.get('min')
      let sec = url_params.get('sec')
      console.log('User Selected Time: ' + min + ':' + sec)
      if (sec > 59) {
        alert('Seconds must be below 60')
        sec = 0
      }
      if (min > 59) {
        alert('Minutes must be below 60')
        min = 0
      }
      setTime({ms:0, s:parseInt(sec), m:parseInt(min)})
      if(!paramsPresent)
        setParamsPresent(true)
      console.log('seconds: '+time.s)
    }
  }, [setTime, paramsPresent])

  useEffect(()=>{
    console.log("useEffect inter: " + inter)
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
    if(time.s < 59) {
      console.log('increment: ' + time.s)
      setTime({ms:time.ms, s:time.s + 1, m:time.m})
    }
    else
      setTime({ms:time.ms, s:0, m:time.m + 1})
  }
  
  const dec = () => {
    if(time.s > 0)
      setTime({ms:time.ms, s:time.s - 1, m:time.m})
    else if (time.m > 0)
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
    <Router>
      <Navbar/>
    <div className="container">
      <div className="container-round">
        <Header title={'Round'}/>
        <Round round={round}/>
        <div className="btn-round">
          <Button color='#567' text='Decrement' onClick={()=> {round > 0 && (setRound(round => round - 1))}}/>
          <Button color='#345' text='Increment' onClick={()=>setRound(round => round + 1)}/>
          <Button color='#804040' text='Reset' onClick={()=>setRound(0)}/>
        </div>
      </div>
      <div className="container-clock">
        <Header title={'Timer'}/>
        <div className="inner-clock">
          <Clock min={time.m} sec={time.s} ms={time.ms}/>
        </div>
        <div className="btn-clock">
          <Button color={started ? '#ca3433' :'#06a94d'} text={started ? 'Stop' : 'Start'} onClick={started ? stop : start}/>
          <Button color='#804040' text='Reset' onClick={reset} state={started}/>
          <Button color='#567' text='+1 sec' onClick={()=>{!started && (inc())}}/>
          <Button color='#567' text='-1 sec' onClick={()=>{!started && (dec())}}/>
          <Button color='#567' text='Play' onClick={()=>playAlarm()}/>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
