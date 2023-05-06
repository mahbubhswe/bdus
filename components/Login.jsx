import React, { useState } from "react";
import {
  Container,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Slide from "react-reveal/Slide";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Head from "next/head";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
export default function SignIn() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const hideShowPassword = () => {
    setShow(!show);
  };
  //login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
      setOpen(false);
    } catch (error) {
      setOpen(false);
      Swal.fire("Error", "Invalid email or password", "error");
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Please, sign in to continue</title>
      </Head>
      <Slide left>
        <Container maxWidth="sm" sx={{ my: "50px" }}>
          <Stack
            sx={{
              background: "white",
              borderRadius: "30px",
              p: "50px",
              border: "1px solid #ccc",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Image
                src={"/ff.png"}
                quality={100}
                alt="logo"
                width={100}
                height={150}
              />
            </div>
            <br />
            <Stack spacing={1} component="form" onSubmit={handleSubmit}>
              <Typography
                variant="bold"
                component={"h4"}
                sx={{ color: "#222222" }}
                align="center"
              >
                বাংলাদেশ উদীচী শিল্পীগোষ্ঠী ইউএসএ সংসদ
              </Typography>
              <Typography
                variant="bold"
                component={"h4"}
                sx={{ color: "#222222" }}
                align="center"
              >
                Bangladesh Udichi Shilpigoshthi USA Inc.
              </Typography>
              <Divider textAlign="left">
                <Typography>Please, sign in to continue</Typography>
              </Divider>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Enter email address"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton disabled>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                color="customColor"
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                size="small"
                color="customColor"
                type={show ? "text" : "password"}
                variant="outlined"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={hideShowPassword}>
                        {show ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                disabled={open ? true : false}
                color="customColor"
                sx={{ color: "white" }}
                type="submit"
              >
                Signin
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Slide>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
