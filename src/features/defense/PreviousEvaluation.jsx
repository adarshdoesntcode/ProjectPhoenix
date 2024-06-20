import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCheck } from "lucide-react";

function PreviousEvaluation({ project }) {
  return (
    <Card className="xl:sticky top-32 grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-8 xl:col-span-4">
      <CardHeader className="flex flex-row rounded-t-md border-b py-4 bg-slate-100 justify-between items-center">
        <div>
          <CardTitle className="text-lg">Previous Evaluations</CardTitle>
          <CardDescription className="text-xs">
            Project evaluations from the previous defenses
          </CardDescription>
        </div>

        <BookCheck className="text-slate-500" />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default PreviousEvaluation;
