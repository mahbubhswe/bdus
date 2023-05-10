import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
export default function ContactUS() {
  return (
    <Box sx={{ p: "25px" }}>
      <Typography component={"h1"} sx={{ fontWeight: "bold" }}>
        CONTACT US
      </Typography>
      <Stack>
        <ListItem disablePadding>
          <ListItemButton href="tel:+88029582054" component="a">
            <ListItemIcon sx={{ color: "#EC1B24" }}>
              <CallIcon />
            </ListItemIcon>
            <ListItemText
              primary="Call"
              secondary=" +88029582054"
            ></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="mailto:127uddin@gmail.com" component="a">
            <ListItemIcon sx={{ color: "#EC1B24" }}>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary="E-mail"
              secondary=" 127uddin@gmail.com"
            ></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: "#EC1B24" }}>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText
              primary="Address"
              secondary=" 25-20,97th Street,East Elmhurst, New York, NY-11369,
                Tel-1646-642-4708"
            ></ListItemText>
          </ListItemButton>
        </ListItem>
      </Stack>
    </Box>
  );
}
