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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn, daysFromToday, newEventDateMatcher } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, Loader2, ShieldAlert } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { useCreateEventMutation } from "../adminApiSlice";
import { EVENT_TYPE, PROGRAM_CODE } from "@/lib/config";

const initalState = {
  proposal: {
    defense: false,
    reportDeadline: undefined,
    defenseDate: undefined,
  },
  mid: { defense: false, reportDeadline: undefined, defenseDate: undefined },
  final: {
    defense: false,
    reportDeadline: undefined,
    defenseDate: undefined,
  },
};

const checkKeyDown = (e) => {
  if (e.key === "Enter") e.preventDefault();
};

function AdminNewEvent() {
  const navigate = useNavigate();
  const [subEvent, setSubEvent] = useState(initalState);
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const [modal, setModal] = useState(false);
  const submitRef = useRef(null);

  const {
    handleSubmit,
    register,
    setError,
    reset,
    control,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const triggerSubmit = () => {
    if (subEvent.mid.defense) {
      if (!subEvent.mid.reportDeadline || !subEvent.mid.defenseDate) {
        setError("noMidDates", {
          type: "custom",
          message: "Fill out the dates",
        });
      }
    }
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const {
    proposalReportMatcher,
    propoalDefensetMatcher,
    midReportMatcher,
    midDefenseMatcher,
    finalReportMatcher,
    finalDefenseMatcher,
  } = newEventDateMatcher(subEvent);

  async function onSubmit(data) {
    try {
      const year = new Date().getFullYear();
      const newEvent = {
        ...data,
        ...subEvent,
        year,
      };

      await createEvent(newEvent);
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
            Create a new event
          </h1>
        </div>
        <form
          className="w-full md:w-[490px]  lg:w-[700px]"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <Card className=" mt-6">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Enter the event details to create a new project event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="eventName">
                    {errors.eventName ? (
                      <span className="text-red-500">
                        {errors.eventName.message}
                      </span>
                    ) : (
                      <span>Event Name</span>
                    )}
                  </Label>
                  <Input
                    id="eventName"
                    type="text"
                    {...register("eventName", {
                      required: "Event Name is required",
                    })}
                  />
                </div>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="eventType">
                      {errors.eventType ? (
                        <span className="text-red-500">
                          {errors.eventType.message}
                        </span>
                      ) : (
                        <span>Event Type</span>
                      )}
                    </Label>

                    <Controller
                      control={control}
                      name="eventType"
                      rules={{ required: "Event Type is required" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full text-gray-500">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={EVENT_TYPE.FIRST}>
                              First Project (1 credit)
                            </SelectItem>
                            <SelectItem value={EVENT_TYPE.MINOR}>
                              Minor Project (2 credit)
                            </SelectItem>
                            <SelectItem value={EVENT_TYPE.MAJOR}>
                              Major Project (4/5 credit)
                            </SelectItem>
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
                        <span>Event Target</span>
                      )}
                    </Label>
                    <Controller
                      control={control}
                      name="eventTarget"
                      rules={{ required: "Event Target is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          className={errors.eventName ? "border-red-500" : ""}
                        >
                          <SelectTrigger className="w-full  text-gray-500">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={PROGRAM_CODE.ALL}>
                              All
                            </SelectItem>
                            <SelectItem value={PROGRAM_CODE.BESE}>
                              Software Engineering
                            </SelectItem>
                            <SelectItem value={PROGRAM_CODE.BECE}>
                              Computer Engineering
                            </SelectItem>
                            <SelectItem value={PROGRAM_CODE.BEELX}>
                              Electrical Engineering
                            </SelectItem>
                            <SelectItem value={PROGRAM_CODE.BEIT}>
                              Information Technology
                            </SelectItem>
                            <SelectItem value={PROGRAM_CODE.BCA}>
                              Computer Application
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Description [Optional]"
                    className="min-h-20"
                    {...register("description")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* =============================PROPOSAL=================================== */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <h1>Proposal Defense</h1>
                  <Switch
                    checked={subEvent.proposal.defense}
                    onCheckedChange={(checked) =>
                      setSubEvent({
                        ...subEvent,
                        proposal: { defense: checked },
                      })
                    }
                  />
                </div>
              </CardTitle>
              <CardDescription>
                Toggle the switch to create this defense
              </CardDescription>
            </CardHeader>
            {subEvent.proposal.defense && (
              <CardContent>
                <div className="grid gap-3  grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="report submission">
                      {errors.proposalDefenseDate ? (
                        <span className="text-red-500">
                          {errors.proposalDefenseDate.message}
                        </span>
                      ) : (
                        <span>Report Submission Deadline</span>
                      )}
                    </Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            "text-slate-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {subEvent.proposal.reportDeadline ? (
                            format(subEvent.proposal.reportDeadline, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={subEvent.proposal.reportDeadline}
                          disabled={proposalReportMatcher}
                          onSelect={(date) => {
                            if (
                              subEvent.proposal.defenseDate &&
                              date > subEvent.proposal.defenseDate
                            ) {
                              setError("proposalDefenseDate", {
                                type: "custom",
                                message:
                                  "Report Submission should come before Defense",
                              });
                              return;
                            }

                            clearErrors("proposalDefenseDate");
                            setSubEvent({
                              ...subEvent,
                              proposal: {
                                ...subEvent.proposal,
                                reportDeadline: date,
                              },
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="defense date">Defense Date</Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            "text-slate-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {subEvent.proposal.defenseDate ? (
                            format(subEvent.proposal.defenseDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={subEvent.proposal.defenseDate}
                          disabled={propoalDefensetMatcher}
                          onSelect={(date) => {
                            setSubEvent({
                              ...subEvent,
                              proposal: {
                                ...subEvent.proposal,
                                defenseDate: date,
                              },
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
          {/* =============================MID=================================== */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <h1>Mid Defense</h1>
                  <Switch
                    checked={subEvent.mid.defense}
                    onCheckedChange={(checked) =>
                      setSubEvent({
                        ...subEvent,
                        mid: { defense: checked },
                      })
                    }
                  />
                </div>
              </CardTitle>
              <CardDescription>
                {errors.noMidDates ? (
                  <span className="text-red-500">
                    {errors.noMidDates.message}
                  </span>
                ) : (
                  "Toggle the switch to create this defense"
                )}
              </CardDescription>
            </CardHeader>
            {subEvent.mid.defense && (
              <CardContent>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="report submission">
                      {errors.midDefenseDate ? (
                        <span className="text-red-500">
                          {errors.midDefenseDate.message}
                        </span>
                      ) : (
                        <span>Report Submission Deadline</span>
                      )}
                    </Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            "text-slate-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {subEvent.mid.reportDeadline ? (
                            format(subEvent.mid.reportDeadline, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={subEvent.mid.reportDeadline}
                          disabled={midReportMatcher}
                          onSelect={(date) => {
                            if (
                              subEvent.mid.defenseDate &&
                              date > subEvent.mid.defenseDate
                            ) {
                              setError("midDefenseDate", {
                                type: "custom",
                                message:
                                  "Report Submission should come before Defense",
                              });
                              return;
                            }

                            clearErrors("noMidDates");
                            clearErrors("midDefenseDate");
                            setSubEvent({
                              ...subEvent,
                              mid: {
                                ...subEvent.mid,
                                reportDeadline: date,
                              },
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="defense date">Defense Date</Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            "text-slate-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {subEvent.mid.defenseDate ? (
                            format(subEvent.mid.defenseDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={subEvent.mid.defenseDate}
                          disabled={midDefenseMatcher}
                          onSelect={(date) => {
                            clearErrors("noMidDates");
                            clearErrors("midDefenseDate");
                            setSubEvent({
                              ...subEvent,
                              mid: {
                                ...subEvent.mid,
                                defenseDate: date,
                              },
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
          {/* =============================FINAL=================================== */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <h1>Final Defense</h1>
                  <Switch
                    checked={subEvent.final.defense}
                    onCheckedChange={(checked) =>
                      setSubEvent({
                        ...subEvent,
                        final: { defense: checked },
                      })
                    }
                  />
                </div>
              </CardTitle>
              <CardDescription>
                Toggle the switch to create this defense
              </CardDescription>
            </CardHeader>
            {subEvent.final.defense && (
              <CardContent>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="report submission">
                      {errors.finalDefenseDate ? (
                        <span className="text-red-500">
                          {errors.finalDefenseDate.message}
                        </span>
                      ) : (
                        <span>Report Submission Deadline</span>
                      )}
                    </Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal text-slate-500"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {subEvent.final.reportDeadline ? (
                            format(subEvent.final.reportDeadline, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={subEvent.final.reportDeadline}
                          disabled={finalReportMatcher}
                          onSelect={(date) => {
                            if (
                              subEvent.final.defenseDate &&
                              date > subEvent.final.defenseDate
                            ) {
                              setError("finalDefenseDate", {
                                type: "custom",
                                message:
                                  "Report Submission should come before Defense",
                              });
                              return;
                            }

                            clearErrors("finalDefenseDate");
                            setSubEvent({
                              ...subEvent,
                              final: {
                                ...subEvent.final,
                                reportDeadline: date,
                              },
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="defense date">Defense Date</Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            "text-slate-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {subEvent.final.defenseDate ? (
                            format(subEvent.final.defenseDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={subEvent.final.defenseDate}
                          disabled={finalDefenseMatcher}
                          onSelect={(date) => {
                            setSubEvent({
                              ...subEvent,
                              final: {
                                ...subEvent.final,
                                defenseDate: date,
                              },
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
          <div className="flex mt-6 mb-40 items-center justify-end">
            <Button
              ref={submitRef}
              variant="outline"
              className="hidden"
              type="submit"
            ></Button>
            {subEvent.proposal.reportDeadline &&
            subEvent.proposal.defenseDate &&
            subEvent.final.reportDeadline &&
            subEvent.final.defenseDate ? (
              ""
            ) : (
              <p className="flex items-center gap-1 mr-4 text-xs text-slate-400">
                <span>
                  <ShieldAlert className="w-4 h-4" />
                </span>
                <span>
                  Complete proposal and final defense details to continue
                </span>
              </p>
            )}
            <Dialog open={modal} onOpenChange={setModal}>
              <DialogTrigger asChild>
                <Button
                  disabled={
                    !(
                      subEvent.proposal.reportDeadline &&
                      subEvent.proposal.defenseDate &&
                      subEvent.final.reportDeadline &&
                      subEvent.final.defenseDate
                    )
                  }
                  className="px-8"
                >
                  Next
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Review Form</DialogTitle>
                  <DialogDescription>
                    Carefully review your form before submitting
                  </DialogDescription>
                </DialogHeader>
                <Card className="max-h-[60vh] overflow-scroll">
                  <CardContent className="p-5 text-sm">
                    <div className="grid gap-2">
                      <div className="font-semibold">Event Details</div>
                      <ul className="grid gap-2">
                        <li className="flex items-center justify-between">
                          <span className="text-slate-500">Name</span>
                          <span>{getValues("eventName")}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-slate-500">Year</span>
                          <span>{new Date().getFullYear()}</span>
                        </li>
                      </ul>
                      <Separator />
                      <ul className="grid gap-2">
                        <li className="flex items-center justify-between">
                          <span className="text-slate-500">Type</span>
                          <span>{getValues("eventType")}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-slate-500">Target</span>
                          <span>{getValues("eventTarget")}</span>
                        </li>
                        {getValues("description") && (
                          <li className="flex items-center justify-between">
                            <span className="text-slate-500">Description</span>
                            <span>{getValues("description")}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-2">
                      <div className="font-semibold">Proposal Defense</div>
                      <dl className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <dt className="text-slate-500">Report Submission</dt>
                          <dd>
                            {subEvent.proposal.reportDeadline &&
                              format(
                                subEvent.proposal.reportDeadline,
                                "PPP"
                              )}{" "}
                            (in{" "}
                            {daysFromToday(subEvent.proposal.reportDeadline)}{" "}
                            days)
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-slate-500">Defense Date</dt>
                          <dd>
                            {" "}
                            {subEvent.proposal.defenseDate &&
                              format(subEvent.proposal.defenseDate, "PPP")}{" "}
                            (in {daysFromToday(subEvent.proposal.defenseDate)}{" "}
                            days)
                          </dd>
                        </div>
                      </dl>
                    </div>
                    {subEvent.mid.defense && (
                      <>
                        <Separator className="my-4" />
                        <div className="grid gap-2">
                          <div className="font-semibold">Mid Defense</div>
                          <dl className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <dt className="text-slate-500">
                                Report Submission
                              </dt>
                              <dd>
                                {subEvent.mid.reportDeadline &&
                                  format(
                                    subEvent.mid.reportDeadline,
                                    "PPP"
                                  )}{" "}
                                (in {daysFromToday(subEvent.mid.reportDeadline)}{" "}
                                days)
                              </dd>
                            </div>
                            <div className="flex items-center justify-between">
                              <dt className="text-slate-500">Defense Date</dt>
                              <dd>
                                {subEvent.mid.defenseDate &&
                                  format(subEvent.mid.defenseDate, "PPP")}{" "}
                                (in {daysFromToday(subEvent.mid.defenseDate)}{" "}
                                days)
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </>
                    )}

                    <Separator className="my-4" />
                    <div className="grid gap-2">
                      <div className="font-semibold">Final Defense</div>
                      <dl className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <dt className="text-slate-500">Report Submission</dt>
                          <dd>
                            {" "}
                            {subEvent.final.reportDeadline &&
                              format(subEvent.final.reportDeadline, "PPP")}{" "}
                            (in {daysFromToday(subEvent.final.reportDeadline)}{" "}
                            days)
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-slate-500">Defense Date</dt>
                          <dd>
                            {subEvent.final.defenseDate &&
                              format(subEvent.final.defenseDate, "PPP")}{" "}
                            (in {daysFromToday(subEvent.final.defenseDate)}{" "}
                            days)
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                </Card>
                <DialogFooter>
                  {isSubmitting ? (
                    <Button variant="secondary" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting..
                    </Button>
                  ) : (
                    <Button onClick={triggerSubmit}>Submit</Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminNewEvent;
