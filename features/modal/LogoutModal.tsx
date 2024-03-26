import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutModalClose, isLogoutModalOpen } from "./logoutModalSlice";
import Modal from "@/components/modals/Modal";
import Button from "@/components/elements/Button";
import { useAppContext } from "@/context/AppContext";

export function LogoutModal() {
  const isOpen = useAppSelector(isLogoutModalOpen);
  const dispatch = useAppDispatch();

  const { setCurrentUser } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await signOut({
        callbackUrl: location.protocol + "//" + location.host,
      });

      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [location.protocol, location.host]);

  const footerContent = (
    <div className="flex flex-col gap-4">
      <Button label="Log out" isWidthFull={true} textSize="text-2xl" bgColor="white" loading={loading} onClick={handleSubmit} />
      <Button label="Cancel" isWidthFull={true} textSize="text-2xl" bgColor="black" onClick={() => dispatch(logoutModalClose())} />
    </div>
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal widthSize="small" title="Log out of Code X?" footerContent={footerContent} handleClose={() => dispatch(logoutModalClose())} />
  );
}
