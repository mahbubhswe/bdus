import React from "react";
import Layout from "@/components/Layout";
import ReadFromFirebase from "@/components/ReadFromFirebase";
export default function Index() {
  return (
    <Layout pageTitle={"গঠন ত্রান্ত"}>
      <ReadFromFirebase category={"গঠন ত্রান্ত"} />
    </Layout>
  );
}
