"use client";

import { useEffect } from "react";

import TopHeader from "@/components/TopHeader";
import UserProfile from "@/components/UserProfile";
import Posts from "@/components/Posts";

const page = () => {
  useEffect(() => {
  }, []);

  return (
    <div>
      <TopHeader label="Profile" />
      <UserProfile />
      <Posts profileUserOnly />
    </div>
  );
}

export default page;
