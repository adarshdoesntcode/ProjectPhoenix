import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import QuillEditor from "./QuillEditor";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/use-toast";
import { useDefenseEvaluationMutation } from "./defenseApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES_LIST } from "@/lib/config";
import { ChevronRight, Loader2 } from "lucide-react";
import { getOrdinal } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function hasEmptyFields(obj) {
  for (const key in obj) {
    if (key === "feedback") return;
    if (obj[key] === "") {
      return true;
    }
  }
  return false;
}
function hasEmptyPerformanceAtPresentation(arr) {
  return arr.some((item) => item.performanceAtPresentation === "");
}

const projectEvaluationConfig = [
  {
    title: "Feedbacks Incorporated",
    max: 5,
    min: 0,
    key: "feedbackIncorporated",
  },
  {
    title: "Work Progress",
    max: 5,
    min: 0,
    key: "workProgress",
  },
  {
    title: "Documentation",
    max: 5,
    min: 0,
    key: "documentation",
  },
];

const judgementConfig = {
  10: "Progress Satisfactory",
  11: "Progress Seen",
  12: "Progress Not Satisfactory",
  "-1": "Absent",
};

const projectEvaluationInitalState = {
  feedbackIncorporated: "",
  workProgress: "",
  documentation: "",
  judgement: "",
  feedback: "<p>No Comments or Feedback</p>",
  outstanding: false,
};

const projectAbsentInitalState = {
  feedbackIncorporated: "0",
  workProgress: "0",
  documentation: "0",
  judgement: "-1",
  feedback: "<p>No Comments or Feedback</p>",
  outstanding: false,
};

const groupByDefenseId = (data) => {
  const grouped = data.reduce((acc, item) => {
    const defenseId = item.defense;
    if (!acc[defenseId]) {
      acc[defenseId] = [];
    }
    acc[defenseId].push(item);
    return acc;
  }, {});

  return Object.values(grouped);
};

