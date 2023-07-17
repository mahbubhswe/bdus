import { Typography, Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
function Banner() {
  return (
    <Box sx={{ background: "white", p: "20px" }}>
      <Stack direction="row" justifyContent="start" spacing={1}>
        <Image src="/logo.png" height={70} width={50} quality={100} />

        <div style={{ display: "grid", placeContent: "center" }}>
          <Typography sx={{ color: "block" }}>
            বাংলাদেশ উদীচী শিল্পীগোষ্ঠী, যুক্তরাষ্ট্র সংসদ
          </Typography>
          <Typography sx={{ color: "block" }}>
            Udichi Shilpigoshthi, USA
          </Typography>
        </div>
      </Stack>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(Banner), {
  ssr: false,
});
