import React, { createContext, useState, useEffect } from "react";
import AddFeed from "./AddFeed";
import POSTS from "../pages/POSTS";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
const feedContext = createContext();
export { feedContext };
let feedCount=0;

function Feed() {
  const pageLimit=10
  const pageNumber=1
  const [feeds, setFeeds] = useState([]);
  const update = (data) => {
    setFeeds([data, ...feeds]);
    feedCount=feeds.length+1;
  };
  const updatefeed = (updatedfeed) => {
    feeds.map((feed) => {
      if (feed._id === updatedfeed._id) feed.flagCount = updatedfeed.flagCount;
      feed.likeCount = updatedfeed.likeCount;
    });
  };
  const deletefeed = (id) => {
    setFeeds(feeds.filter((feed) => feed._id !== id));
    feedCount=feeds.length-1;
  };
  useEffect(() => {
    postload();
  }, []);
  const postload = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/feed/?pageNumber=${pageNumber}&pageLimit=${pageLimit}`
      );
      const postsdata = await response.json();
      console.log(postsdata);
      // pageCount=postsdata.count/10
      setFeeds(postsdata.feeds);
      feedCount=postsdata.feedCount;
      console.log(feedCount)
    } catch (err) {
      toast.error("Error loading posts");
    }
  };

  return (
    <feedContext.Provider value={{ feeds, update, deletefeed, updatefeed,feedCount}}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <AddFeed />
      </div>
      <POSTS />
      {/* <Pagination/> */}
    </feedContext.Provider>
  );
}

export default Feed;
