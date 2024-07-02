import { useNavigate, useParams } from "react-router-dom";

import ApiError from "@/components/error/ApiError";
import Loader from "@/components/Loader";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  Cctv,
  ChevronLeft,
  CircleAlert,
  CircleCheck,
  GitGraph,
  Info,
  Mail,
  ThumbsUp,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { getProgramByCode } from "@/lib/config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Timeline } from "antd";

import { useGetAdminProjectIdQuery } from "../adminApiSlice";
import DefenseEvaluation from "./DefenseEvaluations";

function AdminProjectDetails() {
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAdminProjectIdQuery(id);
  const navigate = useNavigate();

  let content, logItems;

  console.log(project);

  if (project?.data.progressLogs) {
    logItems = project.data.progressLogs.map((log) => {
      return {
        dot: <DotSymbol approved={log.approved} />,
        children: <Children progress={log} />,
      };
    });
  }

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <>
        <main className="grid  items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row gap-4 bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
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
                    <CardTitle className="text-lg">
                      {project.data.projectName}
                    </CardTitle>

                    <CardDescription className="text-xs">
                      {project.data.projectDescription
                        ? project.data.projectDescription
                        : "Details of you current project"}
                    </CardDescription>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="font-semibold text-sm bg-white md:text-lg px-4 "
                >
                  {project.data.projectCode}
                </Badge>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-4 gap-4 md:gap-8">
                  <div className="mt-4 col-span-4 lg:col-span-2 ">
                    <div className="grid gap-2">
                      <div className="flex flex-wrap gap-1">
                        {project.data.categories.map((category, index) => (
                          <Badge className="font-medium" key={index}>
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">Program</div>
                        <div className="text-sm font-bold">
                          {getProgramByCode(
                            project.data.teamMembers[0].program.toString()
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">Batch</div>
                        <div className="text-sm">
                          {project.data.teamMembers[0].batchNumber}
                        </div>
                      </div>

                      <Separator className="my-2" />
                      {project.data.event.proposal.defense && (
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-500">
                            Proposal Report
                          </div>
                          <div className="font-semibold text-sm">
                            {project.data.proposal.report ? (
                              <div className="flex items-center group transition-all">
                                <a
                                  href={project.data.proposal.report.filePath}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Report
                                </a>
                                <ArrowUpRight className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
                              </div>
                            ) : (
                              <Badge variant="outline">Not Available</Badge>
                            )}
                          </div>
                        </div>
                      )}
                      {project.data.event.mid.defense && (
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-500">
                            Mid Term Report
                          </div>
                          <div className="font-semibold text-sm">
                            {project.data.mid.report ? (
                              <div className="flex items-center group transition-all">
                                <a
                                  href={project.data.mid.report.filePath}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Report
                                </a>
                                <ArrowUpRight className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
                              </div>
                            ) : (
                              <Badge variant="outline">Not Available</Badge>
                            )}
                          </div>
                        </div>
                      )}
                      {project.data.event.final.defense && (
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-500">
                            Final Report
                          </div>
                          <div className="font-semibold text-sm">
                            {project.data.final.report ? (
                              <div className="flex items-center group transition-all">
                                <a
                                  href={project.data.final.report.filePath}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Report
                                </a>
                                <ArrowUpRight className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
                              </div>
                            ) : (
                              <Badge variant="outline">Not Available</Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 mt-4  col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-3">
                      {project.data.teamMembers.map((member) => {
                        return (
                          <div
                            key={member._id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex">
                              <div className="flex flex-row items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={member.photo} />
                                  <AvatarFallback className="bg-slate-200">
                                    {getInitials(member.fullname)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="text-sm text-slate-500">
                                  <div className="text-slate-950 font-medium">
                                    {member.fullname}
                                  </div>
                                  <div className="text-xs">{member.email}</div>
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs font-normal"
                            >
                              {member.phoneNumber}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Progress Log</CardTitle>

                  <CardDescription className="text-xs">
                    Log of the progress achieved by the members
                  </CardDescription>
                </div>
                <GitGraph className="text-slate-500" />
              </CardHeader>

              <CardContent className="text-sm pl-8 pt-4  mt-6">
                {logItems.length > 0 && <Timeline items={logItems} />}
                {logItems.length === 0 && (
                  <div className="h-[140px] flex items-center justify-center font-semibold text-slate-700 text-lg">
                    No Progress Logged!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="grid  auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2 xl:col-span-1">
            {project.data.supervisor.supervisorId && (
              <Card>
                <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Defense Permisson</CardTitle>

                    <CardDescription className="text-xs">
                      Permission to eligible projects to attend defense
                    </CardDescription>
                  </div>
                  <ThumbsUp className="text-slate-500" />
                </CardHeader>

                <CardContent className="text-sm mt-6">
                  <div className="grid gap-2 border rounded-md p-4 mb-4">
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
                                  {
                                    project.data.supervisor.supervisorId
                                      .fullname
                                  }{" "}
                                </span>
                              </div>
                              <div className="text-xs">
                                {project.data.supervisor.supervisorId.email}
                              </div>
                              <div className="text-xs">
                                {
                                  project.data.supervisor.supervisorId
                                    .phoneNumber
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <Button
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
                      </Button> */}
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

                    <div className="text-sm font-medium text-slate-600">
                      Mid Term Defense
                    </div>
                    <Separator />
                    <div className="flex mt-1 items-center justify-between">
                      <div className=" text-slate-500">Permission</div>
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
                      <div className="flex mt-1 items-center justify-between">
                        <div className=" text-slate-500">Permission On</div>
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
                    <div className="flex mt-1 items-center justify-between">
                      <div className=" text-slate-500">Permission</div>
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
                      <div className="flex mt-1 items-center justify-between">
                        <div className=" text-slate-500">Permission On</div>
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
            )}

            <DefenseEvaluation project={project} />
          </div>
        </main>
      </>
    );
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

const Children = ({ progress }) => {
  return (
    <Card>
      <CardHeader className=" p-4 pb-1">
        <div className="text-slate-800 font-semibold flex items-center justify-between">
          <span>{progress.title}</span>
          <div className="flex items-center gap-2">
            <Badge
              className="flex items-center gap-1 py-1"
              variant={progress.approved ? "" : "secondary"}
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

export default AdminProjectDetails;
