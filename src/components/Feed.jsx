import React, { createContext, useState, useEffect } from "react";
import AddFeed from "./AddFeed";
import POSTS from "../pages/POSTS";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
const feedContext = createContext();
export { feedContext };

const pageLimit = 10;

function Feed() {
  let [feedCount, setFeedCount] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const addfeed = () => {
    postload(1);
  };
  const updatefeed = (updatedfeed) => {
    feeds.map((feed) => {
      if (feed._id === updatedfeed._id) feed.flagCount = updatedfeed.flagCount;
      feed.likeCount = updatedfeed.likeCount;
    });
  };
  const deletefeed = (pageNo) => {
    if (feedCount % 10 === 1 && feedCount - 1 !== 0) {
      pageNo -= 1;
      setPageIndex(pageNo);
    }
    postload(pageNo);
  };

  useEffect(() => {
    postload(1);
  }, []);
  const postload = async (pageNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/feed/?pageNumber=${pageNumber}&pageLimit=${pageLimit}`
      );
      const postsdata = await response.json();
      setFeeds(postsdata.feeds);
      feedCount = postsdata.feedCount;
      setFeedCount(feedCount);
    } catch (err) {
      toast.error("Error loading posts");
    }
  };
  const getFeeds = (pageNumber) => {
    setPageIndex(pageNumber);
    postload(pageNumber);
  };
  return (
    <feedContext.Provider
      value={{
        feeds,
        addfeed,
        deletefeed,
        updatefeed,
        feedCount,
        pageLimit,
        getFeeds,
        pageIndex,
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center ">
        {pageIndex === 1 && <AddFeed />}
        <POSTS />
        <Pagination />
      </div>
    </feedContext.Provider>
  );
}

export default Feed;
