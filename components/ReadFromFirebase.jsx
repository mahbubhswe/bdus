import {
  Box,
  Stack,
  Paper,
  List,
  ListItemText,
  Typography,
  ListItem,
  ListItemButton,
} from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import moment from "moment/moment";
import PostLoader from "@/components/PostLoader";
import ListLoader from "@/components/ListLoader";
export default function ReadFromFirebase({ category }) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [postCategory] = useState(category);
  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = postCategory
      ? query(collectionRef, where("category", "==", `${postCategory}`))
      : query(collectionRef);

    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });
  }, [postCategory]);

  return (
    <React.Fragment>
      <Stack
        spacing={5}
        direction={{ xs: "column", sm: "column", md: "row" }}
        p={1}
        justifyContent="center"
      >
        <Paper
          sx={{
            width: { xs: "100%", sm: "70%", md: "70%" },
            borderRadius: "20px",
            p: { xs: "20px", sm: "30px", md: "50px" },
          }}
          elevation={3}
        >
          {posts.length > 0 ? (
            <React.Fragment>
              <Box
                sx={{
                  height: { xs: "250px", sm: "300px", md: "400px" },
                }}
              >
                <img
                  src={posts[posts.length - 1].bannerImage}
                  alt="Banner Image"
                  width={"100%"}
                  height={"100%"}
                  style={{ borderRadius: "18px" }}
                />
              </Box>
              <br />
              <ListItemText
                sx={{ borderBottom: "3px dashed #EE1B24" }}
                secondary={
                  <Typography
                    component="h1"
                    sx={{ fontSize: "28px", fontWeight: "bold" }}
                  >
                    {posts[posts.length - 1].title}
                  </Typography>
                }
                primary={moment(
                  posts[posts.length - 1].createdAt.toDate()
                ).format("MMMM Do YYYY, h:mm:ss a")}
              />

              <div
                dangerouslySetInnerHTML={{
                  __html: posts[posts.length - 1].content,
                }}
              />
            </React.Fragment>
          ) : (
            <PostLoader />
          )}
        </Paper>

        <Paper
          sx={{
            width: { xs: "100%", sm: "30%", md: "30%" },
            borderRadius: "20px",
            p: { xs: "10px", sm: "20px", md: "30px" },
            borderTop: "5px solid #EE1B24",
          }}
          elevation={3}
        >
          <Typography
            sx={{ borderBottom: "3px dashed #EE1B24" }}
            fontSize={30}
            fontFamily={"sans-serif"}
            fontWeight={900}
          >
            Post List
          </Typography>
          <List dense>
            {posts.length > 0 ? (
              posts.map((post, index) => {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => router.push(`/read?id=${post.id}`)}
                    >
                      <ForwardIcon sx={{ color: "#EE1D26" }} />
                      <ListItemText>{post.title}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })
            ) : (
              <ListLoader />
            )}
          </List>
        </Paper>
      </Stack>
    </React.Fragment>
  );
}
