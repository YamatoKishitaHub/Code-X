import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { isPostModalOpen, postModalClose } from "./postModalSlice";
import Modal from "@/components/modals/Modal";
import PostForm from "@/components/PostForm";

export function PostModal() {
  const isOpen = useAppSelector(isPostModalOpen);
  const dispatch = useAppDispatch();

  const bodyContent = (
    <PostForm />
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal widthSize="large" bodyContent={bodyContent} handleClose={() => dispatch(postModalClose())} confirmBeforeClose={true} />
  );
}
