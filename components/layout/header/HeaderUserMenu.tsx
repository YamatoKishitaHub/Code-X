import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

import { useAppDispatch } from "@/app/hooks";
import { logoutModalOpen } from "@/features/modal/logoutModalSlice";
import { loginModalOpen } from "@/features/modal/loginModalSlice";
import { useAppContext } from "@/context/AppContext";

const HeaderUserMenu = () => {
  const dispatch = useAppDispatch();

  const { currentUser } = useAppContext();

  return (
    <div className="flex flex-col gap-4">
      <div onClick={() => (currentUser ? dispatch(logoutModalOpen()) : dispatch(loginModalOpen()))} className="flex items-center gap-4 cursor-pointer" >
        <div>
          {currentUser ? (
            <BiLogOut size={32} />
            ) : (
            <BiLogIn size={32} />
          )}
        </div>
        <div className="hidden lg:block text-2xl">
          {currentUser ? "Logout" : "Login"}
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          {(currentUser && currentUser.iconImage) ? (
            <Image src={currentUser?.iconImage as string} width={50} height={50} alt="Icon Image" />
          ) : (
            <FaUserCircle size={32} />
          )}
        </div>
        <div className="hidden lg:block">
          <div className="text-xl">
            {currentUser ? (
              currentUser.name.length <= 10 ? currentUser.name : currentUser.name.substring(0, 10) + "..."
            ) :
              "Guest"
            }
          </div>
          <div className="text-gray-500">
            {currentUser && (
              "@" + (currentUser.username.length <= 12 ? currentUser.username : currentUser.username.substring(0, 12) + "...")
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderUserMenu;
