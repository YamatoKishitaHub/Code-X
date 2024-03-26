import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

import { UserType } from "@/type/user.type";
import FollowButton from "./FollowButton";
import { useAppContext } from "@/context/AppContext";

type UserProps = {
  user: UserType;
};

const User = ({ user }: UserProps) => {
  const router = useRouter();

  const { currentUser } = useAppContext();

  return (
    <div className="flex items-center gap-4 p-2 cursor-pointer" onClick={() => router.push(`/profile/${user.id}`)}>
      <div>
        {user.iconImage ? (
          <Image src={user.iconImage as string} width={48} height={48} alt="Icon Image" />
        ) : (
          <FaUserCircle size={48} />
        )}
      </div>
      <div>
        <div className="text-xl">
          {user.name}
        </div>
        <div className="text-gray-500">
          @{user.username}
        </div>
        <div>
          {user.bio}
        </div>
      </div>
      {currentUser?.id !== user.id && (
        <div className="ml-auto" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <FollowButton profileUser={user} />
        </div>
      )}
    </div>
  );
};

export default User;