import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import FollowButton from "@/components/FollowButton";
import { UserType } from "@/type/user.type";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";

const SidebarUsers = () => {
  const router = useRouter();

  const { users, setUsers, currentUser } = useAppContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const usersResponse = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const usersData = await usersResponse.json();

        setUsers(usersData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!users) {
      fetchUsers();
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {!users ? (
        <Loading loading={loading} size="large" />
      ) : (
        users?.filter((user) => user.id !== currentUser?.id).map((user: UserType) => (
          <div key={user.id} className="flex items-center gap-4 cursor-pointer" onClick={() => router.push(`/profile/${user.id}`)}>
            <div>
              {user.iconImage ? (
                <Image src={user.iconImage as string} width={32} height={32} alt="Icon Image" />
              ) : (
                <FaUserCircle size={32} />
              )}
            </div>
            <div className="hidden lg:block xl:hidden">
              <div className="text-xl">
                {user.name.length <= 6 ? user.name : user.name.substring(0, 6) + "..."}
              </div>
              <div className="text-gray-500">
                @{user.username.length <= 8 ? user.username : user.username.substring(0, 8) + "..."}
              </div>
            </div>
            <div className="hidden xl:block">
              <div className="text-xl">
                {user.name.length <= 10 ? user.name : user.name.substring(0, 10) + "..."}
              </div>
              <div className="text-gray-500">
                @{user.username.length <= 12 ? user.username : user.username.substring(0, 12) + "..."}
              </div>
            </div>
            <div className="ml-auto" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
              <FollowButton profileUser={user} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SidebarUsers;
