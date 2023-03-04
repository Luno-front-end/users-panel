import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Api from "../../services/getUsers";
import File from "../../services/uploadFiles";

import s from "./buttonDownloadFile.module.scss";

export const ButtonDownloadFile: FC = () => {
  const userAuth = useSelector((state: RootState) => state.userAuth.userAuth);
  const downloadClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = await Api.getFile(userAuth.user[0].file, userAuth.token);
    File.downloadFile(file.file._id, file.file.name, userAuth.token);
  };

  return (
    <button type="submit" onClick={(e) => downloadClick(e)} className={s.btn}>
      Завантажити свій файл організації.
    </button>
  );
};
