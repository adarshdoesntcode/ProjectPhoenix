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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminNewEvent() {
  const navigate = useNavigate();
  const [subEvent, setSubEvent] = useState({
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
  });

  const beforeMatcher = { before: new Date() };
  return (
    <div className="flex items-center flex-col px-4">
      <div className="max-w-2xl  mx-auto">
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
        <form className="w-[672px]">
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
                  <Label htmlFor="projectName">Event Name</Label>
                  <Input id="projectName" type="text" className="w-full" />
                </div>
                <div className="grid gap-3 grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="description">Event Type</Label>

                    <Select className="w-full">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">
                          First Project (1 credit)
                        </SelectItem>
                        <SelectItem value="minor">
                          Minor Project (2 credit)
                        </SelectItem>
                        <SelectItem value="major">
                          Major Project (4/5 credit)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Event Target</Label>

                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="SE">Software Engineering</SelectItem>
                        <SelectItem value="CE">Computer Engineering</SelectItem>
                        <SelectItem value="ELX">
                          Electrical Engineering
                        </SelectItem>
                        <SelectItem value="IT">
                          Information Technology
                        </SelectItem>
                        <SelectItem value="CA">Computer Application</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Description [Optional]"
                    className="min-h-32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
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
                <div className="grid gap-3 grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="description">
                      Report Submission Deadline
                    </Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            "text-muted-foreground"
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
                          disabled={beforeMatcher}
                          onSelect={(date) => {
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
                    <Label htmlFor="description">Defense Date</Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            "text-muted-foreground"
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
                          disabled={beforeMatcher}
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
        </form>
      </div>
    </div>
  );
}

export default AdminNewEvent;
