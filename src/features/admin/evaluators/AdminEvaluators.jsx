import { Button } from "@/components/ui/button";
import { EVALUATOR_TYPE, EVENT_STATUS, ROLES_LIST } from "@/lib/config";
import { Link } from "react-router-dom";
import { useGetAllEvaluatorQuery } from "../adminApiSlice";
import { EvaluatorColumn } from "./EvaluatorColumn";
import {
  Activity,
  ArrowBigDown,
  ArrowBigUp,
  BookCheck,
  CalendarCheck2,
  CheckCheck,
  CirclePlus,
  Hammer,
  Handshake,
  Loader2,
  TestTubeDiagonalIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { File } from "lucide-react";

import { DataTable } from "./EvaluatorDataTable";
import { numberOfDevelopingProjects, numberOfValues } from "@/lib/utils";
import { useRef } from "react";

function AdminEvaluators() {
  const tableRef = useRef();
  const {
    data: evaluators,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllEvaluatorQuery();

  console.log(evaluators);

  let content;
  let numberOfActiveEvents,
    internalEvaluators,
    numberOfCompleteEvents,
    noOfDevelopingProjects,
    activeEvents,
    externalEvaluators,
    completeEvents,
    numberOfAssociatedEvaluators,
    numberOfInternalEvaluators,
    numberOfExternalEvaluators,
    archiveEvents;

  if (evaluators) {
    numberOfAssociatedEvaluators = numberOfValues(
      evaluators?.data,
      "isAssociated",
      true
    );

    numberOfInternalEvaluators = numberOfValues(
      evaluators?.data,
      "evaluatorType",
      EVALUATOR_TYPE.INTERNAL
    );

    numberOfExternalEvaluators = numberOfValues(
      evaluators?.data,
      "evaluatorType",
      EVALUATOR_TYPE.EXTERNAL
    );
  }

  if (evaluators) {
    internalEvaluators = evaluators.data.filter(
      (evaluator) => evaluator.evaluatorType == EVALUATOR_TYPE.INTERNAL
    );
    externalEvaluators = evaluators.data.filter(
      (evaluator) => evaluator.evaluatorType == EVALUATOR_TYPE.EXTERNAL
    );

    console.log(internalEvaluators, externalEvaluators);
  }

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    if (!evaluators) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Evaluators
            </h3>

            <p className="text-sm text-gray-500">
              You can start as soon as you add an evaluator.
            </p>

            <Button className="mt-4">
              {/* <Link to={`/${ROLES_LIST.admin}/events/new`}> */}
              Create an Event
              {/* </Link> */}
            </Button>
          </div>
        </div>
      );
    } else {
      content = (
        <>
          <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Evaluators
                </CardTitle>
                <BookCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {evaluators.data.length}
                </div>
                <p className="text-xs text-gray-500 text-right">total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Associated Evaluators
                </CardTitle>
                <Handshake className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <span>{numberOfAssociatedEvaluators}</span> /
                  <span className="text-sm font-normal">
                    {evaluators.data.length}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  associated / total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Internal Evaluators
                </CardTitle>
                <ArrowBigDown className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <span>{numberOfInternalEvaluators}</span> /
                  <span className="text-sm font-normal">
                    {evaluators.data.length}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  internal / total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  External Evaluators
                </CardTitle>
                <ArrowBigUp className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <span>{numberOfExternalEvaluators}</span> /
                  <span className="text-sm font-normal">
                    {evaluators.data.length}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  external / total
                </p>
              </CardContent>
            </Card>
          </div>
          <Tabs className="mt-4" defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="internal">Internal</TabsTrigger>
                <TabsTrigger value="external">External</TabsTrigger>
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
                <Button size="sm" className="h-10 gap-1 text-sm" asChild>
                  <Link to="new">
                    <CirclePlus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">
                      New Evaluator
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">All Evaluators</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={EvaluatorColumn}
                    data={evaluators.data}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="internal">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Internal Evaluators</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={EvaluatorColumn}
                    data={internalEvaluators}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="external">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">External Evaluators</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={EvaluatorColumn}
                    data={externalEvaluators}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      );
    }
  }

  return content;
}

export default AdminEvaluators;
