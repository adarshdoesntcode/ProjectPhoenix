import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetProjectQuery } from "../studentApiSlice";

function ProjectProgress() {
  const user = useSelector(selectCurrentUser);
  const {
    data: project,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectQuery(user.project, { skip: !user.isAssociated });

  console.log(project);
  return <div>jimgalala</div>;
}

export default ProjectProgress;
