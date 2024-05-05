import { Link, Outlet } from "react-router-dom";
import { Button } from "../ui/button";

function PublicAppLayout() {
  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto">
      <div className="col-span-12  self-center p-4 flex justify-between">
        <Link to={"/"} className="flex items-center  gap-2">
          <h1 className="text-base transition hover:scale-105 tracking-tight font-semibold leading-none p-2">
            . / Project Phoenix / Home
          </h1>
        </Link>
        <div>
          <Button variant="link">About</Button>
          <Button variant="link">Contact</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default PublicAppLayout;
