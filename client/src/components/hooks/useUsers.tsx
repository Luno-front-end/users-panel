import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../../Redux/slices/allUsers";
import { onNotify, setMessage } from "../../Redux/slices/notify";
import { RootState } from "../../Redux/store";
import Api from "../../services/getUsers";

export const useUsers = () => {
  const token = useSelector(
    (state: RootState) => state.userAuth.userAuth.token
  );

  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const data = await Api.getUsers(token).catch((err: AxiosError) => {
        dispatch(onNotify(true));
        dispatch(
          setMessage({
            erorrMessage: err.message,
          })
        );
      });

      dispatch(users(data.users));
    } catch (err: any) {
      console.log(err);
    }
  };

  return { fetchUsers };
};
