import GridLayout from "./GridLayout";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LandingNavBar from "./LandingNavBar";
import { Button } from "./components/ui/button";
import { FileCheck, GraduationCap, ShieldCheck, Users } from "lucide-react";

function Landing() {
  return (
    <GridLayout>
      <LandingNavBar />
      <Separator className="col-span-12" />

      <div className="col-span-12 max-w-lg mx-auto text-center py-14">
        <h1 className="font-bold text-3xl tracking-tight leading-10">
          New Proposal, Whole Notion
        </h1>
        <p className="text-slate-500">
          A Complete Solution for College Projects.
        </p>
      </div>
      <Card className="mt-8 col-span-12 w-[350px] max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Click the link below to explore your portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full mt-0" variant="outline">
            <GraduationCap className="mr-2 h-4 w-4" /> Student
          </Button>
          <Button className="w-full mt-4" variant="outline">
            <Users className="mr-2 h-4 w-4" /> Supervisor
          </Button>
          <Button className="w-full mt-4 " variant="outline">
            <FileCheck className="mr-2 h-4 w-4" /> Defense
          </Button>
          <Button className="w-full mt-4" variant="outline">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Administrator
          </Button>
        </CardContent>
      </Card>
      <div className="col-span-12 max-w-lg mx-auto text-center mt-14 text-slate-400 text-xs">
        <p>Made by the students for the students of NCIT.</p>
        <p></p>
      </div>
    </GridLayout>
  );
}

export default Landing;
