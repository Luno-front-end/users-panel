import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

export const useSignUp = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const userAuthInfo = useSelector((state: RootState) => state.userAuth);

  const registration = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:8080/auth/registration", {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        nickname: userInfo.nickname,
        email: userInfo.email,
        password: userInfo.password,
        nameOrganization: userInfo.nameOrganization,
      });
      const data = await res.data;
      console.log(data);
    } catch (error) {}
  };

  const login = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:8080/auth/login", {
        email: userAuthInfo.email,
        password: userAuthInfo.password,
      });
      const data = await res.data;
      console.log(data);
    } catch (error) {}
  };

  return { registration, login };
};
