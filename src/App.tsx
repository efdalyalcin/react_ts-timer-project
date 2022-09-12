import { useState } from "react";
import AddTimer from "./components/AddTimer";
import Timer from "./components/Timer";

function App() {
  const [timers, setTimers] = useState<Timer[]>([]);

  const handleAddTimer = (initialTime: number) => {
    const newDate = new Date();
    const newId = Math.random();
    
    const newTimer = {
      timerId: newId,
      content: (
        <Timer
          initialTime={initialTime}
          date={newDate}
        />
      ),
    };
      
    setTimers([...timers, newTimer]);
  };
    
  return (
    <div className="flex p-5 gap-6">
      <div className="w-1/2 flex flex-col gap-3">
        {timers.map((timer) => (
          <div key={timer.timerId} className="flex flex-col gap-3">
            {timer.content}
          </div>
        ))}
      </div>

      <AddTimer handleAddTimer={handleAddTimer} />
    </div>
  );
}

export default App;
