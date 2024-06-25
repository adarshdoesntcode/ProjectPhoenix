import useRefreshUser from "@/hooks/useRefreshUser";
import { useForm } from "react-hook-form";
import {
  useCreateProjectMutation,
  useGetSelectionStudentsQuery,
} from "../studentApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

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
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const regex = /\((\d+)\)/;

function StudentCreateProject({ targetedEvent }) {
  const user = useSelector(selectCurrentUser);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([{ ...user }]);
  const [newMemberInput, setNewMemberInput] = useState(false);

  const {
    data: selectionStudents,
    isLoading,
    isSuccess,
  } = useGetSelectionStudentsQuery(undefined, {
    skip: !modal,
    refetchOnMountOrArgChange: 0.1,
  });
  const [createProject] = useCreateProjectMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const refreshUser = useRefreshUser();

  let content;
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

  content = (
    <>
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
                Project Description and Team Members cannot be changed after
              </DialogDescription>
            </DialogHeader>
            {isLoading ? (
              <div className="flex items-center  justify-center h-[200px]">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              isSuccess && (
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
                        className={errors.projectName ? "border-red-500" : ""}
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
                      <Label htmlFor="projectDescription">Select Members</Label>
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
                                  <div className="text-xs">{member.email}</div>
                                </div>
                              </div>
                            </div>
                            {user.email === member.email ? (
                              <Badge variant="secondary">Yourself</Badge>
                            ) : (
                              <UserX
                                onClick={() => handleRemoveMember(member.email)}
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
                                  <CommandEmpty>No Student found.</CommandEmpty>
                                  <CommandGroup>
                                    {selectionStudentsList.map((student) => {
                                      return (
                                        <CommandItem
                                          key={student.value}
                                          value={student.value}
                                          onSelect={(currentValue) => {
                                            const match =
                                              currentValue.match(regex);
                                            const roll = match[1];
                                            setSelectedMembers((prev) => {
                                              const find =
                                                selectionStudents.data.filter(
                                                  (student) =>
                                                    student.rollNumber == roll
                                                );

                                              return [...prev, find[0]];
                                            });
                                            setOpen(false);
                                            setNewMemberInput(false);
                                          }}
                                        >
                                          {student.label}
                                        </CommandItem>
                                      );
                                    })}
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
                        <span>Allowed range of team members is (2-5)</span>
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
              )
            )}
          </DialogContent>
        </Dialog>
      )}
      {user.isAssociated && (
        <Badge
          variant="outline"
          className="bg-white font-medium text-lg px-3 pr-2"
        >
          Enrolled
          <BadgeCheck className="w-5 h-5 ml-2" />
        </Badge>
      )}
    </>
  );

  return content;
}

export default StudentCreateProject;
