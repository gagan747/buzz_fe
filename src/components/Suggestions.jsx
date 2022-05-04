import React,{useEffect,useState,useRef,useContext} from 'react'
import { toast } from 'react-toastify';
import "./suggestions.css";

function Suggestions() {
  
 let allsuggestions=useRef([]);
 let filteredsuggestions=[];
useEffect(()=>{
loadSuggestions();
 },[]);
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
    {
    toast.error("error loading suggestions");
    console.log(result.message);
}}
catch(err){
    toast.error("Something went wrong");
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

                        }
                 });
                setSuggestions(filteredsuggestions);
                   }
  return (
      <>
       
    <div className="users-suggestions ">
    <div className="suggestions-search sticky-top">
      <input  onChange={handleSearch} type="text" id="input" placeholder="Suggestions"/><label htmlFor='input'><i class="fa fa-search" aria-hidden="true"></i></label></div>
      {suggestions.map((suggestion)=>{            
            return (
               <div className="users-container">
                  <img
                    className="image"
                    src={suggestion.profile_img}
                    width="34px"
                    height="34px"
                  />  {"  "}
                  <span className="fullname">{suggestion.firstname + " " + suggestion.lastname}</span>
                </div> 
            
              );})}
    </div>
    </>
  )
}

export default Suggestions
