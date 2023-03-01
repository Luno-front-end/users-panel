import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuthUserValue } from "../../Redux/slices/authUser";
import { useSignUp } from "../hooks/useSignUp";
import s from "./auth.module.scss";

export const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useSignUp();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAuthUserValue({
        email,
        password,
      })
    );
  }, [email, password]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={s.wrapper_form}
      onSubmit={(e) => {
        login(e);
      }}
    >
      <form className={s.form_auth}>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          required
          value={email}
          className={s.input_auth}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          required
          value={password}
          className={s.input_auth}
          onChange={handleChange}
        />
        <button type="submit" className={s.btn_auth}>
          Зареєструватися
        </button>
      </form>
    </div>
  );
};
