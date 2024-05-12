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
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { API_BASE_URL } from "@/config/config";

export function ResetPassword({ forgotPassword, setForgotPassword, role }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!otp && !token) return;

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

  const onSendPassword = async (e) => {
    e.preventDefault();
    if (!password && !confirmPassword) return;
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password and Confirm Password does not match",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/forgotPassword/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 200) {
        setToken("");
        setIsLoading(false);
        setForgotPassword(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setOpt("");
        toast({
          title: "Password Changed Successfully",
          description: "Login with the new password",
        });
      } else {
        setIsLoading(false);
        throw new Error("Try again");
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

            <form>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirmPassword" className="col-span-4">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmpassword"
                    type="password"
                    className="col-span-4"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setStep(2)}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                {isLoading ? (
                  <Button variant="secondary" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing..
                  </Button>
                ) : (
                  <Button onClick={onSendPassword}>Change Password</Button>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
