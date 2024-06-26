import { Button } from "@/components/ui/button";
import { EVENT_STATUS, ROLES_LIST } from "@/lib/config";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllDefensesQuery } from "../adminApiSlice";
import { DefenseColumn } from "./DefenseColumn";
import {
  Activity,
  CalendarCheck2,
  CheckCheck,
  ChevronLeft,
  CirclePlus,
  Hammer,
  Loader2,
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

import { DataTable } from "./DefenseDataTable";
import { numberOfValues } from "@/lib/utils";
import { useRef } from "react";
import ApiError from "@/components/error/ApiError";

function AdminDefense() {
  const navigate = useNavigate();
  const tableRef = useRef();
  const {
    data: defenses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllDefensesQuery();

  let content;
  let numberOfActivedefenses,
    numberOfCompletedefenses,
    numberofArchivedDefenses,
    activedefenses,
    completedefenses,
    archivedefenses;

  if (defenses) {
    numberOfActivedefenses = numberOfValues(
      defenses?.data,
      "status",
      EVENT_STATUS.Active
    );

    numberOfCompletedefenses = numberOfValues(
      defenses?.data,
      "status",
      EVENT_STATUS.Complete
    );

    numberofArchivedDefenses = numberOfValues(
      defenses?.data,
      "status",
      EVENT_STATUS.Archive
    );
  }

  if (defenses) {
    activedefenses = defenses.data.filter(
      (event) => event.status === EVENT_STATUS.Active
    );

    completedefenses = defenses.data.filter(
      (event) => event.status === EVENT_STATUS.Complete
    );
    archivedefenses = defenses.data.filter(
      (event) => event.status === EVENT_STATUS.Archive
    );
  }

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    if (!defenses) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Defenses
            </h3>

            <p className="text-sm text-gray-500">
              You can start as soon as you create a Defense.
            </p>

            <Button className="mt-4" asChild>
              <Link to={`/${ROLES_LIST.admin}/defense/new`}>
                Create a Defense
              </Link>
            </Button>
          </div>
        </div>
      );
    } else {
      content = (
        <>
          <div className="text-xl font-semibold tracking-tight flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            Defense
          </div>
          <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hosted defenses
                </CardTitle>
                <CalendarCheck2 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{defenses.data.length}</div>
                <p className="text-xs text-gray-500 text-right">all defenses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Defenses
                </CardTitle>
                <Activity className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {numberOfActivedefenses}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  running defenses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Complete Defenses
                </CardTitle>
                <CheckCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {numberOfCompletedefenses}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  successful defenses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Archived Defenses
                </CardTitle>
                <CheckCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {numberofArchivedDefenses}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  terminated defenses
                </p>
              </CardContent>
            </Card>
          </div>
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
                    <span className="sr-only sm:not-sr-only">New Defense</span>
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
                  <DataTable
                    ref={tableRef}
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
                  <DataTable
                    ref={tableRef}
                    columns={DefenseColumn}
                    data={completedefenses}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="archive">
              <Card>
                <CardHeader>
                  <CardTitle>Archived Defenses</CardTitle>
                  <CardDescription>
                    All the achived defenses on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
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
                  <DataTable
                    ref={tableRef}
                    columns={DefenseColumn}
                    data={defenses.data}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      );
    }
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

export default AdminDefense;
