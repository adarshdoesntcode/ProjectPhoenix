import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { getRoleByValue } from "@/lib/utils";
import { Origami } from "lucide-react";
import { useEffect } from "react";

function PublicAppLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto">
      <div className="col-span-12  self-center p-2 lg:p-4 flex h-14 justify-between">
        <Link to={"/"} className="flex items-center  gap-2">
          <h1 className="hidden lg:flex items-center gap-1 text-sm lg:text-base transition-all hover:pl-3  tracking-tight font-semibold leading-none p-2">
            <Origami />
            <span>{` / Project Phoenix / ${getRoleByValue(currentPath)}`}</span>
          </h1>
          <h1 className="flex lg:hidden items-center gap-1 text-sm lg:text-base transition-all hover:pl-3  tracking-tight font-semibold leading-none p-2">
            <Origami />
            <span>{` / Phoenix / ${getRoleByValue(currentPath)}`}</span>
          </h1>
        </Link>
        <div>
          <Button variant="link">About</Button>
          <Button variant="link">Support</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default PublicAppLayout;
