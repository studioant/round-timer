import { useEffect, useState } from "react"

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-clock">
            <span>The current time in your area is</span>
            <div className="clock">
                {(<div className="timer time">{time.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false })}:</div>)}
                {time.getMinutes() > 9 ? (<div className="timer time">{time.toLocaleTimeString('en-US', { minute: '2-digit' })}.</div>) : (<div className="timer time">0{time.toLocaleTimeString('en-US', { minute: '2-digit' })}.</div>)}
                {time.getSeconds() > 9 ? (<div className="timer time">{time.toLocaleTimeString('en-US', { second: '2-digit' })}</div>) : (<div className="timer time">0{time.toLocaleTimeString('en-US', { second: '2-digit' })}</div>)}
            </div>
        </div>
    )
}

export default Clock