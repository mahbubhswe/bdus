import React from "react";
import Auth from "@/components/Auth";
import CreatePost from "@/components/CreatePost";
export default function Index() {
  return (
    <Auth>
      <CreatePost />
    </Auth>
  );
}
