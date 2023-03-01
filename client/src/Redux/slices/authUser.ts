import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";
import type { RootState } from "../store";

interface UserAuthState {
  isAuth: boolean;
  email: string;
  password: string;
  tocken: string;
}

const initialState: UserAuthState = {
  isAuth: false,
  email: "",
  password: "",
  tocken: "",
};

//Треба записатти токен і чи авторизований юзер в локал сторедж
//Зробити редірек після успішної авторизації
//Автологінізація після успішної реєстрації
//Написати логіку отримання закритого контенту

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: initialState,
  reducers: {
    getAuthUserValue: (state, action: PayloadAction<any>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    auth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { getAuthUserValue, auth } = userAuthSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userAuthSlice.reducer;
