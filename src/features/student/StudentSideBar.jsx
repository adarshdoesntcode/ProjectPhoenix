import {
  BookOpen,
  FolderGit2,
  Home,
  Origami,
  Package,
  Route,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { ROLES_LIST } from "@/lib/config";
import { isTabActive } from "@/lib/utils";
import CurrentClock from "../../components/CurrentClock";

function StudentSideBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const date = new Date();

  return (
    <div className="hidden  border-r /40 md:block">
      <div className="sticky top-0 flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2 font-semibold select-none">
            <Origami className="h-5 w-5 lg:w-6 lg-h6" />
            <span className="hidden lg:block text-sm tracking-tight font-semibold leading-none">
              / Project Phoenix / Student
            </span>
            <span className="block lg:hidden text-sm tracking-tight font-semibold leading-none">
              / Phoenix / Student
            </span>
          </div>
        </div>
        <div className="flex-1">
          <nav className="grid  text-slate-600 items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to={`/${ROLES_LIST.student}/dashboard`}
              className={`flex items-center gap-3 rounded-md  px-3 py-2.5 ${
                isTabActive(currentPath, "dashboard")
                  ? "bg-slate-950 text-white"
                  : "hover:text-slate-950"
              } text-primary transition-all hover:pl-4`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              to={`/${ROLES_LIST.student}/project`}
              className={`flex items-center gap-3 rounded-md  px-3 py-2.5 ${
                isTabActive(currentPath, "project")
                  ? "bg-slate-950 text-white"
                  : "hover:text-slate-950"
              } text-primary transition-all hover:pl-4`}
            >
              <FolderGit2 className="h-4 w-4" />
              My Project
            </Link>
            <Link
              to={`/${ROLES_LIST.student}/archive`}
              className={`flex items-center gap-3 rounded-md  px-3 py-2.5 ${
                isTabActive(currentPath, "archive")
                  ? "bg-slate-950 text-white"
                  : "hover:text-slate-950"
              } text-primary transition-all hover:pl-4`}
            >
              <Package className="h-4 w-4" />
              Archive
            </Link>
            <Link
              to={`/${ROLES_LIST.student}/guidelines`}
              className={`flex items-center gap-3 rounded-md  px-3 py-2.5 ${
                isTabActive(currentPath, "guidelines")
                  ? "bg-slate-950 text-white"
                  : "hover:text-slate-950"
              } text-primary transition-all hover:pl-4`}
            >
              <Route className="h-4 w-4" />
              Guidelines
            </Link>
            <Link
              to={`/${ROLES_LIST.student}/coverpage`}
              className={`flex items-center gap-3 rounded-md  px-3 py-2.5 ${
                isTabActive(currentPath, "coverpage")
                  ? "bg-slate-950 text-white"
                  : "hover:text-slate-950"
              } text-primary transition-all hover:pl-4`}
            >
              <BookOpen className="h-4 w-4" />
              Coverpage
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-4 ">
          <CurrentClock date={date} />
        </div>
      </div>
    </div>
  );
}

export default StudentSideBar;
