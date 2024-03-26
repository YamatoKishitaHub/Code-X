import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface LoginModalState {
  value: boolean;
  // Headerにあるログインが必要なitemを押した場合、ログイン後にどのページに遷移するか
  hrefAfterLogin: null | string;
  // Headerにあるログインが必要なHeaderPostButtonを押した場合、ログイン後にPostModalを開くか
  openPostModalAfterLogin: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: LoginModalState = {
  value: false,
  hrefAfterLogin: null,
  openPostModalAfterLogin: false,
  status: "idle",
};

export const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    loginModalOpen: (state) => {
      state.value = true;
    },
    loginModalClose: (state) => {
      state.value = false;
    },
    setHrefAfterLogin: (state, newValue) => {
      state.hrefAfterLogin = newValue.payload;
    },
    setOpenPostModalAfterLogin: (state, newValue) => {
      state.openPostModalAfterLogin = newValue.payload;
    },
  },
});

export const { loginModalOpen, loginModalClose, setHrefAfterLogin, setOpenPostModalAfterLogin } = loginModalSlice.actions;

export const isLoginModalOpen = (state: RootState) => state.loginModal.value;
export const hrefAfterLoginValue = (state: RootState) => state.loginModal.hrefAfterLogin;
export const openPostModalAfterLoginValue = (state: RootState) => state.loginModal.openPostModalAfterLogin;

export default loginModalSlice.reducer;
