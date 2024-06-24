import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
      <Loader2 className="h-6 w-6 animate-spin mr-4" />
    </div>
  );
}

export default Loader;
