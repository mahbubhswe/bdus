import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import {
  Paper,
  Stack,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import PostLoader from "@/components/PostLoader";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import moment from "moment/moment";
import ReadAllPost from "@/components/ReadAllPost";
export default function Read() {
  const router = useRouter();
  const [post, setPost] = useState();
  const id = router.query.id;
  const getPost = async () => {
    const docRef = doc(db, "posts", `${id}`);
    const docSnap = await getDoc(docRef);
    setPost(docSnap.data());
  };
  useEffect(() => {
    getPost();
  });

  return (
    <Layout pageTitle={post ? post.title : "Loading..."}>
      <Stack
        spacing={5}
        direction={{ xs: "column", sm: "column", md: "row" }}
        p={2}
        justifyContent="center"
      >
        <Paper
          sx={{
            width: { xs: "100%", sm: "70%", md: "70%" },
            borderRadius: "20px",
            p: "10px",
          }}
          elevation={3}
        >
          {post ? (
            <React.Fragment>
              <Box
                sx={{
                  height: { xs: "250px", sm: "300px", md: "400px" },
                }}
              >
                <img
                  src={post.bannerImage}
                  alt="Banner Image"
                  width={"100%"}
                  height={"100%"}
                  style={{ borderRadius: "18px" }}
                />
              </Box>
              <br />
              <ListItemText
                secondary={
                  <Typography
                    component="h1"
                    sx={{ fontSize: "28px", fontWeight: "bold" }}
                  >
                    {post.title}
                  </Typography>
                }
                primary={moment(post.createdAt.toDate()).format(
                  "MMMM Do YYYY, h:mm:ss a'"
                )}
              />
              <Divider sx={{ my: "5px" }} />

              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </React.Fragment>
          ) : (
            <PostLoader />
          )}
        </Paper>

        <Paper
          sx={{
            width: { xs: "100%", sm: "30%", md: "30%" },
            borderRadius: "20px",
            p: "10px",
            borderTop: "5px solid #EE1B24",
          }}
          elevation={3}
        >
          <Typography fontSize={30} fontFamily={"sans-serif"} fontWeight={900}>
            Post List
          </Typography>
          <Divider></Divider>
          <ReadAllPost />
        </Paper>
      </Stack>
    </Layout>
  );
}
