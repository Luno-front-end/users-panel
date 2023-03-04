import { Dispatch, FC, SetStateAction } from "react";
import { Route, Routes } from "react-router-dom";
import { ChoiceUser } from "../Choice/ChoiceUser";
import { FormReg } from "./FormReg";

interface SignUpProps {
  setFiles: Dispatch<SetStateAction<object>>;
  files: object;
}

export const SignUp: FC<SignUpProps> = ({ setFiles, files }) => {
  return (
    <>
      <Routes>
        <Route path="choise" element={<ChoiceUser setFiles={setFiles} />} />
        <Route path="/" element={<FormReg files={files} />} />
      </Routes>
    </>
  );
};
