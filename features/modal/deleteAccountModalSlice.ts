import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface DeleteAccountModalState {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: DeleteAccountModalState = {
  value: false,
  status: "idle",
};

export const deleteAccountModalSlice = createSlice({
  name: "deleteAccountModal",
  initialState,
  reducers: {
    deleteAccountModalOpen: (state) => {
      state.value = true;
    },
    deleteAccountModalClose: (state) => {
      state.value = false;
    },
  },
});

export const { deleteAccountModalOpen, deleteAccountModalClose } = deleteAccountModalSlice.actions;

export const isDeleteAccountModalOpen = (state: RootState) => state.deleteAccountModal.value;

export default deleteAccountModalSlice.reducer;
