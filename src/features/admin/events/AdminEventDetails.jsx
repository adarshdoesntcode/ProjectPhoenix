import { Button } from "@/components/ui/button";
import {
  EVENT_TYPE,
  PROGRESS_STATUS,
  ROLES_LIST,
  getEventTypeByCode,
} from "@/lib/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetEventQuery } from "../adminApiSlice";

import {
  Cctv,
  ChevronLeft,
  Clock,
  FileCheck,
  Handshake,
  Loader2,
  Tally1,
  Tally2,
  Tally3,
  Target,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { File } from "lucide-react";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "./ProjectDataColumn";
import { ProjectColumn } from "./ProjectColum";

function getTotalNumberOfAssociatedStudents(event) {
  if (event.data && Array.isArray(event.data.projects)) {
    let totalStudents = 0;
    event.data.projects.forEach((project) => {
      if (Array.isArray(project.teamMembers)) {
        totalStudents += project.teamMembers.length;
      }
    });
    return totalStudents;
  }
  return 0;
}
function getTotalTeamMembersWithProgressStatus(event, status) {
  let totalTeamMembers = 0;
  if (event.data && Array.isArray(event.data.projects)) {
    event.data.projects.forEach((project) => {
      if (Array.isArray(project.teamMembers)) {
        project.teamMembers.forEach((teamMember) => {
          if (teamMember.progressStatus == status.toString()) {
            totalTeamMembers++;
          }
        });
      }
    });
  }

  return totalTeamMembers;
}

function getProjectsWithProgressStatus(event, status) {
  let projects = [];

  if (event.data && Array.isArray(event.data.projects)) {
    event.data.projects.forEach((project) => {
      if (Array.isArray(project.teamMembers)) {
        const hasStatus = project.teamMembers.some(
          (teamMember) => teamMember.progressStatus == status.toString()
        );

        if (hasStatus) {
          projects.push(project);
        }
      }
    });
  }

  return projects;
}

function AdminEventDetails() {
  let { id } = useParams();
  const {
    data: event,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEventQuery(id);
  const navigate = useNavigate();

  const tableRef = useRef();

  let content;

  let associatedStudents,
    proposalTable,
    finalTable,
    midTable,
    eligibleForPrposal,
    eligibleForMid,
    eligibleForFinal;

  if (event) {
    associatedStudents = getTotalNumberOfAssociatedStudents(event);
    eligibleForPrposal = getTotalTeamMembersWithProgressStatus(
      event,
      PROGRESS_STATUS()[event.data.eventType].ELIGIBLE_FOR_PROPOSAL_DEFENSE[1]
    );

    eligibleForFinal = getTotalTeamMembersWithProgressStatus(
      event,
      PROGRESS_STATUS()[event.data.eventType].ELIGIBLE_FOR_FINAL_DEFENSE[1]
    );
    if (event.data.eventType > EVENT_TYPE.FIRST) {
      eligibleForMid = getTotalTeamMembersWithProgressStatus(
        event,
        PROGRESS_STATUS()[event.data.eventType].ELIGIBLE_FOR_MID_DEFENSE[1]
      );
    }
  }

  if (event) {
    proposalTable = getProjectsWithProgressStatus(
      event,
      PROGRESS_STATUS()[event.data.eventType].ELIGIBLE_FOR_PROPOSAL_DEFENSE[1]
    );
    if (event.data.eventType > EVENT_TYPE.FIRST) {
      midTable = getProjectsWithProgressStatus(
        event,
        PROGRESS_STATUS()[event.data.eventType].ELIGIBLE_FOR_MID_DEFENSE[1]
      );
    }

    finalTable = getProjectsWithProgressStatus(
      event,
      PROGRESS_STATUS()[event.data.eventType].ELIGIBLE_FOR_FINAL_DEFENSE[1]
    );
  }

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <>
        <div className="flex justify-between items-center gap-4 mb-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => navigate(`/${ROLES_LIST.admin}/events`)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="flex items-center whitespace-nowrap text-xl sm:grow-0">
              <span className="font-semibold ml-2">{event.data.eventCode}</span>
              <Badge className="ml-4">
                {getEventTypeByCode(event.data.eventType)}
              </Badge>
              {/* <HoverCard>
                <HoverCardTrigger asChild>
                  <Info className="text-slate-500 ml-4 w-5 h-5 cursor-pointer hidden sm:block hover:text-slate-950" />
                </HoverCardTrigger>
                <HoverCardContent></HoverCardContent>
              </HoverCard> */}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className=" h-10 gap-1 text-sm">
              <Clock className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Extend</span>
            </Button>
            <Button size="sm" variant="outline" className=" h-10 gap-1 text-sm">
              <Cctv className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Supervisor</span>
            </Button>
            <Button size="sm" className="h-10 gap-1 text-sm" asChild>
              <Link>
                <FileCheck className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Defense</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
          {event.data.eventType > EVENT_TYPE.FIRST && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Associated Students
                </CardTitle>
                <Handshake className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <span>{associatedStudents}</span> /
                  <span className="text-sm font-normal">
                    {event.eligibleStudentCountForEvent}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-right mb-2">
                  Associated / Targeted
                </p>
                <Progress
                  value={
                    (associatedStudents / event.eligibleStudentCountForEvent) *
                    100
                  }
                />
              </CardContent>
            </Card>
          )}

          {event.data.eventType === "0" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Targeted Students
                  </CardTitle>
                  <Target className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {event.eligibleStudentCountForEvent}
                  </div>
                  <p className="text-xs text-gray-500 text-right mb-2">
                    Targeted by the event
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Associated Students
                  </CardTitle>
                  <Handshake className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <span>{associatedStudents}</span> /
                    <span className="text-sm font-normal">
                      {event.eligibleStudentCountForEvent}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 text-right mb-2">
                    Associated / Targeted
                  </p>
                  <Progress
                    value={
                      (associatedStudents /
                        event.eligibleStudentCountForEvent) *
                      100
                    }
                  />
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Proposal Eligible
              </CardTitle>
              <Tally1 className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span>{eligibleForPrposal}</span> /
                <span className="text-sm font-normal">
                  {associatedStudents}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-right mb-2">
                Proposal / Associated
              </p>
              <Progress
                value={(eligibleForPrposal / associatedStudents) * 100}
              />
            </CardContent>
          </Card>
          {event.data.eventType > EVENT_TYPE.FIRST && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Mid Eligible
                </CardTitle>
                <Tally2 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <span>{eligibleForMid}</span> /
                  <span className="text-sm font-normal">
                    {associatedStudents}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-right mb-2">
                  Mid / Associated
                </p>
                <Progress value={(eligibleForMid / associatedStudents) * 100} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Final Eligible
              </CardTitle>
              {event.data.eventType > EVENT_TYPE.FIRST ? (
                <Tally3 className="h-4 w-4 text-gray-500" />
              ) : (
                <Tally2 className="h-4 w-4 text-gray-500" />
              )}
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                <span>{eligibleForFinal}</span> /
                <span className="text-sm font-normal">
                  {associatedStudents}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-right mb-2">
                Final / Associated
              </p>
              <Progress value={(eligibleForFinal / associatedStudents) * 100} />
            </CardContent>
          </Card>
        </div>
        <Tabs className="mt-4" defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="proposal">Proposal</TabsTrigger>
              {event.data.eventType != EVENT_TYPE.FIRST && (
                <TabsTrigger value="mid">Mid</TabsTrigger>
              )}

              <TabsTrigger value="final">Final</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="hidden sm:inline-flex h-10 gap-1 text-sm"
                onClick={() => tableRef.current?.exportCSV()}
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div>Enrolled Projects</div>
                  <div className="text-sm font-semibold text-slate-500">
                    {event.data.projects.length} project(s)
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  ref={tableRef}
                  columns={ProjectColumn}
                  data={event.data.projects}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="proposal">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div>Eligible for Proposal</div>
                  <div className="text-sm font-semibold text-slate-500">
                    {proposalTable.length} project(s)
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  ref={tableRef}
                  columns={ProjectColumn}
                  data={proposalTable}
                />
              </CardContent>
            </Card>
          </TabsContent>
          {event.data.eventType != EVENT_TYPE.FIRST && (
            <TabsContent value="mid">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div>Eligible for Mid</div>
                    <div className="text-sm font-semibold text-slate-500">
                      {midTable.length} project(s)
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={ProjectColumn}
                    data={midTable}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="final">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div>Eligible for Final</div>
                  <div className="text-sm font-semibold text-slate-500">
                    {finalTable.length} project(s)
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  ref={tableRef}
                  columns={ProjectColumn}
                  data={finalTable}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  } else if (isError) {
    content = (
      <div className="flex flex-1 items-center justify-center bg-slate-50 ">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Error Status {error.status} !!
          </h3>

          <p className="text-sm text-gray-500">{error.data.message}</p>

          <Button className="mt-4" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return content;
}

export default AdminEventDetails;
