import { Loader2 } from "lucide-react";

function PersistLoader() {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white  z-50">
      <div className="flex justify-center items-center text-gray-600 mt-[50vh]">
        <Loader2 className="h-6 w-6 animate-spin mr-4" /> Loading...
      </div>
    </div>
  );
}

export default PersistLoader;
