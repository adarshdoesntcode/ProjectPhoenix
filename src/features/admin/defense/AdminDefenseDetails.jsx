import { useNavigate, useParams } from "react-router-dom";

import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetDefenseDetailQuery } from "../adminApiSlice";
import { EVENT_STATUS, getEventStatusByCode } from "@/lib/config";
import { format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DataTable } from "./DefenseProjectDataTable";
import { DefenseProjectColumn } from "./DefenseProjectColumn";
import Loader from "@/components/Loader";
import ApiError from "@/components/error/ApiError";
import { useState } from "react";

function AdminDefenseDetails() {
  const [openCards, setOpenCards] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: defense,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDefenseDetailQuery(id);

  const handleOpenChange = (evaluatorId, isOpen) => {
    setOpenCards((prevState) => ({
      ...prevState,
      [evaluatorId]: isOpen,
    }));
  };
  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <div>
        <div className="text-xl font-semibold tracking-tight flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          Defense Details
        </div>
        <Card className="max-w-full md:max-w-md mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between gap-4">
              <div className="text-xl">
                {defense.data.defenseType.toUpperCase()} DEFENSE
              </div>
              <Badge variant={defense.data.status == 101 ? "" : "secondary"}>
                {getEventStatusByCode(defense.data.status)}
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs">
              Details of this defense
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-1 flex-col">
            <div className="text-sm flex items-center justify-between gap-4">
              <div className="text-slate-500 font-semibold">For Event</div>
              <div>{defense.data.event.eventCode}</div>
            </div>
            <div className="text-sm flex items-center justify-between gap-4">
              <div className="text-slate-500 font-semibold">Defense Date</div>
              <div>{format(defense.data.defenseDate, "PPP")}</div>
            </div>
            <div className="text-sm flex items-center justify-between gap-4">
              <div className="text-slate-500 font-semibold">Defense Time</div>
              <Badge variant="outline">
                {format(defense.data.defenseTime, "hh:mm aa")}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {defense.data.rooms.map((room) => {
          return (
            <Card key={room._id} className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between gap-4">
                  {room.room}

                  <Badge variant={room.isCompleted ? "secondary" : ""}>
                    {room.isCompleted ? "Complete" : "Active"}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Projects assigned to this room
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex gap-2 items-center justify-end flex-wrap">
                    {room.evaluators.map((evaluator) => {
                      return (
                        <div key={evaluator._id}>
                          <HoverCard
                            openDelay={50}
                            closeDelay={50}
                            open={openCards[evaluator._id] || false}
                            onOpenChange={(isOpen) =>
                              handleOpenChange(evaluator._id, isOpen)
                            }
                          >
                            <HoverCardTrigger>
                              <Badge
                                variant="outline"
                                className="flex items-center gap-2 cursor-pointer pr-1 py-1 max-w-max"
                                onClick={(isOpen) =>
                                  handleOpenChange(evaluator._id, isOpen)
                                }
                              >
                                <div>{evaluator.fullname}</div>
                                <Badge variant="secondary">
                                  {evaluator.evaluatorType === "88"
                                    ? "Internal"
                                    : "External"}
                                </Badge>
                              </Badge>
                            </HoverCardTrigger>
                            <HoverCardContent side="top">
                              <div className="font-semibold text-base">
                                {evaluator.fullname}
                              </div>
                              <div className="text-sm text-slate-500">
                                {evaluator.designation}, {evaluator.institution}
                              </div>

                              <div className="text-sm text-slate-500">
                                {evaluator.contact}
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-2">
                    <DataTable
                      defenseId={defense.data._id}
                      defenseType={defense.data.defenseType}
                      key={room._id}
                      data={room.projects}
                      columns={DefenseProjectColumn}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

export default AdminDefenseDetails;
