"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import { useAppContext } from "@/context/AppContext";

const page = () => {
  const router = useRouter();
  const params = useParams();

  const { users } = useAppContext();

  const profileUser = users?.find((user) => user.id === params.userId);

  useEffect(() => {
    document.title = `${profileUser?.name} @${profileUser?.username}`;
  }, [profileUser]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50" onClick={() => router.push(`/profile/${profileUser?.id}`)}>
      <div className="mt-4 ml-4">
        <button className="rounded-full hover:bg-gray-800 hover:opacity-60">
          <IoMdClose size={48} />
        </button>
      </div>
      <Image src={profileUser?.headerImage as string} fill style={{objectFit: "contain"}} alt="Header Image" className="max-w-full mx-auto mt-16" />
    </div>
  );
};

export default page;
