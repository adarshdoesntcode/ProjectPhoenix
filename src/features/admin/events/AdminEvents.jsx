import { Button } from "@/components/ui/button";
import { EVENT_STATUS, ROLES_LIST } from "@/lib/config";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery } from "../adminApiSlice";
import { EventColumns } from "./EventColumn";
import {
  Activity,
  CalendarCheck2,
  CheckCheck,
  CirclePlus,
  Hammer,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { File } from "lucide-react";

import { DataTable } from "./EventDataTable";
import { numberOfDevelopingProjects, numberOfValues } from "@/lib/utils";
import { useRef } from "react";

function AdminEvents() {
  const tableRef = useRef();
  const {
    data: events,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllEventsQuery();

  console.log(events);
  let content;
  let numberOfActiveEvents,
    numberOfCompleteEvents,
    noOfDevelopingProjects,
    activeEvents,
    completeEvents,
    archiveEvents;

  if (events) {
    numberOfActiveEvents = numberOfValues(
      events?.data,
      "eventStatus",
      EVENT_STATUS.Active
    );
    numberOfCompleteEvents = numberOfValues(
      events?.data,
      "eventStatus",
      EVENT_STATUS.Complete
    );

    noOfDevelopingProjects = numberOfDevelopingProjects(
      events?.data,
      "eventStatus",
      EVENT_STATUS.Active
    );
  }

  if (events) {
    activeEvents = events.data.filter(
      (event) => event.eventStatus === EVENT_STATUS.Active
    );
    completeEvents = events.data.filter(
      (event) => event.eventStatus === EVENT_STATUS.Complete
    );
    archiveEvents = events.data.filter(
      (event) => event.eventStatus === EVENT_STATUS.Archive
    );
  }

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    if (!events) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Events
            </h3>

            <p className="text-sm text-gray-500">
              You can start as soon as you add an event.
            </p>

            <Button className="mt-4" asChild>
              <Link to={`/${ROLES_LIST.admin}/events/new`}>
                Create an Event
              </Link>
            </Button>
          </div>
        </div>
      );
    } else {
      content = (
        <>
          <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hosted Events
                </CardTitle>
                <CalendarCheck2 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.data.length}</div>
                <p className="text-xs text-gray-500 text-right">
                  events have been hosted
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Events
                </CardTitle>
                <Activity className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{numberOfActiveEvents}</div>
                <p className="text-xs text-gray-500 text-right">
                  +201 since last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Developing Projects
                </CardTitle>
                <Hammer className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {noOfDevelopingProjects}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  +19% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Complete Events
                </CardTitle>
                <CheckCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {numberOfCompleteEvents}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  +180.1% from last year
                </p>
              </CardContent>
            </Card>
          </div>
          <Tabs className="mt-4" defaultValue="active">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="complete">Complete</TabsTrigger>
                <TabsTrigger value="archive">Archive</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="hidden sm:inline-flex h-10 gap-1 text-sm"
                  onClick={() => tableRef.current?.exportCSV()}
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
                <Button size="sm" className="h-10 gap-1 text-sm" asChild>
                  <Link to="new">
                    <CirclePlus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">New Event</span>
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Events</CardTitle>
                  <CardDescription>
                    Currently active events on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={EventColumns}
                    data={activeEvents}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="complete">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Events</CardTitle>
                  <CardDescription>
                    All the completed events on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={EventColumns}
                    data={completeEvents}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="archive">
              <Card>
                <CardHeader>
                  <CardTitle>Archived Events</CardTitle>
                  <CardDescription>
                    All the achived events on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={EventColumns}
                    data={archiveEvents}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Events</CardTitle>
                  <CardDescription>
                    All the events on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={EventColumns}
                    data={events.data}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      );
    }
  }

  return content;
}

export default AdminEvents;
