import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
export default function Options() {
  const router = useRouter();

  return (
    <List dense={true}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/")}>
          <ListItemText primary="হোম" secondary="বাংলাদেশ উদীচী শিল্পীগোষ্ঠী" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/udichi")}>
          <ListItemText primary="উদীচী" secondary="উদীচী শিল্পীগোষ্ঠী" />
        </ListItemButton>
      </ListItem>
      <Box>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/organization")}>
            <ListItemText primary="সংগঠন" secondary="সংগঠন। organization" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("central-conferrance")}>
            <ListItemText
              primary="জাতীয় সম্মেলন"
              secondary="বাংলাদেশ উদীচী শিল্পীগোষ্ঠী। কেন্দ্রীয় সম্মেলন"
            />
          </ListItemButton>
        </ListItem>
      </Box>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("branches")}>
          <ListItemText
            primary="জেলা/শাখা"
            secondary="জেলা/শাখা | উদীচী শিল্পীগোষ্ঠী"
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/publications")}>
          <ListItemText primary="প্রকাশনা" secondary="প্রকাশনা। publications" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/literature")}>
          <ListItemText primary="সাহিত্য" secondary="সাহিত্য" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
