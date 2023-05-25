import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import Marquee from "react-fast-marquee";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function ViewGallery() {
  const [photo, setPhoto] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "gallery");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let newsArray = [];
      querySnapshot.forEach((doc) => {
        newsArray.push({ ...doc.data(), id: doc.id });
      });
      setPhoto(newsArray);
    });
  });
  return (
    <>
      <br></br> <br></br>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        ফোটো গেলারি
      </h1>
      <br></br>
      <Marquee>
        {photo.length > 0
          ? photo.map((item, index) => (
              <Image
                key={index}
                src={item.photo}
                height={300}
                width={300}
                style={{ margin: "50px", borderRadius: "30px" }}
              />
            ))
          : null}
      </Marquee>
    </>
  );
}
