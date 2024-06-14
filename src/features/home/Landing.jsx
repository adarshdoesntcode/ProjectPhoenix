import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Cctv,
  FileCheck,
  GraduationCap,
  ShieldCheck,
  ShieldHalf,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROLES_LIST, animationProps } from "@/lib/config";
import { motion } from "framer-motion";
import Phoenix from "./Phoenix";

function Landing() {
  return (
    <>
      <div className="col-span-12 max-w-lg mx-auto text-center pt-12 pb-10">
        <Phoenix className="mx-auto" />
        <h2 className="font-bold text-lg lg:text-xl pt-2 tracking-tight leading-none">
          Project Phoenix
        </h2>
        <h1 className="font-bold text-2xl lg:text-3xl pt-2 tracking-tight leading-10">
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
            Click the link below to access your portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to={`${ROLES_LIST.student}/login?tab=login`}>
            <Button className="w-full mt-0" variant="secondary">
              <GraduationCap className="mr-2 h-4 w-4" /> Student
            </Button>
          </Link>

          <Link to={`${ROLES_LIST.supervisor}/login?tab=login`}>
            <Button className="w-full mt-4" variant="secondary">
              <Cctv className="mr-2 h-4 w-4" /> Supervisor
            </Button>
          </Link>

          <Link to={`${ROLES_LIST.defense}/login`}>
            <Button className="w-full mt-4 " variant="secondary">
              <ShieldCheck className="mr-2 h-4 w-4" /> Defense
            </Button>
          </Link>

          <Link to={`${ROLES_LIST.admin}/login`}>
            <Button className="w-full mt-4" variant="secondary">
              <ShieldHalf className="mr-2 h-4 w-4" />
              Administrator
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="col-span-12 max-w-lg mx-auto text-center my-14 text-slate-400 text-xs">
        <p>Made by the students for the students.</p>
      </div>
    </>
  );
}

export default Landing;
