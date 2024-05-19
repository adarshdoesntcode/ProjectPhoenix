import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROLES_LIST } from "@/lib/config";
import { Cctv, FolderGit2, Home, Menu, Origami, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { isTabActive } from "@/lib/utils";

function StudentMobileSideBar() {
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
            <span> / Project Phoenix / Student</span>
          </div>
          <div className="flex lg:hidden items-center gap-2 text-base font-semibold ">
            <Origami className="h-6 w-6" />
            <span> / Phoenix / Student</span>
          </div>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.student}/dashboard`}
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
              to={`/${ROLES_LIST.student}/project`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "project")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <FolderGit2 className="h-5 w-5" />
              Project
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.student}/archive`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "archive")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <Package className="h-5 w-5" />
              Archive
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={`/${ROLES_LIST.student}/guidelines`}
              className={`mx-[-0.65rem]  flex items-center ${
                isTabActive(currentPath, "guidelines")
                  ? "bg-slate-950 text-white"
                  : ""
              }  gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
            >
              <Cctv className="h-5 w-5" />
              Guidelines
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default StudentMobileSideBar;
