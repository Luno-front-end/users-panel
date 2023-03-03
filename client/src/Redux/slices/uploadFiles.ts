import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadFilesState {
  file: any;
}

const initialState: UploadFilesState = {
  file: [],
};

const uploadFilesSlice = createSlice({
  name: "uploadFiles",
  initialState: initialState,
  reducers: {
    upload: (state, action: PayloadAction<any>) => {
      state.file = action.payload;
    },
  },
});

export const { upload } = uploadFilesSlice.actions;

export default uploadFilesSlice.reducer;
