import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useEffect, useState } from 'react';
import Timer from './Timer';
import { getByDisplayValue } from '@testing-library/react';

const CircleTimer = ({ min, sec, ms, started }) => {
    const [dur, setDur] = useState(sec)
    const [time, setTime] = useState(false)
    // console.log(dur)
    useEffect(()=>{
        setDur(dur + (min*60))
        if(!time)
            setTime(true)
    }, [time])

    // setDur(dur + (min * 60))
    console.log(dur)

    const style = {
        display: 'inline-block'
    }

    return (
        <CountdownCircleTimer
            isPlaying = {started}
            duration = {dur}
            strokeWidth = {40}
            onComplete = {() => console.log('Finished!')}
            colors = {[['#7a96ea']]}
            size = {600}
            style = {style}
            >
                {() => (
                    <Timer min={min} sec={sec} ms={ms}/>
                )}

        </CountdownCircleTimer>
    );
}

export default CircleTimer