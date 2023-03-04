import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/Auth/SignIn";
import { SignUp } from "./components/Auth/SignUp";
import { Header } from "./components/Header/Header";
import { HomePage } from "./components/HomePage/HomePage";
import { PrivateRoute } from "./components/Routes/PrivateRoute";

import { Profile } from "./components/Profile/Profile";
import { Users } from "./components/Users/Users";
import { PublicRoute } from "./components/Routes/PublicRoute";
import { Tost } from "./components/Tost/Tost";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";

export const App: FC = () => {
  const [files, setFiles] = useState<object>({});
  const onErorr = useSelector((state: RootState) => state.notify);

  return (
    <>
      {onErorr.activeNotify && <Tost />}

      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="signup/*"
          element={
            <PublicRoute>
              <SignUp setFiles={setFiles} files={files} />
            </PublicRoute>
          }
        />
        <Route path="*" element={<h2>Ресурс не найден</h2>} />
      </Routes>
    </>
  );
};
