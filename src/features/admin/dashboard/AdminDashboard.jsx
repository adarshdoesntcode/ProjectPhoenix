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
                  {/* <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription> */}
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
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button>New Defense</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>Active Events</CardDescription>
                  <CardTitle className="text-4xl">
                    {dashboard.data?.activeEvents.length || 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button>New Event</Button>
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

                  <CardContent className="pt-6">
                    {/* {projects.data.length > 0 && (
                  <DataTable data={projects.data} columns={ProjectColumn} />
                )} */}
                    {/* {projects.data.length < 1 && (
                  <div className="h-[250px] font-semibold text-slate-800 flex justify-center items-center">
                    No Projects are assigned to you currently!
                  </div>
                )} */}
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
                    {/* {projects.data.length > 0 && (
                  <DataTable data={projects.data} columns={ProjectColumn} />
                )} */}
                    {/* {projects.data.length < 1 && (
                  <div className="h-[250px] font-semibold text-slate-800 flex justify-center items-center">
                    No Projects are assigned to you currently!
                  </div>
                )} */}
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
