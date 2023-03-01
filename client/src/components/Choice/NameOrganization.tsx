import { ChangeEvent, FC, useEffect, useState } from "react";
import s from "./choiseUser.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrgName } from "../../Redux/slices/user";

interface NameOrganizationProps {
  isActive: boolean;
}

export const NameOrganization: FC<NameOrganizationProps> = ({ isActive }) => {
  const [nameOrg, setNameOrg] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrgName({ nameOrg }));
  }, [nameOrg]);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameOrg(e.target.value);
  };

  const handleClick = () => {
    if (nameOrg.length <= 2) {
      console.log("Треба більше 2х символів");
      return;
    }
    return navigate("/signup");
  };
  return (
    <div
      className={
        isActive
          ? `${s.wrapper_orgName} ${s.active_orgName}`
          : `${s.wrapper_orgName} `
      }
    >
      <input
        type="text"
        className={s.name_org}
        placeholder="Назва організації"
        onChange={handleChange}
      />
      <button type="submit" className={s.btn_next} onClick={handleClick}>
        Далі
      </button>
    </div>
  );
};
