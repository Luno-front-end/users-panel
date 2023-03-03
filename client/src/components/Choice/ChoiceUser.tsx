import { Dispatch, FC, SetStateAction, useState } from "react";

import s from "./choiseUser.module.scss";
import { NameOrganization } from "./NameOrganization";

interface ChoiceUserProps {
  setFiles: Dispatch<SetStateAction<{}>>;
}

export const ChoiceUser: FC<ChoiceUserProps> = ({ setFiles }) => {
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
        {isActive && (
          <NameOrganization isActive={isActive} setFiles={setFiles} />
        )}
      </div>
    </>
  );
};
