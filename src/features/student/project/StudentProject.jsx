import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Steps } from "antd";
import { CalendarHeart, FolderGit2, Footprints, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import ProjectInfo from "./ProjectInfo";
import {
  useGetProjectQuery,
  useSubmitReportMutation,
} from "../studentApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import UploadReport from "./UploadReport";
const description = "This is a description.";

function StudentProject() {
  const user = useSelector(selectCurrentUser);

  const {
    data: project,
    isLoading,
    isSuccess,
  } = useGetProjectQuery(user.project, { skip: !user.isAssociated });

  let content;

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <main className="grid flex-1 items-start gap-4  md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
            <ProjectInfo
              user={user}
              project={project}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </div>

          <Card>
            <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
              <div>
                <CardTitle className="text-xl">Submit Report</CardTitle>

                <CardDescription className="text-xs">
                  Event targated to you in the college
                </CardDescription>
              </div>
              <CalendarHeart className="text-slate-500" />
            </CardHeader>

            <CardContent className="px-0 sm:px-6 sm:pb-6 pb-0 mt-0 sm:mt-6">
              <UploadReport />
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2 xl:col-span-1">
          <Card>
            <CardHeader className="flex flex-row bg-slate-100 rounded-t-md border-b py-4 justify-between items-center">
              <div>
                <CardTitle className="text-lg">Project Progress</CardTitle>

                <CardDescription className="text-xs">
                  Details of you current project
                </CardDescription>
              </div>
              <Footprints className="text-slate-500" />
            </CardHeader>

            <CardContent className="text-sm px-10 mt-6">
              <Steps
                className=""
                direction="vertical"
                current={1}
                items={[
                  {
                    title: "Create a Team",
                    description: "Finished",
                  },
                  {
                    title: "In Progress",
                    description,
                  },
                  {
                    title: "Waiting",
                    description,
                  },
                ]}
              />
            </CardContent>
          </Card>
          {/* <Card>
          <CardHeader className="flex flex-row rounded-t-md border-b py-4 bg-slate-100 justify-between items-center">
          <div>
          <CardTitle className="text-lg">Events Timeline</CardTitle>
          <CardDescription className="text-xs">
          Timeline of the ongoing events
          </CardDescription>
          </div>
          
          <CalendarClock className="text-slate-500" />
          </CardHeader>
          <CardContent className="text-sm pt-6 max-h-[548px] overflow-x-scroll">
          <StudentEventsTimeline />
          </CardContent>
        </Card> */}
        </div>
      </main>
    );
  }
  return content;
}

export default StudentProject;
