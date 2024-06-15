import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Controller, useForm } from "react-hook-form";
import { ROLES_LIST } from "@/lib/config";
import { toast } from "@/components/ui/use-toast";
import { useDefenseLoginMutation } from "../auth/authApiSlice";
import { setCredentials } from "../auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Loader2 } from "lucide-react";

function DefenseLogin() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [defenseLogin, { isLoading }] = useDefenseLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || `/${ROLES_LIST.defense}`;

  const onSubmit = async ({ accessCode }) => {
    try {
      const userData = await defenseLogin({
        accessCode,
        role: ROLES_LIST.defense,
      });

      if (userData.error) {
        if (userData.error.originalStatus === 401) {
          throw new Error("Access Code is incorrect.");
        }
      }
      if (!userData.error) {
        dispatch(setCredentials({ ...userData }));
        reset();
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Access Failed",
        description: error.message,
      });
    }
  };
  return (
    <>
      <div className="col-span-12 max-w-lg mx-auto text-center py-10">
        <h1 className="font-bold text-3xl tracking-tight leading-10">
          Defense Portal
        </h1>
        <p className="text-slate-500">Assessment and Evaluation</p>
      </div>

      <Card className="w-[350px] lg:w-[400px] mt-4 col-span-12  max-w-xl mx-auto">
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
            Login with Access Code
          </CardTitle>
          <CardDescription>
            The defense portal is accessible with your access code only on the
            specified date and time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto grid gap-4 mb-2"
            >
              <Label htmlFor="accessCode">
                {errors.accessCode ? (
                  <span className="text-red-500">
                    {errors.accessCode.message}
                  </span>
                ) : (
                  <span>Access Code</span>
                )}
              </Label>
              <Controller
                control={control}
                name="accessCode"
                rules={{
                  required: "Access Code is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Access Code must be 6 digits",
                  },
                }}
                render={({ field }) => (
                  <InputOTP
                    onChange={field.onChange}
                    className={errors.accessCode ? "border-red-500" : ""}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />

              {isSubmitting || isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Accessing..
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Access
                </Button>
              )}
            </form>

            <div className="  mx-auto text-center  text-slate-400 text-xs">
              <p>Use the Access Code provided by the college.</p>
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

export default DefenseLogin;
