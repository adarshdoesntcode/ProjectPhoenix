import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Input } from "@/components/ui/input";

import { Loader2, Search } from "lucide-react";

import useLogout from "@/hooks/useLogout";
import { Outlet, useLocation } from "react-router-dom";
import { ROLES_LIST } from "@/lib/config";
import BreadCrumbGenerator from "../BreadCrumbGenerator";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

import { useState } from "react";

import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { toast } from "../ui/use-toast";
import StudentSideBar from "@/features/student/StudentSideBar";
import StudentMobileSideBar from "@/features/student/StudentMobileSideBar";

function AdminLayout() {
  const [logoutLoader, setLogoutLoader] = useState(false);
  const location = useLocation();
  const logout = useLogout();

  const user = useSelector(selectCurrentUser);

  const crumbs = location.pathname.split("/").filter((crumb) => {
    if (crumb !== "" && crumb != ROLES_LIST.student) {
      return crumb;
    }
  });

  const handlelogout = async () => {
    try {
      setLogoutLoader(true);
      await logout();
      setLogoutLoader(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!!",
        description: error.message,
      });
    }
  };
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <StudentSideBar />
        <div className="flex flex-col">
          <header className="flex sticky top-0 h-14 items-center gap-4  bg-slate-100/50 backdrop-filter backdrop-blur-lg px-4 lg:h-[60px] lg:px-6">
            <StudentMobileSideBar />
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  {user.fullname ? user.fullname.split(" ")[0] : "Student"}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadCrumbGenerator role={"student"} crumbs={crumbs} />
              </BreadcrumbList>
            </Breadcrumb>

            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search Projects, Students, .."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.photo} />
                  <AvatarFallback className="bg-slate-200">
                    {getInitials(user.fullname)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlelogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col  p-4 pt-0 lg:px-6 bg-slate-50">
            <Outlet />
          </main>
        </div>
      </div>
      <AlertDialog open={logoutLoader} onOpenChange={setLogoutLoader}>
        <AlertDialogContent className="w-[200px]">
          <div className="flex justify-center items-center text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin mr-4" />
            <span>Logging Out</span>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AdminLayout;
