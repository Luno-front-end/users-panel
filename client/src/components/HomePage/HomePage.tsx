import s from "./home.module.scss";

import React, { FC } from "react";

export const HomePage: FC = () => {
  return (
    <div className={s.wraper_hiro}>
      <h1 className={s.hiro_header}>
        DB<span className={s.hiro_subHeader}>Users</span>
      </h1>
      <p className={s.hiro_text}>База даних для вашої нової організації!</p>
    </div>
  );
};
