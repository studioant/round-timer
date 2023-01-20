import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Button from "./components/Button"
import Header from "./components/Header"
import Round from "./components/Round"
import Navbar from "./components/Navbar"
import Clock from "./components/Clock"
import Settings from "./components/Settings"
import CircleTimer from "./components/CircleTimer"

function App() {

  // States for clock and round
  var defaultT = ('0' + 0).slice(-2)
  let default_time = {m:defaultT, s:0, ms:0}

  const [round, setRound] = useState(0)
  const [time, setTime] = useState(default_time)
  const [started, setStarted] = useState(false)
  const [inter, setInter] = useState(1)
  const [zero, setZero] = useState(false)
  const [changed, setChanged] = useState(false)
  const [reset, setReset] = useState(false)
  const [lastTime, setLastTime] = useState(default_time)

  useEffect(()=>{
    const url_params = new URLSearchParams(window.location.search)
    url_params.set('min', time.m)
    url_params.set('sec', time.s)
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + url_params.toString();
    window.history.pushState({}, '', newUrl);
  }, [changed])

  // Set and clear the interval for the timer 
  useEffect(()=>{
    if(!started){
      clearInterval(inter)
    } else {
      setInter(setInterval(run, 10))
    }
  }, [started])

  // Set the time using parameters passed in the URL
  useEffect(()=>{
    let min, sec
    const url_params = new URLSearchParams(window.location.search)
    if (url_params.has('min') || url_params.has('sec')) 
    {
      if (url_params.has('min')) min = url_params.get('min')
      else min = 0
      if (url_params.has('sec')) sec = url_params.get('sec')
      else sec = 0
      if (sec > 59) {
        alert('Seconds must be below 60')
        sec = 0
      }
      if (min > 59) {
        alert('Minutes must be below 60')
        min = 0
      }

      setTime({m:parseInt(min), s:parseInt(sec), ms:0})

    } 
  }, [])

  // Flip the started flag 
  const start = () => {
    if(time.ms > 0 || time.s > 0 || time.m > 0){
      setStarted(!started)
      setChanged(false)
    }
  }

  // Flip the started flag 
  const stop = () => {
    setStarted(!started)
  }

  // Reset the time to the specified default
  const doReset = () => {
    setTime(lastTime)
    setChanged(true)
    setReset(true)
  }

  // Plus 1 second
  const inc = () => {
    setChanged(true)
    if(time.s < 59)
      setTime({ms:time.ms, s:time.s + 1, m:time.m})
    else
      setTime({ms:time.ms, s:0, m:time.m + 1})
  }
  
  // Minus 1 second
  const dec = () => {
    setChanged(true)
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
                <CircleTimer min={time.m} sec={time.s} ms={time.ms} started={started} changed={changed} setChanged={setChanged} setTimerTime={setTime} setStarted={setStarted} setLastTime={setLastTime} reset={reset}/>
              </div>
              <div className="btn-clock">
                <Button color={started ? '#ca3433' :'#06a94d'} text={started ? 'Stop' : 'Start'} onClick={started ? stop : start}/>
                <Button color='#804040' text='Reset' onClick={doReset} state={started}/>
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
