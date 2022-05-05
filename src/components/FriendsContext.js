import {createContext,useState} from 'react'
import Suggestions from "./Suggestions.jsx"
import Friends from "./Friends"

const friendContext=createContext();
export {friendContext};

export default function FriendsContext() {
    const [rerender,setRerender]=useState(false);
    const forceRender=()=>setRerender(!rerender);
    
  return (
      <friendContext.Provider value={{forceRender,rerender}}>
       <Friends />
       <Suggestions />
    </friendContext.Provider>
  )
}
