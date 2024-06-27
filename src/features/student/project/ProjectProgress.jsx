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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArchiveRestore,
  Cctv,
  ChevronLeft,
  Footprints,
  PlusCircle,
} from "lucide-react";

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

  console.log(progress);
  console.log(project);

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
        <main className="grid  items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigate(-1)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <CardTitle className="text-lg">Progress Log</CardTitle>

                    <CardDescription className="text-xs">
                      Log of the progress achieved by the members of the proejct
                    </CardDescription>
                  </div>
                </div>
                <Button>
                  Log <PlusCircle className="w-4 h-4 ml-2" />
                </Button>
              </CardHeader>

              <CardContent className="text-sm px-12 mt-6"></CardContent>
            </Card>
            {/* <div className="grid gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"> */}
            {/* <ProjectInfo
                user={user}
                project={project}
                isLoading={isLoading}
                isSuccess={isSuccess}
              /> */}
            {/* </div> */}

            {/* <Card>
              <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Report Submission</CardTitle>

                  <CardDescription className="text-xs">
                    Submmit your report within deadline
                  </CardDescription>
                </div>
                <ArchiveRestore className="text-slate-500" />
              </CardHeader>

              <CardContent className="px-6 pb-6  mt-6">
                <div></div>
              </CardContent>
            </Card> */}
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

              <CardContent className="text-sm px-12 mt-6"></CardContent>
            </Card>
          </div>
        </main>
      );
    }
  } else if (isError || projectIsError) {
    content = <ApiError error={error || projectError} />;
  }

  return content;
}

export default ProjectProgress;
