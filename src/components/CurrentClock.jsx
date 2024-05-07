import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const css = `
  .my-today { 
    color: white;
    background:black;
    user-select: none;
  }
  .my-today:hover { 
    color: white;
    background:black;
  }
`;

function CurrentClock({ dateObject }) {
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
    <>
      <style>{css}</style>
      <Card>
        <CardHeader className="p-2 pt-0 md:p-4">
          <CardTitle className="text-center">{clock.time}</CardTitle>
          <CardDescription className="text-center">
            {clock.date}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="mt-2 w-full">
                  View Calander
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  selected={dateObject}
                  modifiersClassNames={{
                    today: "my-today",
                  }}
                  className="rounded-md"
                />
              </PopoverContent>
            </Popover>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}

export default CurrentClock;
