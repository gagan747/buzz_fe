import React,{createContext,useState,useEffect} from "react";
import AddFeed from "./AddFeed";
import POSTS from "../pages/POSTS";
import { toast } from "react-toastify";

const feedContext=createContext();
export {feedContext};

function Feed() {
   const [feeds,setFeeds]=useState([]);
  const addfeed=()=>{
  postload();
  }   
    const updatefeed=(updatedfeed)=>{
    feeds.map((feed)=>{
   if(feed._id===updatedfeed._id)
   feed.flagCount=updatedfeed.flagCount;
   })}
    const deletefeed=()=>{
   postload();
    }
    useEffect(() => {
     postload();
    },[]);
const postload = async () => {
  try{
 const response = await fetch("http://localhost:3000/api/feed/");
 const postsdata = await response.json();
  setFeeds(postsdata);
 }
 catch(err){
  toast.error("Error loading posts")
}}

  return (
     <feedContext.Provider value={{feeds,addfeed,deletefeed,updatefeed}}>
     <div className="d-flex flex-column justify-content-center align-items-center">
      <AddFeed />
     </div>
     <POSTS />
    </feedContext.Provider>
  );
}

export default Feed;
