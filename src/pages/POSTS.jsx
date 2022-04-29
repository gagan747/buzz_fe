import React, { useContext } from "react";
import Post from "./Post.jsx";
import { feedContext } from "../components/Feed.jsx";

export default function POSTS() {
  const object = useContext(feedContext);
  return (
    <>
      {object.feeds.map((e) => (
        <Post post={e} />
      ))}{" "}
    </>
  );
}
