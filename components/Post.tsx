import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegComment, FaUserCircle, FaRegTrashAlt } from "react-icons/fa";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { LanguageSupport } from "@codemirror/language";
import { useDispatch } from "react-redux";

import { codeLanguages } from "@/const/codeLanguages";
import { PostType } from "@/type/post.type";
import { useAppContext } from "@/context/AppContext";
import { deletePostOrCommentConfirmModalOpen, setUrlForDelete } from "@/features/modal/deletePostOrCommentConfirmModalSlice";

type PostProps = {
  post: null | PostType;
  borderTopNotRequired?: boolean;
  borderBottomRequired?: boolean;
};

const Post = ({ post, borderTopNotRequired, borderBottomRequired }: PostProps) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { currentUser } = useAppContext();

  const handleDelete = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    dispatch(deletePostOrCommentConfirmModalOpen());
    dispatch(setUrlForDelete(`/api/post?id=${post?.id}`))
  };

  if (!post) {
    return null;
  };

  return (
    <div className={`flex flex-row gap-4 p-4 ${!borderTopNotRequired && "border-t"} ${borderBottomRequired && "border-b"} border-gray-600 hover:opacity-90 cursor-pointer`} onClick={() => router.push(`/post/${post?.id}`)}>
      <div>
        <Link href={`/profile/${post?.user.id}`} >
          {post?.user.iconImage ? (
            <Image src={post.user.iconImage as string} width={50} height={50} alt="Icon Image" onClick={(e: React.MouseEvent<HTMLImageElement>) => e.stopPropagation()} />
          ) : (
            <>
              <FaUserCircle size={32} className="lg:hidden" onClick={(e: React.MouseEvent<SVGElement>) => e.stopPropagation()} />
              <FaUserCircle size={48} className="hidden lg:block" onClick={(e: React.MouseEvent<SVGElement>) => e.stopPropagation()} />
            </>
          )}
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-[calc(100%-60px)] max-w-[calc(100%-60px)] text-left">
        <div className="flex">
          <div className="flex flex-col md:flex-row md:gap-2">
            <span onClick={(e: React.MouseEvent<HTMLSpanElement>) => e.stopPropagation()}>
              <Link href={`/profile/${post?.user.id}`} className="hover:underline">
                {post?.user.name}
              </Link>
            </span>
            <span className="text-gray-500" onClick={(e: React.MouseEvent<HTMLSpanElement>) => e.stopPropagation()}>
              <Link href={`/profile/${post?.user.id}`} className="hover:underline">
                @{post?.user.username}
              </Link>
            </span>
            <span className="text-gray-500">
              {new Date(post?.createdAt as Date).toLocaleDateString("en-us", { year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric", })}
            </span>
          </div>
          <div className="ml-auto">
            {post.userId === currentUser?.id && (
              <div className="flex items-center gap-2 text-red-500 cursor-pointer" onClick={(e: React.MouseEvent<HTMLSpanElement>) => handleDelete(e)}>
                <FaRegTrashAlt />
                <span className="hidden sm:block md:block">Delete</span>
              </div>
            )}
          </div>
        </div>
        <textarea value={post?.textContent}  rows={(post?.textContent?.match(/\n/g) || []).length + 1} className={`w-full max-h-[50vh] resize-none outline-none text-xl bg-black`} readOnly></textarea>
        <div className="w-full max-w-full">
          <select className="p-1 border border-gray-600 bg-gray-900" onClick={(e: React.MouseEvent<HTMLSelectElement>) => e.stopPropagation()}>
            <option value={post?.codeLanguage}>
              {post?.codeLanguage}
            </option>
          </select>
          <CodeMirror
            value={post?.codeContent}
            maxHeight="50vh"
            extensions={[
              codeLanguages.find((codeLanguage: { name: string, extensions: LanguageSupport }) => codeLanguage.name === post?.codeLanguage)?.extensions as Extension
            ]}
            theme={"dark"}
            readOnly
            className="cursor-text"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          />
        </div>
        <div className="flex gap-4 text-gray-500">
          <div className="flex items-center gap-2 w-auto hover:text-blue-500">
            <FaRegComment />
            {post?.comments.length}
          </div>
          {/* TODO like機能の追加 */}
          {/* <div className="hover:text-red-500">
            
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
