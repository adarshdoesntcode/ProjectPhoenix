import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import {
  useGetProjectProgressQuery,
  useGetProjectQuery,
} from "../studentApiSlice";
import Loader from "@/components/Loader";
import ApiError from "@/components/error/ApiError";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ROLES_LIST } from "@/lib/config";
import { Timeline } from "antd";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArchiveRestore,
  Cctv,
  ChevronLeft,
  Footprints,
  Mail,
  PlusCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

function ProjectProgress() {
  const user = useSelector(selectCurrentUser);
  const {
    data: project,
    isLoading: projectLoading,
    isSuccess: projectSuccess,
    isError: projectIsError,
    error: projectError,
  } = useGetProjectQuery(user.project);

  const {
    data: progress,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectProgressQuery(user.project);

  const navigate = useNavigate();

  console.log("🚀 ~ ProjectProgress ~ progress:", progress);
  console.log("🚀 ~ ProjectProgress ~ project:", project);

  let content;

  if (isLoading || projectLoading) {
    content = <Loader />;
  } else if (isSuccess && projectSuccess) {
    if (!project.data.supervisor.supervisorId) {
      return <Navigate to={`/${ROLES_LIST.student}/project`} />;
    }
    if (!progress) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Log your first progress
            </h3>

            <p className="text-sm text-gray-500">
              You can start as soon as you enroll in an event.
            </p>

            <Button className="mt-4">
              Log <PlusCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      );
    } else {
      content = (
        <>
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Project Progress Log
            </h1>
          </div>
          <main className="grid  items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Progress</CardTitle>

                    <CardDescription className="text-xs">
                      Log of the progress achieved by the members
                    </CardDescription>
                  </div>

                  <Button className="flex items-center gap-1">
                    <span className="sr-only sm:not-sr-only">Log</span>
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </CardHeader>

                <CardContent className="text-sm px-12 mt-6">
                  <Timeline
                    items={[
                      {
                        children: <Children progress={progress.data[0]} />,
                      },
                      {
                        children: "Solve initial network problems 2015-09-01",
                      },
                      {
                        children: "Technical testing 2015-09-01",
                      },
                      {
                        children: "Network problems being solved 2015-09-01",
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2 xl:col-span-1">
              <Card>
                <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Supervisor</CardTitle>

                    <CardDescription className="text-xs">
                      Your supervisor and their approvals
                    </CardDescription>
                  </div>
                  <Cctv className="text-slate-500" />
                </CardHeader>

                <CardContent className="text-sm mt-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex">
                        <div className="flex flex-row items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={project.data.supervisor.supervisorId.photo}
                            />
                            <AvatarFallback className="bg-slate-200">
                              {getInitials(
                                project.data.supervisor.supervisorId.fullname
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm text-slate-500">
                            <div className="text-slate-950 flex items-center font-medium ">
                              <span>
                                {project.data.supervisor.supervisorId.fullname}{" "}
                              </span>
                              <span className="font-xs text-slate-500 ">
                                ,{" "}
                                {
                                  project.data.supervisor.supervisorId
                                    .designation
                                }{" "}
                              </span>
                            </div>
                            <div className="text-xs">
                              {project.data.supervisor.supervisorId.email}
                            </div>
                            <div className="text-xs">
                              {project.data.supervisor.supervisorId.phoneNumber}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-xs"
                        asChild
                      >
                        <a
                          href={`mailto:${project.data.supervisor.supervisorId.email}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>

                    {project.data.supervisor.supervisorId.skillSet.map(
                      (skill, index) => (
                        <Badge
                          className="mr-1 mb-1 font-normal"
                          variant="outline"
                          key={index}
                        >
                          {skill}
                        </Badge>
                      )
                    )}
                  </div>
                  <Separator />
                </CardContent>
              </Card>
            </div>
          </main>
        </>
      );
    }
  } else if (isError || projectIsError) {
    content = <ApiError error={error || projectError} />;
  }

  return content;
}

const Children = ({ progress }) => {
  return (
    <Card>
      <CardHeader className=" p-4 pb-1">
        <CardDescription className="text-slate-800 font-semibold flex items-center justify-between">
          <span>{progress.title}</span>
          <Badge variant={progress.approved ? "" : "secondary"}>
            {progress.approved ? "Verified" : "Unverified"}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-1 text-slate-600">
        {progress.description}
      </CardContent>
      <CardFooter className="text-slate-500 border-t text-xs p-4 py-2 flex items-center justify-between">
        <span>{progress.author.fullname}</span>
        <span>
          {format(progress.logDate, "PPP")},{" "}
          {format(progress.logDate, "hh:mm aa")}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProjectProgress;
