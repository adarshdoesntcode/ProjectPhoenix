import Loader from "@/components/Loader";
import { useGetAllProjectsQuery } from "../adminApiSlice";
import ApiError from "@/components/error/ApiError";

function AdminProjects() {
  const {
    data: projects,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetAllProjectsQuery();

  let content;
  console.log(projects);

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    if (!projects) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No projects</h3>

            <p className="text-sm text-gray-500">
              Projects will appear when students create them
            </p>
          </div>
        </div>
      );
    } else {
      content = <div></div>;
    }
  } else if (isError) {
    content = <ApiError error={error} />;
  }

  console.log(projects);

  return content;
}

export default AdminProjects;
