import { Button } from "@/components/ui/button";
import {
  EVENT_STATUS,
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
  PlusCircle,
  Tally1,
  Tally2,
  Tally3,
  Target,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { File } from "lucide-react";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "./ProjectDataTable";
import { ProjectColumn } from "./ProjectColum";
import { format } from "date-fns";
import { daysFromToday, formatDays } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DefenseColumn } from "./DefenseColumn";
import { DefenseDataTable } from "./DefenseDataTable";
import AdminExtendEvent from "./AdminExtendEvent";
import ApiError from "@/components/error/ApiError";
import Loader from "@/components/Loader";

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

  console.log(error);
  const navigate = useNavigate();

  const tableRef = useRef();

  let content;

  let associatedStudents,
    proposalTable,
    finalTable,
    midTable,
    eligibleForPrposal,
    eligibleForMid,
    activedefenses,
    completedefenses,
    archivedefenses,
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

    activedefenses = event.defenses.filter(
      (event) => event.status === EVENT_STATUS.Active
    );

    completedefenses = event.defenses.filter(
      (event) => event.status === EVENT_STATUS.Complete
    );
    archivedefenses = event.defenses.filter(
      (event) => event.status === EVENT_STATUS.Archive
    );
  }

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <>
        <Card className="mb-6">
          <CardHeader className="bg-slate-100 p-4">
            <CardTitle className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => navigate(`/${ROLES_LIST.admin}/events`)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h1 className="flex items-center whitespace-nowrap text-base md:text-xl sm:grow-0">
                  <span className="font-semibold ml-4">
                    {event.data.eventCode}
                  </span>
                  <Badge className="ml-4 ">
                    {getEventTypeByCode(event.data.eventType)}
                  </Badge>
                </h1>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <AdminExtendEvent event={event} />

                <Button size="sm" className="h-10 gap-1 text-sm" asChild>
                  <Link to={`/${ROLES_LIST.admin}/events/${id}/result`}>
                    <FileCheck className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Result</span>
                  </Link>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="grid grid-cols-3 gap-4 xl:gap-10  mt-4">
            {event.data.proposal.defense && (
              <div className="col-span-3 xl:col-span-1">
                <div className="font-medium">
                  Proposal (Phase {event.data.proposal.phase})
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      event.data.proposal.reportDeadline,
                      "PPP"
                    )} (${formatDays(
                      daysFromToday(event.data.proposal.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    event.data.proposal.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(event.data.proposal.defenseDate)
                  )})`}</div>
                </div>
              </div>
            )}

            {event.data.mid.defense && (
              <div className="col-span-3 xl:col-span-1">
                <div className="font-medium">
                  Mid Term (Phase {event.data.mid.phase})
                </div>
                <Separator className="my-2" />

                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      event.data.mid.reportDeadline,
                      "PPP"
                    )} (${formatDays(
                      daysFromToday(event.data.mid.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    event.data.mid.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(event.data.mid.defenseDate)
                  )})`}</div>
                </div>
              </div>
            )}
            {event.data.final.defense && (
              <div className="col-span-3 xl:col-span-1">
                <div className="font-medium">
                  Final (Phase {event.data.final.phase})
                </div>
                <Separator className="my-2" />

                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      event.data.final.reportDeadline,
                      "PPP"
                    )} (${formatDays(
                      daysFromToday(event.data.final.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    event.data.final.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(event.data.final.defenseDate)
                  )})`}</div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-end border-t py-4 justify-between">
            <div className="text-slate-500 text-xs">
              Hosted by {event.data.author.fullname}
            </div>
            <div className="hidden sm:block text-xs  text-slate-500">
              <time dateTime="2023-11-23">
                Created on {format(event.data.createdAt, "PPP")}
              </time>
            </div>
          </CardFooter>
        </Card>

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

          {event.data.eventType === EVENT_TYPE.FIRST && (
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
                  Mid Term Eligible
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
                className=" h-10 gap-1 text-sm"
                onClick={() => tableRef.current?.exportCSV()}
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
              {event.data.eventType > EVENT_TYPE.FIRST && (
                <Button size="sm" className=" h-10 gap-1 text-sm" asChild>
                  <Link to={`/${ROLES_LIST.admin}/events/${id}/supervisor`}>
                    <Cctv className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Supervisor</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>Enrolled Projects</div>
                  <div className="text-sm font-semibold text-slate-500">
                    {event.data.projects.length} project(s)
                  </div>
                </CardTitle>
                <CardDescription>
                  All active and complete projects
                </CardDescription>
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
              <CardHeader>
                <CardTitle className="flex items-center justify-between ">
                  <div>Eligible for Proposal</div>
                  <div className="text-sm font-semibold text-slate-500">
                    {proposalTable.length} project(s)
                  </div>
                </CardTitle>
                <CardDescription>
                  All active projects eligible for proposal defense
                </CardDescription>
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
                <CardHeader>
                  <CardTitle className="flex items-center justify-between ">
                    <div>Eligible for Mid</div>
                    <div className="text-sm font-semibold text-slate-500">
                      {midTable.length} project(s)
                    </div>
                  </CardTitle>
                  <CardDescription>
                    All active projects eligible for mid term
                  </CardDescription>
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
              <CardHeader>
                <CardTitle className="flex items-center justify-between ">
                  <div>Eligible for Final</div>
                  <div className="text-sm font-semibold text-slate-500">
                    {finalTable.length} project(s)
                  </div>
                </CardTitle>
                <CardDescription>
                  All active projects eligible for final defense
                </CardDescription>
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
        <Tabs className="mt-4" defaultValue="active">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="complete" className="hidden lg:inline-flex">
                Complete
              </TabsTrigger>
              <TabsTrigger value="archive" className="hidden lg:inline-flex">
                Archive
              </TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              {/* <Button
                size="sm"
                variant="outline"
                className=" h-10 gap-1 text-sm"
                onClick={() => tableRef.current?.exportCSV()}
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button> */}

              <Button size="sm" className="h-10 gap-1 text-sm" asChild>
                <Link
                  to={`/${ROLES_LIST.admin}/defense/new?id=${event.data._id}`}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Defense</span>
                </Link>
              </Button>
            </div>
          </div>
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Defenses</CardTitle>
                <CardDescription>
                  Currently active defenses on the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DefenseDataTable
                  columns={DefenseColumn}
                  data={activedefenses}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="complete">
            <Card>
              <CardHeader>
                <CardTitle>Complete Defenses</CardTitle>
                <CardDescription>
                  All the completed defenses on the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DefenseDataTable
                  columns={DefenseColumn}
                  data={completedefenses}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="archive">
            <Card>
              <CardHeader>
                <CardTitle>Archived defenses</CardTitle>
                <CardDescription>
                  All the achived defenses on the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DefenseDataTable
                  columns={DefenseColumn}
                  data={archivedefenses}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Defenses</CardTitle>
                <CardDescription>
                  All the defenses on the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DefenseDataTable
                  columns={DefenseColumn}
                  data={event.defenses}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

export default AdminEventDetails;
