import { Label } from "@radix-ui/react-label";
import GridLayout from "../../components/layouts/GridLayout";
import LandingNavBar from "../home/LandingNavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

function AdminLogin() {
  return (
    <GridLayout>
      <LandingNavBar />
      <div className="col-span-12 max-w-lg mx-auto text-center py-10">
        <h1 className="font-bold text-3xl tracking-tight leading-10">
          Administrator Portal
        </h1>
        <p className="text-slate-500">Management, Control, Precision.</p>
      </div>

      <Card className="mt-4 col-span-12 w-[400px] max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your administrator email below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@ncit.edu.np"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a className="ml-auto font-normal leading-none inline-block py-0 text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button variant="secondary" type="submit" className="w-full">
              Login
            </Button>

            <Separator className="my-2 w-full" />

            <Button className="w-full">Login with Google</Button>
            <div className="  mx-auto text-center  text-slate-400 text-xs">
              <p>Use the Google Account provided by the college.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="col-span-12 max-w-lg mx-auto text-center my-14 text-slate-400 text-xs">
        <p>Made by the students for the students.</p>
      </div>
    </GridLayout>
  );
}

export default AdminLogin;
