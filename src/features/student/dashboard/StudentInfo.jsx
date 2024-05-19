import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectCurrentUser } from "@/features/auth/authSlice";

import { Boxes, FolderGit2, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetProjectQuery } from "../studentApiSlice";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getEventStatusByCode } from "@/lib/config";
import { Separator } from "@/components/ui/separator";

function StudentInfo() {
  const user = useSelector(selectCurrentUser);
  const {
    data: project,
    isLoading,
    isSuccess,
  } = useGetProjectQuery(user.project, { skip: !user.isAssociated });

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
          <div className="text-xs border rounded-full px-2 py-1">
            {user.email === member.email ? "You" : "Member"}
          </div>
        </div>
      );
    });

    projectContent = (
      <>
        <div className=" flex items-center justify-between gap-2 mb-3">
          <div className="font-semibold ">Code: {project.data.projectCode}</div>
          <Badge variant="secondary">
            {getEventStatusByCode(project.data.status)}
          </Badge>
        </div>
        <Separator className="mb-3" />

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Name</div>
            <div className="text-sm font-medium">
              {project.data.projectName}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Registered on</div>
            <div className="text-xs ">{project.data.event.eventCode}</div>
          </div>
          <Separator className="my-2" />
          {project.data.event.proposal.defense && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Proposal Defense</div>
              <div className="font-semibold">
                <Badge variant="outline">Not Graded</Badge>
              </div>
            </div>
          )}
          {project.data.event.mid.defense && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Mid Defense</div>
              <div className="font-semibold">
                <Badge variant="outline">Not Graded</Badge>
              </div>
            </div>
          )}
          {project.data.event.final.defense && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Final Defense</div>
              <div className="font-semibold">
                <Badge variant="outline">Not Graded</Badge>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Card className="lg:col-span-2 sm:col-span-4">
        <CardHeader className="flex flex-row bg-slate-50 rounded-t-md border-b py-4 justify-between items-center">
          <div className="grid gap-2">
            <CardTitle className="text-lg">Your Project</CardTitle>
            {!user.isAssociated && (
              <CardDescription>Details of you current project</CardDescription>
            )}
          </div>
          <FolderGit2 className="text-slate-500" />
        </CardHeader>
        <CardContent className="mt-4">{projectContent}</CardContent>
      </Card>
      <Card className="lg:col-span-2 sm:col-span-4 ">
        <CardHeader className="flex flex-row bg-slate-50 rounded-t-md border-b py-4 justify-between items-center">
          <div className="grid gap-2">
            <CardTitle className="text-lg">Your Team</CardTitle>
            {!user.isAssociated && (
              <CardDescription>Members of your current project</CardDescription>
            )}
          </div>

          <Boxes className="text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 mt-4">{teamContent}</div>
        </CardContent>
      </Card>
    </>
  );
}

export default StudentInfo;
