import Image from "next/image";
import Link from "next/link";
import { FaRegTrashAlt, FaUserCircle } from "react-icons/fa";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { LanguageSupport } from "@codemirror/language";
import { useDispatch } from "react-redux";

import { codeLanguages } from "@/const/codeLanguages";
import { CommentType } from "@/type/comment.type";
import { useAppContext } from "@/context/AppContext";
import { deletePostOrCommentConfirmModalOpen, setUrlForDelete } from "@/features/modal/deletePostOrCommentConfirmModalSlice";

type CommentProps = {
  comment: null | CommentType;
};

const Comment = ({ comment }: CommentProps) => {
  const dispatch = useDispatch();

  const { currentUser } = useAppContext();

  const handleDelete = async () => {
    dispatch(deletePostOrCommentConfirmModalOpen());
    dispatch(setUrlForDelete(`/api/comment?id=${comment?.id}`))
  };

  return (
    <div className="flex flex-row gap-4 p-4 border-t border-gray-600 hover:opacity-90">
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <Link href={`/profile/${comment?.user?.id}`}>
          {comment?.user?.iconImage ? (
            <Image src={comment.user?.iconImage as string} width={50} height={50} alt="Icon Image" />
          ) : (
            <>
              <FaUserCircle size={32} className="lg:hidden" />
              <FaUserCircle size={48} className="hidden lg:block" />
            </>
          )}
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-[calc(100%-60px)] max-w-[calc(100%-60px)] text-left">
        <div className="flex">
          <div className="flex flex-col md:flex-row md:gap-2">
            <span onClick={(e: React.MouseEvent<HTMLSpanElement>) => e.stopPropagation()}>
              <Link href={`/profile/${comment?.user?.id}`} className="hover:underline">
                {comment?.user?.name}
              </Link>
            </span>
            <span className="text-gray-500" onClick={(e: React.MouseEvent<HTMLSpanElement>) => e.stopPropagation()}>
              <Link href={`/profile/${comment?.user?.id}`} className="hover:underline">
                @{comment?.user?.username}
              </Link>
            </span>
            <span className="text-gray-500">
              {new Date(comment?.createdAt as Date).toLocaleDateString("en-us", { year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric", })}
            </span>
          </div>
          <div className="ml-auto">
            {comment?.userId === currentUser?.id && (
              <div className="flex items-center gap-2 text-red-500 cursor-pointer" onClick={handleDelete}>
                <FaRegTrashAlt />
                <span className="hidden sm:block md:block">Delete</span>
              </div>
            )}
          </div>
        </div>
        <textarea value={comment?.textContent} rows={(comment?.textContent?.match(/\n/g) || []).length + 1} className={`w-full max-h-[50vh] resize-none outline-none text-xl bg-black`} readOnly></textarea>
        <div className="w-full max-w-full">
          <select className="p-1 border border-gray-600 bg-gray-900" onClick={(e: React.MouseEvent<HTMLSelectElement>) => e.stopPropagation()}>
            <option value={comment?.codeLanguage}>
              {comment?.codeLanguage}
            </option>
          </select>
          <CodeMirror
            value={comment?.codeContent}
            maxHeight="50vh"
            extensions={[
              codeLanguages.find((codeLanguage: { name: string, extensions: LanguageSupport }) => codeLanguage.name === comment?.codeLanguage)?.extensions as Extension
            ]}
            theme={"dark"}
            readOnly
            className="cursor-text"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
