import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EVENT_TYPE } from "@/lib/config";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useExtendDeadlineMutation } from "../adminApiSlice";

const initialState = {
  reportDeadline: undefined,
  defenseDate: undefined,
};

function AdminExtendEvent({ event }) {
  const {
    handleSubmit,
    reset,
    setError,
    watch,
    control,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const [subEvent, setSubEvent] = useState(initialState);
  const [modal, setModal] = useState(false);

  const [extendDeadline, { isLoading }] = useExtendDeadlineMutation();

  const defenseType = watch("defenseType");

  async function onSubmit(data) {
    if (!subEvent.reportDeadline || !subEvent.defenseDate) {
      return toast({
        variant: "destructive",
        title: "Fields Empty",
        description: "Fill Out the Dates",
      });
    }
    try {
      const newPatch = {
        subEventType: data.defenseType,
        reportDeadline: subEvent.reportDeadline,
        defenseDate: subEvent.defenseDate,
        event: event.data._id,
      };
      const res = await extendDeadline(newPatch);

      console.log(res);
      if (res.error) {
        throw new Error("Try Again");
      }

      if (!res.error) {
        toast({
          title: "Deadline Extended",
          description: "New phase started",
        });
        reset();
        setSubEvent(initialState);
        setModal(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!!",
        description: error.message,
      });
    }
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className=" h-10 gap-1 text-sm">
          <Clock className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Extend</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extend Deadlines</DialogTitle>
          <DialogDescription>
            Extend deadlines for report submission and defense date
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="eventTarget">
              {errors.defenseType ? (
                <span className="text-red-500">
                  {errors.defenseType.message}
                </span>
              ) : (
                <span>Sub Event</span>
              )}
            </Label>
            <Controller
              control={control}
              name="defenseType"
              rules={{ required: "Defense Type  is required" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  className={errors.defenseType ? "border-red-500" : ""}
                >
                  <SelectTrigger
                    className={cn("w-full", !field.value && "text-slate-500")}
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    {event.data.eventType > EVENT_TYPE.FIRST && (
                      <SelectItem value="mid">Mid Term</SelectItem>
                    )}

                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {defenseType && (
            <>
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
                        !subEvent.reportDeadline && "text-slate-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {subEvent.reportDeadline ? (
                        format(subEvent.reportDeadline, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={subEvent.reportDeadline}
                      disabled={{
                        before: event.data[defenseType].reportDeadline,
                      }}
                      onSelect={(date) => {
                        if (
                          subEvent.defenseDate &&
                          date > subEvent.defenseDate
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
                          reportDeadline: date.setHours(23, 59, 59, 0),
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
                        !subEvent.defenseDate && "text-slate-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {subEvent.defenseDate ? (
                        format(subEvent.defenseDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={subEvent.defenseDate}
                      disabled={{
                        before: event.data[defenseType].defenseDate,
                      }}
                      onSelect={(date) => {
                        setSubEvent({
                          ...subEvent,
                          defenseDate: date.setHours(23, 59, 59, 0),
                        });
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}
          <DialogFooter>
            {isLoading || isSubmitting ? (
              <Button variant="secondary" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extending..
              </Button>
            ) : (
              <Button type="submit">Extend</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminExtendEvent;
