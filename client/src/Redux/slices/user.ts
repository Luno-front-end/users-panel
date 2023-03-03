import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  _id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  organizationName: string;
  file: string;
}

const initialState: UserState = {
  _id: "",
  firstname: "",
  lastname: "",
  nickname: "",
  email: "",
  password: "",
  organizationName: "",
  file: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserValue: (state, action: PayloadAction<any>) => {
      console.log(action.payload._id);
      state._id = action.payload._id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.file = action.payload.file;
    },
    getOrgName: (state, action: PayloadAction<any>) => {
      state.organizationName = action.payload.nameOrg;
    },
  },
});

export const { getUserValue, getOrgName } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
