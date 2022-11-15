import { useEffect, useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header"
import Round from "./components/Round";
import Clock from "./components/Clock";

function App() {
  // Total of 90 seconds
  const totalTime = 90
  // States for clock and round
  const [seconds, setSeconds] = useState(totalTime)
  const [millis, setMillis] = useState(60)
  const [round, setRound] = useState(0)
  
  // Decrement seconds
  useEffect(() => {
    seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000); 
    setMillis(60)
  }, [seconds])

  // Decrement milliseconds
  useEffect(() => {
    millis > 0 && setTimeout(() => setMillis(millis - 1), 10)
  }, [millis])

  // Increment round
  const increment = () => {
    setRound( count => count + 1);
  }

  // Decrement round
  const decrement = () => {
    setRound( count => count - 1);
  }

  return (
    <div className="container">
      <div className="container-round">
        <Header title={'Round'}/>
        <Round round={round}/>
        <Button color='#567' text='Decrement' onClick={decrement}/>
        <Button color='#345' text='Increment' onClick={increment}/>
      </div>
      <div className="container-clock">
        <Header title={'Clock'}/>
        <Clock secs={seconds} ms={millis}/>
        <Button color='#567' text='Start'/>
        <Button color='#567' text='Pause'/>
        <Button color='#567' text='Reset'/>
      </div>
    </div>
  );
}

export default App;
