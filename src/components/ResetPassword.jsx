import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { API_BASE_URL } from "@/lib/config";
import { useForm } from "react-hook-form";

export function ResetPassword({ forgotPassword, setForgotPassword, role }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const [otp, setOpt] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSendEmail = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/forgotPassword/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      if (response.status === 200) {
        const token = await response.json();
        setToken(token.accessToken);
        setIsLoading(false);
        setStep(2);
      } else if (response.status === 404) {
        setIsLoading(false);
        throw new Error("The email does not exist");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went Wrong",
        description: error.message,
      });
      setIsLoading(false);
    }
  };
  const onSendOTP = async (e) => {
    e.preventDefault();
    if (!otp || !token) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/forgotPassword/OTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ OTP: otp }),
      });

      console.log(response);

      if (response.status === 200) {
        const token = await response.json();
        setToken(token.accessToken);
        setIsLoading(false);
        setStep(3);
      } else if (response.status === 401) {
        setIsLoading(false);
        throw new Error("OTP did not match");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went Wrong",
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  const onSendPassword = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forgotPassword/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: data.password }),
      });

      if (response.status === 200) {
        setToken("");
        setForgotPassword(false);
        setEmail("");
        reset();
        setOpt("");
        toast({
          title: "Password Changed Successfully",
          description: "Login with the new password",
        });
      } else {
        throw new Error("Try again");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went Wrong",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={forgotPassword} onOpenChange={setForgotPassword}>
      <DialogContent className="w-[350px] md:w-[450px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                You will receive an email if you provide a valid email id
              </DialogDescription>
            </DialogHeader>

            <form>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end">
                {isLoading ? (
                  <Button variant="secondary" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Receive OTP
                  </Button>
                ) : (
                  <Button onClick={onSendEmail}>Receive OTP</Button>
                )}
              </div>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter the OTP you received in your email within 10 mins
              </DialogDescription>
            </DialogHeader>

            <form>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="otp">OTP</Label>
                  <div className="col-span-4 mx-auto">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOpt(value)}
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
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                {isLoading ? (
                  <Button variant="secondary" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending..
                  </Button>
                ) : (
                  <Button onClick={onSendOTP}>Send</Button>
                )}
              </div>
            </form>
          </>
        )}
        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>Enter your new password</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSendPassword)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    {errors.password ? (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    ) : (
                      <span>Password</span>
                    )}
                  </Label>
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
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                          message:
                            "Password must contain 1 lowercase, 1 uppercase, 1 number, and 1 special character",
                        },
                      })}
                      className={errors.password ? "border-red-500" : ""}
                    />
                  </div>
                </div>
                <div className="grid  items-center gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      {errors.confirmPassword ? (
                        <span className="text-red-500">
                          {errors.confirmPassword.message}
                        </span>
                      ) : (
                        <span>Confirm Password</span>
                      )}
                    </Label>
                    <div className="relative">
                      {showConfirmPassword ? (
                        <Eye
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute cursor-pointer text-gray-400 right-3 top-2.5 h-5 w-5"
                        />
                      ) : (
                        <EyeOff
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute cursor-pointer text-gray-400 right-3 top-2.5 h-5 w-5"
                        />
                      )}

                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        {...register("confirmPassword", {
                          validate: (value) =>
                            value === watch("password") ||
                            "The passwords do not match",
                        })}
                        className={
                          errors.confirmPassword ? "border-red-500" : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  type="button"
                  size="icon"
                  onClick={() => setStep(2)}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                {isSubmitting ? (
                  <Button variant="secondary" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing..
                  </Button>
                ) : (
                  <Button type="submit">Change Password</Button>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
