import React from "react";
import { useState, useEffect } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { List, ListItemText, ListItem, ListItemButton } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
import { useRouter } from "next/router";
import ListLoader from "@/components/ListLoader";
import { db } from "../utils/firebase";

export default function ReadAllPost() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });
  });
  return (
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
  );
}
