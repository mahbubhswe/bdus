import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import Login from "./Login";
import { useEffect } from "react";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
export default function Auth({ children }) {
  const [user, setUser] = useState();
  const [count, setCount] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setCount(true);
    });
  });
  if (count) {
    if (user) {
      return (
        <DashboardLayout pageTitle={"Dashboard"}>{children}</DashboardLayout>
      );
    }
    return <Login />;
  }
}
