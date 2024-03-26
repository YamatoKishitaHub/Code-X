"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { PostType } from "@/type/post.type";
import Post from "./Post";
import { useAppContext } from "@/context/AppContext";
import Loading from "./Loading";

type PostsProps = {
  profileUserOnly?: boolean;
};

const Posts = ({ profileUserOnly }: PostsProps) => {
  const params = useParams();

  const { posts, setPosts } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const postsResponse = await fetch("/api/post" as string, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const postsData = await postsResponse.json();

        setPosts(postsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [profileUserOnly, posts]);

  return (
    <div className="mb-40">
      {!posts ? (
          <Loading loading={loading} size="large" my />
      ) : (
        profileUserOnly ? (
          posts?.filter((post) => post.userId === params.userId).length === 0 ? (
            <div className="p-4 border-t border-gray-600 text-xl">
              There are no posts yet.
            </div>
          ) : (
            posts?.sort((a, b) => - new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime()).filter((post) => post.userId === params.userId).map((post: PostType) => (
              <Post post={post} key={post.id} />
            ))
          )
        ) : (
          posts.length === 0 ? (
            <div className="p-4 border-t border-gray-600 text-xl">
              There are no posts yet.
            </div>
          ) : (
            posts?.sort((a, b) => - new Date(a.createdAt).getTime() + new Date(b.createdAt).getTime()).map((post: PostType) => (
              <Post post={post} key={post.id} />
            ))
          )
        )
      )}
    </div>
  );
};

export default Posts;
