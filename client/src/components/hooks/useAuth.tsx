import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Redux/slices/authUser";
import { RootState } from "../../Redux/store";
import Auth from "../../services/auth";

export const useAuth = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const userAuthInfo = useSelector((state: RootState) => state.userAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registrationUser = async (e: React.FormEvent, file: object) => {
    try {
      e.preventDefault();

      const data = await Auth.registration(e, file, userInfo);

      dispatch(auth({ token: data.token, user: [data.user], isAuth: true }));

      navigate("/");
    } catch (err: any) {
      dispatch(auth({ token: "", user: [], isAuth: false }));
      navigate("/signup/choise");
      console.log(err);
      console.log(err.response.data.valid.errors);
    }
  };

  const login = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const data = await Auth.login(e, userInfo);
      console.log("log", data);

      dispatch(auth({ token: data.token, user: [data.user], isAuth: true }));

      navigate("/");
    } catch (error) {}
  };

  const authUser = async () => {
    try {
      const data = await Auth.authUser(userAuthInfo.userAuth.token);

      dispatch(auth({ token: data.token, user: [data.user], isAuth: true }));
    } catch (error) {
      navigate("/signin");
      dispatch(auth({ token: "", user: [], isAuth: false }));
    }
  };

  return { registrationUser, login, authUser };
};
