"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

import { useAppDispatch } from "@/app/hooks";
import { loginModalOpen, setHrefAfterLogin } from "@/features/modal/loginModalSlice";

type HeaderItemProps = {
  label: string;
  href: string;
  filledIcon: IconType;
  nonFilledIcon: IconType;
  loginRequired?: boolean;
};

const HeaderItem = ({ label, href, filledIcon: FilledIcon, nonFilledIcon: NonFilledIcon, loginRequired }: HeaderItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    if (loginRequired) {
      dispatch(loginModalOpen());
      dispatch(setHrefAfterLogin(href));
    } else {
      router.push(href);
    }
  }, [href, loginRequired]);

  return (
    <div className="flex items-center gap-4 cursor-pointer" onClick={handleClick} >
      <div>
        {pathname === href ? <FilledIcon size={32} /> : <NonFilledIcon size={32} />}
      </div>
      <div className="hidden lg:block text-2xl">
        {label}
      </div>
    </div>
  );
};

export default HeaderItem;
