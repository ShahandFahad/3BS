// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";

const useAuth = () => {
  const user = useSelector((state) => state.user);

  return user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <SignIn />;
};

export default ProtectedRoutes;
