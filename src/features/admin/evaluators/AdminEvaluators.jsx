import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EVALUATOR_TYPE, ROLES_LIST } from "@/lib/config";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateEvaluatorMutation,
  useGetAllEvaluatorQuery,
} from "../adminApiSlice";
import { EvaluatorColumn } from "./EvaluatorColumn";
import {
  ArrowBigDown,
  ArrowBigUp,
  BookCheck,
  CirclePlus,
  Handshake,
  Loader2,
  File,
  ChevronLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./EvaluatorDataTable";
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

function AdminEvaluators() {
  const tableRef = useRef();
  const [createEvaluator] = useCreateEvaluatorMutation();
  const {
    data: evaluators,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllEvaluatorQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  let content;
  let internalEvaluators,
    externalEvaluators,
    numberOfInternalEvaluators,
    numberOfExternalEvaluators;

  const handleCreateEvaluator = async (data) => {
    try {
      const res = await createEvaluator(data);

      if (res.error) {
        throw new Error("Try Again");
      }
      if (!res.error) {
        setIsDialogOpen(false);
        reset();

        toast({
          title: "Event created successfully!",
          description: "Students can now enroll",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!!",
        description: error.message,
      });
    }
  };

  if (evaluators) {
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

            <AddEval
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              handleCreateEvaluator={handleCreateEvaluator}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              control={control}
              isSubmitting={isSubmitting}
            />
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
            Evaluators
          </div>
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
                  Internal Evaluators
                </CardTitle>
                <ArrowBigDown className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <span>{numberOfInternalEvaluators}</span> /{" "}
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
                  <span>{numberOfExternalEvaluators}</span> /{" "}
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
                <AddEval
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                  handleCreateEvaluator={handleCreateEvaluator}
                  handleSubmit={handleSubmit}
                  register={register}
                  errors={errors}
                  control={control}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Evaluators</CardTitle>
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
                <CardHeader>
                  <CardTitle>Internal Evaluators</CardTitle>
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
                <CardHeader>
                  <CardTitle>External Evaluators</CardTitle>
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
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

const AddEval = ({
  isDialogOpen,
  setIsDialogOpen,
  handleCreateEvaluator,
  handleSubmit,
  register,
  errors,
  control,
  isSubmitting,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-10 gap-1 text-sm">
          <CirclePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Add Evaluator</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Evaluator</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new evaluator.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateEvaluator)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="fullname"
                {...register("fullname", {
                  required: "Name is required",
                })}
                className="col-span-3"
              />
              {errors.fullname && (
                <p className="text-red-500 text-xs col-span-4">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
                className="col-span-3"
              />
              {errors.email && (
                <p className="text-red-500 text-xs col-span-4">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                {...register("contact", {
                  required: "Contact is required",
                })}
                className="col-span-3"
              />
              {errors.contact && (
                <p className="text-red-500 text-xs col-span-4">
                  {errors.contact.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation
              </Label>
              <Input
                id="designation"
                {...register("designation")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="institution" className="text-right">
                Institution
              </Label>
              <Input
                id="institution"
                {...register("institution")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="evaluatorType" className="text-right">
                Type
              </Label>
              <Controller
                name="evaluatorType"
                control={control}
                defaultValue={EVALUATOR_TYPE.INTERNAL}
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <RadioGroup
                    className="flex gap-4"
                    id="evaluatorType"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={EVALUATOR_TYPE.INTERNAL}
                        id="internal"
                      />
                      <Label htmlFor="internal">Internal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={EVALUATOR_TYPE.EXTERNAL}
                        id="external"
                      />
                      <Label htmlFor="external">External</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.type && (
                <p className="text-red-500 text-xs col-span-4">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            {isSubmitting ? (
              <Button variant="secondary" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ctreating..
              </Button>
            ) : (
              <Button type="submit">Create</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEvaluators;
