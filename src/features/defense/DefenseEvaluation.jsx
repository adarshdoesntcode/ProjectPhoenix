import { useNavigate, useParams } from "react-router-dom";
import { useGetDefenseProjectQuery } from "./defenseApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCheck,
  ChevronLeft,
  CloudFog,
  FileCheck,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

import { getEventTypeByCode, getProgramByCode } from "@/lib/config";
import DefenseStopwatch from "./DefenseStopwatch";
import ProposalEvaluationForm from "./ProposalEvaluationForm";
import MidEvaluationForm from "./MidEvaluationForm";
import FinalEvaluationForm from "./FinalEvaluationForm";
import PreviousEvaluation from "./PreviousEvaluation";

function checkDefenseId(defenseId, data) {
  const proposalIds =
    data.data.proposal?.defenses?.map((defense) => defense.defense) || [];
  const midIds =
    data.data.mid?.defenses?.map((defense) => defense.defense) || [];
  const finalIds =
    data.data.final.defenses?.map((defense) => defense.defense) || [];

  if (proposalIds.includes(defenseId)) {
    return 0;
  } else if (midIds.includes(defenseId)) {
    return 1;
  } else if (finalIds.includes(defenseId)) {
    return 2;
  } else {
    return -1;
  }
}

function hasEvaluatorEvaluated(defenses, defenseId, evaluatorId) {
  for (const defense of defenses) {
    if (defense.defense === defenseId) {
      for (const evaluator of defense.evaluators) {
        if (evaluator.evaluator === evaluatorId) {
          return evaluator.hasEvaluated;
        }
      }
    }
  }
  return false;
}

function DefenseEvaluation() {
  const user = useSelector(selectCurrentUser);
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: project, isLoading, isSuccess } = useGetDefenseProjectQuery(id);

  let defenseType,
    content,
    teamContent,
    projectContent,
    hasEvaluated = false;

  if (project) {
    defenseType = checkDefenseId(user.currentDefense, project);

    const defenseTypeString =
      defenseType === 0 ? "proposal" : defenseType === 1 ? "mid" : "final";

    hasEvaluated = hasEvaluatorEvaluated(
      project.data[defenseTypeString].defenses || [],
      user.currentDefense,
      user._id
    );
  }

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
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
          <Badge variant="secondary">{member.rollNumber}</Badge>
        </div>
      );
    });

    projectContent = (
      <>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Program</div>
            <div className="text-sm font-bold">
              {getProgramByCode(project.data.teamMembers[0].program.toString())}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Batch</div>
            <div className="text-sm">
              {project.data.teamMembers[0].batchNumber}
            </div>
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
              <div className="text-sm text-slate-500">Proposal Report</div>
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
              <div className="text-sm text-slate-500">Mid Term Report</div>
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
              <div className="text-sm text-slate-500">Final Report</div>
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
      </>
    );

    content = (
      <>
        <div className="sticky top-14 bg-slate-100/50 backdrop-filter backdrop-blur-lg z-50 min-[1500px]:px-16 flex items-center justify-between py-4 font-semibold">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block">Project Evaluation</div>
          </div>
          <DefenseStopwatch />
        </div>
        <div className="min-[1500px]:px-16 grid flex-1 items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-12 mt-1">
          <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
              <Card className="col-span-4">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 sm:gap-10  rounded-t-md border-b py-4 ">
                  <div className="flex  items-center gap-4  ">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-4 mb-1">
                        {project.data.projectName}
                        <Badge>
                          {getEventTypeByCode(project.data.projectType)}
                        </Badge>
                      </CardTitle>

                      <CardDescription className="text-xs">
                        {project.data.projectDescription
                          ? project.data.projectDescription
                          : "Details of you current project"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="font-semibold text-sm  md:text-lg px-4 "
                  >
                    {project.data.projectCode}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 md:gap-8">
                    <div className="mt-4 col-span-4 lg:col-span-2 ">
                      {projectContent}
                    </div>

                    <div className="grid gap-3 mt-4  col-span-4 lg:col-span-2">
                      <div className="flex flex-col gap-3">{teamContent}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {defenseType === 0 && !hasEvaluated && (
              <ProposalEvaluationForm
                project={project}
                defenseType={defenseType}
              />
            )}
            {defenseType === 1 && !hasEvaluated && (
              <MidEvaluationForm project={project} defenseType={defenseType} />
            )}
            {defenseType === 2 && !hasEvaluated && (
              <FinalEvaluationForm
                project={project}
                defenseType={defenseType}
              />
            )}

            {hasEvaluated && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Successfully Graded
                    <FileCheck className="h-8 w-8" />
                  </CardTitle>
                </CardHeader>
              </Card>
            )}
          </div>

          <PreviousEvaluation project={project} />
        </div>
      </>
    );
  }

  return content;
}

export default DefenseEvaluation;
