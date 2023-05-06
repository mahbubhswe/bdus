import Head from "next/head";
import React from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
export default function DashboardLayout({ children, pageTitle }) {
  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle ? pageTitle : "Dashboard"}</title>
      </Head>
      <DashboardNavbar />
      <main>{children}</main>
    </React.Fragment>
  );
}
