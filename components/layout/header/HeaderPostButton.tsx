import { useCallback } from "react";
import { FaPen } from "react-icons/fa";

import { useAppDispatch } from "@/app/hooks";
import { loginModalOpen, setOpenPostModalAfterLogin } from "@/features/modal/loginModalSlice";
import { postModalOpen } from "@/features/modal/postModalSlice";
import { useAppContext } from "@/context/AppContext";

const HeaderPostButton = () => {
  const dispatch = useAppDispatch();

  const { currentUser } = useAppContext();

  const handleClick = useCallback(() => {
    if (currentUser) {
      dispatch(postModalOpen());
    } else {
      dispatch(setOpenPostModalAfterLogin(true));
      dispatch(loginModalOpen());
    }
  }, [currentUser]);

  return (
    <div onClick={handleClick} className="flex items-center gap-4 p-4 lg:px-8 lg:py-2 rounded-full bg-sky-500 cursor-pointer">
      <div>
        <FaPen size={24} className="lg:hidden" />
        <FaPen size={32} className="hidden lg:block" />
      </div>
      <div className="hidden lg:block text-2xl">
        Post
      </div>
    </div>
  );
};

export default HeaderPostButton;
