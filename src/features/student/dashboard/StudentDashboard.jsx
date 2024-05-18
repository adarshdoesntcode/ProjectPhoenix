import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ArrowUpRight,
  Boxes,
  CalendarClock,
  GitCommitVertical,
  Loader2,
} from "lucide-react";
import StudentEventsTimeline from "./StudentEventsTimeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ROLES_LIST } from "@/lib/config";
import TargetedEvent from "./TargetedEvent";
import StudentInfo from "./StudentInfo";
import { Separator } from "@/components/ui/separator";

function StudentDashboard() {
  return (
    <main className="grid flex-1 items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          <StudentInfo />
        </div>
        <TargetedEvent />
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2 xl:col-span-1">
        <Card>
          <CardHeader className="flex flex-row bg-slate-50 border border-b py-4 items-start">
            <div className="grid gap-2">
              <CardTitle className="text-lg">Notice Board</CardTitle>
              <CardDescription>
                Notices published by the administrator
              </CardDescription>
            </div>
            <Button size="sm" className="ml-auto text-xs gap-1">
              All
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="text-sm mt-6">
            <div className="grid gap-3">
              <div className="border rounded-md p-3">
                <h1 className="flex justify-between">
                  <span className="text-md font-semibold">
                    Last Report Submission Notice
                  </span>
                  <span>
                    <Badge>Urgent</Badge>
                  </span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nihil, sint! ....
                </p>
                <div className="text-xs mt-2  flex justify-end text-slate-700">
                  <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <h1 className="flex justify-between">
                  <span className="text-md font-semibold">
                    Last Report Submission Notice
                  </span>
                  <span>
                    <Badge>Urgent</Badge>
                  </span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Lorem ipsum dolor sit amet, consectetur adfasdfas....
                </p>
                <div className="text-xs mt-2  flex justify-end text-slate-700">
                  <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row border border-b py-4 bg-slate-50 justify-between items-center">
            <div className="grid gap-2">
              <CardTitle className="text-lg">Events Timeline</CardTitle>
              <CardDescription>Timeline of the ongoing events</CardDescription>
            </div>

            <CalendarClock className="text-slate-500" />
          </CardHeader>
          <CardContent className="text-sm pt-6 max-h-[500px] overflow-x-scroll">
            <StudentEventsTimeline />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default StudentDashboard;
