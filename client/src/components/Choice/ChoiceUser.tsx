import { FC, useState } from "react";

import s from "./choiseUser.module.scss";
import { NameOrganization } from "./NameOrganization";

export const ChoiceUser: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onActiveChangeNameOrg = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={`${s.wrapper_choiseUser} ${s.active_wrapper}`}>
        <button
          type="submit"
          className={isActive ? `${s.btn} ${s.active_btn}` : `${s.btn}`}
          onClick={onActiveChangeNameOrg}
        >
          Юридична особа
        </button>
        <button type="submit" className={s.btn} name="btn-disabled" disabled>
          Фізична особа
        </button>
        {isActive && <NameOrganization isActive={isActive} />}
      </div>
    </>
  );
};
