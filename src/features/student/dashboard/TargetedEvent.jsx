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
  getEventStatusByCode,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import { ArrowUpRight, CalendarHeart, Loader2 } from "lucide-react";

import { useGetTargetedEventQuery } from "../studentApiSlice";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { daysFromToday } from "@/lib/utils";

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
              <div className="text-lg sm:text-2xl flex   items-center  gap-4">
                <span>{targetedEvent.data.eventCode}</span>
                <Badge variant="outline" className="hidden sm:block">
                  {getEventStatusByCode(targetedEvent.data.eventStatus)}
                </Badge>
              </div>
              <div>
                <Button>
                  Create Project
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="grid gap-2 mt-4">
            <div className="flex justify-between">
              <div className="text-xs sm:text-sm text-slate-500">Name</div>
              <div className="text-xs sm:text-sm">
                {targetedEvent.data.eventName}
              </div>
            </div>
            {targetedEvent.data.description && (
              <div className="hidden md:flex  justify-between">
                <div className="text-xs sm:text-sm text-slate-500">
                  Description
                </div>
                <div className="text-xs sm:text-sm">
                  {targetedEvent.data.description}
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <div className="text-xs sm:text-sm text-slate-500">
                Event Type
              </div>
              <div className="font-medium text-xs sm:text-sm">
                {getEventTypeByCode(targetedEvent.data.eventType)} PROJECT
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs sm:text-sm text-slate-500">
                Target Faculty
              </div>
              <div className="font-medium text-xs sm:text-sm">
                {getProgramByCode(targetedEvent.data.eventTarget)}
              </div>
            </div>
            <Separator className="my-2" />
            {targetedEvent.data.proposal.defense && (
              <>
                <div className="font-medium">
                  Proposal (Phase {targetedEvent.data.proposal.phase})
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      targetedEvent.data.proposal.reportDeadline,
                      "PPP"
                    )} (${daysFromToday(
                      targetedEvent.data.proposal.reportDeadline
                    )}d)`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.proposal.defenseDate,
                    "PPP"
                  )} (${daysFromToday(
                    targetedEvent.data.proposal.defenseDate
                  )}d)`}</div>
                </div>
              </>
            )}
            {targetedEvent.data.mid.defense && (
              <>
                <Separator />
                <div className="font-medium">
                  Mid (Phase {targetedEvent.data.mid.phase})
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      targetedEvent.data.mid.reportDeadline,
                      "PPP"
                    )} (${daysFromToday(
                      targetedEvent.data.mid.reportDeadline
                    )}d)`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.mid.defenseDate,
                    "PPP"
                  )} (${daysFromToday(
                    targetedEvent.data.mid.defenseDate
                  )}d)`}</div>
                </div>
              </>
            )}
            {targetedEvent.data.final.defense && (
              <>
                <Separator />
                <div className="font-medium">
                  Final (Phase {targetedEvent.data.final.phase})
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-xs sm:text-sm">
                    {`${format(
                      targetedEvent.data.final.reportDeadline,
                      "PPP"
                    )} (${daysFromToday(
                      targetedEvent.data.final.reportDeadline
                    )}d)`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.final.defenseDate,
                    "PPP"
                  )} (${daysFromToday(
                    targetedEvent.data.final.defenseDate
                  )}d)`}</div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex items-end border-t py-4 justify-between">
            <div className="text-slate-500 text-xs">
              Hoasted by {targetedEvent.data.author.fullname}
            </div>
            <div className="hidden sm:block text-xs  text-slate-500">
              <time dateTime="2023-11-23">
                Created on {format(targetedEvent.data.createdAt, "PPP")}
              </time>
            </div>
          </CardFooter>
        </Card>
      );
    } else {
      targetedEventContent = (
        <div className="flex flex-col items-center justify-center gap-1 border rounded-md h-[300px] text-center">
          <h3 className="text-xl font-bold tracking-tight">
            You have no event
          </h3>
          <p className="text-smtext-muted-foreground">
            You can create a project as soon as an event is targeted to you.
          </p>
        </div>
      );
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row bg-slate-50 rounded-t-md border-b py-4 justify-between items-center">
        <div className="grid gap-2">
          <CardTitle className="text-xl">Your Event</CardTitle>
          {!targetedEvent && (
            <CardDescription>
              Event targated to you in the college
            </CardDescription>
          )}
        </div>
        <CalendarHeart className="text-slate-500" />
      </CardHeader>
      <CardContent className="mt-6">{targetedEventContent}</CardContent>
    </Card>
  );
}

export default TargetedEvent;
