import { useCallback, useEffect, useState } from "react";

type Props = {
  initialTime: number;
  date: Date;
};

export default function Timer({ initialTime, date }: Props) {
  const [timerDate, setTimerDate] = useState("01.01.2012");
  const [time, setTime] = useState("00:00:00");

  const [countDown, setCountDown] = useState(initialTime.toFixed(2));
  const [isExpired, setIsExpired] = useState(false);

  const handleTime = useCallback(() => {
    const hours = date.getHours();
    let mins: number | string = date.getMinutes();
    let secs: number | string = date.getSeconds();

    if (secs < 10) {
      secs = `0${secs}`;
    }

    if (mins < 10) {
      mins = `0${mins}`;
    }

    setTime(`${hours}:${mins}:${secs}`);
  }, []);

  const handleDate = useCallback(() => {
    let day: number | string = date.getDate();
    let month: number | string = date.getMonth();
    const year = date.getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    setTimerDate(`${day}.${month}.${year}`);
  }, []);

  // handle date and time functions
  useEffect(() => {
    handleTime();
    handleDate();
  }, [handleTime, handleDate]);

  // handle time expiration
  useEffect(() => {
    if (+countDown <= 0) {
      setIsExpired(true);
    }
  }, [countDown]);

  // handle count down interval
  useEffect(() => {
    let interval: number;
    if (!isExpired) {
      interval = window.setInterval(() => {
        setCountDown((prev) => (Number(prev) - 0.01).toFixed(2));
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isExpired]);

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
      <div className="text-2xl font-bold">{countDown.replace(".", ",")}</div>
      <p>{`${timerDate} ${time}`}</p>
    </div>
  );
}
