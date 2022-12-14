import { useState } from "react";

type Props = {
  handleAddTimer: (newTime: number) => void;
};

export default function AddTimer({handleAddTimer}: Props) {
  const [newTime, setNewTime] = useState<number>(10);

  return (
    <form className="w-1/2 flex flex-col p-2 items-center gap-3">
      <p className="text-2xl font-bold">New Timer</p>
      <input 
        type="number"
        className="rounded-md border bg-transparent py-2 px-4 text-right w-1/2
            text-gray-600 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={newTime}
        onChange={e => setNewTime(Number(e.target.value))}
      />
      <button 
        type="button"
        onClick={() => handleAddTimer(newTime)}
        className="w-1/2 border bg-gray-300 rounded-md"
      >
        Add 
      </button>
    </form>
  )
}
