import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../../components/ui/button";
import { FileCheck, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="col-span-12 max-w-lg mx-auto text-center pt-12 pb-10">
        <img
          src="phoenix-logo.png"
          className="w-14 mx-auto"
          alt="Phoenix Logo"
        />

        <h1 className="font-bold text-3xl pt-2 tracking-tight leading-10">
          New Proposal, Whole Notion
        </h1>
        <p className="text-slate-500">
          A Complete Solution for your College Projects.
        </p>
      </div>
      <Card className="mt-6 col-span-12 w-[350px] max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Portals</CardTitle>
          <CardDescription>
            Click the link below to explore your portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to={"student/login"}>
            <Button className="w-full mt-0" variant="secondary">
              <GraduationCap className="mr-2 h-4 w-4" /> Student
            </Button>
          </Link>

          <Link to={"supervisor/login"}>
            <Button className="w-full mt-4" variant="secondary">
              <Users className="mr-2 h-4 w-4" /> Supervisor
            </Button>
          </Link>

          <Link to={"defense/login"}>
            <Button className="w-full mt-4 " variant="secondary">
              <FileCheck className="mr-2 h-4 w-4" /> Defense
            </Button>
          </Link>

          <Link to={"admin/login"}>
            <Button className="w-full mt-4" variant="secondary">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Administrator
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="col-span-12 max-w-lg mx-auto text-center my-14 text-slate-400 text-xs">
        <p>Made by the students for the students.</p>
        <p></p>
      </div>
    </>
  );
}

export default Landing;
