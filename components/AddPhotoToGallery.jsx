import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ButtonSpacer from "@/components/ButtonSpacer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";

import "react-quill/dist/quill.snow.css";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import Image from "next/image";
export default function AddPhotoToGallery() {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState();
  const router = useRouter();
  const [photpList, setPhotoList] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "gallery");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let newsArray = [];
      querySnapshot.forEach((doc) => {
        newsArray.push({ ...doc.data(), id: doc.id });
      });
      setPhotoList(newsArray);
    });
  });
  const addPhoto = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this photo to gallery",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (photo !== "") {
          try {
            setOpen(true);
            await addDoc(collection(db, "gallery"), {
              photo: photo,
            });
            setOpen(false);
            Swal.fire("Success", "Photo added successfully!", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              }
            );
          } catch (error) {
            setOpen(false);
            Swal.fire("Error", error.message, "error");
          }
        } else {
          Swal.fire("Warning", "Missing photo", "warning");
        }
      }
    });
  };
  const deletePhoto = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this photo",
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
          await deleteDoc(doc(db, "gallery", id));
          setOpen(false);
          Swal.fire(
            "Success",
            "This photo deleted successfully!",
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
          Add Photo To Gallery
        </Typography>
        <Stack component="form" spacing={1} onSubmit={addPhoto}>
          <Typography align="center">
            {photo ? <Image src={photo} height={300} width={300} /> : null}
          </Typography>
          <Typography>Select a Photo</Typography>
          <FileBase64 onDone={(data) => setPhoto(data.base64)} />{" "}
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
              variant="contained"
              type="submit"
              size="small"
              sx={{ minWidth: "150px" }}
            >
              Add to Gallery
            </Button>
          </ButtonSpacer>
        </Stack>
        <br></br>
        <Divider />
        <h1>Photo Gallery:</h1>
        {photpList.length > 0
          ? photpList.map((item, index) => (
              <Typography key={index} align="center">
                <Image src={item.photo} height={300} width={300} />{" "}
                <Button
                  size="small"
                  onClick={() => deletePhoto(item.id)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Typography>
            ))
          : null}
      </Paper>{" "}
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Container>
  );
}
