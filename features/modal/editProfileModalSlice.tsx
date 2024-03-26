import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface EditProfileModalState {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: EditProfileModalState = {
  value: false,
  status: "idle",
};

export const editProfileModalSlice = createSlice({
  name: "editProfileModal",
  initialState,
  reducers: {
    editProfileModalOpen: (state) => {
      state.value = true;
    },
    editProfileModalClose: (state) => {
      state.value = false;
    },
  },
});

export const { editProfileModalOpen, editProfileModalClose } = editProfileModalSlice.actions;

export const isEditProfileModalOpen = (state: RootState) => state.editProfileModal.value;

export default editProfileModalSlice.reducer;
