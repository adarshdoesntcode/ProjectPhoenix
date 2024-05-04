import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto">
      <div className="col-span-12  self-center p-4 flex justify-between">
        <Link to={"/"} className="flex items-center  gap-2">
          <h1 className="text-base transition hover:scale-105 tracking-tight font-semibold leading-none p-2">
            . / Project Phoenix /
          </h1>
        </Link>
        <div>
          <Button variant="link">About</Button>
          <Button variant="link">Contact</Button>
        </div>
      </div>
      <Card className="mt-[25vh] col-span-12 w-[400px] max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center"> 404</CardTitle>
          <CardTitle className="text-2xl text-center"> Not Found !</CardTitle>
          <CardDescription className="text-center ">
            You page you are requesting does not exist.
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

export default NotFound;
