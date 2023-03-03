import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../Redux/slices/authUser";
import s from "./profile.module.scss";

interface OptionMainProfileProps {
  isActiveOption: boolean;
  setIsActiveOption: Dispatch<SetStateAction<boolean>>;
}

export const OptionMainProfile: FC<OptionMainProfileProps> = ({
  isActiveOption,
  setIsActiveOption,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    setIsActiveOption(!isActiveOption);
    dispatch(auth({ token: "", user: [], isAuth: false }));
    navigate("/");
  };

  return (
    <div
      className={
        isActiveOption
          ? `${s.option_profile} ${s.active_optionProfile}`
          : s.option_profile
      }
    >
      <ul className={s.option_profileList}>
        <li className={s.option_profileItem}>
          <Link
            to="/profile"
            className={s.btn_logout}
            onClick={() => setIsActiveOption(!isActiveOption)}
          >
            Профіль
          </Link>
        </li>
        <li className={s.option_profileItem}>
          <button type="submit" className={s.btn_logout} onClick={logout}>
            Вийти
          </button>
        </li>
      </ul>
    </div>
  );
};
