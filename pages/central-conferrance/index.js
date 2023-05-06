import React from "react";
import Layout from "@/components/Layout";
import ReadFromFirebase from "@/components/ReadFromFirebase";
export default function Index() {
  return (
    <Layout pageTitle={"জাতীয় সম্মেলন"}>
      <ReadFromFirebase category={"জাতীয় সম্মেলন"} />
    </Layout>
  );
}
