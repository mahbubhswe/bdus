import React from "react";
import { Divider, Typography, Stack } from "@mui/material";
import ContactUS from "./ContactUs";
import FindOnSocilaMedia from "./FindOnSocilaMedia";
export default function Footer() {
  return (
    <div className="fotterStyle">
      <Stack
        direction={{ xs: "column", sm: "row", md: "row" }}
        alignItems="center"
        spacing={2}
        sx={{ p: "25px" }}
        justifyContent={"space-around"}
      >
        <div>
          <ContactUS /> <FindOnSocilaMedia />
        </div>

        <div>
          <Typography sx={{ color: "grey", fontWeight: "bold" }}>
            পরিচালনায়ঃ
          </Typography>
          <Typography sx={{ px: "10px" }}>সভাপতি: সুব্রত বিশ্বাস</Typography>
          <Typography sx={{ px: "10px" }}>
            সাধারণ সম্পাদক: মোঃ আলীম উদ্দীন
          </Typography>
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
