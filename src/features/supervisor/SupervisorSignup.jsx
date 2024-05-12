import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../auth/authApiSlice";
import { ROLES_LIST } from "@/config/config";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

function SupervisorSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSignup = async (data) => {
    try {
      const res = await signup({
        fullname: data.name,
        email: data.email,
        password: data.password,
        role: ROLES_LIST.supervisor,
        phoneNumber: data.phone,
      });
      if (res.error) {
        if (res.error.originalStatus === 409) {
          throw new Error("Conflict error");
        }
      }
      if (!res.error) {
        reset();
        toast({
          title: "Account created successfully!",
          description: "You can now login.",
        });
        navigate(`/${ROLES_LIST.supervisor}/login?tab=login`);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh Oh !!",
        description: "Account with this email already exists.",
      });
    }
  };
  return (
    <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSignup)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">
            {errors.name ? (
              <span className="text-red-500">{errors.name.message}</span>
            ) : (
              <span>Full name</span>
            )}
          </Label>
          <Input
            id="name"
            {...register("name", {
              required: "Full name is required",
              pattern: {
                value: /^[a-z ,.'-]+$/i,
                message: "Invalid name",
              },
            })}
            className={errors.name ? "border-red-500" : ""}
          />
        </div>
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
              pattern: {
                value: /^[a-zA-Z]+@ncit.edu.np$/,
                message: "Invalid email address",
              },
            })}
            className={errors.email ? "border-red-500" : ""}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">
            {errors.phone ? (
              <span className="text-red-500">{errors.phone.message}</span>
            ) : (
              <span>Phone number</span>
            )}
          </Label>
          <Input
            id="phone"
            type="number"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^9\d{9}$/,
                message: "Invalid phone number",
              },
            })}
            className={errors.phone ? "border-red-500" : ""}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">
            {errors.password ? (
              <span className="text-red-500">{errors.password.message}</span>
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
                  message: "Password must be at least 8 characters long",
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute cursor-pointer text-gray-400 right-3 top-2.5 h-5 w-5"
              />
            ) : (
              <EyeOff
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute cursor-pointer text-gray-400 right-3 top-2.5 h-5 w-5"
              />
            )}

            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "The passwords do not match",
              })}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
          </div>
        </div>
        {isSubmitting || isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Acount
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        )}
      </form>

      <div className="  mx-auto text-center  text-slate-400 text-xs">
        <p>Use the Email account provided by the college.</p>
      </div>
    </div>
  );
}

export default SupervisorSignup;
