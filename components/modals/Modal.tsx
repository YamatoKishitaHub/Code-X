import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

import { confirmModalOpen } from "@/features/modal/confirmModalSlice";
import Button from "../elements/Button";

type ModalProps = {
  widthSize?: "small" | "large";
  title?: string;
  bodyContent?: React.ReactElement;
  buttonLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  handleSubmit?: () => Promise<void>;
  footerContent?: React.ReactElement;
  handleClose: () => void;
  confirmBeforeClose?: boolean;
};

const Modal = ({ widthSize, title, bodyContent, buttonLabel, disabled, loading, handleSubmit, footerContent, handleClose, confirmBeforeClose }: ModalProps) => {
  const dispatch = useDispatch();

  const handleClickClose = () => {
    if (confirmBeforeClose) {
      dispatch(confirmModalOpen());
    } else {
      handleClose();
    }
  };

  return (
    // モーダルの外側
    <div onClick={handleClickClose} className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 z-50">
      {/* モーダル本体 */}
      <div onClick={(e) => e.stopPropagation()} className={`flex flex-col gap-4 w-11/12 lg:w-1/2 ${widthSize === "large" && "lg:w-2/3"} ${widthSize === "small" && "lg:w-1/3"} max-h-[95%] p-4 rounded-3xl overflow-y-auto bg-black`}>
        <div className="flex items-center -mb-4">
          <button onClick={handleClickClose} className="rounded-full hover:bg-gray-800 hover:opacity-60">
            <IoMdClose size={32} />
          </button>
        </div>
        {title && (
          <div className="text-center text-3xl">
            {title}
          </div>
        )}
        {bodyContent && (
          <div className="text-center">
            {bodyContent}
          </div>
        )}
        {(buttonLabel && handleSubmit) && (
          <div>
            <Button label={buttonLabel} isWidthFull textSize="text-2xl" bgColor="white" disabled={disabled} loading={loading} onClick={handleSubmit} />
          </div>
        )}
        <div>
          {footerContent}
        </div>
      </div>
    </div>
  );
};

export default Modal;
