import React from 'react'
import ChatList from '../ChatList/ChatList'
import LeftHearder from '../LeftHearder/LeftHearder'
import SearchChat from '../SearchChat/SearchChat'
import Footer from '../footer/Footer'

import "./Leftbar.css"
function Leftbar({socket ,
  setAllGroups,
  setCurrentConversations,
  setConversations,
  currentChat ,setConversationInfo,groups,currentUser,users,handleUserChatChange}) {



  console.log(groups)
  return (
    <div className='leftbar'>
      <LeftHearder 
      socket = {socket}
      setAllGroups = {setAllGroups}
      setCurrentConversations = {setCurrentConversations}
      setConversations = {setConversations}
      currentChat = {currentChat}
      
      setConversationInfo = {setConversationInfo} currentUser = {currentUser}/>
      {/* <SearchChat /> */}
      <ChatList  groups = {groups} currentUser = {currentUser} users ={users} handleUserChatChange={handleUserChatChange}/>
      <Footer />


    </div>
  )
}

export default Leftbar