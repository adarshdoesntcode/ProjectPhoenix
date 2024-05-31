import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CookingPot,
  File,
  ListFilter,
  Loader2,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { useGetDefenseQuery } from "./defenseApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { daysFromToday } from "@/lib/utils";

const findRoomByEvaluatorId = (data, evaluatorId) => {
  if (!data || !data.rooms) {
    return null;
  }
  const room = data.rooms.find((room) =>
    room.evaluators.some((evaluator) => evaluator._id === evaluatorId)
  );
  return room;
};

function DefenseDashboard() {
  const user = useSelector(selectCurrentUser);

  const {
    data: defense,
    isLoading,
    isSuccess,
  } = useGetDefenseQuery(user.currentDefense);

  console.log(defense);
  let content, room;
  if (defense) {
    console.log(daysFromToday(defense.data.defenseDate));
    room = findRoomByEvaluatorId(defense.data, user._id);
  }

  console.log(room);

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <Tabs defaultValue="notgraded">
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SN</TableHead>
                    <TableHead>Project Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Members
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Supervisor
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {room.projects.map((project, index) => {
                    return (
                      <TableRow key={project._id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{project.projectCode}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {project.projectName}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {project.teamMembers.length}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          Not Assigned
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    );
  }

  return content;
}

export default DefenseDashboard;
