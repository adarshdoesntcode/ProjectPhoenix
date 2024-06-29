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

import { Dot, Loader2, Search } from "lucide-react";

import useLogout from "@/hooks/useLogout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  DESCRIPTION_CATEGORY_SET,
  PROGRAM_CODE,
  ROLES_LIST,
} from "@/lib/config";
import BreadCrumbGenerator from "../BreadCrumbGenerator";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, getInitials } from "@/lib/utils";

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
import { Badge } from "../ui/badge";
import { useUpdateSupervisorMutation } from "@/features/supervisor/supervisorApiSlice";
import SupervisorSideBar from "@/features/supervisor/SupervisorSideBar";
import SupervisorMobileSideBar from "@/features/supervisor/SupervisorMobileSideBar";
import { Helmet } from "react-helmet-async";

function SupervisorLayout() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const [logoutLoader, setLogoutLoader] = useState(false);
  const [skillSet, setSkillSet] = useState(DESCRIPTION_CATEGORY_SET);
  const location = useLocation();
  const logout = useLogout();

  const user = useSelector(selectCurrentUser);
  const [updateSupervisor] = useUpdateSupervisorMutation();

  const selectedSkillSet = skillSet.filter((skill) => skill.selected === true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const crumbs = location.pathname.split("/").filter((crumb) => {
    if (crumb !== "" && crumb != ROLES_LIST.supervisor) {
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
          phoneNumber: user.phoneNumber || data.phoneNumber,
          designation: user.designation || data.designation,
          institution: user.institution || data.institution,
          skillSet: selectedSkillSet.map((skill) => skill.category),
        },
        id: user._id,
      };
      const res = await updateSupervisor(creds);

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

  if (
    !user.phoneNumber ||
    !user.skillSet ||
    !user.designation ||
    !user.institution
  ) {
    return (
      <div className="w-full h-full fixed top-0 left-0 bg-white z-40 flex justify-center items-center">
        <Card className="max-w-lg">
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
              {!user.designation && (
                <div className="grid gap-2">
                  <Label htmlFor="designation">
                    {errors.designation ? (
                      <span className="text-red-500">
                        {errors.designation.message}
                      </span>
                    ) : (
                      <span>Designation</span>
                    )}
                  </Label>
                  <Input
                    id="designation"
                    {...register("designation", {
                      required: "Designation is required",
                    })}
                    className={errors.designation ? "border-red-500" : ""}
                  />
                </div>
              )}
              {!user.institution && (
                <div className="grid gap-2">
                  <Label htmlFor="institution">
                    {errors.institution ? (
                      <span className="text-red-500">
                        {errors.institution.message}
                      </span>
                    ) : (
                      <span>
                        Institution{" "}
                        <span className="text-xs text-slate-400">
                          {" "}
                          (Abbreviation preferred)
                        </span>
                      </span>
                    )}
                  </Label>
                  <Input
                    id="institution"
                    {...register("institution", {
                      required: "Institute is required",
                    })}
                    className={errors.institution ? "border-red-500" : ""}
                  />
                </div>
              )}
              {!user.phoneNumber && (
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
              )}

              <div className="grid gap-4 mb-4">
                <Label htmlFor="skillSet">
                  Your Expertiese{" "}
                  <span className="text-xs text-slate-400">
                    {" "}
                    (select atleast 3)
                  </span>
                </Label>
                <div className="flex flex-wrap gap-1">
                  {skillSet.map((skill) => {
                    return (
                      <Badge
                        variant={skill.selected ? "" : "outline"}
                        key={skill.id}
                        size="sm "
                        className="cursor-pointer"
                        onClick={() =>
                          setSkillSet((prev) => {
                            return prev.map((p) => {
                              if (p.id === skill.id) {
                                return {
                                  ...p,
                                  selected: !p.selected,
                                };
                              } else {
                                return {
                                  ...p,
                                };
                              }
                            });
                          })
                        }
                      >
                        {skill.category}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {isSubmitting ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting..
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={selectedSkillSet.length < 3}
                  className="w-full"
                >
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
        <title>Phoenix | Supervisor</title>
      </Helmet>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <SupervisorSideBar />
        <div className="flex flex-col">
          <header className="flex sticky top-0 h-14 items-center gap-4 z-50 bg-slate-100/50 backdrop-filter backdrop-blur-lg px-4 lg:h-[60px] lg:px-6">
            <SupervisorMobileSideBar />
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden lg:block">
                  {user.fullname ? user.fullname : "Supervisor"}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden lg:block" />
                <BreadCrumbGenerator role={"supervisor"} crumbs={crumbs} />
              </BreadcrumbList>
            </Breadcrumb>

            <div className="relative ml-auto flex-1 md:grow-0">
              <Select>
                <SelectTrigger className="md:w-[200px] lg:w-[246px] ">
                  <div className="flex items-center gap-2">
                    <Dot
                      strokeWidth={8}
                      className={cn(
                        "w-5 h-5" && user.isAvailable
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    />
                    {user.isAvailable
                      ? "Accepting Projects"
                      : "Not Accepting Projects"}{" "}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex">Accepting Projects</div>
                  </SelectItem>
                  <SelectItem value="dark">Not Accepting Projects</SelectItem>
                </SelectContent>
              </Select>
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

export default SupervisorLayout;
