"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IoMdArrowBack } from "react-icons/io";

type HeaderProps = {
  label: string;
};

const Header = ({ label }: HeaderProps) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex flex-row items-center gap-2 p-2 sticky top-0 z-40 border-b border-gray-600 bg-black">
      <div>
        <button>
          <IoMdArrowBack size={32} className="rounded-full hover:bg-gray-800 hover:opacity-60" onClick={handleBack} />
        </button>
      </div>
      <div className="text-xl font-bold">
        {label}
      </div>
    </div>
  );
};

export default Header;
