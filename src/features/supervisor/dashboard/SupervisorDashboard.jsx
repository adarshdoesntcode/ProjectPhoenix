import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetSupervisorAssignedProjectsQuery } from "../supervisorApiSlice";
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
import SupervisorEventsTimeline from "./SupervisorEventsTimeline";
import { Calendar, CalendarClock, Cctv } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import { DataTable } from "./ProjectDataTable";
import { ProjectColumn } from "./ProjectColumn";

function SupervisorDashboard() {
  const user = useSelector(selectCurrentUser);
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSupervisorAssignedProjectsQuery(user.project);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <main className="grid  items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
              <div>
                <CardTitle className="text-lg">
                  {`${getGreeting()}, ${user.fullname}`}
                </CardTitle>

                <CardDescription className="text-xs">
                  These are the projects assigned to you
                </CardDescription>
              </div>

              <Cctv className="text-slate-500" />
            </CardHeader>

            <CardContent className="pt-6">
              {projects.data.length > 0 && (
                <DataTable data={projects.data} columns={ProjectColumn} />
              )}
              {projects.data.length < 1 && (
                <div className="h-[250px] font-semibold text-slate-800 flex justify-center items-center">
                  No Projects are assigned to you currently!
                </div>
              )}
            </CardContent>
          </Card>
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
              <SupervisorEventsTimeline />
            </CardContent>
          </Card>
        </div>
      </main>
    );
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

export default SupervisorDashboard;
