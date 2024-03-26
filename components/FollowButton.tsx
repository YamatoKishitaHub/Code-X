import { useCallback, useState } from "react";
import { useParams } from "next/navigation";

import { loginModalOpen } from "@/features/modal/loginModalSlice";
import { UserType } from "@/type/user.type";
import { useDispatch } from "react-redux";
import Button from "./elements/Button";
import { useAppContext } from "@/context/AppContext";

type FollowButtonProps = {
  profileUser: null | UserType;
};

const FollowButton = ({ profileUser }: FollowButtonProps) => {
  const dispatch = useDispatch();

  const params = useParams();

  const { users, setUsers, currentUser, setCurrentUser } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);

  const handleFollow = useCallback(async () => {
    try {
      setLoading(true);

      const updatedUserResponse = await fetch("/api/user/follow", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileUserId: profileUser?.id,
          userId: currentUser?.id,
        }),
      });
      const updatedUserData = await updatedUserResponse.json();

      setUsers(users?.map((user: UserType) => {
        if (user.id === updatedUserData.id) {
          return updatedUserData;
        } else {
          return user;
        }
      }) as UserType[]);

      setCurrentUser(updatedUserData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [profileUser?.id, currentUser?.id, params.userId, users]);

  return (
    currentUser?.followingIds.includes(profileUser?.id as string) ? (
      <Button label="Following" hoverLabel="Unfollow" bgColor="black" hoverColor="red" loading={loading} onClick={handleFollow} />
    ) : (
      <Button label="Follow" bgColor="white" loading={loading} onClick={() => (currentUser?.id ? handleFollow() : dispatch(loginModalOpen()))} />
    )
  );
};

export default FollowButton;
