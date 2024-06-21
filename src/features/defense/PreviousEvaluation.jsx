import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCheck } from "lucide-react";
import { Timeline } from "antd";

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

function PreviousEvaluation({ project }) {
  const proposalEvaluations = project.data.proposal.evaluations || [];
  const midEvaluations = project.data.mid?.evaluations || [];
  const finalEvaluations = project.data.final.evaluations || [];

  const proposal = groupDefenses(proposalEvaluations);
  const mid = groupDefenses(midEvaluations);
  const final = groupDefenses(finalEvaluations);

  console.log(proposal);

  return (
    <Card className="xl:sticky top-32 grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-8 xl:col-span-4">
      <CardHeader className="flex flex-row rounded-t-md border-b py-4 bg-slate-100 justify-between items-center">
        <div>
          <CardTitle className="text-lg">Previous Evaluations</CardTitle>
          <CardDescription className="text-xs">
            Project evaluations from the previous defenses
          </CardDescription>
        </div>

        <BookCheck className="text-slate-500" />
      </CardHeader>
      <CardContent>
        <div>
          <div className="text-slate-700 font-semibold ">
            Porposal Evaluations
          </div>
          <div>
            <Timeline
              className="ml-4 my-4"
              items={proposal.map((proposalEval, index) => (
                <div key={index}>{proposalEval}</div>
              ))}
            />
          </div>
        </div>
        {project.data.event.mid.defense && (
          <div>
            <div className="text-slate-700 font-semibold ">
              Mid Term Evaluations
            </div>
            <div>
              <Timeline
                className="ml-4 my-4"
                items={[
                  {
                    color: "red",
                    children: (
                      <>
                        <p>Solve initial network problems 1</p>
                        <p>Solve initial network problems 2</p>
                        <p>Solve initial network problems 3 2015-09-01</p>
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        )}

        <div>
          <div className="text-slate-700 font-semibold ">Final Evaluations</div>
          <div>
            <Timeline
              className="ml-4 my-4"
              items={[
                {
                  color: "red",
                  children: (
                    <>
                      <p>Solve initial network problems 1</p>
                      <p>Solve initial network problems 2</p>
                      <p>Solve initial network problems 3 2015-09-01</p>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PreviousEvaluation;
