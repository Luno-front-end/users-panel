import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getUsers = async (token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
  }
};

const getFile = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/file?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
  }
};

const Api = {
  getUsers,
  getFile,
};

export default Api;
