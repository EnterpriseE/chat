import React from 'react'
import "./ChatList.css"

function ChatBlock({otherUser}) {
  // console.log(otherUser)



  return (
    <div >
      {otherUser && 
        <div className="block">
           <div className="imgbx">
              <img src="logo192.png" className="cover"/>

            </div>
          {otherUser.username?<h5>{otherUser.username}</h5>:<h5>{otherUser.groupname}</h5>}
          
        </div>

       
      }
    </div>
  )
}

export default ChatBlock