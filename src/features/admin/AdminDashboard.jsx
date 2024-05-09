import NotFound from "@/components/NotFound";
import Unauthorized from "@/components/Unauthorized";
import { Button } from "@/components/ui/button";

function AdminDashboard() {
  return (
    <>
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
      </div> */}
      <div className="flex flex-1 items-center justify-center   overflow-y-scroll bg-slate-50 ">
        <div className="grid grid-cols-12 w-full h-full"></div>
      </div>
    </>
  );
}

export default AdminDashboard;
