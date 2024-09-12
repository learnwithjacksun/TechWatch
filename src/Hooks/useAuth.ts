import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  const { user, register, login, logout } = authContext;

  return { user, register, login, logout };
};

export default useAuth;
