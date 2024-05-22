import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfigProvider, Steps } from "antd";
import {
  ArchiveRestore,
  BookCheck,
  CalendarClock,
  CalendarHeart,
  ExternalLink,
  FileText,
  Footprints,
  Loader2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import ProjectInfo from "./ProjectInfo";
import { useGetProjectQuery } from "../studentApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import UploadReport from "./UploadReport";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { daysFromToday } from "@/lib/utils";
import { Link } from "react-router-dom";
import { PROGRESS_STATUS, ROLES_LIST, getRankbyStatus } from "@/lib/config";
import StudentEventsTimeline from "../dashboard/StudentEventsTimeline";

const description = "This is a description.";

function StudentProject() {
  const user = useSelector(selectCurrentUser);

  const {
    data: project,
    isLoading,
    isSuccess,
  } = useGetProjectQuery(user.project, { skip: !user.isAssociated });

  let content;

  if (user.isAssociated === false) {
    content = (
      <div className="flex flex-1 items-center justify-center bg-slate-50 ">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Active Project
          </h3>

          <p className="text-sm text-gray-500">
            You can start as soon as you enroll in an event.
          </p>

          <Button className="mt-4" asChild>
            <Link to={`/${ROLES_LIST.student}/dashboard`}>Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    const rank = getRankbyStatus(user.progressStatus);

    content = (
      <main className="grid flex-1 items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
            <ProjectInfo
              user={user}
              project={project}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </div>

          <Card>
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
              <div>
                {project.data.event.proposal.defense && (
                  <div className="grid gap-6 mb-4">
                    <div className="flex  justify-between items-center">
                      <div className="text-md font-semibold">
                        Proposal Report
                      </div>

                      {project.data.proposal.report?.filePath ? (
                        <Badge variant="secondary">
                          Submitted on{" "}
                          {format(
                            project.data.proposal.report?.submittedOn,
                            "PPP"
                          )}
                        </Badge>
                      ) : (
                        <div className="text-xs font-semibold">
                          <Badge variant="secondary">
                            {`Deadline in 
                          ${daysFromToday(
                            project.data.event.proposal.reportDeadline
                          )}d`}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {project.data.proposal.report?.filePath ? (
                      <div className="w-full flex flex-col gap-2 items-center justify-center">
                        <Button variant="secondary" asChild>
                          <a
                            target="blank"
                            href={project.data.proposal.report?.filePath}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Proposal Report
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                        <div className="text-xs text-slate-500">
                          Submitted By{" "}
                          {project.data.proposal.report?.submittedBy}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-5">
                        <UploadReport
                          disabled={
                            PROGRESS_STATUS()[project.data.projectType]
                              .ELIGIBLE_FOR_PROPOSAL_REPORT_SUBMISSION[1] !==
                              user.progressStatus ||
                            daysFromToday(
                              project.data.event.proposal.reportDeadline
                            ) < 0
                          }
                        />
                        {PROGRESS_STATUS()[project.data.projectType]
                          .ELIGIBLE_FOR_PROPOSAL_REPORT_SUBMISSION[1] !==
                          user.progressStatus && (
                          <div className="mt-2 text-center text-xs text-slate-500">
                            Not Eligible
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <Separator className="my-6" />
              </div>
              <div className="mt-6">
                {project.data.event.mid.defense && (
                  <div className="grid gap-6 mb-4">
                    <div className="flex  justify-between items-center">
                      <div className="text-md font-semibold">Mid Report</div>

                      {project.data.mid.report?.filePath ? (
                        <Badge variant="secondary">
                          Submitted on{" "}
                          {format(project.data.mid.report?.submittedOn, "PPP")}
                        </Badge>
                      ) : (
                        <div className="text-xs font-semibold">
                          <Badge variant="secondary">
                            {`Deadline in 
                          ${daysFromToday(
                            project.data.event.mid.reportDeadline
                          )}d`}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {project.data.mid.report?.filePath ? (
                      <div className="w-full flex flex-col gap-2 items-center justify-center">
                        <Button variant="secondary" asChild>
                          <a
                            target="blank"
                            href={project.data.mid.report?.filePath}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Mid Report
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                        <div className="text-xs text-slate-500">
                          Submitted By {project.data.mid.report?.submittedBy}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-5">
                        <UploadReport
                          disabled={
                            PROGRESS_STATUS()[project.data.projectType]
                              .ELIGIBLE_FOR_MID_REPORT_SUBMISSION[1] !==
                              user.progressStatus ||
                            daysFromToday(
                              project.data.event.mid.reportDeadline
                            ) < 0
                          }
                        />
                        {PROGRESS_STATUS()[project.data.projectType]
                          .ELIGIBLE_FOR_MID_REPORT_SUBMISSION[1] !==
                          user.progressStatus && (
                          <div className="mt-2 text-center text-xs text-slate-500">
                            Not Eligible
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <Separator className="my-6" />
              </div>
              <div className="my-6">
                {project.data.event.final.defense && (
                  <div className="grid gap-6 mb-4">
                    <div className="flex  justify-between items-center">
                      <div className="text-md font-semibold">Final Report</div>

                      {project.data.final.report?.filePath ? (
                        <Badge variant="secondary">
                          Submitted on{" "}
                          {format(
                            project.data.final.report?.submittedOn,
                            "PPP"
                          )}
                        </Badge>
                      ) : (
                        <div className="text-xs font-semibold">
                          <Badge variant="secondary">
                            {`Deadline in 
                          ${daysFromToday(
                            project.data.event.final.reportDeadline
                          )}d`}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {project.data.final.report?.filePath ? (
                      <div className="w-full flex flex-col gap-2 items-center justify-center">
                        <Button variant="secondary" asChild>
                          <a
                            target="blank"
                            href={project.data.final.report?.filePath}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Final Report
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                        <div className="text-xs text-slate-500">
                          Submitted By {project.data.final.report?.submittedBy}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-5">
                        <UploadReport
                          disabled={
                            PROGRESS_STATUS()[project.data.projectType]
                              .ELIGIBLE_FOR_FINAL_REPORT_SUBMISSION[1] !==
                              user.progressStatus ||
                            daysFromToday(
                              project.data.event.final.reportDeadline
                            ) < 0
                          }
                        />
                        {PROGRESS_STATUS()[project.data.projectType]
                          .ELIGIBLE_FOR_FINAL_REPORT_SUBMISSION[1] !==
                          user.progressStatus && (
                          <div className="mt-2 text-center text-xs text-slate-500">
                            Not Eligible
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2 xl:col-span-1">
          <Card>
            <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
              <div>
                <CardTitle className="text-lg">Project Progress</CardTitle>

                <CardDescription className="text-xs">
                  Track the progress your project has made
                </CardDescription>
              </div>
              <Footprints className="text-slate-500" />
            </CardHeader>

            <CardContent className="text-sm px-12 mt-6">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "black",
                  },
                  components: {
                    Steps: {
                      dotSize: 10,
                      dotCurrentSize: 14,
                    },
                  },
                }}
              >
                {project.data.projectType == 0 && (
                  <Steps
                    progressDot
                    current={rank}
                    direction="vertical"
                    items={[
                      {
                        title: "Create a Team",
                        description:
                          rank === 0
                            ? "In Progress"
                            : rank < 0
                            ? "Next Step."
                            : "Completed.",
                      },
                      {
                        title: "Submit Proposal Report",
                        description:
                          rank === 1
                            ? "In Progress"
                            : rank < 1
                            ? "Next Step."
                            : "Submitted.",
                      },
                      {
                        title: "Proposal Defense",
                        description:
                          rank === 2
                            ? "In Progress"
                            : rank < 2
                            ? "Next Step."
                            : "Completed.",
                      },

                      {
                        title: "Submit Final Report",
                        description:
                          rank === 3
                            ? "In Progress"
                            : rank < 3
                            ? "Next Step."
                            : "Submitted.",
                      },
                      {
                        title: "Final Defense",
                        description:
                          rank === 4
                            ? "In Progress"
                            : rank < 4
                            ? "Next Step."
                            : "Completed.",
                      },
                    ]}
                  />
                )}
                {project.data.projectType > 0 && (
                  <Steps
                    progressDot
                    current={rank}
                    direction="vertical"
                    items={[
                      {
                        title: "Create a Team",
                        description:
                          rank === 0
                            ? "In Progress"
                            : rank < 0
                            ? "Next Step."
                            : "Completed.",
                      },
                      {
                        title: "Submit Proposal Report",
                        description:
                          rank === 1
                            ? "In Progress"
                            : rank < 1
                            ? "Next Step."
                            : "Submitted.",
                      },
                      {
                        title: "Proposal Defense",
                        description:
                          rank === 2
                            ? "In Progress"
                            : rank < 2
                            ? "Next Step."
                            : "Completed.",
                      },
                      {
                        title: "Supervisor Approval for Mid",
                        description:
                          rank === 3
                            ? "In Progress"
                            : rank < 3
                            ? "Next Step."
                            : "Approved.",
                      },
                      {
                        title: "Submit Mid Report",
                        description:
                          rank === 4
                            ? "In Progress"
                            : rank < 4
                            ? "Next Step."
                            : "Submitted.",
                      },
                      {
                        title: "Mid Defense",
                        description:
                          rank === 5
                            ? "In Progress"
                            : rank < 5
                            ? "Next Step."
                            : "Completed.",
                      },
                      {
                        title: "Supervisor Approval for Final",
                        description:
                          rank === 6
                            ? "In Progress"
                            : rank < 6
                            ? "Next Step."
                            : "Approved.",
                      },
                      {
                        title: "Submit Final Report",
                        description:
                          rank === 7
                            ? "In Progress"
                            : rank < 7
                            ? "Next Step."
                            : "Submitted.",
                      },
                      {
                        title: "Final Defense",
                        description:
                          rank === 8
                            ? "In Progress"
                            : rank < 8
                            ? "Next Step."
                            : "Completed.",
                      },
                    ]}
                  />
                )}
              </ConfigProvider>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row rounded-t-md border-b py-4 bg-slate-100 justify-between items-center">
              <div>
                <CardTitle className="text-lg">Defense Feedbaks</CardTitle>
                <CardDescription className="text-xs">
                  Feedbacks provided by the evaluators
                </CardDescription>
              </div>

              <BookCheck className="text-slate-500" />
            </CardHeader>
            <CardContent className="text-sm pt-6 max-h-[548px] overflow-x-scroll">
              No Feedbacks Available
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }
  return content;
}

export default StudentProject;
