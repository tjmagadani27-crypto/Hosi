import { useEffect, useState, type JSX } from "react";

const TIMER = 45;

//this means that the toaster will only run when its on
export default function Toaster(): JSX.Element {
  const [on, setOn] = useState<boolean>(false);
  const [seconds, setRemainingTime] = useState<number>(TIMER);

  useEffect(() => {
    if (!on) return;

//it means that every seconds, it decrease by 1. When it reaches 1, turn the timer off and reset it back to 45
    const timer = window.setInterval(() => {
      setRemainingTime((seconds) => {
        if (seconds === 1) {
          setOn(false);
          return TIMER;
        }
        return seconds - 1;
      });
    }, 1000);

    //if the dependency is not triggered the program will not run
    return () => clearInterval(timer);
  }, [on]);

  //it is executed with the dependency
  const toast = (): void => {
    if (on) return;
    setRemainingTime(TIMER);
    setOn(true);
  };

  //it is used to stop the timer
  const cancel = (): void => {
    setOn(false);
   setRemainingTime(TIMER);
  };

  return (
    <div>
      <p>Toaster is {on ? "ON" : "OFF"}</p>

      {on && <p>{seconds} seconds remaining</p>}

      <button onClick={toast} disabled={on}>
        Toast
      </button>

      <button onClick={cancel} disabled={!on}>
        Cancel
      </button>

      {!on && seconds === TIMER && <p>Toast popped.</p>}
    </div>
  );
}