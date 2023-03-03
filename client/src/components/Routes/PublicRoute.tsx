import { useSelector } from "react-redux";

import { RootState } from "../../Redux/store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuth = useSelector(
    (state: RootState) => state.userAuth.userAuth.isAuth
  );
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
