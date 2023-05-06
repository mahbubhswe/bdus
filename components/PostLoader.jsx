import * as React from "react";
import { Skeleton, Box, Divider } from "@mui/material";

export default function PostLoader() {
  return (
    <Box>
      <Skeleton height={500} animation="wave" />
      <Skeleton animation={false} />
      <Skeleton animation="wave" height={50} />
      <Divider my={10} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} /> <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
