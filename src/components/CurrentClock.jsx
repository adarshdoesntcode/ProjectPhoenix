import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

function CurrentClock() {
  const [clock, setClock] = useState({ date: "", time: "" });

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      const options = { month: "long", day: "numeric", year: "numeric" };
      const fullDate = date.toLocaleDateString("en-US", options);
      const hours = date.getHours();
      const day = date.toLocaleDateString("en-US", { weekday: "long" });
      const minutes = date.getMinutes();
      const meridiem = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12; // Convert to 12-hour format
      const formattedTime = `${displayHours}:${minutes
        .toString()
        .padStart(2, "0")} ${meridiem}`;

      setClock({ date: `${fullDate}, ${day}`, time: formattedTime });
    };

    // Update time every second
    const interval = setInterval(updateClock, 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle className="text-center">{clock.time}</CardTitle>
        <CardDescription className="text-center">{clock.date}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default CurrentClock;
