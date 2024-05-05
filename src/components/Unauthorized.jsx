import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Card className="mt-[25vh] col-span-12 w-[400px] max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center"> 401</CardTitle>
        <CardTitle className="text-2xl text-center"> Unauthorized !</CardTitle>
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
  );
};

export default Unauthorized;
