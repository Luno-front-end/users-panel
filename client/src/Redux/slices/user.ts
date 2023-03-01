import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";
import type { RootState } from "../store";

interface UserState {
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  nameOrganization: string;
}

const initialState: UserState = {
  firstname: "",
  lastname: "",
  nickname: "",
  email: "",
  password: "",
  nameOrganization: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserValue: (state, action: PayloadAction<any>) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    getOrgName: (state, action: PayloadAction<any>) => {
      state.nameOrganization = action.payload.nameOrg;
    },
  },
});

export const { getUserValue, getOrgName } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
