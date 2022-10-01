import React, { useState, useEffect } from "react";
import './Chatheader.css'
// currentChat = {currentChat}
import { BsPower } from "react-icons/bs";
import { useNavigate,Link } from "react-router-dom";
import { TbAlignJustified } from "react-icons/tb";
function Chatheader({socket ,
  setAllGroups ,
  setCurrentConversations ,
  setConversations,
  currentChat ,setConversationInfo,setModalOpen}) {
  const navigate = useNavigate();


  const logOut = (e) =>{
    console.log(e)
    if (!window.confirm("Are you sure to logout?")){
      return 
    }
    localStorage.clear();

    navigate("/login");
    
  }
  const setModal = ()=>{
    console.log("setModal")
    setModalOpen(current => !current)
  }

  return (
    <div>
      {currentChat?
        <div className='header'>
              
              <div className="imgText">
                <div className="userimg">
                    <img src="logo.svg" className="cover"/>
                </div>
                {currentChat.username?<h4> {currentChat.username}</h4>:<h4> {currentChat.groupname}</h4>}
                  
              </div>


              <div>
                <TbAlignJustified onClick={setModal } size={20} style={{marginRight:'30px',cursor:'pointer'}} />
                <BsPower onClick={e =>logOut(e)} size={20} style={{marginRight:'30px',cursor:'pointer'}} />
              </div>
              
            </div>
          :

          <div className='header'>
              
            <div className="imgText">
              <div className="userimg">
                  <img src="logo.svg" className="cover"/>
              </div>
                <h4> group</h4>
               
            </div>
            <BsPower onClick={e =>logOut(e)} size={20} style={{marginRight:'30px',cursor:'pointer'}} />
          </div>

      }
      
    </div>
    
  )
}

export default Chatheader