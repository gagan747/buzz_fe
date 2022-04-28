import React, { useState, createContext, useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import "./posts.css"
import Comments from "./Comments.jsx"
import { userContext } from './Home';
import { feedContext } from '../components/Feed';
import {  useNavigate } from "react-router-dom";

    const commentContext = createContext();
    export { commentContext };
    export default function Post({ post}) {
    const navigate = useNavigate();
    const currentuser = useContext(userContext);
    const feeds = useContext(feedContext);
    const [optionstoggle, setOptionstoggle] = useState(false);
    const [commentstoggle, setCommentstoggle] = useState(false);
    const [commentsdata, setCommentsdata] = useState([]);
    const [rerender,setRerender]=useState(false);
    const updateComments = (newcomment) => {
    setCommentsdata([...commentsdata, newcomment]);
    }
    const deleteComment = (id) => {
    setCommentsdata(commentsdata.filter((comment) => comment._id !== id));
    }
    const deletePost = async () => {
        try {
             const response = await fetch(`http://localhost:3000/api/feed/${post._id}`, { method: "DELETE" });
             const result = await response.json();
            if (response.status == 200) {
                toast.success(result.message);
                feeds.deletefeed(post._id);
                 } 
              else if (response.status === 307) {
                navigate("/login");
                toast.error("User Not logged In");
              } 
              else
                toast.error(result.message);
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }
    }
        const handleComment = async () => {
        try {
            setCommentstoggle(!commentstoggle);
            if (!commentstoggle) {
                const result = await fetch(`http://localhost:3000/api/comments/${post._id}`,);
                const comments = await result.json();
                if (result.status == 201)
                    setCommentsdata(comments);
                 else if (result.status === 307) {
                        navigate("/login");
                        toast.error("User Not logged In");
                      } 
                  else
                    toast.error(result.message);
                   }
                    }
        catch (err) {
            toast.error("Something went wrong");
        }
    }
    const handleFlag=async()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/feed/flag/${post._id}`, { method: "PUT" });
            const result = await response.json();
            if (response.status == 200) {
             feeds.updatefeed(result); 
               setRerender(!rerender);    }
              else if (response.status === 307) {
                navigate("/login");
                toast.error("User Not logged In");
              } 
            else
               toast.error(result.message);
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }}
    const handleModerator=async ()=>{
           try {
            const response = await fetch(`http://localhost:3000/api/deletepost/${post._id}`, { method: "DELETE" });
            const result = await response.json();
            if (response.status == 200) {
                toast.success(result.message);
                feeds.deletefeed(post._id);
                 } 
            else if (response.status === 307) {
                navigate("/login");
                toast.error("User Not logged In");
              } 
            else
                toast.error(result.message);
        }
         catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }}
        useEffect(()=>{
        setOptionstoggle(false);
        },[post]);
         return (
             <>
            <commentContext.Provider value={{ commentsdata, feed_Id: post._id, updateComments, deleteComment }}>
                <div className="postcontainer">
                    <div className='postcreator'>
                            <span>  <img className="image" src={post.createdBy.profile_img} width="40px" height="40px" />
                            <span style={{ marginLeft: "8px" }}>{post.createdBy.firstname + " " + post.createdBy.lastname}</span>
                        </span>{ (currentuser.user.is_Admin) && (<span className='moderator-options'><i  onClick={handleModerator} className="fa fa-times text-danger" aria-hidden="true"></i><i class="fa fa-flag text-danger" aria-hidden="true">  :{post.flagCount.length}</i></span>) || <span  className='options-dropdown'><span onClick={() => { setOptionstoggle(!optionstoggle) }}>...</span>{ optionstoggle && <span >{ ((currentuser.user.user_id === post.createdBy._id) && <button onClick={deletePost} type="button" className="btn btn-secondary btn-sm" >Delete</button>) || <button  onClick={handleFlag} type="button" className=' px-2 btn btn-danger btn-sm'>{(post.flagCount.indexOf(currentuser.user.user_id) !== -1) && "Unflag" || "Mark as Flag"}</button>} </span>}</span>
                               } 
                          </div>
                          <div className="posttext">{post.text} </div>
                    {post.imgLink && <img className="postimage" src={post.imgLink} width="590px" height="400px" />}
                    <div className="like-comment-container">
                        <div>Like</div>
                        <div onClick={handleComment}><button style={{ border: "none", backgroundColor: "white" }}>Comment<i className="fa fa-comment m-2" aria-hidden="true"></i></button></div>
                    </div>  </div>
                {commentstoggle && <Comments />}
            </commentContext.Provider>
        </>
    );}
