import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface LogoutModalState {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: LogoutModalState = {
  value: false,
  status: "idle",
};

export const logoutModalSlice = createSlice({
  name: "logoutModal",
  initialState,
  reducers: {
    logoutModalOpen: (state) => {
      state.value = true;
    },
    logoutModalClose: (state) => {
      state.value = false;
    },
  },
});

export const { logoutModalOpen, logoutModalClose } = logoutModalSlice.actions;

export const isLogoutModalOpen = (state: RootState) => state.logoutModal.value;

export default logoutModalSlice.reducer;
