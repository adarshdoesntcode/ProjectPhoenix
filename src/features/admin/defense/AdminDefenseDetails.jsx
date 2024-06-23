import { useNavigate, useParams } from "react-router-dom";

import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetDefenseDetailQuery } from "../adminApiSlice";

function AdminDefenseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: defense, isLoading, isSuccess } = useGetDefenseDetailQuery(id);
  let content;
  console.log(defense);

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div>
        <div className="text-xl font-semibold tracking-tight flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          Defense Details
        </div>
        <Card className="max-w-[450px] mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Defense
              <Badge>{defense.data.defenseType.toUpperCase()}</Badge>
            </CardTitle>
            <CardDescription className="text-xs">
              Details of this defense
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2"></CardContent>
        </Card>
      </div>
    );
  }

  return content;
}

export default AdminDefenseDetails;
