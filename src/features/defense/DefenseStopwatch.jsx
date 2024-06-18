import { Button } from "@/components/ui/button";
import { CirclePlay, Play, RotateCcw } from "lucide-react";
import React, { useState, useEffect } from "react";

const DefenseStopwatch = () => {
  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };
  return (
    <div className="flex gap-4 items-center justify-between">
      <p className="text-lg font-mono font-medium">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={reset}>
          Reset
        </Button>
        <Button size="sm" onClick={startAndStop}>
          {isRunning ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default DefenseStopwatch;
