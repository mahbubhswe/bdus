import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ButtonSpacer from "@/components/ButtonSpacer";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import { db } from "../utils/firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
export default function CreateNewPost() {
  const [open, setOpen] = useState(false);
  const [news, setNews] = useState("");
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "latestNews");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let newsArray = [];
      querySnapshot.forEach((doc) => {
        newsArray.push({ ...doc.data(), id: doc.id });
      });
      setNewsList(newsArray);
    });
  });
  const createPost = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to change latest news",
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
          await addDoc(collection(db, "latestNews"), {
            news: news,
          });
          setOpen(false);
          Swal.fire(
            "Success",
            "Latest news change successfully!",
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
  const deleteNews = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this news",
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
          await deleteDoc(doc(db, "latestNews", id));
          setOpen(false);
          Swal.fire(
            "Success",
            "This news deleted successfully!",
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
    <Container sx={{ mt: "30px" }} maxWidth="md">
      <Paper sx={{ p: "30px" }}>
        <Typography
          align="center"
          sx={{ fontSize: "35px", fontWeight: "bold", color: "gray" }}
        >
          Set Latest News
        </Typography>
        <Stack component="form" spacing={1} onSubmit={createPost}>
          <TextField
            size="small"
            required
            fullWidth
            label="Title"
            placeholder="Give a title"
            onChange={(e) => setNews(e.target.value)}
          />
          <ButtonSpacer>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="contained"
              size="small"
              sx={{ minWidth: "150px" }}
              color="error"
            >
              Cancel
            </Button>
            <Button
              disabled={newsList.length > 0 ? true : false}
              variant="contained"
              type="submit"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              Create Now
            </Button>
          </ButtonSpacer>
        </Stack>{" "}
        <br />
        <p style={{color:"red"}}>
          {newsList.length > 0
            ? "Please delete this current latest news to create a new one"
            : null}
        </p>
        <strong>Current Latest News:</strong>
        {newsList.length > 0
          ? newsList.map((item, index) => (
              <div key={index}>
                <Typography>{item.news}</Typography>
                <Button
                  size="small"
                  onClick={() => deleteNews(item.id)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </div>
            ))
          : null}
      </Paper>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Container>
  );
}
