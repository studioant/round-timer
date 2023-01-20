import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useEffect, useState } from 'react';
import Timer from './Timer';

const CircleTimer = ({ min, sec, ms, started, changed, setChanged, setTimerTime, setStarted, setLastTime, reset }) => {
    //console.log(sec)
    const [dur, setDur] = useState(0)
    const [time, setTime] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    //console.log(dur)

    useEffect(()=>{
        setDur((min*60) + sec)
        if(!time) setTime(true)
        if(reset) setShowMessage(false)
        console.log(reset)
    }, [time, changed, reset])

    const style = {
        display: 'inline-block !important'
    }

    const onComplete = () => {
        setShowMessage(true)
        setStarted(false)
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