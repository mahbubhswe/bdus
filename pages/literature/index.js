import React from "react";
import Layout from "@/components/Layout";
import ReadFromFirebase from "@/components/ReadFromFirebase";
export default function Index() {
  return (
    <Layout pageTitle={"সাহিত্য"}>
      <ReadFromFirebase category={"সাহিত্য"} />
    </Layout>
  );
}
