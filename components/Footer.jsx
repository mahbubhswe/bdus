import React from "react";
import { Divider, Typography, Stack } from "@mui/material";
import ContactUS from "./ContactUs";
import FindOnSocilaMedia from "./FindOnSocilaMedia";
import Image from "next/image";
export default function Footer() {
  return (
    <div style={{ marginTop: "100px", background: "#F3ECEA" }}>
      <Stack
        direction={{ xs: "column", sm: "row", md: "row" }}
        alignItems="center"
        spacing={2}
        sx={{  p: "25px" }}
        justifyContent={"space-around"}
      >
        <Image
          src="/poster500.gif"
          height={250}
          width={400}
          quality={100}
          alt="Poster"
        />
        <div>
          <ContactUS />
          <FindOnSocilaMedia />
        </div>
      </Stack>
      <Divider sx={{ width: "95%", margin: "auto", marginY: "50px" }}></Divider>

      <Typography sx={{ textAlign: "center", pb: "50px", px: "10px" }}>
        Copyright © {new Date().getFullYear()} Bangladesh Udichi Shilpigosthi
        USA Inc. All Rights Reserved.
      </Typography>
    </div>
  );
}
