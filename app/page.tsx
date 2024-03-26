"use client";

import { useEffect } from "react";

import TopHeader from "@/components/TopHeader";
import PostForm from "@/components/PostForm";
import Posts from "@/components/Posts";

export default function Home() {
  useEffect(() => {
    document.title = "Code X";
  }, []);

  return (
    <div>
      <TopHeader label="Home" />
      <PostForm />
      <Posts />
    </div>
  );
};
