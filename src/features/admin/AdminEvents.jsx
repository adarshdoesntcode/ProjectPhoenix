import { Button } from "@/components/ui/button";
import { ROLES_LIST } from "@/config/config";
import { Link } from "react-router-dom";

function AdminEvents() {
  return (
    <>
      <div className="flex flex-1 items-center justify-center   bg-slate-50 ">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Events
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start as soon as you add a event.
          </p>

          <Button className="mt-4" asChild>
            <Link to={`/${ROLES_LIST.admin}/events/new`}>Create a Event</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminEvents;
