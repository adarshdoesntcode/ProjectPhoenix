import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EVALUATOR_TYPE, ROLES_LIST } from "@/lib/config";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateEvaluatorMutation,
  useGetAllEvaluatorQuery,
  useGetAllSupervisorsQuery,
} from "../adminApiSlice";

import {
  ArrowBigDown,
  ArrowBigUp,
  BookCheck,
  CirclePlus,
  Handshake,
  Loader2,
  File,
  ChevronLeft,
  Cctv,
  Dot,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { numberOfValues } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ApiError from "@/components/error/ApiError";
import Loader from "@/components/Loader";
import { DataTable } from "./SupervisorDataTable";
import { SupervisorColumn } from "./SupervisorColumn";

function AdminSupervisors() {
  const tableRef = useRef();

  const {
    data: supervisors,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllSupervisorsQuery();

  const navigate = useNavigate();

  let content;
  let available, unavailable;

  if (supervisors) {
    available = supervisors.data.filter(
      (supervisor) => supervisor.isAvailable === true
    );

    unavailable = supervisors.data.filter(
      (supervisor) => supervisor.isAvailable === false
    );
  }

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    if (!supervisors) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No Supervisors
            </h3>
            <p className="text-sm text-gray-500">
              Supervisors will appear as they sign up
            </p>
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
            Supervisors
          </div>
          <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Supervisors
                </CardTitle>
                <Cctv className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {supervisors.data.length}
                </div>
                <p className="text-xs text-gray-500 text-right">total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Available Supervisors
                </CardTitle>
                <Dot strokeWidth={8} className="text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <span>{available.length}</span> /{" "}
                  <span className="text-sm font-normal">
                    {supervisors.data.length}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  available / total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Unavailable Supervisors
                </CardTitle>
                <Dot strokeWidth={8} className="text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <span>{unavailable.length}</span> /{" "}
                  <span className="text-sm font-normal">
                    {supervisors.data.length}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-right">
                  unavailable / total
                </p>
              </CardContent>
            </Card>
          </div>
          <Tabs className="mt-4" defaultValue="available">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="unavailable">Unavailable</TabsTrigger>
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
              </div>
            </div>
            <TabsContent value="available">
              <Card>
                <CardHeader>
                  <CardTitle>Available Supervisors</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={SupervisorColumn}
                    data={available}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="unavailable">
              <Card>
                <CardHeader>
                  <CardTitle>Unavailable Supervisors</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={SupervisorColumn}
                    data={unavailable}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Supervisors</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={SupervisorColumn}
                    data={supervisors.data}
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

export default AdminSupervisors;
