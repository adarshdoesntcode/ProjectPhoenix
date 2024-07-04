import { useNavigate, useParams } from "react-router-dom";
import { useEventResultQuery } from "../../adminApiSlice";
import Loader from "@/components/Loader";
import ApiError from "@/components/error/ApiError";
import { Button } from "@/components/ui/button";
import { ChevronLeft, File } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEventStatusByCode, getEventTypeByCode } from "@/lib/config";
import { Progress } from "@/components/ui/progress";
import { useRef } from "react";
import { ResultColumn } from "./ResultColumn";
import { ResultDataTable } from "./ResultDataTable";

const getResult = (response) => {
  let proposalArray = [],
    midArray = [],
    finalArray = [];
  const p = response.data.projects.reduce((acc, project) => {
    project.proposal.evaluations.forEach((evaluation) => {
      if (
        evaluation.projectEvaluation.judgement === "00" ||
        evaluation.projectEvaluation.judgement === "01"
      ) {
        evaluation.individualEvaluation.forEach((individual) => {
          const projecteval = evaluation.projectEvaluation;
          acc.push({
            ...individual,
            ...projecteval,
          });
        });
      }
    });
    return acc;
  }, []);
  proposalArray = p;

  const m = response.data.projects.reduce((acc, project) => {
    project.mid.evaluations.forEach((evaluation) => {
      if (
        evaluation.projectEvaluation.judgement === "10" ||
        evaluation.projectEvaluation.judgement === "11" ||
        evaluation.projectEvaluation.judgement === "12"
      ) {
        evaluation.individualEvaluation.forEach((individual) => {
          const projecteval = evaluation.projectEvaluation;
          acc.push({
            ...individual,
            ...projecteval,
          });
        });
      }
    });
    return acc;
  }, []);
  midArray = m;

  const f = response.data.projects.reduce((acc, project) => {
    project.final.evaluations.forEach((evaluation) => {
      if (
        evaluation.projectEvaluation.judgement === "20" ||
        evaluation.projectEvaluation.judgement === "21"
      ) {
        evaluation.individualEvaluation.forEach((individual) => {
          const projecteval = evaluation.projectEvaluation;
          acc.push({
            ...individual,
            ...projecteval,
          });
        });
      }
    });
    return acc;
  }, []);
  finalArray = f;

  function groupEvaluations(evaluations) {
    return evaluations.reduce((acc, evaluation) => {
      if (evaluation.student && evaluation.student._id) {
        const studentId = evaluation.student._id;
        if (!acc[studentId]) {
          acc[studentId] = {
            student: evaluation.student,
            proposal: null,
            mid: null,
            final: null,
          };
        }
      }
      return acc;
    }, {});
  }

  const groupedEvaluations = groupEvaluations(proposalArray);

  proposalArray.forEach((proposal) => {
    if (proposal.student && proposal.student._id) {
      const studentId = proposal.student._id;
      if (groupedEvaluations[studentId]) {
        groupedEvaluations[studentId].proposal = proposal;
      } else {
        groupedEvaluations[studentId] = {
          student: proposal.student,
          proposal: proposal,
          mid: null,
          final: null,
        };
      }
    }
  });

  midArray.forEach((mid) => {
    if (mid.student && mid.student._id) {
      const studentId = mid.student._id;
      if (groupedEvaluations[studentId]) {
        groupedEvaluations[studentId].mid = mid;
      } else {
        groupedEvaluations[studentId] = {
          student: mid.student,
          proposal: null,
          mid: mid,
          final: null,
        };
      }
    }
  });

  finalArray.forEach((final) => {
    if (final.student && final.student._id) {
      const studentId = final.student._id;
      if (groupedEvaluations[studentId]) {
        groupedEvaluations[studentId].final = final;
      } else {
        groupedEvaluations[studentId] = {
          student: final.student,
          proposal: null,
          mid: null,
          final: final,
        };
      }
    }
  });

  const result = Object.values(groupedEvaluations);

  return result;
};

function countCompleteEvaluations(array) {
  return array.reduce((count, item) => {
    if (item.proposal !== null && item.mid !== null && item.final !== null) {
      return count + 1;
    }
    return count;
  }, 0);
}

function AdminEventResult() {
  const navigate = useNavigate();
  const { id } = useParams();
  const tableRef = useRef();

  const {
    data: response,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useEventResultQuery(id);

  let content, result, complete;
  console.log(response);

  if (response) {
    result = getResult(response);
    complete = countCompleteEvaluations(result);
  }

  console.log(result);
  console.log(complete);

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <div>
        <div className="text-xl font-semibold tracking-tight flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          Event Result
        </div>
        <Card className="max-w-full md:max-w-md mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between gap-4">
              <div className="text-xl">{response.data.eventCode}</div>
              <Button size="sm">Finish</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 mt-2 flex-col">
            <div className="text-sm flex items-center justify-between gap-4">
              <div className="text-slate-500 font-semibold">Event Status</div>
              <Badge variant="outline">
                {getEventStatusByCode(response.data.eventStatus)}
              </Badge>
            </div>
            <div className="text-sm flex items-center justify-between gap-4">
              <div className="text-slate-500 font-semibold">Evaluated</div>
              <div className="font-semibold">{result.length}</div>
            </div>
            <div className="text-sm flex mb-2 items-center justify-between gap-4">
              <div className="text-slate-500 font-semibold">Gradauted</div>
              <div className="font-semibold">{complete}</div>
            </div>
            <Progress value={(complete / result.length) * 100} />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between gap-4">
              <div>Evaluation Result</div>
              <Button
                size="sm"
                variant="outline"
                className=" h-10 gap-1 text-sm"
                onClick={() => tableRef.current?.exportCSV()}
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </CardTitle>
            <CardDescription className="text-xs">
              Aggregated marks of individual students enrolled in the event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex gap-2 items-center justify-end flex-wrap"></div>

              <div className="mt-2">
                <ResultDataTable
                  ref={tableRef}
                  data={result}
                  columns={ResultColumn}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else if (isError) {
    content = <ApiError error={error} />;
  }
  return content;
}

export default AdminEventResult;
