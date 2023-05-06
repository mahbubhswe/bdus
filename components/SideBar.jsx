import React from "react";
import { Divider, Button } from "@mui/material";
import Options from "./Options";
import AdjustIcon from "@mui/icons-material/Adjust";
import Logo from "./Banner";
import Story from "./Story";
import Poster from "./Poster";
import ContactUs from "./ContactUs";
import FindOnSocilaMedia from "./FindOnSocilaMedia";
import { useRouter } from "next/router";
export default function SideBar() {
  const router = useRouter();
  return (
    <React.Fragment>
      <Options />
      <Divider>
        <AdjustIcon fontSize="3" />
        <AdjustIcon fontSize="3" />
        <AdjustIcon fontSize="3" />
      </Divider>
      <Story />
      <Poster />
      <ContactUs />
      <FindOnSocilaMedia />
      <Divider sx={{ my: "10px" }}>Login System</Divider>
      <div
        style={{
          width: "90%",
          margin: "auto",
          padding: "10px",
        }}
      >
        <Button
          onClick={() => router.push("/auth/login")}
          variant="contained"
          fullWidth
          color="customColor"
          sx={{ color: "white" }}
        >
          Login
        </Button>
      </div>
    </React.Fragment>
  );
}
