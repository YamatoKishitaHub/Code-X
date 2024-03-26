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

  const [followersUsers, setFollowersUsers] = useState<null | UserType[]>(null);

  useEffect(() => {
    setFollowersUsers(users?.filter((user) => user?.followingIds.includes(profileUser?.id as string)) as null | UserType[]);

    document.title = `People following ${profileUser?.name} @${profileUser?.username}`;
  }, [users, params.id]);

  return (
    <div>
      <TopHeader label={`Followers | ${profileUser?.name}`} />
      <FollowTab profileUserId={profileUser?.id as string} state="followers" />
      {!profileUser || followersUsers?.length === 0 ? (
        <div className="p-4 text-xl">
          There are no followers.
        </div>
      ) : (
        <div>
          {followersUsers?.map((followersUser) => (
            <User key={followersUser.id} user={followersUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
