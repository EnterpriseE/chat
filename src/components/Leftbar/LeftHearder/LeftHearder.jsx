import React, { useEffect, useState } from 'react'
// import SearchChat from '../SearchChat/SearchChat'
import './LeftHeader.css'
function LeftHearder(currentUser) {
  // console.log(currentUser)

  const[user, setUser] = useState("")

  useEffect(()=>{
    if(currentUser!==undefined&&currentUser!==null){
      setUser(currentUser.currentUser);
    }else{
      setUser("user");
    }
  },[user])
  return (
    
    <div className='LeftHeader'>
       {/* LeftHearder */}
      <div className='userImg'>

        <img src="logo192.png" className="cover"></img>
       
      </div>
      {currentUser!==undefined&&
        <h4 style={{marginLeft:'10px'}}>{currentUser.currentUser}</h4>
      }

      
       
      
       
      
    </div>
  )
}

export default LeftHearder