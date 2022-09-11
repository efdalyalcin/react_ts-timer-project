import { useCallback, useEffect, useState } from "react"
import { useTimer } from "../context/timerContext";

export default function Timer() {
  const {timer} = useTimer();
  
  const [date, setDate] = useState('01.01.2012');
  const [time, setTime] = useState('00:00:00');
  
  const [countDown, setCountDown] = useState(timer.toFixed(2));
  const [isExpired, setIsExpired] = useState(false);

  const handleTime = useCallback(
    () =>  {
      const hours = new Date().getHours();
      const mins = new Date().getMinutes();
      let secs: number | string = new Date().getSeconds();

      if (secs < 10) {
        secs = `0${secs}`;
      }

      setTime(`${hours}:${mins}:${secs}`);
    },
    []
  );

  const handleDate = useCallback(
    () => {
      let day: number | string = new Date().getDate();
      let month: number | string = new Date().getMonth();
      const year = new Date().getFullYear();

      if (day < 10) {
        day = `0${day}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }

      setDate(`${day}.${month}.${year}`)
    },
    [],
  );

  // handle date and time functions
  useEffect(
    () => {
      handleTime();
      handleDate();
    },
    [handleTime, handleDate],
  );

  // handle isExpired
  useEffect(
    () => {
      if (+countDown <= 0) {
        setIsExpired(true);
      }
    },
    [countDown]
  );

  // handle interval
  useEffect(
    () => {
      let interval: number;
      if (!isExpired) {
        interval = window.setInterval(() => {
          setCountDown((prev) => (Number(prev) - 0.01).toFixed(2))
        }, 10 )
      } 
      return () => clearInterval(interval);
    },
    [isExpired],
  )
  
  if (isExpired) return null;

  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-300 rounded-lg relative">
      <button 
        type="button"
        className="absolute right-3 top-1 font-bold"
        onClick={() => setIsExpired(true)}
      >
        X
      </button>
      <div className="text-2xl font-bold">
        {countDown.replace('.', ',')}
      </div>
      <p>{`${date} ${time}`}</p>
    </div>
  )
}
