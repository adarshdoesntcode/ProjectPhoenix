import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BookmarkCheck, Loader2 } from "lucide-react";

import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getEventStatusByCode, getEventTypeByCode } from "@/lib/config";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

function ProjectInfo({ project, isLoading, isSuccess, user }) {
  let projectContent, teamContent;

  if (!user.isAssociated) {
    projectContent = (
      <div className="flex flex-col items-center justify-center gap-1  rounded-md h-[150px] text-center">
        <h3 className="text-lg font-bold tracking-tight">No Active Project</h3>
        <p className="text-sm text-slate-500">
          Project details will appear as soon as you create a project
        </p>
      </div>
    );
    teamContent = (
      <div className="flex flex-col items-center justify-center gap-1 rounded-md h-[150px] text-center">
        <h3 className="text-lg font-bold tracking-tight">No Active Team</h3>
        <p className="text-sm text-slate-500">
          Team members will appear as soon as you create a team
        </p>
      </div>
    );
  }

  if (isLoading) {
    projectContent = (
      <CardContent className="flex items-center  rounded-md justify-center h-[150px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </CardContent>
    );
    teamContent = (
      <CardContent className="flex items-center  rounded-md justify-center h-[150px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </CardContent>
    );
  } else if (isSuccess) {
    const members = project.data.teamMembers;
    teamContent = members.map((member) => {
      return (
        <div key={member._id} className="flex items-center justify-between">
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
          <Badge variant="secondary">
            {user.email === member.email ? "Yourself" : "Member"}
          </Badge>
        </div>
      );
    });

    projectContent = (
      <>
        <div className=" flex items-center justify-between gap-2 mb-3">
          <div className="font-semibold ">Code: {project.data.projectCode}</div>
          <Badge>{getEventTypeByCode(project.data.projectType)}</Badge>
        </div>
        <Separator className="mb-3" />

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Created on</div>
            <div className="text-xs ">
              {format(project.data.createdAt, "PPP")}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Enrolled on</div>
            <div className="text-xs ">{project.data.event.eventCode}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Supervisor</div>
            <div className="font-semibold">
              <Badge variant="secondary">Not Assigned</Badge>
            </div>
          </div>
          <Separator className="my-2" />
          {project.data.event.proposal.defense && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Proposal Defense</div>
              <div className="font-semibold">
                <Badge variant="secondary">Not Graded</Badge>
              </div>
            </div>
          )}
          {project.data.event.mid.defense && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Mid Defense</div>
              <div className="font-semibold">
                <Badge variant="secondary">Not Graded</Badge>
              </div>
            </div>
          )}
          {project.data.event.final.defense && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Final Defense</div>
              <div className="font-semibold">
                <Badge variant="secondary">Not Graded</Badge>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Card className="col-span-4">
        <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
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
          <div className="flex gap-4">
            <Button size="sm" className="text-xs">
              Log Progress
              <BookmarkCheck className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            <div className="mt-4 col-span-4 lg:col-span-2 ">
              {projectContent}
            </div>

            <div className="grid gap-3 mt-4  col-span-4 lg:col-span-2">
              <div className="flex flex-col gap-3">
                <div className=" flex items-center justify-between gap-2">
                  <div className="font-semibold ">Team Members</div>
                  <Badge>{project.data.teamMembers.length}</Badge>
                </div>
                <Separator />
                {teamContent}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ProjectInfo;
