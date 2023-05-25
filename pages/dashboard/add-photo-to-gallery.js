import React from "react";
import Auth from "@/components/Auth";
import AddPhotoToGallery from "@/components/AddPhotoToGallery";
export default function Index() {
  return (
    <Auth>
      <AddPhotoToGallery />
    </Auth>
  );
}
