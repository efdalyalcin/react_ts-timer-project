import { useCallback, useState } from "react";
import AddTimer from "./components/AddTimer";
import Timer from "./components/Timer";

function App() {
  const [timers, setTimers] = useState<Timer[]>([]);
  
  const handleExpiredTimers = useCallback(
    (isExpired: boolean, id: number) => {
      setTimers([...timers].filter(timer => (isExpired && id === timer.id)))
    },
    [],
  );

  const handleAddTimer = (newTime: number) => {
    const newDate = new Date();
    const newId = Math.random();

    const newTimer = {
      id: newId,
      content: <Timer 
        initialTime={newTime}
        date={newDate}
        handleExpiredTimers={handleExpiredTimers}
        id={newId}
      />,
    };

    setTimers(
      [...timers, newTimer]);
  };

  return (
    <div className="flex p-5 gap-6">
      <div className="w-1/2 flex flex-col gap-3">
        {timers.map(timer => (
          <div 
            key={timer.id}
            className="flex flex-col gap-3"
          >
            {timer.content}
          </div>
        ))}
      </div>

      <AddTimer handleAddTimer={handleAddTimer} />
    </div>
  );
}

export default App;
