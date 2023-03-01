import { ChangeEvent, FC, useEffect, useState } from "react";
import s from "./auth.module.scss";
import { useSignUp } from "../hooks/useSignUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { getUserValue } from "../../Redux/slices/user";
import { IUser } from "../../types/userTypes";

export const FormReg: FC = () => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { registration } = useSignUp();

  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log(value);
    dispatch(
      getUserValue({
        firstname,
        lastname,
        nickname,
        email,
        password,
      })
    );
  }, [firstname, lastname, nickname, email, password]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "nickname":
        setNickname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={s.wrapper_form}
      onSubmit={(e) => {
        registration(e);
      }}
    >
      <form className={s.form_auth}>
        <input
          type="text"
          name="firstname"
          placeholder="Імʼя"
          required
          value={firstname}
          className={s.input_auth}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Фамілія"
          name="lastname"
          required
          value={lastname}
          className={s.input_auth}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          required
          value={nickname}
          className={s.input_auth}
          onChange={handleChange}
        />
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
