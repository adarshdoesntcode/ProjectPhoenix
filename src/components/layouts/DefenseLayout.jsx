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
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import useLogout from "@/hooks/useLogout";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { ROLES_LIST } from "@/lib/config";
import { toast } from "../ui/use-toast";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import BreadCrumbGenerator from "../BreadCrumbGenerator";

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon";
  } else if (currentHour >= 17 && currentHour < 22) {
    return "Good evening";
  } else {
    return "Goodnight";
  }
};

const DefenseLayout = () => {
  const [logoutLoader, setLogoutLoader] = useState(false);
  const location = useLocation();
  const logout = useLogout();

  const user = useSelector(selectCurrentUser);

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
      <div className="flex min-h-screen w-full flex-col bg-slate-100/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Origami />
            </Link>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5"></nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky  top-0 z-50 bg-slate-100/50 backdrop-filter backdrop-blur-lg flex h-14 pb-2 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0  sm:px-6">
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
              <span className="text-slate-500 text-sm">
                {getGreeting()}, {user.fullname}
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
          <main className="flex flex-1 flex-col  p-4  lg:px-6 bg-slate-50">
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
};

{
  /* <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
  <div className="flex items-center">
    <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
  </div>
  <div
    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    x-chunk="dashboard-02-chunk-1"
  >
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">
        You have no products
      </h3>
      <p className="text-sm text-muted-foreground">
        You can start selling as soon as you add a product.
      </p>
      <Button className="mt-4">Add Product</Button>
    </div>
  </div>
</main>; */
}
export default DefenseLayout;
