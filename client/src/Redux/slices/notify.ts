import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface NotifyState {
  activeNotify: boolean;
  erorrMessage: string;
}

const initialState: NotifyState = {
  activeNotify: false,
  erorrMessage: "",
};

const notifySlice = createSlice({
  name: "notify",
  initialState: initialState,
  reducers: {
    onNotify: (state, action: PayloadAction<boolean>) => {
      state.activeNotify = action.payload;
    },
    setMessage: (state, action: PayloadAction<any>) => {
      state.erorrMessage = action.payload.erorrMessage;
    },
  },
});

export const { onNotify, setMessage } = notifySlice.actions;

export const selectCount = (state: RootState) => state.notify;

export default notifySlice.reducer;
