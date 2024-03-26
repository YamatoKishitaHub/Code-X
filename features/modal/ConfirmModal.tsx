import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { confirmModalClose, isConfirmModalOpen } from "./confirmModalSlice";
import Modal from "@/components/modals/Modal";
import Button from "@/components/elements/Button";
import { postModalClose } from "./postModalSlice";
import { editProfileModalClose } from "./editProfileModalSlice";

export function ConfirmModal() {
  const isOpen = useAppSelector(isConfirmModalOpen);
  const dispatch = useAppDispatch();

  const handleCloseAllModals = () => {
    dispatch(confirmModalClose());
    dispatch(postModalClose());
    dispatch(editProfileModalClose());
  };

  const handleClose = () => {
    dispatch(confirmModalClose());
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Button label="Yes" isWidthFull={true} textSize="text-2xl" bgColor="white" onClick={handleCloseAllModals} />
      <Button label="No" isWidthFull={true} textSize="text-2xl" bgColor="black" onClick={handleClose} />
    </div>
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal widthSize="small" title="Your draft will not be saved" bodyContent={bodyContent} handleClose={handleClose} />
  );
}
