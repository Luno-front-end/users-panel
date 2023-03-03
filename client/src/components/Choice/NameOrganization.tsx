import {
  ChangeEvent,
  Dispatch,
  FC,
  HTMLInputTypeAttribute,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import s from "./choiseUser.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrgName } from "../../Redux/slices/user";
import { upload } from "../../Redux/slices/uploadFiles";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrgName({ nameOrg }));
  }, [nameOrg]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFiles(files!);
    //  dispatch(fileUrl);
    // const formData = new FormData();
    // if (files) {
    //   for (let i = 0; i < files.length; i++) {
    //     console.log(files[i]);
    //     formData.append("file", files[i]);
    //   }
    // }
    // console.log(fileUrl);

    // dispatch(upload(formData));

    // console.log(files);
    // const files = e.target.files;

    // const formData = new FormData();
    // formData.append("file", files);

    // const fileListAsArray = Array.from(file);
    // const newArrFile = [...file];
    switch (e.target.name) {
      case "name":
        setNameOrg(e.target.value);
        break;
      case "file":
        setLengthFile(e.target.files?.length!);

        break;

      default:
        break;
    }
  };
  // console.log(first);

  const handleClick = () => {
    if (nameOrg.length <= 2) {
      return;
    }
    if (lengthFile < 1) {
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
