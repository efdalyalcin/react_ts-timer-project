import { useState } from "react";
import Timer from "./components/Timer";

function App() {
  const [timers, setTimers] = useState<(JSX.Element | null)[]>([<Timer />]);

  console.log(timers);

  return (
    <div className="flex p-5 gap-6">
      <div className="w-1/2">
        {timers.map(timer => (
          <div 
            key={Date.now()}
            className="flex flex-col gap-3"
          >
            {timer}
          </div>
        ))}
      </div>

      <form className="w-1/2">
        <p className="text-2xl font-bold">New Timer</p>
        <input 
          type="number"
          
        />
      </form>
    </div>
  );
}

export default App;
