import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface DeletePostOrCommentConfirmModalState {
  value: boolean;
  // /api/post?id=${post.id} または /api/comment?id=${comment.id}
  urlForDelete: null | string;
  status: "idle" | "loading" | "failed";
}

const initialState: DeletePostOrCommentConfirmModalState = {
  value: false,
  urlForDelete: null,
  status: "idle",
};

export const deletePostOrCommentConfirmModalSlice = createSlice({
  name: "deletePostOrCommentConfirmModal",
  initialState,
  reducers: {
    deletePostOrCommentConfirmModalOpen: (state) => {
      state.value = true;
    },
    deletePostOrCommentConfirmModalClose: (state) => {
      state.value = false;
    },
    setUrlForDelete: (state, newValue) => {
      state.urlForDelete = newValue.payload;
    },
  },
});

export const { deletePostOrCommentConfirmModalOpen, deletePostOrCommentConfirmModalClose, setUrlForDelete } = deletePostOrCommentConfirmModalSlice.actions;

export const isDeletePostOrCommentConfirmModalOpen = (state: RootState) => state.deletePostOrCommentConfirmModal.value;
export const urlForDeleteValue = (state: RootState) => state.deletePostOrCommentConfirmModal.urlForDelete;

export default deletePostOrCommentConfirmModalSlice.reducer;
