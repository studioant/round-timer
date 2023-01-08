import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useEffect, useState } from 'react';
import Timer from './Timer';

const CircleTimer = ({ min, sec, ms, started, changed }) => {
    //console.log(sec)
    const [dur, setDur] = useState(0)
    const [time, setTime] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    //console.log(dur)

    useEffect(()=>{
        setDur((min*60) + sec)
        if(!time) setTime(true)
    }, [time, changed])

    const style = {
        display: 'inline-block !important'
    }

    const onComplete = () => {
        setShowMessage(true)
    }

    return (
        <CountdownCircleTimer
            isPlaying = {started}
            key={changed}
            duration = {dur}
            strokeWidth = {50}
            segments={2}
            onComplete = {() => onComplete()}
            colors = {[['#7a96ea'],['#1a961a']]}
            size = {600}
            style={style}
            >

            {/* Child element renders the time */}
            {({ childrenProps }) => (
                <div {...childrenProps} style={{ display: 'inline-block !important' }}>
                    {showMessage ? <div className='clock'>Time Up!</div> 
                    : <Timer min={min} sec={sec} ms={ms}/>}
                </div>
            )}
        </CountdownCircleTimer>
        
    );
}

export default CircleTimer