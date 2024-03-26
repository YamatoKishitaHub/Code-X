import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface ConfirmModalState {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: ConfirmModalState = {
  value: false,
  status: "idle",
};

export const confirmModalSlice = createSlice({
  name: "confirmModal",
  initialState,
  reducers: {
    confirmModalOpen: (state) => {
      state.value = true;
    },
    confirmModalClose: (state) => {
      state.value = false;
    },
  },
});

export const { confirmModalOpen, confirmModalClose } = confirmModalSlice.actions;

export const isConfirmModalOpen = (state: RootState) => state.confirmModal.value;

export default confirmModalSlice.reducer;
