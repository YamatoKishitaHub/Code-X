import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface PostModalState {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: PostModalState = {
  value: false,
  status: "idle",
};

export const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    postModalOpen: (state) => {
      state.value = true;
    },
    postModalClose: (state) => {
      state.value = false;
    },
  },
});

export const { postModalOpen, postModalClose } = postModalSlice.actions;

export const isPostModalOpen = (state: RootState) => state.postModal.value;

export default postModalSlice.reducer;
