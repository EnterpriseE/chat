// import React ,{ useState, useEffect, useRef }from 'react'
import Chatbox from '../Chatbox/Chatbox'
import Chatheader from '../Rightheader/Chatheader'
import './Rightbar.css'
import React, { useState, useEffect } from "react";

// import {  getAllConversation,startConversation } from "../../../routes/APIRoutes";
// import {  getAllMessagesRoute,sendMessageRoute } from "../../../routes/APIRoutes";

// import axios from 'axios';

function Rightbar({setCurrentChat ,groups,setAllGroups,

     
     currentConversation, setCurrentConversations, conversations, setConversations,setOuterConversation, currentConversationInfo ,setConversationInfo ,setModalOpen,setSecondModalOpen ,modalOpen,currentChat,users, socket}) {
    
    const [selectedMembers, setSelectedMembers] = useState(false);
    // const [modalOpen, setModalOpen] = useState(false);

    


    return (
        <div className='rightContainer'>
            {
                // currentChat?
                <div >
                    
                    <div>
                        <Chatheader socket = {socket}
      setAllGroups = {setAllGroups}
      setCurrentConversations = {setCurrentConversations}
      setConversations = {setConversations}
      currentChat = {currentChat} setConversationInfo = {setConversationInfo} setModalOpen = {setModalOpen}></Chatheader>
                        
                        <div >
                        
                            <Chatbox 
                            setCurrentChat = {setCurrentChat}
                            groups={groups}
                             setAllGroups = {setAllGroups}
                            currentConversation = {currentConversation}
                            setCurrentConversations = {setCurrentConversations}
                            
                            conversations = {conversations}
                            
                            setConversations = {setConversations}

                            
                            setOuterConversation = {setOuterConversation}
                            currentConversationInfo = {currentConversationInfo}
                            setConversationInfo = {setConversationInfo}
                            currentChat = {currentChat}
                            setSecondModalOpen = { setSecondModalOpen } 
                            users = {users}
                            modalOpen = {modalOpen}
                            setSelectedMembers = {setSelectedMembers}
                            //  conversations={conversations} 
                            //  messages = {messages}
                            setModalOpen = { setModalOpen }
                            socket = {socket} 
                            />
                    
                        
                            
                            
                        </div>
                        

                        
                    </div>
                    
                    
                </div>
                
                
                // :
                // <>hello
                // </>
            }
            
            
        </div>
      )
}

export default Rightbar