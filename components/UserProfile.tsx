"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { RiLinkM } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

import { editProfileModalOpen } from "@/features/modal/editProfileModalSlice";
import Button from "./elements/Button";
import FollowButton from "./FollowButton";
import { useAppContext } from "@/context/AppContext";
import { UserType } from "@/type/user.type";

const UserProfile = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const { users, currentUser } = useAppContext();

  const [profileUser, setProfileUser] = useState<null | UserType>(null);

  useEffect(() => {
    setProfileUser(users?.find((user) => user.id === params.userId) as null | UserType);

    document.title = `${profileUser?.name} @${profileUser?.username}`;
  }, [params.userId, users, currentUser, profileUser]);

  const [followers, setFollowers] = useState<number>(0);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersResponse = await fetch(`/api/user/followers?profileUserId=${profileUser?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const followersData = await followersResponse.json();

        setFollowers(followersData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowers();
  }, [profileUser]);

  return (
    <div className="mb-4">
      <div className="relative h-72">
        <div className="h-52 bg-gray-800">
          {profileUser?.headerImage && (
            <Link href={`/profile/${profileUser.id}/headerImage`}>
              <Image src={profileUser.headerImage} fill style={{objectFit: "contain"}} alt="Header Image" className="max-h-52 mx-auto" />
            </Link>
          )}
        </div>
        <div className="absolute w-28 h-28 md:w-40 md:h-40 bottom-6 md:bottom-2 left-6 rounded-full bg-gray-600">
          {profileUser?.iconImage ? (
            <Link href={`/profile/${profileUser.id}/iconImage`}>
              <Image src={profileUser.iconImage} fill style={{objectFit: "contain"}} alt="Icon Image" className="rounded-full" />
            </Link>
          ) : (
            <FaUserCircle size={160} className="hidden lg:block" />
          )}
        </div>
        <div className="flex justify-end gap-4 p-4">
          {profileUser?.id === currentUser?.id ? (
            <Button label="Edit Profile" bgColor="black" onClick={() => dispatch(editProfileModalOpen())} />
          ) : (
            <FollowButton profileUser={profileUser} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        <div className="flex flex-col">
          <span className="text-2xl">
            {profileUser?.name}
          </span>
          <span className="text-gray-500">
            @{profileUser?.username}
          </span>
          <p>{profileUser?.bio}</p>
        </div>
        <div className="flex gap-4 max-w-full flex-wrap">
          {profileUser?.location && (
            <span className="flex items-center gap-1 text-gray-500">
              <IoLocationOutline />
              {profileUser?.location}
            </span>
          )}
          {profileUser?.website && (
            <span className="flex items-center gap-1 text-gray-500">
              <RiLinkM />
              <Link href={profileUser?.website} target="_blank" className="text-blue-500">
                {profileUser?.website}
              </Link>
            </span>
          )}
          <span className="flex items-center gap-1 text-gray-500">
            <SlCalender />
            <div>
              Joined {new Date(profileUser?.createdAt as Date).toLocaleDateString("en-us", { year:"numeric", month:"long", })}
            </div>
          </span>
        </div>
        <div className="flex gap-4">
          <Link href={`/profile/${profileUser?.id}/following`} className="hover:underline">
            {profileUser?.followingIds.length} <span className="text-gray-500 cursor-pointer">Following</span>
          </Link>
          <Link href={`/profile/${profileUser?.id}/followers`} className="hover:underline">
            {followers} <span className="text-gray-500 cursor-pointer">Followers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
