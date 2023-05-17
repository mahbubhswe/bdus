import { Typography, Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
function Banner() {
  return (
    <Box sx={{ background: "white", p: "20px" }}>
      <Stack
        direction={{ xs: "column", sm: "row", md: "row" }}
        justifyContent={{
          xs: "center",
          sm: "space-between",
          md: "space-between",
        }}
      >
        <Image src="/logo.png" height={80} width={60} quality={100} />

        <div style={{ display: "grid", placeContent: "center" }}>
          <Typography sx={{ color: "block" }}>
            যুক্তরাষ্ট্র উদীচী শিল্পীগোষ্ঠী
          </Typography>
          <Typography sx={{ color: "block" }}>
            USA Udichi Shilpigoshthi
          </Typography>
        </div>
      </Stack>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(Banner), {
  ssr: false,
});
