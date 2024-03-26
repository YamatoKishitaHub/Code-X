"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import TopHeader from "@/components/TopHeader";
import { PostType } from "@/type/post.type";
import Post from "@/components/Post";
import Comment from "@/components/Comment";
import PostForm from "@/components/PostForm";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";

const page = () => {
  const params = useParams();

  const { posts, comments, setComments } = useAppContext();

  const [post, setPost] = useState<null | PostType>(null);

  useEffect(() => {
    document.title = `${post?.user.name} | ${post?.textContent?.length as number <= 10 ? post?.textContent : post?.textContent?.slice(0, 10) + "..."}`;
  }, [post]);

  // 初回読み込み時のみ、loading処理を実施
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);

  useEffect(() => {
    setPost(posts?.find((post: PostType) => post.id === params.postId) as PostType)
  }, [params.postId, posts, comments]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (firstLoad) {
          setFirstLoad(false);
          setCommentsLoading(true);
        }

        const commentsResponse = await fetch(`/api/comment?postId=${params.postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const commentsData = await commentsResponse.json();

        setComments(commentsData);
      } catch (error) {
        console.log(error);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [params.postId, comments]);

  return (
    <div className="mb-40">
      <TopHeader label="Post" />
      {!post ? (
        <div className="p-4 text-xl">
          This post is not exist.
        </div>
      ) : (
        <>
          <Post post={post as PostType} borderTopNotRequired borderBottomRequired />
          <PostForm isComment />
          {commentsLoading ? (
            <Loading loading={commentsLoading} size="large" my />
          ) : (
            comments?.length === 0 ? (
              <div className="p-4 text-xl border-t border-gray-500">
                There are no comments.
              </div>
            ) : (
              comments?.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))
            )
          )}
        </>
      )}
    </div>
  );
};

export default page;
