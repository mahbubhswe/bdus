import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Paper,
  Stack,
  Button,
  Drawer,
} from "@mui/material";
import SideBar from "./SideBar";
import Cancel from "@mui/icons-material/Cancel";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Banner from "./Banner";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <React.Fragment>
      <AppBar
        position="relative"
        sx={{
          background: "white",
          color: "black",
          mb: "20px",
          borderBottom: "3px solid #EC1B24",
        }}
        className="dynamicAnimation"
      >
        <Banner />
        <Paper elevation={10}>
          <Toolbar>
            <IconButton onClick={() => router.push("/")}>
              <HomeIcon sx={{ color: "#EC1B24" }} />
            </IconButton>
            <Stack
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              direction={"row"}
              flexGrow={1}
            >
              <Button onClick={() => router.push("/udichi")}>উদীচী</Button>
              <Button onClick={() => router.push("/organization")}>
                সংগঠন
              </Button>
              <Button onClick={() => router.push("/central-conferrance")}>
                জাতীয় সম্মেলন
              </Button>
              <Button onClick={() => router.push("/branches")}>
                জেলা/শাখা
              </Button>
              <Button onClick={() => router.push("/publications")}>
                প্রকাশনা
              </Button>
              <Button onClick={() => router.push("/literature")}>
                সাহিত্য
              </Button>
            </Stack>
            <Typography flexGrow={1} />
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Paper>
      </AppBar>
      {/* for mobile */}
      <Drawer open={open} onClose={() => setOpen(!open)}>
        <Typography align="right" sx={{ p: "20px" }}>
          <IconButton sx={{ color: "#EC1B24" }} onClick={() => setOpen(false)}>
            <Cancel />
          </IconButton>
        </Typography>
        <SideBar />
      </Drawer>
    </React.Fragment>
  );
}
