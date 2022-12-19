import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Button from "./components/Button";
import Header from "./components/Header"
import Round from "./components/Round";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";
import Clock from "./components/Clock";
import alarm from "./sounds/alarm.mp3"
import bell from "./sounds/bell.mp3"
import Settings from "./components/Settings";
import CircleTimer from "./components/CircleTImer";

function App() {

  // States for clock and round
  let default_time = {m:0, s:1, ms:0}
  const [round, setRound] = useState(0)
  const [time, setTime] = useState(default_time)
  const [started, setStarted] = useState(false)
  const [inter, setInter] = useState(1)
  const [paramsPresent, setParamsPresent] = useState(false);
  const [sound, setSound] = useState({alarm:false, bell:true})
  const [zero, setZero] = useState(false)

  // When timer reaches zero, play the alarm sound
  useEffect(()=>{
    if(time.ms === 0 && time.s === 0 && time.m === 0 && zero){
      playAlarm()
    }
  }, [zero, time])

  // Set the time using parameters passed in the URL
  useEffect(()=>{
    const url_params = new URLSearchParams(window.location.search)
    if (url_params.has('min') || url_params.has('sec')){
      let min = url_params.get('min')
      let sec = url_params.get('sec')
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
    }
  }, [setTime, paramsPresent])

  // Set and clear the interval for the timer 
  useEffect(()=>{
    if(!started){
      clearInterval(inter)
    } else {
      setInter(setInterval(run, 10))
    }
  }, [started])

  // Flip the started flag 
  const start = () => {
    if(time.ms > 0 || time.s > 0 || time.m > 0){
      setStarted(!started)
    }
  }

  // Flip the started flag 
  const stop = () => {
    setStarted(!started)
  }

  // Reset the time to the specified default
  const reset = () => {
    setTime({m:1, s:30, ms:0})
  }

  // Play the audio
  const playAlarm = () => {
    if (sound.bell)
      var audio = new Audio(bell)
    if (sound.alarm)
      var audio = new Audio(alarm)
    audio.play()
  }

  // Plus 1 second
  const inc = () => {
    if(time.s < 59)
      setTime({ms:time.ms, s:time.s + 1, m:time.m})
    else
      setTime({ms:time.ms, s:0, m:time.m + 1})
  }
  
  // Minus 1 second
  const dec = () => {
    if(time.s > 0)
      setTime({ms:time.ms, s:time.s - 1, m:time.m})
    else if (time.m > 0)
      setTime({ms:time.ms, s:59, m:time.m - 1})
  }

  // Get current time
  var updatedMs = time.ms, updatedSec = time.s, updatedMin = time.m
  
  // Run the timer
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
      
      // Update the time
      return setTime({ms:updatedMs, s:updatedSec, m:updatedMin})
    }
    // Timer has reached zero, Set zero
    setZero(true)
    // Raise stop flag
    stop()
  }

  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Routes>
          {/* Main Round/Timer page */}
          <Route path="/" exact element={ <>
            <div className="container-round">
              <Header title={'Round'}/>
              <Round round={round}/>
              <div className="btn-round">
                <Button color='#345' text='+' onClick={()=>setRound(round => round + 1)}/>
                <Button color='#567' text='-' onClick={()=> {round > 0 && (setRound(round => round - 1))}}/>
                <Button color='#804040' text='Reset' onClick={()=>setRound(0)}/>
              </div>
            </div>
            <div className="container-clock">
              <Header title={'Timer'}/>
              <div className="inner-clock">
                <CircleTimer min={time.m} sec={time.s} ms={time.ms} started={started}/>
              </div>
              <div className="btn-clock">
                <Button color={started ? '#ca3433' :'#06a94d'} text={started ? 'Stop' : 'Start'} onClick={started ? stop : start}/>
                <Button color='#804040' text='Reset' onClick={reset} state={started}/>
                <Button color='#567' text='+1 sec' onClick={()=>{!started && (inc())}}/>
                <Button color='#567' text='-1 sec' onClick={()=>{!started && (dec())}}/>
              </div>
            </div>
          </>} />
          {/* Settings page */}
          <Route path="/settings" element={ <Settings/> }/>
          {/* Clock page */}
          <Route path="/clock" element={<Clock/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
