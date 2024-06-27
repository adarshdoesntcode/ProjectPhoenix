import Loader from "@/components/Loader";
import {
  useGetAllSupervisorsQuery,
  useMatchProjectsMutation,
} from "../adminApiSlice";
import ApiError from "@/components/error/ApiError";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, UserX } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

function AssignSupervisor() {
  const {
    data: supervisors,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllSupervisorsQuery();
  const { id } = useParams();
  const [matchProject, { isLoading: isAssigning }] = useMatchProjectsMutation();

  let content, available;

  const [availableSupervisors, setAvailableSupervisors] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  console.log(availableSupervisors);

  useEffect(() => {
    if (supervisors) {
      const available = supervisors.data.filter(
        (supervisor) => supervisor.isAvailable === true
      );
      setAvailableSupervisors(available);
    }
  }, [supervisors]);

  const handleRemoveSupervisor = (id) => {
    const updatedSupervisors = availableSupervisors.filter(
      (supervisor) => supervisor._id !== id
    );
    setAvailableSupervisors(updatedSupervisors);
  };

  if (supervisors) {
    available = supervisors.data.filter(
      (supervisor) => supervisor.isAvailable === true
    );
  }

  const handleSubmit = async () => {
    try {
      const res = await matchProject({
        availableSupervisors,
        eventId: id,
      });

      if (res.error) {
        throw new Error("Could not assign projects");
      }
      if (!res.error) {
        setStep(2);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!!",
        description: error.message,
      });
    }
  };

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    if (!supervisors) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No Available Supervisors
            </h3>
            <p className="text-sm text-gray-500">
              Supervisors will appear as change their status to available
            </p>
          </div>
        </div>
      );
    } else {
      content = (
        <div>
          <div className="text-lg font-semibold tracking-tight flex items-center gap-4 mb-4 max-w-2xl mx-auto ">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            Assign Supervisors
          </div>
          {step === 1 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Available Supervisors</CardTitle>
                <CardDescription>
                  Select the supervisors to assign projects to
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-2">
                <Separator />
                {availableSupervisors.map((supervisor) => (
                  <React.Fragment key={supervisor._id}>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <div className="flex flex-row items-center gap-3">
                          <Avatar>
                            <AvatarImage src={supervisor.photo} />
                            <AvatarFallback className="bg-slate-200">
                              {getInitials(supervisor.fullname)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm text-slate-500">
                            <div className="text-slate-950 flex items-center font-medium ">
                              <span>{supervisor.fullname} </span>
                            </div>
                            <div className="text-xs">{supervisor.email}</div>
                          </div>
                        </div>
                      </div>

                      <UserX
                        onClick={() => handleRemoveSupervisor(supervisor._id)}
                        className="text-slate-500 hover:text-red-500 transition-all cursor-pointer w-5 h-5"
                      />
                    </div>
                    <Separator />
                  </React.Fragment>
                ))}
              </CardContent>
              <CardFooter>
                {isAssigning ? (
                  <Button variant="secondary" className="ml-auto" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assigning...
                  </Button>
                ) : (
                  <Button
                    className="ml-auto"
                    disabled={availableSupervisors.length === 0}
                    onClick={handleSubmit}
                  >
                    Assign
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
          {step === 2 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="flex  gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                  <CardTitle>Assigned Projects</CardTitle>
                  <CardDescription>
                    Projects assigned with their relevant supervisors
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="grid gap-2"></CardContent>
            </Card>
          )}
        </div>
      );
    }
  } else if (isError) {
    content = <ApiError error={error} />;
  }
  return content;
}

export default AssignSupervisor;
