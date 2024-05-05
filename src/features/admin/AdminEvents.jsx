import { Button } from "@/components/ui/button";

function AdminEvents() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border bg-white border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Events
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start as soon as you add a event.
          </p>

          <Button className="mt-4">Add Event</Button>
        </div>
      </div>
    </>
  );
}

export default AdminEvents;
