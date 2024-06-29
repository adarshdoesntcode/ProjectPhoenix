import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, BookCheck, Calendar, Clock, Timer } from "lucide-react";
import { Timeline } from "antd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

const proposalJudgementConfig = {
  "00": "Accepted",
  "01": "Accepted Conditionally",
  "02": "Re-Defense",
  "03": "Rejected",
  "-1": "Absent",
};

const midJudgementConfig = {
  10: "Progress Satisfactory",
  11: "Progress Seen",
  12: "Progress Not Satisfactory",
  "-1": "Absent",
};

const finalJudgementConfig = {
  20: "Accepted",
  21: "Accepted Conditionally",
  22: "Re-Demo",
  23: "Re-Defend",
  "-1": "Absent",
};

const groupDefenses = (data) => {
  const groupedByDefense = data.reduce((acc, evaluation) => {
    const defenseId = evaluation.defense;
    if (!acc[defenseId]) {
      acc[defenseId] = [];
    }
    acc[defenseId].push(evaluation);
    return acc;
  }, {});

  Object.keys(groupedByDefense).forEach((defenseId) => {
    groupedByDefense[defenseId].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  });

  const groupedAndSortedEvaluations = Object.values(groupedByDefense);

  return groupedAndSortedEvaluations;
};

function DefenseEvaluation({ project }) {
  const proposalEvaluations = project.data.proposal.evaluations || [];
  const midEvaluations = project.data.mid?.evaluations || [];
  const finalEvaluations = project.data.final.evaluations || [];

  const proposal = groupDefenses(proposalEvaluations);
  const mid = groupDefenses(midEvaluations);
  const final = groupDefenses(finalEvaluations);

  const proposalItems = proposal.map((proposalEval, index) => {
    const judgement = proposalEval[0].projectEvaluation.judgement;
    let color =
      judgement === "00" || judgement === "01" ? "#22c55e" : "#ef4444";

    return {
      color: color,
      children: (
        <Dialog>
          <DialogTrigger asChild>
            <Card key={index} className="cursor-pointer">
              <CardContent className="p-2">
                <div className="group flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-sm text-slate-700">
                      {proposalJudgementConfig[judgement]}
                    </div>
                    <div className="flex items-center text-xs">
                      <Calendar className="text-slate-500 w-4 h-4 mr-1" />
                      {format(proposalEval[0].createdAt, "PPP")}
                    </div>
                  </div>
                  <div>
                    <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Comments and Feedback</DialogTitle>
            </DialogHeader>

            <div className="text-slate-700 pt-4">
              <>
                {proposalEval.map((evaluation) => {
                  return (
                    <div
                      key={evaluation._id}
                      className="flex gap-2 flex-col mb-4"
                    >
                      <div className="flex items-center text-sm justify-between text-slate-700 font-semibold">
                        {evaluation.evaluator.fullname}

                        <span className="text-xs text-slate-500">
                          {evaluation.evaluator.designation},{" "}
                          {evaluation.evaluator.institution}
                        </span>
                      </div>
                      <div className="p-4 border rounded-md text-sm text-slate-600">
                        <div
                          className="no-tailwind"
                          dangerouslySetInnerHTML={{
                            __html: evaluation.projectEvaluation.feedback,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </DialogContent>
        </Dialog>
      ),
    };
  });

  const midItems = mid.map((midEval, index) => {
    const judgement = midEval[0].projectEvaluation.judgement;
    let color =
      judgement === "10" || judgement === "11" ? "#22c55e" : "#ef4444";

    return {
      color: color,
      children: (
        <Dialog>
          <DialogTrigger asChild>
            <Card key={index} className="cursor-pointer">
              <CardContent className="p-2">
                <div className="group flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-sm text-slate-700">
                      {midJudgementConfig[judgement]}
                    </div>
                    <div className="flex items-center text-xs">
                      <Calendar className="text-slate-500 w-4 h-4 mr-1" />
                      {format(midEval[0].createdAt, "PPP")}
                    </div>
                  </div>
                  <div>
                    <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Comments and Feedback</DialogTitle>
            </DialogHeader>

            <div className="text-slate-700 pt-4">
              <>
                {midEval.map((evaluation) => {
                  return (
                    <div
                      key={evaluation._id}
                      className="flex gap-2 flex-col mb-4"
                    >
                      <div className="flex items-center justify-between text-sm text-slate-700 font-semibold">
                        {evaluation.evaluator.fullname}

                        <span className="text-xs font-normal">
                          {evaluation.evaluator.designation},{" "}
                          {evaluation.evaluator.institution}
                        </span>
                      </div>
                      <div className="p-4 border rounded-md text-sm text-slate-600">
                        <div
                          className="no-tailwind"
                          dangerouslySetInnerHTML={{
                            __html: evaluation.projectEvaluation.feedback,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </DialogContent>
        </Dialog>
      ),
    };
  });

  const finalItems = final.map((finalEval, index) => {
    const judgement = finalEval[0].projectEvaluation.judgement;
    let color =
      judgement === "20" || judgement === "21" ? "#22c55e" : "#ef4444";

    return {
      color: color,
      children: (
        <Dialog>
          <DialogTrigger asChild>
            <Card key={index} className="cursor-pointer">
              <CardContent className="p-2">
                <div className="group flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-sm text-slate-700">
                      {finalJudgementConfig[judgement]}
                    </div>
                    <div className="flex items-center text-xs">
                      <Calendar className="text-slate-500 w-4 h-4 mr-1" />
                      {format(finalEval[0].createdAt, "PPP")}
                    </div>
                  </div>
                  <div>
                    <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Comments and Feedback</DialogTitle>
            </DialogHeader>

            <div className="text-slate-700 pt-4">
              <>
                {finalEval.map((evaluation) => {
                  return (
                    <div
                      key={evaluation._id}
                      className="flex gap-1 flex-col mb-4"
                    >
                      <div className="flex items-center text-sm justify-between text-slate-700 font-semibold">
                        {evaluation.evaluator.fullname}

                        <span className="text-xs font-normal">
                          {evaluation.evaluator.designation},{" "}
                          {evaluation.evaluator.institution}
                        </span>
                      </div>
                      <div className="p-4 border rounded-md text-sm text-slate-600">
                        <div
                          className="no-tailwind"
                          dangerouslySetInnerHTML={{
                            __html: evaluation.projectEvaluation.feedback,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </DialogContent>
        </Dialog>
      ),
    };
  });
  return (
    <Card>
      <CardHeader className="flex flex-row rounded-t-md border-b py-4 bg-slate-100 justify-between items-center">
        <div>
          <CardTitle className="text-lg">Defense Evaluations</CardTitle>
          <CardDescription className="text-xs">
            Project evaluations from defenses
          </CardDescription>
        </div>

        <BookCheck className="text-slate-500" />
      </CardHeader>
      <CardContent className="pt-4">
        <div>
          <div className="text-slate-700 font-semibold ">Proposal</div>
          <Separator className="my-2 mb-6" />

          <div>
            {proposal.length > 0 ? (
              <Timeline className="ml-4 my-4" items={proposalItems} />
            ) : (
              <div className="flex text-xs items-center justify-center p-4">
                No Evaluations
              </div>
            )}
          </div>
        </div>
        {project.data.event.mid.defense && (
          <div>
            <div className="text-slate-700 font-semibold ">Mid Term</div>
            <Separator className="my-2 mb-6" />

            <div>
              {mid.length > 0 ? (
                <Timeline className="ml-4 my-4" items={midItems} />
              ) : (
                <div className="flex text-xs items-center justify-center p-4">
                  No Evaluations
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <div className="text-slate-700 font-semibold ">Final</div>
          <Separator className="my-2 mb-6" />

          <div>
            {final.length > 0 ? (
              <Timeline className="ml-4 my-4" items={finalItems} />
            ) : (
              <div className="flex text-xs items-center justify-center p-4">
                No Evaluations
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DefenseEvaluation;
