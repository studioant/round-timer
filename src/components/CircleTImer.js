import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useEffect, useState } from 'react';
import Timer from './Timer';

import alarm from "./../sounds/alarm.mp3"
import bell from "./../sounds/bell.mp3"

const CircleTimer = ({ min, sec, ms, started, changed, setChanged, setTimerTime, setStarted, setLastTime, reset }) => {
    const [dur, setDur] = useState(0)
    const [time, setTime] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [sound, setSound] = useState({alarm:false, bell:true})

    useEffect(()=>{
        setDur((min*60) + sec)
        if(!time) setTime(true)
        if(reset) setShowMessage(false)
    }, [time, changed, reset])

      // Play the audio
    const playAlarm = () => {
        var audio = new Audio(bell);
        if (sound.bell)
        audio = new Audio(bell)
        if (sound.alarm)
        audio = new Audio(alarm)
        audio.play()
    }

    const style = {
        display: 'inline-block !important'
    }

    const onComplete = () => {
        setShowMessage(true)
        setStarted(false)
        playAlarm()
    }

    return (
        <>
            <CountdownCircleTimer
                isPlaying = {started}
                key={changed}
                duration = {dur}
                strokeWidth = {50}
                segments={2}
                onComplete = {() => onComplete()}
                colors={['#7a96ea', '#dc143c']}
                colorsTime={[dur, 0]}
                size = {600}
                style={style}
                >

                {/* Child element renders the time */}
                {({ childrenProps }) => (
                    <div {...childrenProps} style={{ display: 'inline-block !important' }}>
                        {showMessage ? <div className='clock'>Time Up!</div> 
                        : <Timer min={min} sec={sec} ms={ms} setTime={setTimerTime} setChanged={setChanged} setLastTime={setLastTime}/>}
                    </div>
                )}
            </CountdownCircleTimer>
        </>
    );
}

export default CircleTimer