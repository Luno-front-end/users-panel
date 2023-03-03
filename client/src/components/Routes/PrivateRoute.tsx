import { useSelector } from "react-redux";

import { RootState } from "../../Redux/store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = useSelector(
    (state: RootState) => state.userAuth.userAuth.isAuth
  );
  if (!isAuth) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};
