import {
  Card,
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
const options = { month: "long", day: "numeric", year: "numeric" };

function CurrentClock({ dateObject }) {
  const [date, setDate] = useState(new Date());

  const fullDate = date.toLocaleDateString("en-US", options);
  const hours = date.getHours();
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const formattedTime = `${displayHours}:${minutes
    .toString()
    .padStart(2, "0")} ${meridiem}`;

  const clock = {
    time: formattedTime,
    date: `${fullDate}, ${day}`,
  };

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
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
                <Button className="mt-2 w-full">View Calander</Button>
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
