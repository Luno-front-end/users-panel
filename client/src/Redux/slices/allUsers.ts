import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";
import type { RootState } from "../store";

interface AllUsersState {
  user: IUser[] | [];
}

const initialState: AllUsersState = {
  user: [],
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: initialState,
  reducers: {
    users: (state, action: PayloadAction<IUser[]>) => {
      state.user = [...action.payload];
    },
  },
});

export const { users } = allUsersSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default allUsersSlice.reducer;
