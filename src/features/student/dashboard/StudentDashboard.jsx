import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowUpRight, CalendarClock } from "lucide-react";
import StudentEventsTimeline from "./StudentEventsTimeline";

import { Badge } from "@/components/ui/badge";

import TargetedEvent from "./TargetedEvent";
import StudentInfo from "./StudentInfo";

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
          <CardHeader className="flex flex-row bg-slate-100  rounded-t-md border-b py-4 items-center">
            <div>
              <CardTitle className="text-lg">Notice Board</CardTitle>
              <CardDescription className="text-xs">
                Notices from the administrator
              </CardDescription>
            </div>
            <Button size="sm" variant="outline" className="ml-auto text-xs">
              All
              <ArrowUpRight className="ml-1 h-4 w-4" />
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
          <CardHeader className="flex flex-row rounded-t-md border-b py-4 bg-slate-100 justify-between items-center">
            <div>
              <CardTitle className="text-lg">Events Timeline</CardTitle>
              <CardDescription className="text-xs">
                Timeline of the ongoing events
              </CardDescription>
            </div>

            <CalendarClock className="text-slate-500" />
          </CardHeader>
          <CardContent className="text-sm pt-8 pb-0">
            <StudentEventsTimeline />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default StudentDashboard;
