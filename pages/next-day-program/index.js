import React from "react";
import Layout from "@/components/Layout";
import ReadFromFirebase from "@/components/ReadFromFirebase";
export default function Index() {
  return (
    <Layout pageTitle={"আগামী দিনের কর্মসূচি"}>
      <ReadFromFirebase category={"আগামী দিনের কর্মসূচি"} />
    </Layout>
  );
}
