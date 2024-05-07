import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ROLES_LIST } from "@/config/roleList";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../auth/authApiSlice";

function StudentSignup() {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSignup = async (data) => {
    try {
      const res = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        roles: [ROLES_LIST.student],
        phone: data.phone,
        // program: data.program,
      });
      if (res.error) {
        if (res.error.originalStatus === 409) {
          throw new Error("Conflict error occurred");
        }
      }
      if (!res.error) {
        reset();
        toast({
          title: "Account created successfully!",
          description: "You can now login.",
        });
        navigate(`/${ROLES_LIST.student}/login?mode=login`);
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
            placeholder="name.rollno@ncit.edu.np"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+\.(\d{6})@ncit\.edu\.np$/,
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
          <Label htmlFor="program">Program</Label>
          <Select
            onValueChange={(value) => setValue("program", value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="SE">Software Engineering</SelectItem>
                <SelectItem value="CE">Computer Engineering</SelectItem>
                <SelectItem value="ELX">Electrical Engineering</SelectItem>
                <SelectItem value="IT">Information Technology</SelectItem>
                <SelectItem value="CA">Computer Application</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">
            {errors.password ? (
              <span className="text-red-500">{errors.password.message}</span>
            ) : (
              <span>Password</span>
            )}
          </Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            className={errors.password ? "border-red-500" : ""}
          />
        </div>
        {isSubmitting || isLoading ? (
          <Button variant="secondary" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Acount
          </Button>
        ) : (
          <Button variant="secondary" type="submit" className="w-full">
            Create an account
          </Button>
        )}
      </form>
      <div className="relative my-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-400">Or continue with</span>
        </div>
      </div>

      <Button className="w-full">Sign Up with Google</Button>
      <div className="  mx-auto text-center  text-slate-400 text-xs">
        <p>Use the Google Account provided by the college.</p>
      </div>
    </div>
  );
}

export default StudentSignup;
