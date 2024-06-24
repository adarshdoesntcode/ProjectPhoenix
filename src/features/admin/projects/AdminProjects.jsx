import Loader from "@/components/Loader";
import { useGetAllProjectsQuery } from "../adminApiSlice";
import ApiError from "@/components/error/ApiError";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Archive,
  CalendarCheck2,
  CheckCheck,
  ChevronLeft,
  File,
  Hammer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";
import { DataTable } from "./ProjectDataTable";
import { ProjectColumn } from "./ProjectColumn";
import { EVENT_STATUS } from "@/lib/config";

function AdminProjects() {
  const {
    data: projects,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetAllProjectsQuery();

  const navigate = useNavigate();
  const tableRef = useRef();

  let content;
  let activeProjects, completeProjects, archiveProjects;

  if (projects) {
    activeProjects = projects.data.filter(
      (project) => project.status === EVENT_STATUS.Active
    );
    completeProjects = projects.data.filter(
      (project) => project.status === EVENT_STATUS.Complete
    );
    archiveProjects = projects.data.filter(
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
            <h3 className="text-2xl font-bold tracking-tight">No projects</h3>

            <p className="text-sm text-gray-500">
              Projects will appear when students create them
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
            Projects
          </div>
          <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Registered Projects
                </CardTitle>
                <CalendarCheck2 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.data.length}</div>
                <p className="text-xs text-gray-500 text-right">
                  all the projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Projects
                </CardTitle>
                <Activity className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {activeProjects.length}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  running projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Complete Projects
                </CardTitle>
                <CheckCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completeProjects.length}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  successful projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Archived Projects
                </CardTitle>
                <Archive className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {archiveProjects.length}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  unsucessfull projects
                </p>
              </CardContent>
            </Card>
          </div>
          <Tabs className="mt-4" defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="complete">Complete</TabsTrigger>
                <TabsTrigger value="archive" className="hidden lg:inline-flex">
                  Archive
                </TabsTrigger>
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
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Projects</CardTitle>
                  <CardDescription>
                    All the registered projects on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={ProjectColumn}
                    data={projects.data}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>
                    Currently active projects in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={ProjectColumn}
                    data={activeProjects}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="complete">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Projects</CardTitle>
                  <CardDescription>
                    All the successfully graded projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={ProjectColumn}
                    data={completeProjects}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archive">
              <Card>
                <CardHeader>
                  <CardTitle>Archive Projects</CardTitle>
                  <CardDescription>
                    All the archived projects on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={ProjectColumn}
                    data={archiveProjects}
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

export default AdminProjects;
