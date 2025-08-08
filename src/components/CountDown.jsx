import { useState, useEffect } from "react";

export default function Countdown() {
  const calculateCountdown = () => {
    const targetDate = new Date("2025-05-31T16:00:00");
    const now = new Date();
    const difference = now - targetDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex font-gilda text-zinc-500">
      <div className="bg-gray-50 rounded-md p-4 m-2 text-center w-1/5 md:w-20">
        <p className="text-2xl font-bold">{countdown.days}</p>
        <p className="text-sm">nap</p>
      </div>
      <div className="bg-gray-50 rounded-md p-4 m-2 text-center w-1/5 md:w-20">
        <p className="text-2xl font-bold">{countdown.hours}</p>
        <p className="text-sm">óra</p>
      </div>
      <div className="bg-gray-50 rounded-md p-4 m-2 text-center w-1/5 md:w-20">
        <p className="text-2xl font-bold">{countdown.minutes}</p>
        <p className="text-sm">perc</p>
      </div>
      <div className="bg-gray-50 rounded-md p-4 m-2 text-center w-1/5 md:w-20">
        <p className="text-2xl font-bold">telt el</p>
        <p className="text-sm">azóta</p>
      </div>
    </div>
  );
}
