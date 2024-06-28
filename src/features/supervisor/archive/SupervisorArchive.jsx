import { useNavigate } from "react-router-dom";
import { useGetSupervisorArchiveProjectsQuery } from "../supervisorApiSlice";
import { useRef } from "react";
import { EVENT_STATUS } from "@/lib/config";
import ApiError from "@/components/error/ApiError";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { CheckCheck, ChevronLeft, File, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./ProjectDataTable";
import { ProjectColumn } from "./ProjectColumn";

function SupervisorArchive() {
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSupervisorArchiveProjectsQuery();
  const navigate = useNavigate();
  const tableRef = useRef();
  let content, compeleteProjects, archivedProjects;

  if (projects) {
    compeleteProjects = projects.data.filter(
      (project) => project.status === EVENT_STATUS.Complete
    );
    archivedProjects = projects.data.filter(
      (project) => project.status === EVENT_STATUS.Archive
    );
  }

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    if (!projects) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No Projects</h3>

            <p className="text-sm text-gray-500">
              Projects will apprear when your students complete their project
            </p>
          </div>
        </div>
      );
    } else {
      content = (
        <div>
          <div className="text-xl font-semibold tracking-tight flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            Archive
          </div>
          <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Complete Projects
                </CardTitle>
                <CheckCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {compeleteProjects.length}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  successful projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rejected Projects
                </CardTitle>
                <Trash className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {archivedProjects.length}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  unsucessful projects
                </p>
              </CardContent>
            </Card>
          </div>
          <Tabs className="mt-4" defaultValue="complete">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="complete">Complete</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className=" h-10 gap-1 text-sm"
                  onClick={() => tableRef.current?.exportCSV()}
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>

            <TabsContent value="complete">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Projects</CardTitle>
                  <CardDescription>
                    Your successfully graded projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={ProjectColumn}
                    data={compeleteProjects}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rejected">
              <Card>
                <CardHeader>
                  <CardTitle>Rejected Projects</CardTitle>
                  <CardDescription>
                    Your unsuccessfully graded projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={ProjectColumn}
                    data={archivedProjects}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
  } else if (isError) {
    content = <ApiError error={error} />;
  }
  return content;
}

export default SupervisorArchive;
