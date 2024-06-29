import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CheckCheck, Loader2 } from "lucide-react";
import { useGetDefenseQuery } from "./defenseApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

import Countdown from "react-countdown";
import { useState } from "react";

import { DataTable } from "./DefenseProjectDataTable";
import { DefenseProjectColumn } from "./DefenseProjectColumn";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import useLogout from "@/hooks/useLogout";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import ApiError from "@/components/error/ApiError";

const seprateProjects = (
  projects,
  specificDefenseId,
  specificEvaluatorId,
  gradedProjects,
  notGradedProjects,
  defenseType
) => {
  projects.forEach((project) => {
    let hasEvaluated = false;

    project[defenseType].defenses.forEach((defense) => {
      if (defense.defense === specificDefenseId) {
        defense.evaluators.forEach((evaluator) => {
          if (
            evaluator.evaluator === specificEvaluatorId &&
            evaluator.hasEvaluated
          ) {
            hasEvaluated = true;
          }
        });
      }
    });

    if (hasEvaluated) {
      gradedProjects.push(project);
    } else {
      notGradedProjects.push(project);
    }
  });
};

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
  const [logoutLoader, setLogoutLoader] = useState(false);
  const [openCards, setOpenCards] = useState({});

  const logout = useLogout();

  const user = useSelector(selectCurrentUser);

  const {
    data: defense,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useGetDefenseQuery(user.currentDefense);

  const handleOpenChange = (evaluatorId, isOpen) => {
    setOpenCards((prevState) => ({
      ...prevState,
      [evaluatorId]: isOpen,
    }));
  };

  const handlelogout = async () => {
    try {
      setLogoutLoader(true);
      await logout();
      setLogoutLoader(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!!",
        description: error.message,
      });
    }
  };

  let content,
    room,
    gradedProjects = [],
    notGradedProjects = [];

  if (defense) {
    room = findRoomByEvaluatorId(defense.data, user._id);
    seprateProjects(
      room.projects,
      defense.data._id,
      user._id,
      gradedProjects,
      notGradedProjects,
      defense.data.defenseType
    );
  }

  if (isLoading) {
    content = <Loader />;
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
          <>
            <Card className="max-w-full md:max-w-md mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  {room.room}
                  <Badge>{defense.data.defenseType.toUpperCase()}</Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Evalutors of the current defense room
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {room.evaluators.map((evaluator) => {
                  return (
                    <div
                      key={evaluator._id}
                      className="flex justify-between items-center"
                    >
                      <div className="text-sm font-semibold text-slate-500">
                        {user._id === evaluator._id
                          ? "Evaluator (You)"
                          : "Co Evaluator"}
                      </div>

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
                            className="flex items-center gap-2 cursor-pointer pr-1 py-1"
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
                        <HoverCardContent side="right">
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
              </CardContent>
            </Card>
            <Tabs defaultValue="notgraded" className="mt-4">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="notgraded">Not Graded</TabsTrigger>
                  <TabsTrigger value="graded">Graded</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2"></div>
              </div>
              <TabsContent value="notgraded">
                {notGradedProjects.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-1 items-center justify-center my-14">
                        <div className="flex flex-col items-center gap-1 text-center">
                          <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            All Projects Graded <CheckCheck />
                          </h3>

                          <p className="text-sm text-gray-500">
                            You can now resign as an evaluator from this defense
                            by logging out
                          </p>

                          <Button className="mt-4" onClick={handlelogout}>
                            Logout
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-4">
                        Not Graded Project
                      </CardTitle>
                      <CardDescription>
                        Remaining projects to be graded by you in this defense
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTable
                        columns={DefenseProjectColumn}
                        data={notGradedProjects}
                        roomID={room._id}
                      />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="graded">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                      Graded Projects
                      <Badge>{defense.data.defenseType.toUpperCase()}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Graded projects by you in this defense
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      columns={DefenseProjectColumn}
                      data={gradedProjects}
                      roomID={room._id}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
        <AlertDialog open={logoutLoader} onOpenChange={setLogoutLoader}>
          <AlertDialogContent className="w-[200px]">
            <div className="flex justify-center items-center text-gray-600">
              <Loader2 className="h-6 w-6 animate-spin mr-4" />
              <span className="text-sm whitespace-nowrap">Logging Out</span>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

export default DefenseDashboard;
