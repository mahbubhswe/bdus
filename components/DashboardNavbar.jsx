import { AppBar, Button, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import Logout from "@mui/icons-material/Logout";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function DashboarNavbar() {
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <AppBar
      variant="outlined"
      position="relative"
      sx={{
        p: "10px",
        background: "white",
        color: "black",
        borderBottom: "3px solid #EE1B24",
      }}
    >
      <Tooltip>
        <Stack direction={"row"}>
          <Image
            src="/ff.png"
            alt="Logo"
            width={50}
            height={50}
            quality={100}
          />
          <Typography flexGrow={1} />
          <div style={{ display: "grid", placeContent: "center" }}>
            <Button
              variant="contained"
              color="error"
              size="small"
              endIcon={<Logout />}
              onClick={() => {
                signOut(auth).then(() => {
                  router.push("/auth/login");
                });
              }}
            >
              {user ? user.email : null}
            </Button>
          </div>
        </Stack>
      </Tooltip>
    </AppBar>
  );
}
