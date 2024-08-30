import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginMutation } from "../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";

import { useToast } from "@/components/ui/use-toast";

import { GOOGLE_OAUTH_REDIRECT_URL, ROLES_LIST } from "@/lib/config";
import { useState } from "react";
import { getGoogleOAuthURL } from "@/lib/utils";
import { ResetPassword } from "@/components/ResetPassword";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const home_path = window.location.origin;

  const from = location.state?.from?.pathname || `/${ROLES_LIST.admin}`;

  const onSubmit = async ({ email, password }) => {
    try {
      const userData = await login({
        email,
        password,
        role: ROLES_LIST.admin,
      });

      if (userData.error) {
        if (userData.error.status === 401)
          throw new Error("Email or password is incorrect.");
      }

      if (!userData.error) {
        dispatch(setCredentials({ ...userData }));
        reset();
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    }
  };

  return (
    <>
      <div className="col-span-12 max-w-lg mx-auto text-center py-10">
        <h1 className="font-bold text-3xl tracking-tight leading-10">
          Administrator Portal
        </h1>
        <p className="text-slate-500">Management, Control, Precision.</p>
      </div>

      <Card className="mt-4 col-span-12 w-[350px] lg:w-[400px] max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            Login
          </CardTitle>
          <CardDescription>
            Enter your administrator email below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  {errors.email ? (
                    <span className="text-red-500">{errors.email.message}</span>
                  ) : (
                    <span>Email</span>
                  )}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@ncit.edu.np"
                  {...register("email", {
                    required: "Email is required",
                    // pattern: {
                    //   value: /^[^\d@]+@ncit\.edu\.np$/,
                    //   message: "Invalid email address",
                    // },
                  })}
                  className={errors.email ? "border-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    {errors.password ? (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    ) : (
                      <span>Password</span>
                    )}
                  </Label>
                  <p
                    onClick={() => setForgotPassword(true)}
                    className="ml-auto font-normal leading-none cursor-pointer inline-block py-0 text-sm underline"
                  >
                    Forgot your password?
                  </p>
                </div>
                <div className="relative">
                  {showPassword ? (
                    <Eye
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer text-gray-400 right-3 top-2.5 h-5 w-5"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer text-gray-400 right-3 top-2.5 h-5 w-5"
                    />
                  )}

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={errors.password ? "border-red-500" : ""}
                  />
                </div>
              </div>
              {isSubmitting || isLoading ? (
                <Button variant="secondary" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging In
                </Button>
              ) : (
                <Button variant="secondary" type="submit" className="w-full">
                  Login
                </Button>
              )}
            </form>

            <ResetPassword
              forgotPassword={forgotPassword}
              setForgotPassword={setForgotPassword}
              role={ROLES_LIST.admin}
            />

            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            <Button className="w-full" asChild>
              <Link
                to={getGoogleOAuthURL(
                  GOOGLE_OAUTH_REDIRECT_URL,
                  ROLES_LIST.admin,
                  home_path
                )}
              >
                Login with Google
              </Link>
            </Button>
            <div className="  mx-auto text-center  text-slate-400 text-xs">
              <p>Use the Google Account provided by the college.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="col-span-12 max-w-lg mx-auto text-center my-14 text-slate-400 text-xs">
        <p>Made by the students for the students.</p>
      </div>
    </>
  );
}

export default AdminLogin;
