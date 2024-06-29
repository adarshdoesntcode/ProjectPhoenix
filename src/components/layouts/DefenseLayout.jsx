import { Loader2, Origami } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link, Outlet, useLocation } from "react-router-dom";
import { getGreeting, getInitials } from "@/lib/utils";
import { useEffect, useState } from "react";
import useLogout from "@/hooks/useLogout";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { ROLES_LIST } from "@/lib/config";
import { toast } from "../ui/use-toast";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import BreadCrumbGenerator from "../BreadCrumbGenerator";
import { Helmet } from "react-helmet-async";

const DefenseLayout = () => {
  const [logoutLoader, setLogoutLoader] = useState(false);

  const location = useLocation();
  const logout = useLogout();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const crumbs = location.pathname.split("/").filter((crumb) => {
    if (crumb !== "" && crumb != ROLES_LIST.defense) {
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
      <Helmet>
        <title>Phoenix | Defense</title>
      </Helmet>

      <div className="grid min-h-screen w-full bg-slate-100/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col justify-between border-r bg-white sm:flex">
          <nav className="flex flex-col justify-between items-center gap-4 px-2 py-3">
            <Link
              to={`/${ROLES_LIST.defense}/dashboard`}
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Origami />
            </Link>
          </nav>
          <div className="-rotate-90 flex whitespace-nowrap tracking-wide uppercase font-semibold w-full text-lg gap-4 pl-8">
            {user.fullname}
          </div>
        </aside>
        <div className="flex flex-col sm:pl-14">
          <header className="flex sticky top-0 h-14 items-center gap-4  z-50 bg-slate-50   border-b  px-4  lg:px-6">
            <Origami className="sm:hidden" />

            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden lg:block">
                  Defense
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden lg:block" />
                <BreadCrumbGenerator role={"defense"} crumbs={crumbs} />
              </BreadcrumbList>
            </Breadcrumb>
            <div className=" ml-auto  flex md:grow-0">
              <span className="font-medium text-slate-500">
                {getGreeting()}
              </span>
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
                <DropdownMenuLabel>My Session</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlelogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col  p-4 pt-0  lg:px-6 bg-slate-50">
            <Outlet />
          </main>
        </div>
      </div>
      <AlertDialog open={logoutLoader} onOpenChange={setLogoutLoader}>
        <AlertDialogContent className="w-[200px]">
          <div className="flex justify-center items-center text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin mr-4" />
            <span className="text-sm whitespace-nowrap">Logging Out</span>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DefenseLayout;
