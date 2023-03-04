import { AxiosError } from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Redux/slices/authUser";
import { onNotify, setMessage } from "../../Redux/slices/notify";
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

      const activeError = err?.response?.data?.valid?.errors
        ? err.response.data.valid.errors[0].msg
        : err.response.data.message;

      dispatch(onNotify(true));

      dispatch(
        setMessage({
          erorrMessage: activeError,
        })
      );
      setTimeout(() => {
        dispatch(onNotify(false));
      }, 7000);
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await Auth.login(e, userInfo).catch((err) => err);

    if (!!data?.response?.status) {
      dispatch(onNotify(true));
      dispatch(
        setMessage({
          erorrMessage: data.response.data.message,
        })
      );
      setTimeout(() => {
        dispatch(onNotify(false));
      }, 7000);
      return;
    }

    dispatch(auth({ token: data.token, user: [data.user], isAuth: true }));

    navigate("/");
  };

  const authUser = async () => {
    try {
      const data = await Auth.authUser(userAuthInfo.userAuth.token);

      dispatch(auth({ token: data.token, user: [data.user], isAuth: true }));
    } catch (err: any) {
      navigate("/signin");
      dispatch(auth({ token: "", user: [], isAuth: false }));
      dispatch(onNotify(true));
      dispatch(
        setMessage({
          erorrMessage: err.message,
        })
      );
    }
  };

  return { registrationUser, login, authUser };
};
