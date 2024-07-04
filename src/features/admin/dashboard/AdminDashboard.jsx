import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

import ApiError from "@/components/error/ApiError";
import Loader from "@/components/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Calendar, CalendarClock, Cctv } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import AdminEventsTimeline from "./AdminEventsTimeline";
import { useGetAdminDashboardQuery } from "../adminApiSlice";
import { Link } from "react-router-dom";
import { ROLES_LIST } from "@/lib/config";
import { DefenseColumn } from "./DefenseColumn";
import { DefenseDataTable } from "./DefenseDataTable";
import { DataTable } from "./EventDataTable";
import { EventColumns } from "./EventColumn";

function AdminDashboard() {
  const user = useSelector(selectCurrentUser);
  const {
    data: dashboard,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAdminDashboardQuery();

  console.log(dashboard);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    if (!dashboard) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No Projects Assigned !
            </h3>

            <p className="text-sm text-gray-500">
              Projects will apprear when you are assigned any new projects
            </p>
          </div>
        </div>
      );
    } else {
      content = (
        <main className="grid  items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
            <div className="grid grid-cols-4 gap-6">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>{user.fullname}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    A centralized college platfrom using MERN Stack
                    <br />
                    Administrator portal to create and manage colleg project
                    events and defenses
                  </CardDescription>
                </CardHeader>
                {/* <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter> */}
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>Active Defenses</CardDescription>
                  <CardTitle className="text-4xl">
                    {dashboard.data?.activeDefenses.length || 0}
                    <span className="text-sm text-slate-400"> of 14</span>
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link to={`/${ROLES_LIST.admin}/defense/new`}>
                      New Defense
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>Active Events</CardDescription>
                  <CardTitle className="text-4xl">
                    {dashboard.data?.activeEvents.length || 0}
                    <span className="text-sm text-slate-400"> of 3</span>
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link to={`/${ROLES_LIST.admin}/events/new`}>
                      New Event
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Tabs defaultValue="defenses">
              <TabsList>
                <TabsTrigger value="defenses">Defense</TabsTrigger>
                <TabsTrigger value="events">Event</TabsTrigger>
              </TabsList>
              <TabsContent value="defenses">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Defenses</CardTitle>

                    <CardDescription>
                      These are the projects assigned to you
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {dashboard.data?.activeDefenses.length > 0 && (
                      <DefenseDataTable
                        data={dashboard.data?.activeDefenses}
                        columns={DefenseColumn}
                      />
                    )}
                    {dashboard.data?.activeDefenses.length < 1 && (
                      <div className="h-[250px] font-semibold text-slate-800 flex justify-center items-center">
                        No Active Defenses
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Events</CardTitle>

                    <CardDescription>
                      These are the projects assigned to you
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-6">
                    {dashboard.data?.activeEvents.length > 0 && (
                      <DataTable
                        data={dashboard.data?.activeEvents}
                        columns={EventColumns}
                      />
                    )}
                    {dashboard.data?.activeEvents.length < 1 && (
                      <div className="h-[250px] font-semibold text-slate-800 flex justify-center items-center">
                        No Active Events
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2 xl:col-span-1">
            <Card>
              <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Events Timeline</CardTitle>

                  <CardDescription className="text-xs">
                    Timeline of the ongoing events
                  </CardDescription>
                </div>
                <CalendarClock className="text-slate-500" />
              </CardHeader>

              <CardContent className="text-sm pt-8 pb-0 ">
                <AdminEventsTimeline
                  events={dashboard.data?.activeEvents || []}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      );
    }
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

export default AdminDashboard;
