import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

import { PostType } from "@/type/post.type";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";

const SidebarPosts = () => {
  const router = useRouter();

  const { posts } = useAppContext();

  return (
    <div className="flex flex-col gap-2">
      {!posts ? (
        <Loading loading={true} size="large" />
      ) : (
        posts?.sort((a, b) => - a.comments.length + b.comments.length).slice(0, 5).map((post: PostType) => (
          <div key={post.id} className="flex items-center gap-4 cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>
            <div>
              {post.user.iconImage ? (
                <Image src={post.user.iconImage as string} width={32} height={32} alt="Icon Image" />
              ) : (
                <FaUserCircle size={32} />
              )}
            </div>
            <div>
              <div className="hidden lg:flex lg:gap-2 xl:hidden">
                <div className="text-xl">
                  {post.user.name.length <= 8 ? post.user.name : post.user.name.substring(0, 8) + "..."}
                </div>
                <div className="text-gray-500">
                  @{post.user.username.length <= 10 ? post.user.username : post.user.username.substring(0, 10) + "..."}
                </div>
              </div>
              <div className="hidden xl:flex xl:gap-2">
                <div className="text-xl">
                  {post.user.name.length <= 10 ? post.user.name : post.user.name.substring(0, 10) + "..."}
                </div>
                <div className="text-gray-500">
                  @{post.user.username.length <= 12 ? post.user.username : post.user.username.substring(0, 12) + "..."}
                </div>
              </div>
              <div>
                {Number(post.textContent?.length) <= 15 ? post.textContent : post.textContent?.substring(0, 15) + "..."}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SidebarPosts;
