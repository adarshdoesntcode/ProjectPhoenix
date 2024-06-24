import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { selectCurrentUser } from "@/features/auth/authSlice";

import { ArrowUpRight, Contact, FolderGit2, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetProjectQuery } from "../studentApiSlice";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ROLES_LIST, getEventTypeByCode, getProgramByCode } from "@/lib/config";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function StudentInfo() {
  const user = useSelector(selectCurrentUser);

  const {
    data: project,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectQuery(user.project, { skip: !user.isAssociated });

  let projectContent, profileContent;

  profileContent = (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="flex flex-rows items-center gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.photo} />
              <AvatarFallback className="bg-slate-200">
                {getInitials(user.fullname)}
              </AvatarFallback>
            </Avatar>
            <div className=" text-slate-500">
              <div className="text-slate-950 font-medium">{user.fullname}</div>
              <div className="text-xs">{user.email}</div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-3" />
      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Program</div>
          <div className="text-sm font-medium">
            {getProgramByCode(user.program.toString())}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Roll No</div>
          <div className="text-sm font-medium ">{user.rollNumber}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Batch</div>
          <div className="text-sm font-medium ">{user.batchNumber}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Contact</div>
          <div className="text-sm font-medium ">{user.phoneNumber}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Project Member</div>
          <div className="text-xs ">
            <Badge variant="outline">{user.isAssociated ? "Yes" : "No"}</Badge>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user.isAssociated) {
    projectContent = (
      <div className="flex flex-col items-center justify-center gap-1  rounded-md h-[190px] text-center">
        <h3 className="text-lg font-bold tracking-tight">
          No Enrolled Project
        </h3>
        <p className="text-sm text-slate-500">
          Project details will appear as soon as you create a project
        </p>
      </div>
    );
  }

  if (isLoading) {
    projectContent = (
      <CardContent className="flex items-center  rounded-md justify-center h-[190px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </CardContent>
    );
  } else if (isSuccess) {
    if (!project) {
      return null;
    }
    projectContent = (
      <>
        <div className=" flex items-center justify-between gap-2 mb-3">
          <div className="font-semibold ">Code: {project.data.projectCode}</div>
          <Badge variant={"secondary"}>
            {getEventTypeByCode(project.data.projectType)}
          </Badge>
        </div>
        <Separator className="mb-3" />

        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Name</div>
            <div className="text-sm font-medium">
              {project.data.projectName}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Registered to</div>
            <div className="text-xs ">{project.data.event.eventCode}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Created on</div>
            <div className="text-xs ">
              {format(project.data.createdAt, "PPP")}
            </div>
          </div>
          <Separator className="my-2" />
          <div className="text-sm mb-1 text-slate-950">Team Members</div>
          <div className="flex items-center gap-2">
            {project.data.teamMembers.map((member) => {
              return (
                <div key={member._id}>
                  <HoverCard openDelay="50" closeDelay="50">
                    <HoverCardTrigger>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={member.photo} />
                        <AvatarFallback className="bg-slate-200">
                          {getInitials(member.fullname)}
                        </AvatarFallback>
                      </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
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
                    </HoverCardContent>
                  </HoverCard>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else if (isError) {
    projectContent = (
      <CardContent className="flex items-center  rounded-md justify-center h-[190px]">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-lg font-semibold ">Something went wrong.</h3>
          <p className="text-sm text-muted-foreground">
            {error.status || `STATUS ${error.originalStatus}`}
          </p>
          <div className="mt-4"> {JSON.stringify(error.data)}</div>
        </div>
      </CardContent>
    );
  }

  return (
    <>
      <Card className="lg:col-span-2 sm:col-span-4 ">
        <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
          <div>
            <CardTitle className="text-lg">Your Profile</CardTitle>

            <CardDescription className="text-xs">
              Your currently logged in student profile
            </CardDescription>
          </div>

          <Contact className="text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 mt-4">{profileContent}</div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2 sm:col-span-4">
        <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
          <div>
            <CardTitle className="text-lg">Your Project</CardTitle>

            <CardDescription className="text-xs">
              Details of you current project
            </CardDescription>
          </div>
          <div>
            {user.isAssociated ? (
              <Button size="sm" asChild>
                <Link to={`/${ROLES_LIST.student}/project`}>
                  View
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <FolderGit2 className="text-slate-500" />
            )}
          </div>
        </CardHeader>
        <CardContent className="mt-4">{projectContent}</CardContent>
      </Card>
    </>
  );
}
export default StudentInfo;
