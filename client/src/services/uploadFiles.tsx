import axios from "axios";

const BASE_URL = "http://localhost:8080";

const uploadFile = async (file: any, token?: string) => {
  try {
    const formData = new FormData();
    if (file) {
      for (let i = 0; i < file.length; i++) {
        const encodedFileName = encodeURIComponent(file[i].name);
        formData.append("file", file[i], encodedFileName);
      }
    }
    const res = await axios.post(`${BASE_URL}/file/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.data;
  } catch (err: any) {
    console.log(err);
    console.log(err.response.data.valid.errors);
  }
};

const downloadFile = async (id: string, name: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/file/download?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err: any) {
    console.log(err);
    console.log(err.response.data.valid.errors);
  }
};

const File = {
  uploadFile,
  downloadFile,
};

export default File;
