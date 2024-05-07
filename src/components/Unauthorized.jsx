import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Origami } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto">
      <div className="col-span-12  self-center p-4 flex justify-between">
        <Link to={"/"} className="flex items-center  gap-2">
          <h1 className="hidden lg:flex items-center gap-1 text-sm lg:text-base transition-all hover:pl-3  tracking-tight font-semibold leading-none p-2">
            <Origami />
            <span> / Project Phoenix / 401</span>
          </h1>
          <h1 className="flex lg:hidden items-center gap-1 text-sm lg:text-base transition-all hover:pl-3  tracking-tight font-semibold leading-none p-2">
            <Origami />
            <span> / Phoenix / 401</span>
          </h1>
        </Link>
        <div>
          <Button variant="link">About</Button>
          <Button variant="link">Support</Button>
        </div>
      </div>
      <Card className="mt-[25vh] col-span-12 w-[400px] max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center"> 401</CardTitle>
          <CardTitle className="text-2xl text-center">Unauthorized !</CardTitle>
          <CardDescription className="text-center ">
            You cannot access this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => goBack()}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
