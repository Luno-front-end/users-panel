import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/user";
import userAuthReducers from "./slices/authUser";
import uploadFilesReducers from "./slices/uploadFiles";
import allUsersReducers from "./slices/allUsers";

const customMidleware = getDefaultMiddleware({ serializableCheck: false });

const userAuthReducer = combineReducers({ userAuth: userAuthReducers });
const persistUserConfig = { key: "userAuth", storage: storage };
const psUserReducers = persistReducer(persistUserConfig, userAuthReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    userAuth: psUserReducers,
    uploadFiles: uploadFilesReducers,
    allUsers: allUsersReducers,
  },
  middleware: customMidleware,
});

export type RootState = ReturnType<typeof store.getState>;
export const psStore = persistStore(store);
export type AppDispatch = typeof store.dispatch;
