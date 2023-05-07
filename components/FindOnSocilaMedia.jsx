import Facebook from "@mui/icons-material/Facebook";
import YouTube from "@mui/icons-material/YouTube";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
export default function FindOnSocilaMedia() {
  return (
    <Box sx={{ p: "25px" }}>
      <Typography component={"h1"} sx={{ fontWeight: "bold" }}>
        FIND ON SOCIAL MEDIA
      </Typography>
      <Stack direction={"row"}>
        <IconButton
          sx={{ color: "#EC1B24" }}
          href="https://web.facebook.com/udichibd/?_rdc=1&_rdr"
          component="a"
        >
          <Facebook />
        </IconButton>
        <IconButton
          sx={{ color: "#EC1B24" }}
          href="https://www.youtube.com/@UdichiBD"
          component="a"
        >
          <YouTube />
        </IconButton>
      </Stack>
    </Box>
  );
}
