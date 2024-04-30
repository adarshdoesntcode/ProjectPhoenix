import GridLayout from "./GridLayout";
import LandingNavBar from "./LandingNavBar";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SupervisorLogin() {
  return (
    <GridLayout>
      <LandingNavBar />
      <div className="col-span-12 max-w-lg mx-auto text-center py-10">
        <h1 className="font-bold text-3xl tracking-tight leading-10">
          Supervisor Portal
        </h1>
        <p className="text-slate-500">Guidance, Feedback, Progress.</p>
      </div>

      <Tabs
        defaultValue="login"
        className="w-[400px] mt-4 col-span-12  max-w-xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>
                Enter your college email below to login
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
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Phone number</Label>
                  <Input id="phoneno" type="number" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name.rollno@ncit.edu.np"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button type="submit" variant="secondary" className="w-full">
                  Create an account
                </Button>
                <Separator className="my-2 w-full" />

                <Button className="w-full">Sign Up with Google</Button>
                <div className="  mx-auto text-center  text-slate-400 text-xs">
                  <p>Use the Google Account provided by the college.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="col-span-12 max-w-lg mx-auto text-center my-14 text-slate-400 text-xs">
        <p>Made by the students for the students.</p>
      </div>
    </GridLayout>
  );
}

export default SupervisorLogin;