function MidEvaluationForm({ project, defenseType, roomID }) {
  const user = useSelector(selectCurrentUser);
  const [defenseEvaluation, { isLoading }] = useDefenseEvaluationMutation();
  const navigate = useNavigate();
  const studentEvaluationInitalState = project.data.teamMembers.map(
    (member) => {
      return {
        member: member._id,
        performanceAtPresentation: "",
        absent: false,
      };
    }
  );

  const studenAbsentInitalState = project.data.teamMembers.map((member) => {
    return {
      member: member._id,
      performanceAtPresentation: "0",
      absent: true,
    };
  });

  let defenseTypeString = "";

  if (defenseType === 0) {
    defenseTypeString = "proposal";
  } else if (defenseType === 1) {
    defenseTypeString = "mid";
  } else {
    defenseTypeString = "final";
  }
  const evaluations = project.data[defenseTypeString].evaluations;
  const attempt = groupByDefenseId(evaluations).length + 1;

  const [studentEvaluation, setStudentEvaluation] = useState(
    studentEvaluationInitalState
  );

  const [projectEvaluation, setProjectEvaluation] = useState(
    projectEvaluationInitalState
  );
  const [projectPresent, setProjectPresent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectPresent]);

  const [modal, setModal] = useState(false);

  let disabled = true;

  if (!projectPresent) {
    disabled = false;
  } else if (hasEmptyFields(projectEvaluation)) {
    disabled = true;
  } else if (hasEmptyPerformanceAtPresentation(studentEvaluation)) {
    disabled = true;
  } else {
    disabled = false;
  }

  const onSubmit = async () => {
    let body;
    try {
      if (projectPresent) {
        body = {
          individualEvaluation: studentEvaluation,
          projectEvaluation,
          projectId: project.data._id,
          roomId: roomID,
          evaluatorId: user._id,
          defenseId: user.currentDefense,
          eventId: project.data.event._id,
          evaluationType: "mid",
        };
      } else {
        body = {
          individualEvaluation: studenAbsentInitalState,
          projectEvaluation: projectAbsentInitalState,
          projectId: project.data._id,
          roomId: roomID,
          evaluatorId: user._id,
          defenseId: user.currentDefense,
          eventId: project.data.event._id,
          evaluationType: "mid",
        };
      }

      const res = await defenseEvaluation(body);

      console.log(res);

      if (res.error) {
        if (res.error.status === 409) {
          throw new Error("Judgement Mismatch");
        }
      }
      if (!res.error) {
        toast({
          title: "Project Evaluation",
          description: "Successful",
        });
        navigate(`/${ROLES_LIST.defense}/dashboard`);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!!",
        description: error.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="bg-slate-100 rounded-t-md border-b">
        <CardTitle className="text-xl ">
          <div>
            <div>Mid Term Defense</div>
            <div className="text-sm text-slate-600 font-normal">
              {getOrdinal(attempt)} Attempt
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="pt-6 mb-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">Team Attendance</div>
              <Switch
                checked={projectPresent}
                onCheckedChange={(value) => {
                  setProjectPresent(value);
                }}
              />
            </div>
            <Separator className="my-6" />
            {projectPresent && (
              <div>
                <div className="max-w-2xl mx-auto">
                  <div className="text-slate-700 mb-4 font-semibold">
                    Individual Evaluation
                  </div>
                  <Separator />
                  <Table className="text-xs sm:text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Members</TableHead>
                        <TableHead className="text-center">
                          Presentation
                        </TableHead>
                        <TableHead className="text-center">Absent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {project.data.teamMembers.map((member) => {
                        return (
                          <TableRow
                            key={member._id}
                            className="hover:bg-inherit"
                          >
                            <TableCell className="font-semibold">
                              {member.fullname}
                            </TableCell>
                            <TableCell className="text-center">
                              <ToggleGroup
                                variant="outline"
                                type="single"
                                size="sm"
                                className="gap-1 sm:gap-2"
                                disabled={
                                  studentEvaluation.find(
                                    (evalu) => evalu.member === member._id
                                  ).absent
                                }
                                value={
                                  studentEvaluation.find(
                                    (evalu) => evalu.member === member._id
                                  ).performanceAtPresentation
                                }
                                onValueChange={(value) => {
                                  setStudentEvaluation((prev) =>
                                    prev.map((pre) => {
                                      if (pre.member === member._id) {
                                        return {
                                          ...pre,
                                          performanceAtPresentation: value,
                                        };
                                      } else {
                                        return {
                                          ...pre,
                                        };
                                      }
                                    })
                                  );
                                }}
                              >
                                <ToggleGroupItem value="1">1</ToggleGroupItem>
                                <ToggleGroupItem value="2">2</ToggleGroupItem>
                                <ToggleGroupItem value="3">3</ToggleGroupItem>
                                <ToggleGroupItem value="4">4</ToggleGroupItem>
                                <ToggleGroupItem value="5">5</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                value={
                                  studentEvaluation.find(
                                    (evalu) => evalu.member === member._id
                                  ).absent
                                }
                                onCheckedChange={(bol) => {
                                  setStudentEvaluation((prev) =>
                                    prev.map((pre) => {
                                      if (pre.member === member._id) {
                                        return {
                                          ...pre,
                                          absent: bol,
                                          performanceAtPresentation: bol
                                            ? "0"
                                            : "",
                                        };
                                      } else {
                                        return {
                                          ...pre,
                                        };
                                      }
                                    })
                                  );
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <Separator className="my-6" />
                <div className="max-w-2xl mx-auto">
                  <div className="text-slate-700 mb-4 font-semibold">
                    Project Evaluation
                  </div>
                  <Separator />
                  <Table>
                    <TableBody>
                      {projectEvaluationConfig.map((config, index) => {
                        return (
                          <TableRow key={index} className="hover:bg-inherit">
                            <TableCell>{config.title}</TableCell>
                            <TableCell className="text-center">
                              <ToggleGroup
                                variant="outline"
                                type="single"
                                size="sm"
                                className="gap-1 sm:gap-2"
                                value={projectEvaluation[config.key]}
                                onValueChange={(value) => {
                                  setProjectEvaluation((prev) => {
                                    return {
                                      ...prev,
                                      [config.key]: value,
                                    };
                                  });
                                }}
                              >
                                <ToggleGroupItem value="1">1</ToggleGroupItem>
                                <ToggleGroupItem value="2">2</ToggleGroupItem>
                                <ToggleGroupItem value="3">3</ToggleGroupItem>
                                <ToggleGroupItem value="4">4</ToggleGroupItem>
                                <ToggleGroupItem value="5">5</ToggleGroupItem>
                              </ToggleGroup>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <Separator className="my-6" />
                <div className="max-w-2xl mx-auto flex items-center justify-between gap-20">
                  <div className=" font-semibold">Judgement</div>

                  <Select
                    value={projectEvaluation.judgement}
                    onValueChange={(value) =>
                      setProjectEvaluation((prev) => {
                        return {
                          ...prev,
                          judgement: value,
                        };
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Progress Satisfactory</SelectItem>
                      <SelectItem value="11">Progress Seen</SelectItem>
                      <SelectItem value="12">
                        Progress Not Satisfactory
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-start gap-3 mt-6">
                  <Checkbox
                    value={projectEvaluation.outstanding}
                    onCheckedChange={(bol) =>
                      setProjectEvaluation((prev) => {
                        return {
                          ...prev,
                          outstanding: bol,
                        };
                      })
                    }
                  />
                  <div className="text-sm">
                    Mark Project as &apos;Outstanding&apos;
                  </div>
                </div>
                <Separator className="my-6" />
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Comments and Feedback
                    </CardTitle>
                    <CardDescription>
                      You can provide detailed comments and feedback, which will
                      be useful for the students, supervisor and future
                      evaluators.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <QuillEditor setProjectEvaluation={setProjectEvaluation} />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto flex items-center gap-4 justify-end">
          <div className="text-slate-500 text-xs">
            {projectPresent
              ? disabled
                ? "You have some evaluation fields empty"
                : ""
              : "Continue if the team is absent."}
          </div>
          <Dialog open={modal} onOpenChange={setModal}>
            <DialogTrigger asChild>
              <Button disabled={disabled}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Review Your Evaluation</DialogTitle>
                <DialogDescription>
                  Carefully review your evaluation before submitting, this
                  action cannot be reverted
                </DialogDescription>
              </DialogHeader>
              <Card className="max-h-[70vh] overflow-scroll">
                <CardContent className="p-5 text-sm">
                  <div className="flex justify-between">
                    <div className="font-semibold">
                      {project.data.projectName}
                    </div>
                    <div>{project.data.projectCode}</div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between ">
                    <div className="font-semibold text-slate-500">Members</div>
                    <div>Presentation</div>
                  </div>
                  <Separator className="my-2" />

                  <div>
                    {project.data.teamMembers.map((member) => {
                      return (
                        <div key={member._id} className="flex justify-between">
                          <div>{member.fullname}</div>
                          <div>
                            <div>
                              {projectPresent
                                ? studentEvaluation.find(
                                    (evalu) => evalu.member === member._id
                                  ).performanceAtPresentation
                                : studenAbsentInitalState.find(
                                    (evalu) => evalu.member === member._id
                                  ).performanceAtPresentation}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="my-2" />

                  <div>
                    <p className="font-semibold text-slate-500">
                      Project Evaluation
                    </p>
                    <Separator className="my-2" />
                    {projectEvaluationConfig.map((config, index) => {
                      return (
                        <div key={index} className="flex justify-between">
                          <div>{config.title}</div>
                          <div>
                            <div>
                              {projectPresent
                                ? projectEvaluation[config.key]
                                : projectAbsentInitalState[config.key]}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <div className="font-semibold text-slate-500">
                      Judgement
                    </div>
                    <div className="font-semibold">
                      {projectPresent
                        ? judgementConfig[projectEvaluation.judgement]
                        : judgementConfig[projectAbsentInitalState.judgement]}
                    </div>
                  </div>

                  <Separator className="my-2" />
                  <div>
                    <div className="font-semibold mb-2 text-slate-500">
                      Comments and Feedback
                    </div>
                    <div className="border rounded-lg p-4">
                      {projectPresent ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: projectEvaluation.feedback,
                          }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: projectAbsentInitalState.feedback,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between">
                    <div className="font-semibold text-slate-500">Examiner</div>
                    <div>{user.fullname}</div>
                  </div>
                </CardContent>
              </Card>
              <DialogFooter>
                {isLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting..
                  </Button>
                ) : (
                  <Button onClick={onSubmit}>Submit</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default MidEvaluationForm;
