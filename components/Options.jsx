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
        <ListItemButton onClick={() => router.push("/structure-resolution")}>
          <ListItemText
            primary="গঠন ত্রান্ত"
            secondary="গঠন ত্রান্ত। publications"
          />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/next-day-program")}>
          <ListItemText
            primary="আগামী দিনের কর্মসূচি"
            secondary="আগামী দিনের কর্মসূচি"
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
