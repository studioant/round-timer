import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useEffect, useState } from 'react';
import Timer from './Timer';

const CircleTimer = ({ min, sec, ms }) => {

    const [dur, setDur] = useState(sec)
    // console.log(dur)

    // setDur(dur + (min * 60))
    // console.log(dur)

    return (
        <CountdownCircleTimer
            isPlaying
            duration={dur}
            strokeWidth={30}
            onComplete={() => console.log('Finished!')}
            colors={[['#7a96ea']]}
            size={600}
            >
            {({  }) => <Timer min={min} sec={sec} ms={ms}/>}
        </CountdownCircleTimer>
    );
}

export default CircleTimer