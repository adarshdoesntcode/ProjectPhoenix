import {
  CalendarDays,
  Cctv,
  FileCheck,
  FolderGit2,
  GraduationCap,
  Home,
  Megaphone,
  Origami,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { ROLES_LIST } from "@/config/roleList";
import { isTabActive } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CurrentClock from "../../components/CurrentClock";

function AdminSideBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2 font-semibold select-none">
            <Origami className="h-5 w-5 lg:w-6 lg-h6" />
            <span className="hidden lg:block text-sm tracking-tight font-semibold leading-none">
              / Project Phoenix / Admin
            </span>
            <span className="block lg:hidden text-sm tracking-tight font-semibold leading-none">
              / Phoenix / Admin
            </span>
          </div>
        </div>
        <div className="flex-1">
          <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to={`/${ROLES_LIST.admin}/dashboard`}
              className={`flex items-center gap-3 rounded-lg bg-muted px-3 py-2 ${
                isTabActive(currentPath, "dashboard")
                  ? "bg-slate-950 text-white"
                  : ""
              } text-primary transition-all hover:pl-4`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              to={`/${ROLES_LIST.admin}/events`}
              className={`flex items-center gap-3 rounded-lg bg-muted px-3 py-2 ${
                isTabActive(currentPath, "events")
                  ? "bg-slate-950 text-white"
                  : ""
              } text-primary transition-all hover:pl-4`}
            >
              <CalendarDays className="h-4 w-4" />
              Events
              <Badge
                variant="secondary"
                className="ml-auto flex shrink-0 items-center justify-center rounded-full"
              >
                3
              </Badge>
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/projects`}
              className={`flex items-center gap-3 rounded-lg bg-muted px-3 py-2 ${
                isTabActive(currentPath, "projects")
                  ? "bg-slate-950 text-white"
                  : ""
              } text-primary transition-all hover:pl-4`}
            >
              <FolderGit2 className="h-4 w-4" />
              Projects{" "}
              <Badge
                variant="secondary"
                className="ml-auto flex shrink-0 items-center justify-center rounded-full"
              >
                26
              </Badge>
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/students`}
              className={`flex items-center gap-3 rounded-lg bg-muted px-3 py-2 ${
                isTabActive(currentPath, "students")
                  ? "bg-slate-950 text-white"
                  : ""
              } text-primary transition-all hover:pl-4`}
            >
              <GraduationCap className="h-4 w-4" />
              Students
              <Badge
                variant="secondary"
                className="ml-auto flex shrink-0 items-center justify-center rounded-full"
              >
                1556
              </Badge>
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/supervisors`}
              className={`flex items-center gap-3 rounded-lg bg-muted px-3 py-2 ${
                isTabActive(currentPath, "supervisors")
                  ? "bg-slate-950 text-white"
                  : ""
              } text-primary transition-all hover:pl-4`}
            >
              <Cctv className="h-4 w-4" />
              Supervisors
              <Badge
                variant="secondary"
                className="ml-auto flex shrink-0 items-center justify-center rounded-full"
              >
                26
              </Badge>
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/evaluators`}
              className={`flex items-center gap-3 rounded-lg bg-muted px-3 py-2 ${
                isTabActive(currentPath, "evaluators")
                  ? "bg-slate-950 text-white"
                  : ""
              } text-primary transition-all hover:pl-4`}
            >
              <FileCheck className="h-4 w-4" />
              Evaluators
              <Badge
                variant="secondary"
                className="ml-auto flex shrink-0 items-center justify-center rounded-full"
              >
                44
              </Badge>
            </Link>
            <Link
              to={`/${ROLES_LIST.admin}/notices`}
              className={`flex items-center gap-3 rounded-lg bg-muted px-3 py-2 ${
                isTabActive(currentPath, "notices")
                  ? "bg-slate-950 text-white"
                  : ""
              } text-primary transition-all hover:pl-4`}
            >
              <Megaphone className="h-4 w-4" />
              Notices
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <CurrentClock />
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
