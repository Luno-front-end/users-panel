import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ChoiceUser } from "../Choice/ChoiceUser";
import { FormReg } from "./FormReg";

export const SignUp: FC = () => {
  return (
    <>
      <Routes>
        <Route path="choise" element={<ChoiceUser />} />
        <Route path="/" element={<FormReg />} />
      </Routes>
    </>
  );
};
