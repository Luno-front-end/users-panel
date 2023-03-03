import { ChangeEvent, FC, MouseEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { OptionMainProfile } from "../Profile/OptionMainProfile";
import s from "./header.module.scss";

export const Header: FC = () => {
  const [isActiveOption, setIsActiveOption] = useState<boolean>(false);
  const userAuth = useSelector((state: RootState) => state.userAuth.userAuth);
  const location = useLocation();

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsActiveOption(!isActiveOption);
  };

  return (
    <>
      <div className={s.wrapper_header}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }): string =>
                isActive ? s.auth_linkActive : s.auth_link
              }
            >
              Головна
            </NavLink>
          </li>
        </ul>
        {!userAuth.isAuth ? (
          <ul className={s.auth_list}>
            <li className={s.auth_item}>
              <NavLink
                to="/signin"
                className={({ isActive }): string =>
                  isActive ? s.auth_linkActive : s.auth_link
                }
              >
                Увійти
              </NavLink>
            </li>
            <li className={s.auth_item}>
              <NavLink
                end
                to="/signup/choise"
                className={
                  location.pathname === "/signup" ||
                  location.pathname === "/signup/choise"
                    ? s.auth_linkActive
                    : s.auth_link
                }
              >
                Зареєструватися
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className={s.auth_list}>
            <li className={s.auth_item}>
              <NavLink
                to="/users"
                className={({ isActive }): string =>
                  isActive ? s.auth_linkActive : s.auth_link
                }
              >
                Таблиця користувачів
              </NavLink>
            </li>
            <li className={`${s.auth_item} ${s.profile_item}`}>
              <button className={s.profile} onClick={handleClick}>
                <span>{userAuth.user[0].email.slice(0, 1)}</span>
              </button>
            </li>
          </ul>
        )}
      </div>
      <OptionMainProfile
        isActiveOption={isActiveOption}
        setIsActiveOption={setIsActiveOption}
      />
    </>
  );
};
