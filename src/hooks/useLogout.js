import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { logOut } from "@/features/auth/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      dispatch(logOut());
      await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
