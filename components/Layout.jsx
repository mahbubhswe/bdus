import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
export default function Layout({ pageTitle, children }) {
  const router = useRouter();
  return (
    <React.Fragment>
      <Head>
        <title>
          {pageTitle
            ? pageTitle + " | " + "বাংলাদেশ উদীচী শিল্পীগোষ্ঠী"
            : "বাংলাদেশ উদীচী শিল্পীগোষ্ঠী"}
        </title>
      </Head>
      <Navbar />
      <main> {children}</main>
      <Footer />
    </React.Fragment>
  );
}
