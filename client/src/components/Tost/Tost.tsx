import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../Redux/store";

export const Tost = () => {
  const onErorr = useSelector((state: RootState) => state.notify);
  toast.error(`Message: ${onErorr?.erorrMessage}`);

  return <ToastContainer />;
};
