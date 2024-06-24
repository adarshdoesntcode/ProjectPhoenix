import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROLES_LIST } from "@/lib/config";
import {
  CalendarDays,
  Cctv,
  FileCheck,
  FolderGit2,
  GraduationCap,
  Home,
  Megaphone,
  Menu,
  Origami,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { isTabActive } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function AdminMobileSideBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-slate-600 text-lg font-medium">
          <div className="hidden lg:flex items-center gap-2 text-base font-semibold ">
            <Origami className="h-6 w-6" />
            <span> / Project Phoenix / Admin</span>
          </div>
          <div className="flex lg:hidden items-center gap-2 text-base font-semibold ">
            <Origami className="h-6 w-6" />
            <span> / Phoenix / Admin</span>
          </div>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.admin}/dashboard`}
              className={`mx-[-0.65rem] mt-4 flex items-center ${
                isTabActive(currentPath, "dashboard")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.admin}/events`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "events")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <CalendarDays className="h-5 w-5" />
              Events
              <Badge
                variant="secondary"
                className="ml-auto flex  shrink-0 items-center justify-center rounded-full"
              >
                3
              </Badge>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.admin}/defense`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "defense")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <ShieldCheck className="h-5 w-5" />
              Defense
              <Badge
                variant="secondary"
                className="ml-auto flex  shrink-0 items-center justify-center rounded-full"
              >
                3
              </Badge>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.admin}/projects`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "projects")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <FolderGit2 className="h-5 w-5" />
              Projects
              <Badge
                variant="secondary"
                className="ml-auto flex  shrink-0 items-center justify-center rounded-full"
              >
                6
              </Badge>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.admin}/students`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "students")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <GraduationCap className="h-5 w-5" />
              Students
              <Badge
                variant="secondary"
                className="ml-auto flex  shrink-0 items-center justify-center rounded-full"
              >
                2336
              </Badge>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.admin}/supervisors`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "supervisors")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <Cctv className="h-5 w-5" />
              Supervisors
              <Badge
                variant="secondary"
                className="ml-auto flex  shrink-0 items-center justify-center rounded-full"
              >
                16
              </Badge>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.admin}/evaluators`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "evaluators")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <FileCheck className="h-5 w-5" />
              Evaluators
              <Badge
                variant="secondary"
                className="ml-auto flex shrink-0 items-center justify-center rounded-full"
              >
                44
              </Badge>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.admin}/notices`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "notices")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <Megaphone className="h-5 w-5" />
              Notices
              <Badge
                variant="secondary"
                className="ml-auto flex shrink-0 items-center justify-center rounded-full"
              >
                16
              </Badge>
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default AdminMobileSideBar;
