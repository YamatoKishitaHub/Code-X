import { BsTwitterX } from "react-icons/bs";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaUser, FaRegUser } from "react-icons/fa";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";

import HeaderItem from "./HeaderItem";
import HeaderPostButton from "./HeaderPostButton";
import HeaderUserMenu from "./HeaderUserMenu";
import { useAppContext } from "@/context/AppContext";

const Header = () => {
  const { currentUser } = useAppContext();

  const headerItems = [
    {
      label: "Code X",
      href: "/",
      filledIcon: BsTwitterX,
      nonFilledIcon: BsTwitterX,
    },
    {
      label: "Home",
      href: "/",
      filledIcon: AiFillHome,
      nonFilledIcon: AiOutlineHome,
    },
    {
      label: "Profile",
      href: currentUser?.id ? `/profile/${currentUser.id}` : "/profile/",
      filledIcon: FaUser,
      nonFilledIcon: FaRegUser,
      loginRequired: currentUser ? false : true,
    },
    {
      label: "Setting",
      href: currentUser?.id ? `/setting/${currentUser.id}` : "/setting",
      filledIcon: IoSettings,
      nonFilledIcon: IoSettingsOutline,
      loginRequired: currentUser ? false : true,
    },
  ];

  return (
    <header className="flex flex-col items-center lg:items-start h-screen p-2 pt-8 absolute">
      <nav className="flex flex-col gap-4">
        {headerItems?.map((header: any) => (
          <HeaderItem key={header.label} label={header.label} href={header.href} filledIcon={header.filledIcon} nonFilledIcon={header.nonFilledIcon} loginRequired={header.loginRequired} />
        ))}
      </nav>
      <div className="mt-16">
        <HeaderPostButton />
      </div>
      <div className="mt-auto mb-4">
        <HeaderUserMenu />
      </div>
    </header>
  );
};

export default Header;
