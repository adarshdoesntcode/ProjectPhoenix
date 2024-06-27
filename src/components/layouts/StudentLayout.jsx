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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PROGRAM_CODE, ROLES_LIST } from "@/lib/config";
import BreadCrumbGenerator from "../BreadCrumbGenerator";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

import { useEffect, useState } from "react";

import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { toast } from "../ui/use-toast";
import StudentSideBar from "@/features/student/StudentSideBar";
import StudentMobileSideBar from "@/features/student/StudentMobileSideBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useUpdateStudentMutation } from "@/features/student/studentApiSlice";
import { Helmet } from "react-helmet-async";

function StudentLayout() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const [logoutLoader, setLogoutLoader] = useState(false);
  const location = useLocation();
  const logout = useLogout();

  const user = useSelector(selectCurrentUser);
  const [updateStudent] = useUpdateStudentMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
  const onUpdate = async (data) => {
    try {
      const creds = {
        data: {
          phoneNumber: data.phoneNumber,
          program: data.program,
        },
        id: user._id,
      };
      const res = await updateStudent(creds);

      if (!res.error) {
        reset();
        toast({
          title: "Account Updated successfully!",
          description: "You can now continue.",
        });
        navigate(0);
      } else {
        throw new Error("Try again");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!!",
        description: error.message,
      });
    }
  };

  if (!user.phoneNumber || !user.program) {
    return (
      <div className="w-full h-full fixed top-0 left-0 bg-white z-40 flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Remaing Info for {user.fullname}
            </CardTitle>
            <CardDescription>
              Enter your information to complete your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onUpdate)} className="grid gap-4">
              <div className="grid gap-2 ">
                <Label htmlFor="program">
                  {errors.program ? (
                    <span className="text-red-500">
                      {errors.program.message}
                    </span>
                  ) : (
                    <span>Program</span>
                  )}
                </Label>
                <Controller
                  control={control}
                  name="program"
                  rules={{ required: "Program is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      className={errors.program ? "border-red-500" : ""}
                    >
                      <SelectTrigger className="w-full  text-slate-500">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={PROGRAM_CODE.BESE}>
                          Software Engineering
                        </SelectItem>
                        <SelectItem value={PROGRAM_CODE.BECE}>
                          Computer Engineering
                        </SelectItem>
                        <SelectItem value={PROGRAM_CODE.BEELX}>
                          Electrical Engineering
                        </SelectItem>
                        <SelectItem value={PROGRAM_CODE.BEIT}>
                          Information Technology
                        </SelectItem>
                        <SelectItem value={PROGRAM_CODE.BCA}>
                          Computer Application
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">
                  {errors.phoneNumber ? (
                    <span className="text-red-500">
                      {errors.phoneNumber.message}
                    </span>
                  ) : (
                    <span>Phone number</span>
                  )}
                </Label>
                <Input
                  id="phoneNumber"
                  type="number"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^9\d{9}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className={errors.phone ? "border-red-500" : ""}
                />
              </div>
              {isSubmitting ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting..
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Phoenix | Student</title>
      </Helmet>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <StudentSideBar />
        <div className="flex flex-col">
          <header className="flex sticky top-0 h-14 items-center gap-4 z-50 bg-slate-100/50 backdrop-filter backdrop-blur-lg px-4 lg:h-[60px] lg:px-6">
            <StudentMobileSideBar />
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  {user.fullname ? user.fullname : "Student"}
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
          <main className="flex flex-1 flex-col  p-4  lg:px-6 bg-slate-50">
            <Outlet />
          </main>
        </div>
      </div>
      <AlertDialog open={logoutLoader} onOpenChange={setLogoutLoader}>
        <AlertDialogContent className="w-[200px]">
          <div className="flex justify-center items-center text-slate-600">
            <Loader2 className="h-6 w-6 animate-spin mr-4" />
            <span className="text-sm whitespace-nowrap">Logging Out</span>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default StudentLayout;
