import { Timeline } from "antd";
import { useGetEventsQuery } from "../studentApiSlice";
import { Loader2 } from "lucide-react";
import { EVENT_STATUS, getEventTypeByCode } from "@/lib/config";
import { CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { cn, daysFromToday } from "@/lib/utils";

function StudentEventsTimeline() {
  const { data: events, isLoading, isSuccess } = useGetEventsQuery();

  let activeEvents, content, flattenEvents, sortedEvents, render;

  if (events) {
    activeEvents = events.data.filter(
      (event) => event.eventStatus === EVENT_STATUS.Active
    );

    flattenEvents = activeEvents.flatMap((event) => {
      return ["proposal", "mid", "final"]
        .filter((subEvent) => event[subEvent].defense)
        .flatMap((subEvent) => [
          {
            eventId: event.eventId,

            eventType: getEventTypeByCode(event.eventType),
            subEventType: subEvent,
            date: event[subEvent].defenseDate,
            dateType: "Defense",
          },
          {
            eventId: event.eventId,
            eventType: getEventTypeByCode(event.eventType),

            subEventType: subEvent,
            date: event[subEvent].reportDeadline,
            dateType: "Report Submission Deadline",
          },
        ]);
    });
    sortedEvents = flattenEvents.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    render = sortedEvents.map((event) => {
      const check = daysFromToday(event.date);
      return {
        label: (
          <div
            className={cn(
              check >= 0 ? "text-slate-700  text-xs" : "text-slate-300  text-xs"
            )}
          >
            {format(event.date, "PPP")} ({daysFromToday(event.date)}d)
          </div>
        ),
        children: (
          <div
            className={cn(
              check >= 0 ? "text-slate-700 text-xs" : "text-slate-300 text-xs"
            )}
          >
            <span className="font-bold">
              {event.eventType.charAt(0).toUpperCase() +
                event.eventType.slice(1).toLowerCase()}{" "}
              Project
            </span>{" "}
            :{" "}
            {event.subEventType.charAt(0).toUpperCase() +
              event.subEventType.slice(1)}{" "}
            {event.dateType}
          </div>
        ),
        color: check >= 0 ? "black" : "slate",
      };
    });
  }

  if (isLoading) {
    content = (
      <CardContent className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </CardContent>
    );
  } else if (isSuccess) {
    if (!events) {
      content = (
        <div className="flex flex-col items-center justify-center gap-1 mt-4 rounded-md h-[200px] text-center">
          <h3 className="text-xl font-bold tracking-tight">No Events</h3>
          <p className="text-sm text-muted-foreground">
            Scheduled events will appear here
          </p>
        </div>
      );
    } else {
      content = <Timeline className="w-[95%]" mode="left" items={render} />;
    }
  }

  return content;
}

export default StudentEventsTimeline;
