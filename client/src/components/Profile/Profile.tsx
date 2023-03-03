import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useAuth } from "../hooks/useAuth";

import s from "./profile.module.scss";

export const Profile: FC = () => {
  const user = useSelector((state: RootState) => state.userAuth.userAuth.user);
  const { authUser } = useAuth();
  useEffect(() => {
    authUser();
  }, []);

  return (
    <div className={s.wrapperProfile}>
      <ul className={s.listProfile}>
        <li className={s.profile}>
          <p>{user[0].email.slice(0, 1)}</p>
        </li>
        <li className={s.itemProfile}>
          <span className={s.name}>Імʼя: </span>
          <span className={s.nameState}>{user[0].firstname}</span>
        </li>
        <li className={s.itemProfile}>
          <span className={s.name}>Фамілія: </span>
          <span className={s.nameState}>{user[0].lastname}</span>
        </li>
        <li className={s.itemProfile}>
          <span className={s.name}>Нікнейм: </span>
          <span className={s.nameState}>{user[0].nickname}</span>
        </li>
        <li className={s.itemProfile}>
          <span className={s.name}>E-mail: </span>
          <span className={s.nameState}>{user[0].email}</span>
        </li>
        <li className={s.itemProfile}>
          <span className={s.name}>Організація: </span>
          <span className={s.nameState}>{user[0].organizationName}</span>
        </li>
      </ul>
    </div>
  );
};
