import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/Auth/SignIn";
import { SignUp } from "./components/Auth/SignUp";
import { ChoiceUser } from "./components/Choice/ChoiceUser";
import { Header } from "./components/Header/Header";

export const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/signup" element={<ChoiceUser />} /> */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup/*" element={<SignUp />} />
        <Route path="*" element={<h2>Ресурс не найден</h2>} />
      </Routes>
    </>
  );
};
