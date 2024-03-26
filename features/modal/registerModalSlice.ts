import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface RegisterModalState {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: RegisterModalState = {
  value: false,
  status: "idle",
};

export const registerModalSlice = createSlice({
  name: "registerModal",
  initialState,
  reducers: {
    registerModalOpen: (state) => {
      state.value = true;
    },
    registerModalClose: (state) => {
      state.value = false;
    },
  },
});

export const { registerModalOpen, registerModalClose } = registerModalSlice.actions;

export const isRegisterModalOpen = (state: RootState) => state.registerModal.value;

export default registerModalSlice.reducer;
