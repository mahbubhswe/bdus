import {
  Stack,
  TextField,
  Button,
  Typography,
  Container,
  Card,
  Backdrop,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
  CardHeader,
  Avatar,
  Paper,
  CircularProgress,
  CardActionArea,
  Autocomplete,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  deleteDoc,
  doc,
  query,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import moment from "moment/moment";
import Swal from "sweetalert2";
import Loading from "@/components/Loading";
export default function Index() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState();
  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = category
      ? query(collectionRef, where("category", "==", `${category}`))
      : query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });
  }, [category]);
  const deletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this post",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setOpen(true);
          await deleteDoc(doc(db, "posts", id));
          setOpen(false);
          Swal.fire(
            "Success",
            "This post deleted successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } catch (error) {
          setOpen(false);
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };
  return (
    <Container sx={{ py: "10px" }}>
      <Paper
        sx={{
          px: { xs: "12px", sm: "30px", md: "50px" },
          py: "30px",
          borderRadius: "20px",
        }}
        elevation={3}
      >
        <Typography
          align="center"
          sx={{ fontSize: "35px", fontWeight: "bold", color: "gray" }}
        >
          All Post
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={1}
          px={{ xs: 5, sm: 10, md: 20 }}
        >
          <Autocomplete
            fullWidth
            options={[
              "সাধারণ পোস্ট",
              "উদীচী",
              "সংগঠন",
              "জাতীয় সম্মেলন",
              "জেলা/শাখা",
              "প্রকাশনা",
              "সাহিত্য",
            ].map((option) => option)}
            onChange={(event, newValue) => {
              setCategory(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Filter by category" />
            )}
          />
          <Button
            onClick={() => router.push("/dashboard/create-new-post")}
            variant="contained"
            size="small"
            color="customColor"
            sx={{ minWidth: "150px", color: "white" }}
          >
            Create New Post
          </Button>{" "}
          <Button
            onClick={() => router.push("/dashboard/setlatestNews")}
            variant="contained"
            size="small"
            color="customColor"
            sx={{ minWidth: "150px", color: "white" }}
          >
            Set Latest News
          </Button>
        </Stack>
        <Grid
          mt={1}
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {posts.length > 0 ? (
            posts.map((item, index) => (
              <Grid item key={index}>
                <Card sx={{ width: 300, height: 400 }}>
                  <CardActionArea>
                    <CardHeader
                      avatar={<Avatar src="/logo.png" />}
                      title={item.category}
                      subheader={moment(item.createdAt.toDate()).format(
                        "MMMM Do YYYY, h:mm:ss a'"
                      )}
                    />
                    <CardMedia
                      component="img"
                      sx={{ height: 140 }}
                      image={item.bannerImage}
                      title={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => deletePost(item.id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        router.push(
                          `/dashboard/update-post?id=${item.id}&category=${item.category}&bannerImage=${item.bannerImage}&title=${item.title}&content=${item.content}`
                        )
                      }
                    >
                      Update
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Loading />
          )}
        </Grid>
        <Backdrop open={open}>
          <CircularProgress color="secondary" />
        </Backdrop>
      
      </Paper>
    </Container>
  );
}
