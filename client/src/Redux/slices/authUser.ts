import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";
import type { RootState } from "../store";

interface UserAuthState {
  isAuth: boolean;
  token: string;
  user: IUser[];
}

const initialState: UserAuthState = {
  isAuth: false,
  token: "",
  user: [],
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: initialState,
  reducers: {
    auth: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.user = [...action.payload.user];
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { auth } = userAuthSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userAuthSlice.reducer;
