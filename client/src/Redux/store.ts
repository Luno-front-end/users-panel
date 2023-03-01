import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import userAuthReducer from "./slices/authUser";

const customMidleware = getDefaultMiddleware({ serializableCheck: false });

export const store = configureStore({
  reducer: {
    user: userReducer,
    userAuth: userAuthReducer,
  },
  middleware: customMidleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
