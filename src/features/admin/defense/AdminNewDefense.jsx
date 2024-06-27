import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfigProvider, TimePicker } from "antd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowBigDown,
  ChevronsUpDown,
  CloudFog,
  PlusCircle,
  Trash,
  UserX,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn, getInitials } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, Loader2 } from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import {
  useCreateDefenseDataQuery,
  useCreateDefenseMutation,
} from "../adminApiSlice";
import {
  EVENT_TYPE,
  PROGRESS_STATUS,
  ROLES_LIST,
  getEvaluatorTypeByCode,
} from "@/lib/config";
import { toast } from "@/components/ui/use-toast";
import { Fragment, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const populateProjects = (
  activeEvents,
  selectedDefenseType,
  selectedEventId
) => {
  if (activeEvents && selectedDefenseType && selectedEventId) {
    const event = activeEvents.find((event) => event._id == selectedEventId);
    const projects = event.projects.filter((project) => {
      if (selectedDefenseType === "proposal") {
        return (
          project.teamMembers[0].progressStatus ===
          PROGRESS_STATUS()[project.projectType]
            .ELIGIBLE_FOR_PROPOSAL_DEFENSE[1]
        );
      } else if (selectedDefenseType === "mid") {
        if (project.projectType > EVENT_TYPE.FIRST) {
          return (
            project.teamMembers[0].progressStatus ===
            PROGRESS_STATUS()[project.projectType].ELIGIBLE_FOR_MID_DEFENSE[1]
          );
        }
      } else if (selectedDefenseType === "final") {
        return (
          project.teamMembers[0].progressStatus ===
          PROGRESS_STATUS()[project.projectType].ELIGIBLE_FOR_FINAL_DEFENSE[1]
        );
      }
    });
    return projects;
  } else {
    return [];
  }
};

const populateRooms = (rooms, projects) => {
  if (rooms.length === 0) return [];

  if (projects.length === 0) return rooms;

  const shuffledProjects = projects.sort(() => Math.random() - 0.5);

  const updatedRooms = rooms.map((room) => ({ ...room, projects: [] }));

  shuffledProjects.forEach((project, index) => {
    const roomIndex = index % updatedRooms.length;
    updatedRooms[roomIndex].projects.push(project);
  });

  return updatedRooms;
};

const newRoomInitialState = {
  block: "",
  roomNumber: "",
  evaluators: [],
  projects: [],
};

function AdminNewDefense() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [newEvaluatorInput, setNewEvaluatorInput] = useState(false);
  const [newRoom, setNewRoom] = useState(newRoomInitialState);
  const [open, setOpen] = useState(false);
  const [isPopulateProject, setISPopulateProject] = useState(false);

  const { data: response, isLoading, isSuccess } = useCreateDefenseDataQuery();
  const [createDefense] = useCreateDefenseMutation();
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const id = searchParams.get("id");

  const activeEvents = response?.data?.events || [];
  let evaluators = response?.data?.evaluators || [];

  if (response?.data?.evaluators?.length > 0) {
    evaluators = response.data.evaluators
      .filter(
        (evaluator) =>
          !rooms.some((room) =>
            room.evaluators.some(
              (selectedEval) => selectedEval._id === evaluator._id
            )
          )
      )
      .filter(
        (evaluator) =>
          !newRoom.evaluators.some(
            (selectedEval) => selectedEval._id === evaluator._id
          )
      )

      .map((evaluator) => ({
        value: evaluator,
        label: evaluator.fullname,
      }));
  }

  let eligibaleProjects = [];

  const selectedDefenseType = watch("defenseType");

  const selectedEventId = watch("event");

  const selectedEvent = activeEvents.find(
    (event) => event._id == selectedEventId
  );

  let selectedEventDefenseDate = "";

  if (selectedEvent && selectedDefenseType) {
    selectedEventDefenseDate =
      selectedEvent[selectedDefenseType].defenseDate || null;
  }

  eligibaleProjects = populateProjects(
    activeEvents,
    selectedDefenseType,
    selectedEventId
  );

  let content;

  const handleRemoveEvaluator = (id) => {
    if (!id) return;
    setNewRoom((prev) => {
      return {
        ...prev,
        evaluators: prev.evaluators.filter((evaluator) => evaluator._id !== id),
      };
    });
  };

  const handleRemoveRoom = (room) => {
    if (!room) return;
    setRooms((prev) => prev.filter((r) => r.room !== room));
    setISPopulateProject(false);
  };

  const handleAddNewRoom = () => {
    if (
      !newRoom.block ||
      !newRoom.roomNumber ||
      newRoom.evaluators.length === 0
    ) {
      return toast({
        variant: "destructive",
        title: "Field(s) Empty",
        description: "Fill all the fields before adding room",
      });
    }
    const BlockandRoom = newRoom.block + newRoom.roomNumber;
    if (rooms.some((room) => room.room === BlockandRoom)) {
      return toast({
        variant: "destructive",
        title: "Room Already Exists",
        description: "Change room number or block",
      });
    }

    setRooms((prev) => {
      return [
        ...prev,
        {
          room: BlockandRoom,
          evaluators: newRoom.evaluators,
          projects: [],
        },
      ];
    });
    setNewRoom(newRoomInitialState);
    setNewEvaluatorInput(false);
    setISPopulateProject(false);
  };

  const handlePopulateRoom = () => {
    const newRoomState = populateRooms(rooms, eligibaleProjects);
    setRooms(newRoomState);
  };

  async function onSubmit(data) {
    try {
      const newDefense = {
        eventId: data.event,
        defenseTime: data.defenseTime.$d,
        defenseType: data.defenseType,
        defenseDate: selectedEventDefenseDate,
        rooms: rooms,
      };
      const res = await createDefense(newDefense);

      if (res.error) {
        if (res.error.status === 409) {
          throw new Error("This defense is currently active");
        } else {
          throw new Error("Try Again");
        }
      }
      if (!res.error) {
        if (id) {
          navigate(`/${ROLES_LIST.admin}/events/${id}`);
        } else {
          navigate(`/${ROLES_LIST.admin}/defense`);
        }
        toast({
          title: "Defense created successfully!",
          description: "Projects will be evaluated",
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
  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600 bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="flex items-center flex-col px-4 ">
        <div className="  mx-auto">
          <div className="flex items-center gap-4 mt-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create a Defense
            </h1>
          </div>
          <form
            className="w-full md:w-[490px]  lg:w-[700px] mb-60"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card className="my-4">
              <CardHeader>
                <CardTitle>Defense Details</CardTitle>
                <CardDescription>
                  Enter the defense details to create a new defense event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="eventType">
                        {errors.event ? (
                          <span className="text-red-500">
                            {errors.event.message}
                          </span>
                        ) : (
                          <span>For Event</span>
                        )}
                      </Label>

                      <Controller
                        control={control}
                        name="event"
                        rules={{ required: "Event is required" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            className={errors.event ? "border-red-500" : ""}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                !field.value && "text-slate-500"
                              )}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {activeEvents.map((event) => (
                                <SelectItem key={event._id} value={event._id}>
                                  {event.eventCode}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="eventTarget">
                        {errors.defenseType ? (
                          <span className="text-red-500">
                            {errors.defenseType.message}
                          </span>
                        ) : (
                          <span>Defense Type</span>
                        )}
                      </Label>
                      <Controller
                        control={control}
                        name="defenseType"
                        rules={{ required: "Defense Type  is required" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            className={
                              errors.defenseType ? "border-red-500" : ""
                            }
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                !field.value && "text-slate-500"
                              )}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="proposal">Proposal</SelectItem>
                              {selectedEvent?.eventType > EVENT_TYPE.FIRST && (
                                <SelectItem value="mid">Mid Term</SelectItem>
                              )}

                              <SelectItem value="final">Final</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="defenseDate">Defense Date</Label>

                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedEventDefenseDate && "text-slate-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedEventDefenseDate ? (
                          format(selectedEventDefenseDate, "PPP")
                        ) : (
                          <span>Defense Time</span>
                        )}
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="defenseTime">
                        {errors.defenseTime ? (
                          <span className="text-red-500">
                            {errors.defenseTime.message}
                          </span>
                        ) : (
                          <span>Defense Time</span>
                        )}
                      </Label>
                      <Controller
                        control={control}
                        name="defenseTime"
                        rules={{ required: "Defense Time  is required" }}
                        render={({ field }) => (
                          <ConfigProvider
                            theme={{
                              components: {
                                DatePicker: {
                                  activeBorderColor: "#94a3b8",
                                  hoverBorderColor: "#94a3b8",
                                },
                              },
                              token: {
                                colorPrimary: "#94a3b8",
                              },
                            }}
                          >
                            <TimePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </ConfigProvider>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center gap-6 border-t p-4">
                <div className="text-slate-500 font-medium text-sm">
                  Eligible Projects
                </div>
                <div className="text-slate-500 ">
                  <Badge variant="outline">{eligibaleProjects.length} </Badge>
                </div>
              </CardFooter>
            </Card>
            {eligibaleProjects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Defense Rooms</CardTitle>
                  <CardDescription>
                    Allocate rooms with their evaluators to populate with
                    projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    {rooms.length > 0 && (
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rooms</TableHead>
                          <TableHead>Evaluators</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                    )}

                    <TableBody>
                      {rooms.map((room, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-semibold">
                              {room.room}
                            </TableCell>
                            <TableCell>
                              {room.evaluators
                                .map((evaluator) => evaluator.fullname)
                                .join(", ")}
                            </TableCell>
                            <TableCell>
                              <Trash
                                onClick={() => handleRemoveRoom(room.room)}
                                className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-950 ml-auto"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
                {newEvaluatorInput && (
                  <Card className=" m-4 mt-0">
                    <CardHeader className="py-4 mb-6 bg-slate-50 border-b">
                      <CardTitle className="text-lg">New Room</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:px-8">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="block">Block</Label>
                          <Input
                            value={newRoom.block}
                            onChange={(e) =>
                              setNewRoom((prev) => {
                                return {
                                  ...prev,
                                  block: e.target.value.toUpperCase(),
                                };
                              })
                            }
                            id="block"
                            type="text"
                            placeholder="A, B, C.."
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="roomNumber">Room Number</Label>
                          <Input
                            value={newRoom.roomNumber}
                            onChange={(e) =>
                              setNewRoom((prev) => {
                                return {
                                  ...prev,
                                  roomNumber: e.target.value,
                                };
                              })
                            }
                            id="roomNumber"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="text-sm font-medium">Evaluators </div>
                      {newRoom.evaluators.map((evaluator) => {
                        return (
                          <div
                            key={evaluator._id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex">
                              <div className="flex flex-row items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={evaluator.photo} />
                                  <AvatarFallback className="bg-slate-200">
                                    {getInitials(evaluator.fullname)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="text-sm text-slate-500">
                                  <div className="text-slate-950 flex items-center font-medium ">
                                    <span>{evaluator.fullname} </span>
                                    <Badge
                                      variant="outline"
                                      className="text-xs font-normal tracking-wide px-2 ml-3"
                                    >
                                      {getEvaluatorTypeByCode(
                                        evaluator.evaluatorType
                                      )}
                                    </Badge>
                                  </div>
                                  <div className="text-xs">
                                    {evaluator.email}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <UserX
                              onClick={() =>
                                handleRemoveEvaluator(evaluator._id)
                              }
                              className="text-slate-500 hover:text-slate-950 transition-all cursor-pointer w-5 h-5"
                            />
                          </div>
                        );
                      })}

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
                                Search Evaluators...
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
                                <CommandInput placeholder="Search Name..." />
                                <CommandEmpty>
                                  No Evaluators found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {evaluators.map((evaluator) => {
                                    return (
                                      <CommandItem
                                        key={evaluator.value._id}
                                        value={evaluator.label}
                                        onSelect={() => {
                                          setNewRoom((prev) => {
                                            return {
                                              ...prev,
                                              evaluators: [
                                                ...prev.evaluators,
                                                evaluator.value,
                                              ],
                                            };
                                          });
                                          setOpen(false);
                                        }}
                                      >
                                        {evaluator.label}
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </Command>
                            </ScrollArea>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setNewEvaluatorInput(false);
                            setNewRoom(newRoomInitialState);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="button" onClick={handleAddNewRoom}>
                          Add Room
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <CardFooter className="justify-center border-t p-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    className="gap-1"
                    onClick={() => setNewEvaluatorInput(true)}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Room
                  </Button>
                </CardFooter>
              </Card>
            )}
            {rooms.length > 0 && (
              <div className="my-4 flex justify-center">
                {rooms.length > 0 && (
                  <Button
                    type="button"
                    onClick={() => {
                      handlePopulateRoom();
                      setISPopulateProject(true);
                    }}
                  >
                    Populate Rooms <ArrowBigDown className="h-5 w-5 ml-2" />
                  </Button>
                )}
              </div>
            )}
            {isPopulateProject && (
              <Card>
                <CardHeader>
                  <CardTitle>Populated Rooms</CardTitle>
                  <CardDescription>
                    Review the room, evaluators and projects before creating
                    defense
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {rooms.map((room) => {
                    return (
                      <Fragment key={room.room}>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{room.room}</span>

                          <span className="text-slate-900 text-sm">
                            {room.evaluators
                              .map((evaluator) => evaluator.fullname)
                              .join(", ")}
                          </span>
                        </div>
                        <div className="mb-6 mt-1 border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>SN</TableHead>
                                <TableHead>Project Code</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Members</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {room.projects.map((project, index) => {
                                return (
                                  <TableRow key={project._id}>
                                    <TableCell className="text-slate-700">
                                      {index + 1}
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-500">
                                      {project.projectCode}
                                    </TableCell>
                                    <TableCell className="text-sm text-semibold">
                                      {project.projectName}
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500">
                                      {project.teamMembers
                                        .map(
                                          (members) =>
                                            `${members.fullname}(${members.rollNumber})`
                                        )
                                        .join(", ")}
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
                <CardFooter className="flex justify-end">
                  {isSubmitting ? (
                    <Button variant="secondary" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </Button>
                  ) : (
                    <Button type="submit">Create Defense</Button>
                  )}
                </CardFooter>
              </Card>
            )}
          </form>
        </div>
      </div>
    );
  }

  return content;
}

export default AdminNewDefense;
