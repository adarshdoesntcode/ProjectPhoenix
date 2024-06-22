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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ROLES_LIST,
  getEventStatusByCode,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import {
  ArrowUpRight,
  CalendarHeart,
  CirclePlus,
  Loader2,
  ShieldAlert,
  ChevronsUpDown,
  UserX,
  BadgeCheck,
} from "lucide-react";

import {
  useCreateProjectMutation,
  useGetSelectionStudentsQuery,
  useGetTargetedEventQuery,
} from "../studentApiSlice";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { daysFromToday, formatDays, getInitials } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import useRefreshUser from "@/hooks/useRefreshUser";
import StudentCreateProject from "./StudentCreateProject";

function TargetedEvent() {
  const {
    data: targetedEvent,
    isLoading,
    isSuccess,
  } = useGetTargetedEventQuery(undefined, {
    forceRefetch: true,
  });

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
          <CardHeader className="bg-slate-100">
            <CardTitle className="flex items-center justify-between gap-4">
              <div className="text-lg sm:text-2xl flex flex-col">
                <div className="text-xs text-gray-600">Your Event</div>
                <div className="flex  items-center gap-4">
                  <span>{targetedEvent.data.eventCode}</span>
                  <Badge className="hidden sm:block">
                    {getEventStatusByCode(targetedEvent.data.eventStatus)}
                  </Badge>
                </div>
              </div>
              <div>
                <StudentCreateProject targetedEvent={targetedEvent} />
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
                    )} (${formatDays(
                      daysFromToday(targetedEvent.data.proposal.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.proposal.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(targetedEvent.data.proposal.defenseDate)
                  )})`}</div>
                </div>
              </>
            )}
            {targetedEvent.data.mid.defense && (
              <>
                <Separator />
                <div className="font-medium">
                  Mid Term (Phase {targetedEvent.data.mid.phase})
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      targetedEvent.data.mid.reportDeadline,
                      "PPP"
                    )} (${formatDays(
                      daysFromToday(targetedEvent.data.mid.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.mid.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(targetedEvent.data.mid.defenseDate)
                  )})`}</div>
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
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      targetedEvent.data.final.reportDeadline,
                      "PPP"
                    )} (${formatDays(
                      daysFromToday(targetedEvent.data.final.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.final.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(targetedEvent.data.final.defenseDate)
                  )})`}</div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex items-end border-t py-4 justify-between">
            <div className="text-slate-500 text-xs">
              Hosted by {targetedEvent.data.author.fullname}
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
      {!targetedEvent && (
        <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
          <div>
            <CardTitle className="text-xl">Your Event</CardTitle>

            <CardDescription className="text-xs">
              Event targated to you in the college
            </CardDescription>
          </div>
          <CalendarHeart className="text-slate-500" />
        </CardHeader>
      )}

      <CardContent className="px-0 sm:px-6 sm:pb-6 pb-0 mt-0 sm:mt-6">
        {targetedEventContent}
      </CardContent>
    </Card>
  );
}

export default TargetedEvent;
