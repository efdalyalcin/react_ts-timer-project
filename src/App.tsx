import { useState } from "react";
import AddTimer from "./components/AddTimer";
import Timer from "./components/Timer";

function App() {
  const [timers, setTimers] = useState<(JSX.Element | null)[]>([]);
  
  const handleExpiredTimers = (isExpired: boolean) => {
    setTimers([...timers].filter(timer => !isExpired))
  };

  const handleAddTimer = (newTime: number) => {
    const newDate = new Date();

    setTimers(
      [...timers,
        <Timer 
          initialTime={newTime}
          date={newDate}
          handleExpiredTimers={handleExpiredTimers}
        />
      ]);
  };

  return (
    <div className="flex p-5 gap-6">
      <div className="w-1/2 flex flex-col gap-3">
        {timers.map(timer => (
          <div 
            key={Math.random()}
            className="flex flex-col gap-3"
          >
            {timer}
          </div>
        ))}
      </div>

      <AddTimer handleAddTimer={handleAddTimer} />
    </div>
  );
}

export default App;
