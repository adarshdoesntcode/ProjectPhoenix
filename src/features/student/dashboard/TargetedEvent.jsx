import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLES_LIST } from "@/lib/config";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetTargetedEventQuery } from "../studentApiSlice";

function TargetedEvent() {
  const {
    data: targetedEvent,
    isLoading,
    isSuccess,
  } = useGetTargetedEventQuery();

  let targetedEventContent;

  console.log(targetedEvent);

  if (isLoading) {
    targetedEventContent = (
      <CardContent className="flex items-center border rounded-md justify-center h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </CardContent>
    );
  } else if (isSuccess) {
    if (targetedEvent) {
      targetedEventContent = (
        <Card>
          <CardHeader className="flex flex-row items-start">
            <div className="grid gap-2">
              <CardTitle className="text-xl">Your Event</CardTitle>
              <CardDescription>
                Events targeted to you in the college
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto text-xs gap-1">
              <Link to={`/${ROLES_LIST.student}/events`}>
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>{targetedEventContent}</CardContent>
        </Card>
      );
    } else {
      targetedEventContent = (
        <div className="flex flex-col items-center justify-center gap-1 border rounded-md h-[300px] text-center">
          <h3 className="text-xl font-bold tracking-tight">
            You have no events
          </h3>
          <p className="text-sm text-muted-foreground">
            You can create a project as soon as an event is targeted to you.
          </p>
        </div>
      );
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-start">
        <div className="grid gap-2">
          <CardTitle className="text-xl">Your Event</CardTitle>
          <CardDescription>
            Events targeted to you in the college
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto text-xs gap-1">
          <Link to={`/${ROLES_LIST.student}/events`}>
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>{targetedEventContent}</CardContent>
    </Card>
  );
}

export default TargetedEvent;
