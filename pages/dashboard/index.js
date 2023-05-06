import React from "react";
import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
export default function Index() {
  return (
    <Auth>
      <Dashboard />
    </Auth>
  );
}
