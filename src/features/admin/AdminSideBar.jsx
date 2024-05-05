import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Cctv,
  FileCheck,
  FolderGit2,
  GraduationCap,
  Home,
  LineChart,
  Megaphone,
  Origami,
  Package,
  ShoppingCart,
  TriangleAlert,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROLES_LIST } from "@/config/roleList";

function AdminSideBar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2 font-semibold select-none">
            <Origami className="h-6 w-6" />
            <span className="text-sm tracking-tight font-semibold leading-none">
              . / Project Phoenix / Admin
            </span>
          </div>
        </div>
        <div className="flex-1">
          <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to={`/${ROLES_LIST.admin}/dashboard`}
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 bg-slate-950 text-white text-primary transition-all hover:pl-4  "
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              to={`/${ROLES_LIST.admin}/events`}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all  hover:pl-4"
            >
              <CalendarDays className="h-4 w-4" />
              Events
              {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge> */}
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/projects`}
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:pl-4"
            >
              <FolderGit2 className="h-4 w-4" />
              Projects{" "}
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/students`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:pl-4"
            >
              <GraduationCap className="h-4 w-4" />
              Students
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/supervisors`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:pl-4"
            >
              <Cctv className="h-4 w-4" />
              Supervisors
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/evaluators`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:pl-4"
            >
              <FileCheck className="h-4 w-4" />
              Evaluators
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/notices`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:pl-4"
            >
              <Megaphone className="h-4 w-4" />
              Notices
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>
                <span></span>
                Complete your Account.
              </CardTitle>
              <CardDescription>
                Some of your account details are missing, please fill them to
                receive correct information.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                <TriangleAlert className="mr-2 w-4 h-4" />
                Complete
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
