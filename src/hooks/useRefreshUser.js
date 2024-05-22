import { setCredentials, setUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { authApiSlice } from "@/features/auth/authApiSlice";

const useRefreshUser = () => {
  const dispatch = useDispatch();

  const refreshUser = async () => {
    try {
      const { data: user } = await dispatch(
        authApiSlice.endpoints.refreshUser.initiate(undefined, {
          forceRefetch: true,
        })
      );

      if (user) dispatch(setUser({ user }));
    } catch (error) {
      console.log(error);
    }
  };
  return refreshUser;
};

export default useRefreshUser;
