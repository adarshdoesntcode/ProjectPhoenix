import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ROLES_LIST,
  getEventStatusByCode,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import { ArrowUpRight, CalendarHeart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetTargetedEventQuery } from "../studentApiSlice";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

function TargetedEvent() {
  const {
    data: targetedEvent,
    isLoading,
    isSuccess,
  } = useGetTargetedEventQuery();

  let targetedEventContent;

  if (isLoading) {
    targetedEventContent = (
      <CardContent className="flex items-center border rounded-md justify-center h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </CardContent>
    );
  } else if (isSuccess) {
    if (targetedEvent) {
      targetedEventContent = (
        <Card>
          <CardHeader className="bg-slate-50">
            <CardTitle className="flex items-center justify-between gap-4">
              <div className="flex items-center  gap-4">
                <span>{targetedEvent.data.eventCode}</span>
                <Badge variant="outline">
                  {getEventStatusByCode(targetedEvent.data.eventStatus)}
                </Badge>
              </div>
              <div className="text-xs  text-slate-500">
                <time dateTime="2023-11-23">
                  Created on {format(targetedEvent.data.createdAt, "PPP")}
                </time>
              </div>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="grid gap-2 mt-4">
            <div className="font-semibold mb-2">Event Details</div>
            <div className="flex justify-between">
              <div className="text-sm text-slate-500">Name</div>
              <div>{targetedEvent.data.eventName}</div>
            </div>
            {targetedEvent.data.description && (
              <div className="flex  justify-between">
                <div className="text-sm text-slate-500">Description</div>
                <div>{targetedEvent.data.description}</div>
              </div>
            )}
            <div className="flex justify-between">
              <div className="text-sm text-slate-500">Event Type</div>
              <div className="font-semibold">
                {getEventTypeByCode(targetedEvent.data.eventType)} Project
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-slate-500">Target Faculty</div>
              <div className="font-semibold">
                {getProgramByCode(targetedEvent.data.eventTarget)}
              </div>
            </div>
            <Separator />
            <div className="font-semibold mb-2">Event Details</div>
          </CardContent>
          <CardFooter className="flex items-end justify-between">
            <div className="text-slate-500 text-xs">
              Hoasted by {targetedEvent.data.author.fullname}
            </div>
            <Button>Create Project</Button>
          </CardFooter>
        </Card>
      );
    } else {
      targetedEventContent = (
        <div className="flex flex-col items-center justify-center gap-1 border rounded-md h-[300px] text-center">
          <h3 className="text-xl font-bold tracking-tight">
            You have no event
          </h3>
          <p className="text-sm text-muted-foreground">
            You can create a project as soon as an event is targeted to you.
          </p>
        </div>
      );
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row bg-slate-50 border border-b py-4 justify-between items-center">
        <div className="grid gap-2">
          <CardTitle className="text-xl">Your Event</CardTitle>
          <CardDescription>
            Event targated to you in the college
          </CardDescription>
        </div>
        <CalendarHeart className="text-slate-500" />
      </CardHeader>
      <CardContent className="mt-6">{targetedEventContent}</CardContent>
    </Card>
  );
}

export default TargetedEvent;
