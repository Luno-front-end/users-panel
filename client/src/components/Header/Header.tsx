import { FC } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import s from "./header.module.scss";

export const Header: FC = () => {
  const location = useLocation();

  return (
    <div className={s.wrapper_header}>
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
    </div>
  );
};
