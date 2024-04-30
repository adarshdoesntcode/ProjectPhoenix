import { Button } from "./components/ui/button";

function LandingLogo() {
  return (
    <div className="col-span-12  self-center p-2 flex justify-between">
      <div className="flex items-center  gap-2">
        <img src="phoenix-logo.png" className="w-6" alt="Phoenix Logo" />
        <h1 className="text-base tracking-tight font-semibold leading-none mt-1">
          / <span className="font-semibold">Project</span> Phoenix /.
        </h1>
      </div>
      <div>
        <Button variant="link">About</Button>
        <Button variant="link">Contact</Button>
      </div>
    </div>
  );
}

export default LandingLogo;
