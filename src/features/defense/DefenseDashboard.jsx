import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useGetDefenseQuery } from "./defenseApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

import Countdown from "react-countdown";
import { useState } from "react";

import { DataTable } from "./DefenseProjectDataTable";
import { DefenseProjectColumn } from "./DefenseProjectColumn";

const findRoomByEvaluatorId = (data, evaluatorId) => {
  if (!data || !data.rooms) {
    return null;
  }
  const room = data.rooms.find((room) =>
    room.evaluators.some((evaluator) => evaluator._id === evaluatorId)
  );
  return room;
};

const renderer = ({ hours, minutes, seconds, completed }) => {
  const formatTime = (time) => time.toString().padStart(2, "0");

  if (completed) {
    return;
  } else {
    return (
      <>
        <div className="text-slate-500">Time Remaining</div>
        <div className="font-bold text-7xl text-gray-800">
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </div>
      </>
    );
  }
};

function DefenseDashboard() {
  const [showProjects, setShowProjects] = useState(false);
  const user = useSelector(selectCurrentUser);

  const {
    data: defense,
    isLoading,
    isSuccess,
  } = useGetDefenseQuery(user.currentDefense);

  let content, room;
  if (defense) {
    room = findRoomByEvaluatorId(defense.data, user._id);
  }

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <>
        {!showProjects && (
          <div className="flex flex-1 flex-col gap-4 items-center justify-center text-gray-600  bg-slate-50 ">
            <div className="text-slate-800 font-bold text-2xl">
              {defense.data.defenseType.toUpperCase()} DEFENSE
            </div>

            <Countdown
              renderer={renderer}
              date={defense.data.defenseTime}
              onComplete={() => setShowProjects(true)}
            />
            <Badge className="text-xl" variant="outline">
              {room.room}
            </Badge>
          </div>
        )}

        {showProjects && (
          <Tabs defaultValue="notgraded" className="mt-4">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="notgraded">Not Graded</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2"></div>
            </div>
            <TabsContent value="notgraded">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    {room.room}{" "}
                    <Badge>{defense.data.defenseType.toUpperCase()}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Grade the following projects assigned to this room
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={DefenseProjectColumn}
                    data={room.projects}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </>
    );
  }

  return content;
}

export default DefenseDashboard;
