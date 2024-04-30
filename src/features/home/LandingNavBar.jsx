import { Dot } from "lucide-react";
import { Button } from "../../components/ui/button";

function LandingNavBar() {
  return (
    <div className="col-span-12  self-center p-4 flex justify-between">
      <div className="flex items-center  gap-2">
        <h1 className="text-base tracking-tight font-semibold leading-none p-2">
          . / Project Phoenix /
        </h1>
      </div>
      <div>
        <Button variant="link">About</Button>
        <Button variant="link">Contact</Button>
      </div>
    </div>
  );
}

export default LandingNavBar;
