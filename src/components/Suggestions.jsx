import React,{useEffect,useState,useRef,useContext} from 'react'
import { toast } from 'react-toastify';
import "./suggestions.css";
import {friendContext} from "./FriendsContext"
import {userContext} from "../pages/Home"

function Suggestions() {
  const FriendContext=useContext(friendContext)
  const user_id=useContext(userContext).user.user_id;
  const AddFriend=async(friend_id)=>{
    try{
     const response=await fetch(`http://localhost:3000/api/friends/addfriend/${friend_id}`,{method:"POST"});
      const result=await response.json();
      if(response.status===201){
        toast.success(result.message);  
        loadSuggestions();}
        else{
        toast.error(result.message);
        loadSuggestions();
            }
      }catch(err)
      {
        console.log(err);
        toast.error("Something wemt wrong");
      }
  }
  const acceptRequest=async(friend_id)=>{
    try{
     const response=await fetch(`http://localhost:3000/api/friends/acceptRequest/${friend_id}`,{method:"POST"});
      const result=await response.json();
      if(response.status===201){
        toast.success(result.message);  
        loadSuggestions();}
        else{
        toast.error(result.message);
        loadSuggestions()}
        }catch(err)
        {
        console.log(err);
        toast.error("Something wemt wrong");
        }
  }
  const rejectRequest=async(friend_id)=>{
    try{
     const response=await fetch(`http://localhost:3000/api/friends/cancelRequest/${friend_id}`,{method:"POST"});
      const result=await response.json();
      if(response.status===201){
        toast.success(result.message);  
        loadSuggestions();}
        else{
        toast.error(result.message);
        loadSuggestions()}
        }catch(err)
        {
        console.log(err);
        toast.error("Something wemt wrong");
        }
  }
  const cancelRequest=async(friend_id)=>{
    try{
     const response=await fetch(`http://localhost:3000/api/friends/deleteRequest/${friend_id}`,{method:"POST"});
      const result=await response.json();
      if(response.status===201){
        toast.success(result.message);  
        loadSuggestions();}
        else{
        toast.error(result.message);
        loadSuggestions()}
        }catch(err)
        {
        console.log(err);
        toast.error("Something wemt wrong");
        }
  }
const handleButtons=(suggestion)=>{
     if(suggestion.friends.mySentRequests.includes(user_id))
     return (<><button onClick={()=>acceptRequest(suggestion._id)} type="button" className="btn btn-sm btn-primary m-1">Accept</button><button  onClick={()=>rejectRequest(suggestion._id)} type="button" className="btn btn-sm btn-primary">Reject</button></>);
     else if(suggestion.friends.myFriendRequests.includes(user_id))
     return( <button onClick={()=>cancelRequest(suggestion._id)} type="button"  className="btn btn-sm btn-primary mr-3 ">Cancel</button>);
     else if(suggestion.friends.myFriends.includes(user_id))
     return(<button type="button" className="btn btn-sm btn-primary">Friends</button>);
     else
     return(<button onClick={()=>AddFriend(suggestion._id)} type="button" className="btn btn-sm btn-primary ">Add Friend</button>);
}
 let allsuggestions=useRef([]);
 let filteredsuggestions=[];
useEffect(()=>{
loadSuggestions();
 },[FriendContext.rerender]);
const [suggestions,setSuggestions]=useState([]);
const loadSuggestions=async()=>{
try{
    const response=await fetch("http://localhost:3000/api/suggestions");
    const result=await response.json();
    if(response.status===200){
    setSuggestions(result);
    allsuggestions.current=result;
    }
    else
    console.log(result.message);
    }
catch(err){
    console.log(err);
          }}
           const handleSearch = (e) => {
           let inputstring=e.target.value.trim();
              if(!inputstring)
                {
               setSuggestions(allsuggestions.current);
                return;
                }
                let str=`^${e.target.value}`;
                let regexfirst=new RegExp(str,"i");
                let str1=`^${e.target.value}$`;
                let regexlast=new RegExp(str1,"i");
                if(e.target.value.indexOf(" ")!==-1)
                {let namesplit=e.target.value.split(" ");
                  str=`^${namesplit[0]}$`;
                  str1=`^${namesplit[1]}$`;
                  regexfirst=new RegExp(str,"i");
                  regexlast=new RegExp(str1,"i");}
                    allsuggestions.current.map((suggestion)=>{
                    // const fullname=suggestion.firstname+" "+suggestion.lastname;
                    if(e.target.value.indexOf(" ")!==-1){
                   if(regexfirst.test(suggestion.firstname) && regexlast.test(suggestion.lastname))
                         filteredsuggestions.push(suggestion)}
                    else{
                        if(regexfirst.test(suggestion.firstname) || regexlast.test(suggestion.lastname))
                        filteredsuggestions.push(suggestion);

                        }});
                      setSuggestions(filteredsuggestions)}
                      return (
                                 <>
       <div className="users-suggestions ">
        <div className="suggestions-search sticky-top">
      <input  onChange={handleSearch} type="text" id="input" placeholder="Suggestions"/><label htmlFor='input'><i class="fa fa-search" aria-hidden="true"></i></label></div>
      {suggestions.map((suggestion)=>{            
            return (
               <div className="users-container">
                 <span> <img
                    className="image"
                    src={suggestion.profile_img}
                    width="34px"
                    height="34px"
                  />  {"  "}
                  <span className="fullname">{suggestion.firstname + " " + suggestion.lastname}</span></span><span>
                    {handleButtons(suggestion)}

                  </span>
                </div> 
                );})} 
    </div>
    </>
  )
}

export default Suggestions
