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
  Origami,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROLES_LIST } from "@/config/roleList";

function Landing() {
  return (
    <>
      <div className="col-span-12 max-w-lg mx-auto text-center pt-12 pb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-origami mx-auto"
        >
          <path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025" />
          <path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009" />
          <path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027" />
        </svg>

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
            Click the link below to explore your portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to={`${ROLES_LIST.student}/login`}>
            <Button className="w-full mt-0" variant="secondary">
              <GraduationCap className="mr-2 h-4 w-4" /> Student
            </Button>
          </Link>

          <Link to={`${ROLES_LIST.supervisor}/login`}>
            <Button className="w-full mt-4" variant="secondary">
              <Cctv className="mr-2 h-4 w-4" /> Supervisor
            </Button>
          </Link>

          <Link to={`${ROLES_LIST.defense}/login`}>
            <Button className="w-full mt-4 " variant="secondary">
              <FileCheck className="mr-2 h-4 w-4" /> Defense
            </Button>
          </Link>

          <Link to={`${ROLES_LIST.admin}/login`}>
            <Button className="w-full mt-4" variant="secondary">
              <ShieldCheck className="mr-2 h-4 w-4" />
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
