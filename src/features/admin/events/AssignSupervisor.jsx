import Loader from "@/components/Loader";
import {
  useGetAllSupervisorsQuery,
  useMatchProjectsMutation,
  useSubmitMatchedProjectsMutation,
} from "../adminApiSlice";
import ApiError from "@/components/error/ApiError";
import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  ArrowDownUp,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Dot,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ROLES_LIST } from "@/lib/config";

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
  const [submitMatchedProjects, { isLoading: isSubmitting }] =
    useSubmitMatchedProjectsMutation();

  let content, available;

  const [availableSupervisors, setAvailableSupervisors] = useState([]);
  const [matchedProjects, setMatchedProjects] = useState([]);
  const [selectedToMove, setSelectedToMove] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [newSupervisor, setNewSupervisor] = useState("");
  const navigate = useNavigate();

  console.log(matchedProjects);
  useEffect(() => {
    if (supervisors) {
      const available = supervisors.data
        .map((supervisor) => {
          return {
            supervisor,
            selection: true,
          };
        })
        .filter((supervisor) => supervisor.supervisor.isAvailable === true);
      setAvailableSupervisors(available);
    }
  }, [supervisors]);

  const toggleDisable = (id) => {
    const updatedSupervisors = availableSupervisors.map((supervisor) => {
      if (supervisor.supervisor._id === id) {
        return {
          supervisor: supervisor.supervisor,
          selection: !supervisor.selection,
        };
      } else {
        return {
          ...supervisor,
        };
      }
    });
    setAvailableSupervisors(updatedSupervisors);
  };

  if (supervisors) {
    available = supervisors.data.filter(
      (supervisor) => supervisor.isAvailable === true
    );
  }

  const handleProjectReassignment = (project, newSupervisor) => {
    setMatchedProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((match) => {
        return {
          ...match,
          projects: match.projects.slice(),
        };
      });

      const projectOwnerIndex = updatedProjects.findIndex((match) =>
        match.projects.some((p) => p._id === project._id)
      );
      if (projectOwnerIndex !== -1) {
        updatedProjects[projectOwnerIndex].projects = updatedProjects[
          projectOwnerIndex
        ].projects.filter((p) => p._id !== project._id);
      }

      const newSupervisorIndex = updatedProjects.findIndex(
        (match) => match.supervisor._id === newSupervisor._id
      );
      if (newSupervisorIndex !== -1) {
        updatedProjects[newSupervisorIndex].projects = [
          ...updatedProjects[newSupervisorIndex].projects,
          project,
        ];
      } else {
        updatedProjects.push({
          supervisor: newSupervisor,
          projects: [project],
        });
      }

      return updatedProjects;
    });
    setOpen(false);
  };
  const handleSubmit = async () => {
    try {
      const res = await matchProject({
        availableSupervisors: availableSupervisors
          .filter((supervisor) => supervisor.selection === true)
          .map((supervisor) => supervisor.supervisor),
        eventId: id,
      });

      if (res.error) {
        throw new Error("Could not assign supervisors");
      }
      if (!res.error) {
        if (res.data) {
          setMatchedProjects(res.data.matches || []);
          setStep(2);
        } else {
          throw new Error("No projects to assign supervisor");
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!!",
        description: error.message,
      });
    }
  };
  const handleSubmitMatched = async () => {
    try {
      const res = await submitMatchedProjects({
        matchedProjects,
      });

      if (res.error) {
        throw new Error("Could not assign projects");
      }
      if (!res.error) {
        toast({
          title: "Supervisor Assigned",
          description: "Succesful",
        });
        navigate(`/${ROLES_LIST.admin}/events/${id}`);
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
          <div
            className={`text-lg font-semibold tracking-tight flex items-center gap-4 mb-4 ${
              step === 1 ? "max-w-2xl" : "max-w-4xl"
            } mx-auto`}
          >
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
                {availableSupervisors.map((supervisor, index) => (
                  <React.Fragment key={supervisor.supervisor._id}>
                    <div
                      className={`flex items-center justify-between
                        ${supervisor.selection ? "" : "grayscale"}
                        `}
                    >
                      <div className="flex">
                        <div className="flex flex-row items-center gap-3">
                          <div className="text-sm text-slate-500 px-2">
                            {index + 1}
                          </div>
                          <Avatar>
                            <AvatarImage src={supervisor.supervisor.photo} />
                            <AvatarFallback className="bg-slate-200">
                              {getInitials(supervisor.supervisor.fullname)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm text-slate-500">
                            <div className="text-slate-950 flex items-center font-medium ">
                              <span>{supervisor.supervisor.fullname} </span>
                            </div>
                            <div className="text-xs">
                              {supervisor.supervisor.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Checkbox
                        checked={supervisor.selection}
                        onCheckedChange={() =>
                          toggleDisable(supervisor.supervisor._id)
                        }
                        className="mx-2"
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
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="flex flex-row items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div>
                  <CardTitle className="text-xl">Assigned Projects</CardTitle>
                  <CardDescription className="text-xs">
                    Supervisors with their relavant projects
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="grid gap-2">
                {matchedProjects.length < 1 && (
                  <div className="h-24 flex items-center justify-center">
                    Nothing to show
                  </div>
                )}
                {matchedProjects.length > 0 &&
                  matchedProjects.map((match, index) => {
                    if (match.projects.length > 0)
                      return (
                        <Fragment key={index}>
                          <Separator />
                          <div className="flex flex-col items-start gap-1 justify-between">
                            <div className="text-sm mt-2">
                              <span className="font-medium text-lg">
                                {match.supervisor.fullname}
                              </span>
                              <span className="font-xs text-slate-500">
                                , {match.supervisor.designation}
                              </span>
                            </div>
                            <div>
                              {match.supervisor.skillSet.map((skill, index) => (
                                <Badge
                                  size="sm"
                                  variant=""
                                  className="mr-1 mb-1 font-normal"
                                  key={index}
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mb-6 mt-1 border rounded-md">
                            <Table>
                              <TableHeader className="bg-slate-50">
                                <TableRow>
                                  <TableHead className="hidden md:table-cell">
                                    SN
                                  </TableHead>
                                  <TableHead>Project Code</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead className="hidden md:table-cell">
                                    Categories
                                  </TableHead>
                                  <TableHead></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {match.projects.map((project, index) => {
                                  return (
                                    <TableRow key={project._id}>
                                      <TableCell className="text-slate-700 hidden md:table-cell">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell className="text-sm text-slate-500">
                                        {project.projectCode}
                                      </TableCell>
                                      <TableCell className="text-sm text-semibold">
                                        {project.projectName}
                                      </TableCell>
                                      <TableCell className="text-xs text-slate-500 hidden md:table-cell">
                                        {project.categories.map(
                                          (caetrgory, index) => (
                                            <Badge
                                              size="sm"
                                              variant="outline"
                                              className="mr-1 mb-1 font-normal"
                                              key={index}
                                            >
                                              {caetrgory}
                                            </Badge>
                                          )
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          size="icon"
                                          variant="secondary"
                                          className="text-xs h-8 w-8"
                                          onClick={() => {
                                            setSelectedToMove(project);
                                            setOpen(true);
                                          }}
                                        >
                                          <ArrowDownUp className="h-3 w-3" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        </Fragment>
                      );
                  })}
              </CardContent>
              <CardFooter>
                {isSubmitting ? (
                  <Button variant="secondary" className="ml-auto" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </Button>
                ) : (
                  <Button
                    className="ml-auto"
                    disabled={matchedProjects.length < 1}
                    onClick={handleSubmitMatched}
                  >
                    Submit
                    <CheckCheck className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{`Assign "${selectedToMove.projectName}" to`}</DialogTitle>
                <DialogDescription>
                  Select the supervisor you want to assign the project to
                </DialogDescription>
              </DialogHeader>

              {matchedProjects.map((match) => {
                return (
                  <React.Fragment key={match.supervisor._id}>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <div className="flex flex-row items-center gap-3">
                          <Avatar>
                            <AvatarImage src={match.supervisor.photo} />
                            <AvatarFallback className="bg-slate-200">
                              {getInitials(match.supervisor.fullname)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm text-slate-500">
                            <div className="text-slate-950 flex items-center font-medium ">
                              <span>{match.supervisor.fullname} </span>
                            </div>
                            <div className="text-xs">
                              {match.supervisor.email}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setNewSupervisor(match.supervisor);
                          handleProjectReassignment(
                            selectedToMove,
                            match.supervisor
                          );
                        }}
                      >
                        Select
                      </Button>
                    </div>
                  </React.Fragment>
                );
              })}
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  } else if (isError) {
    content = <ApiError error={error} />;
  }
  return content;
}

export default AssignSupervisor;
