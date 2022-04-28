import React, { useContext, useState } from 'react'
import "./Comments.css"
import AddComment from "./AddComment.jsx";
import { commentContext } from './Post';
import Commentbox from './Commentbox';

export default function Comments() {
  const commentcontext = useContext(commentContext);
  const comments = commentcontext.commentsdata;
  return (
       <>
      <div className="comments">
        {comments.length == 0 ? <p style={{ textAlign: "center" }} className="mt-3 pt-4">No comments found</p> : comments.map((comment) => <Commentbox data={comment} />)}
        <AddComment />
      </div>
    </>
  )
}

