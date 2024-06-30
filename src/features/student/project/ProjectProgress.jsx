import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import {
  useCreateProgressMutation,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ArchiveRestore,
  Cctv,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Dot,
  Footprints,
  Info,
  Loader2,
  Mail,
  PlusCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { progress } from "framer-motion";

function ProjectProgress() {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const {
    data: project,
    isLoading: projectLoading,
    isSuccess: projectSuccess,
    isError: projectIsError,
    error: projectError,
  } = useGetProjectQuery(user.project);

  // const {
  //   data: progress,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetProjectProgressQuery(user.project);

  const [createProgress] = useCreateProgressMutation();
  const {
    handleSubmit,
    register,
    reset,

    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  let content, logItems;

  // if (progress) {
  //   logItems = progress.data.map((log) => {
  //     return {
  //       dot: <DotSymbol approved={log.approved} />,
  //       children: <Children progress={log} />,
  //     };
  //   });
  // }
  console.log(project);
  if (project?.data?.progressLogs) {
    logItems = project.data.progressLogs.map((log) => {
      return {
        dot: <DotSymbol approved={log.approved} />,
        children: <Children progress={log} />,
      };
    });
  }
  async function onPost(data) {
    try {
      const newLog = {
        title: data.progressTitle,
        description: data.progressDescription,
        logDate: new Date(),
        projectId: project.data._id,
      };
      const res = await createProgress(newLog);

      if (res.error) {
        throw new Error("Could not post progress");
      }
      if (!res.error) {
        setOpen(false);
        reset();
        toast({
          title: "Progress posted successfully",
          description: "Supervisor can now verify",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!!",
        description: error.message,
      });
    }
  }

  if (projectLoading) {
    content = <Loader />;
  } else if (projectSuccess) {
    if (!project.data.supervisor.supervisorId) {
      return <Navigate to={`/${ROLES_LIST.student}/project`} />;
    }
    if (project.data.progressLogs?.length === 0) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Log your first progress
            </h3>

            <p className="text-sm text-gray-500">
              You can start as soon as you enroll in an event.
            </p>

            <Button className="mt-4" onClick={() => setOpen(true)}>
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

                  <Button
                    className="flex items-center gap-1"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only sm:not-sr-only">Log</span>
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </CardHeader>

                <CardContent className="text-sm pl-8 pt-4  mt-6">
                  <Timeline items={logItems} />
                </CardContent>
              </Card>
            </div>
            <div className="grid sticky top-20 auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2 xl:col-span-1">
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
                  <div className="my-4 font-semibold">Supervisor Approvals</div>
                  <div className="grid gap-2 border rounded-md p-4 mb-4">
                    <div className="text-sm font-medium text-slate-600">
                      Mid Term Defense
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className=" text-slate-500">Approval</div>
                      <Badge
                        variant={
                          project.data.supervisor.mid.approved
                            ? ""
                            : "secondary"
                        }
                      >
                        {project.data.supervisor.mid.approved
                          ? "Granted"
                          : "Not Granted"}
                      </Badge>
                    </div>
                    {project.data.supervisor.mid.approved && (
                      <div className="flex items-center justify-between">
                        <div className=" text-slate-500">Approved On</div>
                        <Badge variant="outline">
                          {format(
                            project.data.supervisor.mid.approvedDate,
                            "PPP"
                          )}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-2 border rounded-md p-4">
                    <div className="text-sm font-medium text-slate-600">
                      Final Defense
                    </div>

                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className=" text-slate-500">Approval</div>
                      <Badge
                        variant={
                          project.data.supervisor.final.approved
                            ? ""
                            : "secondary"
                        }
                      >
                        {project.data.supervisor.final.approved
                          ? "Granted"
                          : "Not Granted"}
                      </Badge>
                    </div>
                    {project.data.supervisor.final.approved && (
                      <div className="flex items-center justify-between">
                        <div className=" text-slate-500">Approved On</div>
                        <Badge variant="outline">
                          {format(
                            project.data.supervisor.final.approvedDate,
                            "PPP"
                          )}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </>
      );
    }
  } else if (projectIsError) {
    content = <ApiError error={projectError} />;
  }

  return (
    <>
      {content}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Progress Log</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onPost)} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="progressTitle">
                {errors.progressTitle ? (
                  <span className="text-red-500">
                    {errors.progressTitle.message}
                  </span>
                ) : (
                  <span>Title</span>
                )}
              </Label>
              <Input
                id="progressTitle"
                type="text"
                placeholder=""
                {...register("progressTitle", {
                  required: "Title is required",
                })}
                className={errors.progressTitle ? "border-red-500" : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="progressDescription">
                {errors.progressDescription ? (
                  <span className="text-red-500">
                    {errors.progressDescription.message}
                  </span>
                ) : (
                  <span>Description</span>
                )}
              </Label>
              <Textarea
                id="projectDescription"
                placeholder="Describe your Project"
                className={
                  errors.progressDescription
                    ? "border-red-500 m-h-16"
                    : "m-h-16"
                }
                {...register("progressDescription", {
                  required: "Description is required",
                })}
              />
            </div>
            <div className="flex items-center justify-end">
              {isSubmitting ? (
                <Button variant="secondary" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </Button>
              ) : (
                <Button type="submit">
                  Post <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

const Children = ({ progress }) => {
  return (
    <Card className={`${progress.approved ? "" : "bg-slate-100"}`}>
      <CardHeader className=" p-4 pb-1">
        <div className="text-slate-800  font-semibold flex items-center justify-between">
          <span>{progress.title}</span>
          <div className="flex items-center gap-2">
            <Badge
              className="flex items-center  gap-1 py-1"
              variant={progress.approved ? "outline" : ""}
            >
              {progress.approved ? "Verified" : "Unverified"}
              {progress.approved && (
                <TooltipProvider delayDuration="50">
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{format(progress.approvedDate, "PPP")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-1 text-slate-600">
        {progress.description}
      </CardContent>
      <CardFooter className="text-slate-500 border-t text-xs p-4 py-2 flex items-center justify-between">
        <span>{progress.author.fullname}</span>
        <span>
          {format(progress.logDate, "PP")},{" "}
          {format(progress.logDate, "hh:mm aa")}
        </span>
      </CardFooter>
    </Card>
  );
};

const DotSymbol = ({ approved }) => {
  if (approved) {
    return (
      <div className="text-green-500">
        <CircleCheck strokeWidth={2} />
      </div>
    );
  } else {
    return (
      <div className="text-slate-500">
        <CircleAlert strokeWidth={2} />
      </div>
    );
  }
};
export default ProjectProgress;
