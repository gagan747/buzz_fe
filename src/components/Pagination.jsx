import { useContext, useEffect, useState } from "react"
import { feedContext } from "./Feed"

function Pagination() {
  const [render,setRender]=useState(false)
  // useEffect(()=>{
  // })
  // setRender
  const feedcontext =useContext(feedContext)
  console.log(feedcontext)
  return (
    <>
    <button onClick={()=>setRender(!render)}>Buuton</button>
    <div>Pagination</div>
    </>
  )
}

export default Pagination
