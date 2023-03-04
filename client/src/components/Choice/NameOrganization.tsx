import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
// import CyrillicToTranslit from "cyrillic-to-translit-js";
import s from "./choiseUser.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrgName } from "../../Redux/slices/user";
import { onNotify, setMessage } from "../../Redux/slices/notify";

interface NameOrganizationProps {
  isActive: boolean;
  setFiles: Dispatch<SetStateAction<{}>>;
}

export const NameOrganization: FC<NameOrganizationProps> = ({
  isActive,
  setFiles,
}) => {
  const [nameOrg, setNameOrg] = useState<string>("");
  const [lengthFile, setLengthFile] = useState<number>(0);
  const navigate = useNavigate();
  // const cyrillicToTranslit = new CyrillicToTranslit();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrgName({ nameOrg }));
  }, [nameOrg]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFiles(files!);

    switch (e.target.name) {
      case "name":
        setNameOrg(e.target.value);
        break;
      case "file":
        setLengthFile(e.target.files?.length!);
        // const translite = cyrillicToTranslit
        //   .transform(`${files?.[0].name}`)
        //   .toLowerCase();

        // const selectedFile = files?.[0];
        // const renamedFile = new File([selectedFile!], translite, {
        //   type: selectedFile?.type,
        // });
        break;

      default:
        break;
    }
  };

  const handleClick = () => {
    if (nameOrg.length <= 2) {
      dispatch(onNotify(true));
      dispatch(
        setMessage({
          erorrMessage:
            "В полі назва організації повинні бути мінімум 2 літери",
        })
      );
      setTimeout(() => {
        dispatch(onNotify(false));
      }, 7000);

      return;
    }
    if (lengthFile < 1) {
      dispatch(onNotify(true));
      dispatch(
        setMessage({
          erorrMessage: "Ви не завантажили файл",
        })
      );
      setTimeout(() => {
        dispatch(onNotify(false));
      }, 7000);
      return;
    }
    return navigate("/signup");
  };
  return (
    <div
      className={
        isActive
          ? `${s.wrapper_orgName} ${s.active_orgName}`
          : `${s.wrapper_orgName} `
      }
    >
      <input
        type="text"
        className={s.name_org}
        placeholder="Назва організації"
        onChange={handleChange}
        name="name"
      />
      <label htmlFor="files">Файл організації</label>
      <input
        id="files"
        type="file"
        className={s.file_org}
        accept="application/pdf, application/msword,  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleChange}
        name="file"
      />
      <button type="submit" className={s.btn_next} onClick={handleClick}>
        Далі
      </button>
    </div>
  );
};
