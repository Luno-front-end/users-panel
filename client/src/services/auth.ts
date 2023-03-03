import axios from "axios";
import { IUser } from "../types/userTypes";
import File from "./uploadFiles";

const BASE_URL = "http://localhost:8080/auth";

const registration = async (
  e: React.FormEvent,
  file: object,
  userInfo: IUser
) => {
  try {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/registration`, {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      nickname: userInfo.nickname,
      email: userInfo.email,
      password: userInfo.password,
      nameOrganization: userInfo.organizationName,
    });

    const data = await res.data;
    await File.uploadFile(file, data.token);
    return data;
  } catch (err: any) {
    console.log(err);
    console.log(err.response.data.valid.errors);
  }
};

const login = async (e: React.FormEvent, userInfo: IUser) => {
  try {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/login`, {
      email: userInfo.email,
      password: userInfo.password,
    });
    const data = await res.data;

    return data;
  } catch (error) {}
};

const authUser = async (token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.data;
    return data;
  } catch (error) {}
};

const Auth = {
  registration,
  login,
  authUser,
};

export default Auth;
