import { useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Modal from "@/components/modals/Modal";
import Button from "@/components/elements/Button";
import { useAppContext } from "@/context/AppContext";
import { deletePostOrCommentConfirmModalClose, isDeletePostOrCommentConfirmModalOpen, setUrlForDelete, urlForDeleteValue } from "./deletePostOrCommentConfirmModalSlice";
import { PostType } from "@/type/post.type";
import { CommentType } from "@/type/comment.type";

export function DeletePostOrCommentConfirmModal() {
  const isOpen = useAppSelector(isDeletePostOrCommentConfirmModalOpen);
  const urlForDelete = useAppSelector(urlForDeleteValue);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const params = useParams();

  const { posts, setPosts, comments, setComments } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      await fetch(urlForDelete as string, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // postを削除した場合、postsから該当のpostを削除
      if (urlForDelete?.split("/")[2].split("?id=")[0] === "post") {
        setPosts(posts?.filter((post) => post.id !== urlForDelete?.split("/api/post?id=")[1]) as null | PostType[]);
      }

      // postページにいて、postを削除した場合は、前のページに戻る
      if (params.postId) {
        router.back();
      }

      // commentを削除した場合、commentsから該当のcommentを削除
      if (urlForDelete?.split("/")[2].split("?id=")[0] === "comment") {
        setComments(comments?.filter((comment) => comment.id !== urlForDelete?.split("/api/comment?id=")[1]) as null | CommentType[]);
      }

      dispatch(deletePostOrCommentConfirmModalClose());
      toast.success("Successfully deleted.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [urlForDelete, posts, comments]);

  const handleClose = () => {
    dispatch(deletePostOrCommentConfirmModalClose());
    dispatch(setUrlForDelete(null));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Button label="Delete" isWidthFull={true} textSize="text-2xl" bgColor="red" loading={loading} onClick={handleDelete} />
      <Button label="Cancel" isWidthFull={true} textSize="text-2xl" bgColor="black" onClick={handleClose} />
    </div>
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal widthSize="small" title={`Delete this ${urlForDelete?.split("/")[2].split("?id=")[0]}?`} bodyContent={bodyContent} handleClose={handleClose} />
  );
}
