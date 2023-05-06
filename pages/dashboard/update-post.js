import React from "react";
import Auth from "@/components/Auth";
import UpdatePost from "@/components/UpdatePost";
export default function Index() {
  return (
    <Auth>
      <UpdatePost />
    </Auth>
  );
}
