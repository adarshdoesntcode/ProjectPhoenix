import axios from "@/api/axios";
import { setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    if (response.status === 200)
      dispatch(setCredentials({ data: response.data }));
  };
  return refresh;
};

export default useRefreshToken;
