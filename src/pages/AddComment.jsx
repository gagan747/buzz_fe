import { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import "./AddComment.css"
import { commentContext } from './Post';
import { userContext } from './Home';
import { useNavigate } from "react-router-dom";

export default function AddComment() {
    const navigate = useNavigate();
    const currentuser = useContext(userContext);
    const commentcontext = useContext(commentContext);
    const [comment, setComment] = useState("");
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (e.target.childNodes[1].value.length < 5)
            return toast.error("Comments should be greater than 5 characters")
            const result = await fetch(`http://localhost:3000/api/comments/${commentcontext.feed_Id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({ comment: e.target.childNodes[1].value })
            });
            const response = await result.json();
            if (result.status == 200) {
                commentcontext.updateComments(response.data);
                toast.success(response.message);
                setComment("");
            }
            else if (result.status === 307) {
                navigate("/login");
                toast.error("User Not logged In");
            }
            else {
                console.log(response.message);
                toast.error("Something went wrong!! Comment not added")
             }}
            catch (err) {
            toast.error("Something went wrong");
            }}
            return (
              <div>
                <form className="form" onSubmit={handleSubmit} >
                <img src={currentuser.user.profile_img} className="image" width="40px" height="40px" />
                <input type="text" value={comment} placeholder="Add a comment" onChange={(e) => { setComment(e.target.value) }} className="addcomment" required />
                <button class=" btn btn-sm btn-primary rounded-pill" type="submit" style={{ width: "70px", fontWeight: "bold" }}>Post</button>
                </form>
                </div> )}
                
