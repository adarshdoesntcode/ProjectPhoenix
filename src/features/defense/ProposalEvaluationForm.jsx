import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    title: "How is the Project Title and Abstract? (10%)",
    max: 10,
    min: 0,
    key: "projectTitleAndAbstract",
  },
  {
    title: "How is the Project? (40%)",
    max: 40,
    min: 0,
    key: "project",
  },
  {
    title: "Objective (5%)",
    max: 5,
    min: 0,
    key: "objective",
  },
  {
    title: "Team Work (10%)",
    max: 10,
    min: 0,
    key: "teamWork",
  },
  {
    title: "Documentation (25%)",
    max: 25,
    min: 0,
    key: "documentation",
  },
  {
    title: "Plagiarism %",
    max: 100,
    min: 0,
    key: "plagiarism",
  },
];

const projectEvaluationInitalState = {
  projectTitleAndAbstract: "",
  project: "",
  objective: "",
  teamWork: "",
  documentation: "",
  plagiarism: "",
  judgement: "",
  feedback: "",
  exceptional: false,
};

const projectAbsentInitalState = {
  projectTitleAndAbstract: "0",
  project: "0",
  objective: "0",
  teamWork: "0",
  documentation: "0",
  plagiarism: "0",
  judgement: "-1",
  feedback: "Absent",
  exceptional: false,
};

function ProposalEvaluationForm({ project }) {
  const user = useSelector(selectCurrentUser);
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

  const [studentEvaluation, setStudentEvaluation] = useState(
    studentEvaluationInitalState
  );

  const [projectEvaluation, setProjectEvaluation] = useState(
    projectEvaluationInitalState
  );
  const [projectPresent, setProjectPresent] = useState(false);
  const [hideMarks, setHideMarks] = useState(false);
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
  return (
    <Card className="mb-20">
      <CardHeader className="bg-slate-100 rounded-t-md border-b">
        <CardTitle className="text-xl flex gap-4 items-center justify-between">
          <div>Proposal Evaluation Form</div>
          <Button onClick={() => setHideMarks(!hideMarks)}>
            Marks
            {hideMarks ? (
              <Eye className="ml-1 w-4 h-4" />
            ) : (
              <EyeOff className="ml-1 w-4 h-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="pt-6 mb-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">Is the Team Present?</div>
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
                  <div className="text-xl mb-4 font-semibold">
                    Individual Marking
                  </div>
                  <Separator />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Members</TableHead>
                        <TableHead>Performance at Presentation (10%)</TableHead>
                        <TableHead className="text-center">Absent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {project.data.teamMembers.map((member) => {
                        return (
                          <TableRow key={member._id}>
                            <TableCell>
                              {member.fullname} ({member.rollNumber})
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder="0-10"
                                type={hideMarks ? "password" : "number"}
                                value={
                                  studentEvaluation.find(
                                    (evalu) => evalu.member === member._id
                                  ).performanceAtPresentation
                                }
                                onChange={(e) => {
                                  if (e.target.value < 0 || e.target.value > 10)
                                    return toast({
                                      title: "Out of Bounds !!!",
                                      description: "Must be between 0 and 10",
                                    });

                                  setStudentEvaluation((prev) =>
                                    prev.map((pre) => {
                                      if (pre.member === member._id) {
                                        return {
                                          ...pre,
                                          performanceAtPresentation:
                                            e.target.value,
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
                  <div className="text-xl mb-4 font-semibold">
                    Project Marking
                  </div>
                  <Separator />
                  <Table>
                    <TableBody>
                      {projectEvaluationConfig.map((config, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{config.title}</TableCell>
                            <TableCell>
                              <Input
                                placeholder={`${config.min}-${config.max}`}
                                type={hideMarks ? "password" : "number"}
                                value={projectEvaluation[config.key]}
                                onChange={(e) => {
                                  if (
                                    e.target.value < config.min ||
                                    e.target.value > config.max
                                  )
                                    return toast({
                                      title: "Out of Bounds !!!",
                                      description: `Must be between ${config.min} and ${config.max}`,
                                    });

                                  setProjectEvaluation((prev) => {
                                    return {
                                      ...prev,
                                      [config.key]: e.target.value,
                                    };
                                  });
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
                      <SelectItem value="0">Accepted</SelectItem>
                      <SelectItem value="1">Accepted Conditionally</SelectItem>
                      <SelectItem value="3">Re-Defense Required</SelectItem>
                      <SelectItem value="4">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
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
              <Button disabled={disabled}>Next</Button>
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
                <CardContent className="p-5 text-sm"></CardContent>
              </Card>
              <DialogFooter>
                <Button>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProposalEvaluationForm;
