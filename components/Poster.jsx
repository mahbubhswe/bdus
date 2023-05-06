import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
function Poster() {
  return (
  
      <Typography component="div" align="center">
        <Image src="/poster500.gif" height={150} width={250} quality={100} />
      </Typography>
   
  );
}

export default dynamic(() => Promise.resolve(Poster), {
  ssr: false,
});
