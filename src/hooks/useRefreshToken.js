import { setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { authApiSlice } from "@/features/auth/authApiSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const { data: refreshData } = await dispatch(
        authApiSlice.endpoints.refresh.initiate(undefined, {
          forceRefetch: true,
        })
      );

      if (refreshData) dispatch(setCredentials({ data: refreshData }));
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
