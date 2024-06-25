import ApiError from "@/components/error/ApiError";
import { useGetAllStudentsQuery } from "../adminApiSlice";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Archive,
  CalendarCheck2,
  CheckCheck,
  ChevronLeft,
  File,
  FileQuestion,
  Handshake,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./StudentDataTable";
import { StudentColumn } from "./StudentColumn";

function AdminStudents() {
  const {
    data: students,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetAllStudentsQuery();

  const navigate = useNavigate();
  const tableRef = useRef();

  let content;
  let assocaiatedStudents, notAssociatedStudents;

  console.log(students);

  if (students) {
    assocaiatedStudents = students.data.filter(
      (student) => student.isAssociated === true
    );
    notAssociatedStudents = students.data.filter(
      (student) => student.isAssociated === false
    );
  }

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    if (!students) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No Students</h3>

            <p className="text-sm text-gray-500">
              Students will appear as soon as they sign up
            </p>
          </div>
        </div>
      );
    } else {
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
            Students
          </div>
          <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  All Students
                </CardTitle>
                <UserCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.data.length}</div>
                <p className="text-xs text-gray-500 text-right">
                  all signed up students
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Associated Students
                </CardTitle>
                <Handshake className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {assocaiatedStudents.length}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  part of a project
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Not Associated Students
                </CardTitle>
                <FileQuestion className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {notAssociatedStudents.length}
                </div>
                <p className="text-xs text-gray-500 text-right">
                  not part of a projects
                </p>
              </CardContent>
            </Card>
          </div>
          <Tabs className="mt-4" defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="associated">Associated</TabsTrigger>
                <TabsTrigger value="notassociated">Not Associated</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className=" h-10 gap-1 text-sm"
                  onClick={() => tableRef.current?.exportCSV()}
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Associated</CardTitle>
                  <CardDescription>
                    Stuednts that are currently part of project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={StudentColumn}
                    data={students.data}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="associated">
              <Card>
                <CardHeader>
                  <CardTitle>Associated</CardTitle>
                  <CardDescription>
                    Stuednts that are currently part of project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={StudentColumn}
                    data={assocaiatedStudents}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notassociated">
              <Card>
                <CardHeader>
                  <CardTitle>Not Associated</CardTitle>
                  <CardDescription>
                    Students that are currently not part of a project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    ref={tableRef}
                    columns={StudentColumn}
                    data={notAssociatedStudents}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
  } else if (isError) {
    content = <ApiError error={error} />;
  }
  return content;
}

export default AdminStudents;
