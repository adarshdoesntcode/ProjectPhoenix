import Loader from "@/components/Loader";
import { useGetArchiveQuery } from "../studentApiSlice";
import ApiError from "@/components/error/ApiError";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import {
  Activity,
  ChevronLeft,
  CalendarCheck2,
  CheckCheck,
  CirclePlus,
  Hammer,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function StudentArchive() {
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArchiveQuery();
  const navigate = useNavigate();

  console.log(projects);

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
          Archive
        </div>
        <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hosted Events
              </CardTitle>
              <CalendarCheck2 className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{}</div>
              <p className="text-xs text-gray-500 text-right">all events</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Events
              </CardTitle>
              <Activity className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{}</div>
              <p className="text-xs text-gray-500 text-right">running events</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Developing Projects
              </CardTitle>
              <Hammer className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{}</div>
              <p className="text-xs text-gray-500 text-right">
                enrolled projects
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Complete Events
              </CardTitle>
              <CheckCheck className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{}</div>
              <p className="text-xs text-gray-500 text-right">
                successful events
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  return content;
}

export default StudentArchive;
