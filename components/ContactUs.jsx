import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
export default function ContactUS() {
  return (
    <Box sx={{ p: "25px" }}>
      <Typography component={"h1"} sx={{ fontWeight: "bold" }}>
        CONTACT US
      </Typography>
      <Stack direction={"row"}>
        <IconButton
          sx={{ color: "#EC1B24" }}
          href="tel:+88029582054"
          component="a"
        >
          <CallIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#EC1B24" }}
          href="mailto:127uddin@gmail.com"
          component="a"
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#EC1B24" }}
          href="https://goo.gl/maps/2fPWsoBT8qnzLhkR8"
          component="a"
        >
          <MapIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
