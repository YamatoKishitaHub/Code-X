import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteAccountModalClose, isDeleteAccountModalOpen } from "./deleteAccountModalSlice";
import Modal from "@/components/modals/Modal";
import Button from "@/components/elements/Button";
import { useAppContext } from "@/context/AppContext";

export function DeleteAccountModal() {
  const isOpen = useAppSelector(isDeleteAccountModalOpen);
  const dispatch = useAppDispatch();

  const { currentUser, setCurrentUser } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteAccount = useCallback(async () => {
    try {
      setLoading(true);

      await fetch(`/api/user?id=${currentUser?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await signOut({
        callbackUrl: location.protocol + "//" + location.host,
      });

      setCurrentUser(null);

      toast.success("Successfully deleted.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  const handleClose = () => {
    dispatch(deleteAccountModalClose());
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Button label="Delete" isWidthFull={true} textSize="text-2xl" bgColor="red" loading={loading} onClick={handleDeleteAccount} />
      <Button label="Cancel" isWidthFull={true} textSize="text-2xl" bgColor="black" onClick={handleClose} />
    </div>
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal widthSize="small" title="Delete your account?" bodyContent={bodyContent} handleClose={handleClose} />
  );
}
