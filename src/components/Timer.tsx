import { useCallback, useEffect, useState } from "react"
import { useTimer } from "../context/timerContext";

export default function Timer() {
  const [date, setDate] = useState('01.01.2012');
  const [time, setTime] = useState('00:00:00');
  
  const {timer} = useTimer();
  const [countDown, setCountDown] = useState(10);
  const [isExpired, setIsExpired] = useState(false);

  console.log('render', countDown)

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

  useEffect(
    () => {
      handleTime();
      handleDate();
    },
    [],
  );

  useEffect(
    () => {
      if (countDown <= 0) {
        setIsExpired(true);
      }
    },
    [countDown]
  );

  useEffect(
    () => {
      let interval: number;
      if (!isExpired) {
        interval = window.setInterval(() => {
          setCountDown((prev) => (prev - 1))
        }, 1000)
      } 
      return () => clearInterval(interval);
    },
    [isExpired],
  )

  return (
    <div>
      {date}-{time} - {timer} - {countDown}
    </div>
  )
}
