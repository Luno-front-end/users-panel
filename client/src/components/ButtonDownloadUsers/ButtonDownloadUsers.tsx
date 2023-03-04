import s from "./buttonDownloadUsers.module.scss";
import { CSVLink } from "react-csv";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

export const ButtonDownloadUsers: FC = () => {
  const users = useSelector((state: RootState) => state.allUsers.user);

  return (
    <CSVLink data={users} filename={"Users.csv"} className={s.btn}>
      Завантажити список користувачів 'CSV'
    </CSVLink>
  );
};
