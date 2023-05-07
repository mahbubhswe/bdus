import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import Marquee from "react-fast-marquee";

export default function LatestNews() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "latestNews");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let newsArray = [];
      querySnapshot.forEach((doc) => {
        newsArray.push({ ...doc.data(), id: doc.id });
      });
      setNews(newsArray);
    });
  });
  return (
    <Marquee style={{ color: "red" }}>
      {news.length > 0 ? news[0].news : null}
    </Marquee>
  );
}
