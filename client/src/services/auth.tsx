import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/userTypes";
import File from "./uploadFiles";

const BASE_URL = "https://user-panel-ddhs.onrender.com/auth";

const registration = async (
  e: React.FormEvent,
  file: object,
  userInfo: IUser
) => {
  let err = null;
  e.preventDefault();

  const res = await axios
    .post(`${BASE_URL}/registration`, {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      nickname: userInfo.nickname,
      email: userInfo.email,
      password: userInfo.password,
      nameOrganization: userInfo.organizationName,
    })
    .then((res: AxiosResponse) => res.data);

  const resFile = await File.uploadFile(file, res.token);

  if (!!resFile?.response?.status) {
    err = resFile;

    return err;
  }

  return err !== null ? resFile : res;
};

const login = async (e: React.FormEvent, userInfo: IUser) => {
  e.preventDefault();
  const res = await axios
    .post(`${BASE_URL}/login`, {
      email: userInfo.email,
      password: userInfo.password,
    })
    .then((res: AxiosResponse) => res.data);
  return res;
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
