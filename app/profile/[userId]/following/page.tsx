"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import TopHeader from "@/components/TopHeader";
import { UserType } from "@/type/user.type";
import { useAppContext } from "@/context/AppContext";
import User from "@/components/User";
import FollowTab from "@/components/FollowTab";

const page = () => {
  const params = useParams();

  const { users } = useAppContext();

  const profileUser = users?.find((user) => user.id === params.userId);

  const [followingUsers, setFollowingUsers] = useState<null | UserType[]>(null);

  useEffect(() => {
    setFollowingUsers(users?.filter((user) => profileUser?.followingIds.includes(user.id)) as null | UserType[]);

    document.title = `People followed by ${profileUser?.name} @${profileUser?.username}`;
  }, [users, params.id]);

  return (
    <div>
      <TopHeader label={`Following users | ${profileUser?.name}`} />
      <FollowTab profileUserId={profileUser?.id as string} state="following" />
      {!profileUser || followingUsers?.length === 0 ? (
        <div className="p-4 text-xl">
          There are no following users.
        </div>
      ) : (
        <div>
          {followingUsers?.map((followingUser) => (
            <User key={followingUser.id} user={followingUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
