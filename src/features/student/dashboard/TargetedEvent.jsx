import { Button } from "@/components/ui/button";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ROLES_LIST,
  getEventStatusByCode,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import {
  ArrowUpRight,
  CalendarHeart,
  CirclePlus,
  Loader2,
  ShieldAlert,
  ChevronsUpDown,
  UserX,
  BadgeCheck,
} from "lucide-react";

import {
  useCreateProjectMutation,
  useGetSelectionStudentsQuery,
  useGetTargetedEventQuery,
} from "../studentApiSlice";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { daysFromToday, formatDays, getInitials } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import useRefreshUser from "@/hooks/useRefreshUser";

const regex = /\((\d+)\)/;

function TargetedEvent() {
  const user = useSelector(selectCurrentUser);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([{ ...user }]);
  const [newMemberInput, setNewMemberInput] = useState(false);
  const {
    data: targetedEvent,
    isLoading,
    isSuccess,
  } = useGetTargetedEventQuery(undefined, {
    forceRefetch: true,
  });
  const { data: selectionStudents } = useGetSelectionStudentsQuery(undefined, {
    skip: user.isAssociated,
    forceRefetch: true,
    refetchOnMountOrArgChange: 1,
  });
  const [createProject] = useCreateProjectMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const refreshUser = useRefreshUser();

  let targetedEventContent;
  let selectionStudentsList = [];

  async function onSubmit(data) {
    try {
      const teamMembers = selectedMembers.map((member) => member._id);
      const res = await createProject({
        projectName: data.projectName,
        teamMembers,
        projectDescription: data.projectDescription,
        eventId: targetedEvent.data._id,
      });

      if (res.error) {
        reset();
        setModal(false);
        throw new Error("Try Again");
      }
      if (!res.error) {
        await refreshUser();
        toast({
          title: "Team created successfully!",
          description: "You can now track your progress.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!!",
        description: error.message,
      });
    }
  }

  if (selectionStudents?.data?.length > 0) {
    selectionStudentsList = selectionStudents.data
      .filter(
        (member) =>
          !selectedMembers.some((selected) => selected.email === member.email)
      )
      .map((member) => ({
        value: member.rollNumber,
        label: `${member.fullname} (${member.rollNumber})`,
      }));
  }

  const handleRemoveMember = (email) => {
    setSelectedMembers(() =>
      selectedMembers.filter((member) => member.email != email)
    );
  };

  if (isLoading) {
    targetedEventContent = (
      <CardContent className="flex items-center border rounded-md justify-center h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </CardContent>
    );
  } else if (isSuccess) {
    if (targetedEvent) {
      targetedEventContent = (
        <Card>
          <CardHeader className="bg-slate-100">
            <CardTitle className="flex items-center justify-between gap-4">
              <div className="text-lg sm:text-2xl flex flex-col">
                <div className="text-xs text-gray-600">Your Event</div>
                <div className="flex  items-center gap-4">
                  <span>{targetedEvent.data.eventCode}</span>
                  <Badge className="hidden sm:block">
                    {getEventStatusByCode(targetedEvent.data.eventStatus)}
                  </Badge>
                </div>
              </div>
              <div>
                {!user.isAssociated && (
                  <Dialog open={modal} onOpenChange={setModal}>
                    <DialogTrigger asChild>
                      <Button>
                        Enroll
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Project</DialogTitle>
                        <DialogDescription>
                          Project Description and Team Members cannot be changed
                          after
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 p-2 max-h-[70vh] overflow-scroll">
                          <div className="grid gap-3">
                            <Label htmlFor="projectName">
                              {errors.projectName ? (
                                <span className="text-red-500">
                                  {errors.projectName.message}
                                </span>
                              ) : (
                                <span>Project Name</span>
                              )}
                            </Label>
                            <Input
                              id="projectName"
                              type="text"
                              {...register("projectName", {
                                required: "Project Name is required",
                              })}
                              className={
                                errors.projectName ? "border-red-500" : ""
                              }
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="projectDescription">
                              Project Description
                            </Label>
                            <Textarea
                              id="projectDescription"
                              placeholder="Describe your Project"
                              className="min-h-12"
                              {...register("projectDescription")}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="projectDescription">
                              Select Members
                            </Label>
                            {selectedMembers.map((member) => {
                              return (
                                <div
                                  key={member._id}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex">
                                    <div className="flex flex-row items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={member.photo} />
                                        <AvatarFallback className="bg-slate-200">
                                          {getInitials(member.fullname)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="text-sm text-slate-500">
                                        <div className="text-slate-950 font-medium">
                                          {member.fullname}
                                        </div>
                                        <div className="text-xs">
                                          {member.email}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {user.email === member.email ? (
                                    <Badge variant="secondary">Yourself</Badge>
                                  ) : (
                                    <UserX
                                      onClick={() =>
                                        handleRemoveMember(member.email)
                                      }
                                      className="text-slate-500 hover:text-slate-950 transition-all cursor-pointer w-5 h-5"
                                    />
                                  )}
                                </div>
                              );
                            })}
                            {newMemberInput && (
                              <div>
                                <Popover
                                  modal={true}
                                  open={open}
                                  onOpenChange={setOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <div className="flex justify-center">
                                      <Button
                                        variant="outline"
                                        type="button"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                      >
                                        Search Students...
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className=" p-0">
                                    <ScrollArea
                                      className="flex max-h-[200px] flex-col"
                                      type="always"
                                    >
                                      <Command>
                                        <CommandInput placeholder="Search Rollno..." />
                                        <CommandEmpty>
                                          No Student found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {selectionStudentsList.map(
                                            (student) => {
                                              return (
                                                <CommandItem
                                                  key={student.value}
                                                  value={student.value}
                                                  onSelect={(currentValue) => {
                                                    const match =
                                                      currentValue.match(regex);
                                                    const roll = match[1];
                                                    setSelectedMembers(
                                                      (prev) => {
                                                        const find =
                                                          selectionStudents.data.filter(
                                                            (student) =>
                                                              student.rollNumber ==
                                                              roll
                                                          );

                                                        return [
                                                          ...prev,
                                                          find[0],
                                                        ];
                                                      }
                                                    );
                                                    setOpen(false);
                                                    setNewMemberInput(false);
                                                  }}
                                                >
                                                  {student.label}
                                                </CommandItem>
                                              );
                                            }
                                          )}
                                        </CommandGroup>
                                      </Command>
                                    </ScrollArea>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            )}
                            <Button
                              variant="secondary"
                              type="button"
                              className="mt-2"
                              onClick={() => setNewMemberInput(true)}
                            >
                              <CirclePlus className="w-4 h-5 mr-2" />
                              Add Member
                            </Button>
                          </div>
                        </div>

                        <DialogFooter className="mt-4 flex items-center justify-end">
                          {selectedMembers.length >= 2 &&
                          selectedMembers.length <= 5 ? (
                            ""
                          ) : (
                            <p className="flex items-center gap-1 mr-2 text-xs text-slate-400">
                              <span>
                                <ShieldAlert className="w-4 h-4" />
                              </span>
                              <span>
                                Allowed range of team members is (2-5)
                              </span>
                            </p>
                          )}
                          {isSubmitting ? (
                            <Button variant="secondary" disabled>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </Button>
                          ) : (
                            <Button
                              disabled={
                                selectedMembers.length < 2 ||
                                selectedMembers.length > 5
                              }
                              type="submit"
                            >
                              Create Project
                            </Button>
                          )}
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}

                {user.isAssociated && (
                  <Badge
                    variant="outline"
                    className="bg-white font-medium text-lg px-3 pr-2"
                  >
                    Enrolled
                    <BadgeCheck className="w-5 h-5 ml-1" />
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="grid gap-2 mt-4">
            <div className="flex justify-between">
              <div className="text-xs sm:text-sm text-slate-500">Name</div>
              <div className="text-xs sm:text-sm">
                {targetedEvent.data.eventName}
              </div>
            </div>
            {targetedEvent.data.description && (
              <div className="hidden md:flex  justify-between">
                <div className="text-xs sm:text-sm text-slate-500">
                  Description
                </div>
                <div className="text-xs sm:text-sm">
                  {targetedEvent.data.description}
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <div className="text-xs sm:text-sm text-slate-500">
                Event Type
              </div>
              <div className="font-medium text-xs sm:text-sm">
                {getEventTypeByCode(targetedEvent.data.eventType)} PROJECT
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs sm:text-sm text-slate-500">
                Target Faculty
              </div>
              <div className="font-medium text-xs sm:text-sm">
                {getProgramByCode(targetedEvent.data.eventTarget)}
              </div>
            </div>

            <Separator className="my-2" />
            {targetedEvent.data.proposal.defense && (
              <>
                <div className="font-medium">
                  Proposal (Phase {targetedEvent.data.proposal.phase})
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      targetedEvent.data.proposal.reportDeadline,
                      "PPP"
                    )} (${formatDays(
                      daysFromToday(targetedEvent.data.proposal.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.proposal.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(targetedEvent.data.proposal.defenseDate)
                  )})`}</div>
                </div>
              </>
            )}
            {targetedEvent.data.mid.defense && (
              <>
                <Separator />
                <div className="font-medium">
                  Mid Term (Phase {targetedEvent.data.mid.phase})
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      targetedEvent.data.mid.reportDeadline,
                      "PPP"
                    )} (${formatDays(
                      daysFromToday(targetedEvent.data.mid.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.mid.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(targetedEvent.data.mid.defenseDate)
                  )})`}</div>
                </div>
              </>
            )}
            {targetedEvent.data.final.defense && (
              <>
                <Separator />
                <div className="font-medium">
                  Final (Phase {targetedEvent.data.final.phase})
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Report Submission
                  </div>
                  <div className="text-xs sm:text-sm">
                    {`${format(
                      targetedEvent.data.final.reportDeadline,
                      "PPP"
                    )} (${formatDays(
                      daysFromToday(targetedEvent.data.final.reportDeadline)
                    )})`}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs sm:text-sm text-slate-500">
                    Defense Deadline
                  </div>
                  <div className="text-xs sm:text-sm">{`${format(
                    targetedEvent.data.final.defenseDate,
                    "PPP"
                  )} (${formatDays(
                    daysFromToday(targetedEvent.data.final.defenseDate)
                  )})`}</div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex items-end border-t py-4 justify-between">
            <div className="text-slate-500 text-xs">
              Hosted by {targetedEvent.data.author.fullname}
            </div>
            <div className="hidden sm:block text-xs  text-slate-500">
              <time dateTime="2023-11-23">
                Created on {format(targetedEvent.data.createdAt, "PPP")}
              </time>
            </div>
          </CardFooter>
        </Card>
      );
    } else {
      targetedEventContent = (
        <div className="flex flex-col items-center justify-center gap-1 border rounded-md h-[300px] text-center">
          <h3 className="text-xl font-bold tracking-tight">
            You have no event
          </h3>
          <p className="text-smtext-muted-foreground">
            You can create a project as soon as an event is targeted to you.
          </p>
        </div>
      );
    }
  }
  return (
    <Card>
      {!targetedEvent && (
        <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
          <div>
            <CardTitle className="text-xl">Your Event</CardTitle>

            <CardDescription className="text-xs">
              Event targated to you in the college
            </CardDescription>
          </div>
          <CalendarHeart className="text-slate-500" />
        </CardHeader>
      )}

      <CardContent className="px-0 sm:px-6 sm:pb-6 pb-0 mt-0 sm:mt-6">
        {targetedEventContent}
      </CardContent>
    </Card>
  );
}

export default TargetedEvent;
