import {
  Autocomplete,
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
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import FileBase64 from "react-file-base64";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { db } from "../utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
export default function CreateNewPost() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState();
  const [category, setCategory] = useState("");
  const router = useRouter();
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          ["link", "image", "video"],
          ["clean"],
        ],

        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      },
    }),
    []
  );
  const createPost = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to create this post",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (value !== "") {
          try {
            setOpen(true);
            const r = await addDoc(collection(db, "posts"), {
              category: category,
              bannerImage: bannerImage,
              content: value,
              title: title,
              createdAt: serverTimestamp(),
            });
            setOpen(false);
            Swal.fire(
              "Success",
              "Your post created successfully!",
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
        } else {
          Swal.fire("Warning", "Missing banner image or content", "warning");
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
          Create a New Post
        </Typography>
        <Stack component="form" spacing={1} onSubmit={createPost}>
          <Autocomplete
            options={[
              "সাধারণ পোস্ট",
              "উদীচী",
              "সংগঠন",
              "জাতীয় সম্মেলন",
              "জেলা/শাখা",
              "আগামী দিনের কর্মসূচি",
              "গঠন ত্রান্ত",
            ].map((option) => option)}
            onChange={(event, newValue) => {
              setCategory(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                required
                fullWidth
                label="Select a category"
              />
            )}
          />
          <Typography>Select Banner Image</Typography>
          <FileBase64 onDone={(data) => setBannerImage(data.base64)} />{" "}
          <TextField
            size="small"
            required
            fullWidth
            label="Title"
            placeholder="Give a title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactQuill value={value} modules={modules} onChange={setValue} />
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
              Create Post
            </Button>
          </ButtonSpacer>
        </Stack>
      </Paper>{" "}
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Container>
  );
}
