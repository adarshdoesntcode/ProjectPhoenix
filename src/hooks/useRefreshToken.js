import { logOut, setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { authApiSlice } from "@/features/auth/authApiSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const resultAction = await dispatch(
        authApiSlice.endpoints.refresh.initiate(undefined, {
          forceRefetch: true,
        })
      );
      if (resultAction.status === "fulfilled") {
        const refreshData = resultAction.data;

        if (refreshData) {
          dispatch(setCredentials({ data: refreshData }));
        }
      } else {
        dispatch(logOut());
      }
    } catch (error) {
      dispatch(logOut());
    }
  };

  return refresh;
};

export default useRefreshToken;
