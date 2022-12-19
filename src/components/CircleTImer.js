import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useEffect, useState } from 'react';
import Timer from './Timer';

const CircleTimer = ({ min, sec, ms, started }) => {
    //console.log(sec)
    const [dur, setDur] = useState(0)
    const [time, setTime] = useState(false)

    //console.log(dur)

    useEffect(()=>{
        setDur((min*60) + sec)
        if(!time) setTime(true)
    }, [time])

    const style = {
        display: 'inline-block !important'
    }

    return (
        <CountdownCircleTimer
            isPlaying = {started}
            duration = {dur}
            strokeWidth = {40}
            segments={2}
            onComplete = {() => console.log('Finished!')}
            colors = {[['#7a96ea'],['#1a961a']]}
            size = {600}
            style={style}
            >

            {/* Child element renders the time */}
            {({ childrenProps }) => (
                <div {...childrenProps} style={{ display: 'inline-block !important' }}>
                    <Timer min={min} sec={sec} ms={ms}/>
                </div>
            )}

        </CountdownCircleTimer>
    );
}

export default CircleTimer