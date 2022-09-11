import React, { useCallback, useContext, useState } from 'react';

const TimerContext = React.createContext<TimerContextType>({
  timer: 10,
  addTime: (time: number) => {},
});

type Children = {
  children: React.ReactNode;
}

export default function TimerProvider({ children }: Children) {
  const [timer, setTimer] = useState(10);
  
  const addTime = useCallback(
    (time: number) => setTimer(time),
    [],
  );
  
  return (
    <TimerContext.Provider value={{timer, addTime}}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  return useContext(TimerContext);
}