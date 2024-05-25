import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, Loader2, ShieldAlert } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { useCreateDefenseDataQuery } from "../adminApiSlice";
import {
  EVENT_TYPE,
  PROGRAM_CODE,
  PROGRESS_STATUS,
  ROLES_LIST,
  getEventTypeByCode,
  getProgramByCode,
} from "@/lib/config";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

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
        project.teamMembers[0].progressStatus ===
          PROGRESS_STATUS()[project.projectType].ELIGIBLE_FOR_FINAL_DEFENSE[1];
      }
    });
    return projects;
  } else {
    return [];
  }
};

function AdminNewDefense() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const { data: response, isLoading, isSuccess } = useCreateDefenseDataQuery();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const activeEvents = response?.data?.events || [];
  const evaluators = response?.data?.evaluators || [];
  let eligibaleProjects = [];

  const selectedDefenseType = watch("defenseType", "");
  const selectedEventId = watch("event", "");
  const selectedEvent = activeEvents.find(
    (event) => event._id == selectedEventId
  );

  let selectedEventDefenseDate = "";

  if (selectedEvent && selectedDefenseType) {
    console.log(selectedEvent);
    selectedEventDefenseDate =
      selectedEvent[selectedDefenseType].defenseDate || null;
  }

  eligibaleProjects = populateProjects(
    activeEvents,
    selectedDefenseType,
    selectedEventId
  );

  console.log(eligibaleProjects);

  let content;

  async function onSubmit(data) {
    console.log(data);
    // try {
    //   const year = new Date().getFullYear();
    //   const newEvent = {
    //     ...data,
    //     ...subEvent,
    //     year,
    //   };
    //   const res = await createEvent(newEvent);

    //   if (res.error) {
    //     setModal(false);
    //     throw new Error("Try Again");
    //   }
    //   if (!res.error) {
    //     setModal(false);
    //     navigate(`/${ROLES_LIST.admin}/events`);
    //     toast({
    //       title: "Event created successfully!",
    //       description: "Students can now enroll",
    //     });
    //   }
    // } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Something Went Wrong!!",
    //     description: error.message,
    //   });
    // }
  }
  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
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
            className="w-full md:w-[490px]  lg:w-[700px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card className=" mt-6">
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
                        {errors.eventType ? (
                          <span className="text-red-500">
                            {errors.eventType.message}
                          </span>
                        ) : (
                          <span>Event</span>
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
                                "w-full ",
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
                        {errors.eventTarget ? (
                          <span className="text-red-500">
                            {errors.eventTarget.message}
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
                                "w-full ",
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
                                  /* activeBorderColorhere is your component tokens */
                                  activeBorderColor: "gray",
                                  hoverBorderColor: "gray",
                                },
                              },

                              token: {
                                colorPrimary: "gray",
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
            </Card>
          </form>
        </div>
      </div>
    );
  }

  return content;
}

export default AdminNewDefense;
