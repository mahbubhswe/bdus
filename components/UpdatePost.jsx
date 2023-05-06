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
import { updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
export default function UpdatePost() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [id] = useState(router.query.id);
  const [value, setValue] = useState(router.query.content);
  const [title, setTitle] = useState(router.query.title);
  const [bannerImage, setBannerImage] = useState(router.query.bannerImage);
  const [category, setCategory] = useState(router.query.category);
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
  const updatePost = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this post",
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
          await updateDoc(doc(db, "posts", id), {
            category: category,
            bannerImage: bannerImage,
            content: value,
            title: title,
          });
          setOpen(false);
          Swal.fire(
            "Success",
            "Your post updated successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              router.push("/dashboard");
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
          Update Post
        </Typography>
        <Stack component="form" spacing={1} onSubmit={updatePost}>
          <Autocomplete
            defaultValue={category}
            options={[
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
          <FileBase64 onDone={(data) => setBannerImage(data.base64)} />
          <TextField
            size="small"
            required
            fullWidth
            label="Title"
            placeholder="Give a title"
            value={title}
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
              Update Post
            </Button>
          </ButtonSpacer>
        </Stack>
      </Paper>
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Container>
  );
}
