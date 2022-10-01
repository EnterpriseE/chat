import React from "react";
import "./ChatHeaderModal.css";
import {IoAddCircleOutline,IoCloseCircleOutline,IoAdd } from "react-icons/io5";
import {  createGroup,startGroupConversation,updateConversation,updateGroup } from "../../../routes/APIRoutes";
import axios from 'axios';


function ChatHeaderModal({setCurrentChat ,groups, socket, setAllGroups,
  setCurrentConversations,
  setConversations,
   currentConversation,
   
   conversations,currentChat,setConversationInfo,setModalOpen,setSecondModalOpen,currentConversationID, setSelectedMembers,currentConversationMembers,currentConversationInfo}) {
    // console.log(currentConversationID)
    // console.log(currentConversationMembers)
    console.log(currentConversationInfo)
    // const c = currentConversation.members



    const quit = async() =>{
      if (!window.confirm("Are you sure to leave the group?")){
        return 
      }


      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      console.log(data._id)

      var list = []

        for(var i = 0; i<currentConversationInfo.length;i++){
          if(currentConversationInfo[i]._id!==data._id){
            list.push(currentConversationInfo[i]._id)
          }
            
        }

        if(currentChat.groupname){
          const response = await axios.post(updateGroup, {
              groupname:currentChat.groupname,
              members:list
            });

            // console.log(response)


            const response2 = await axios.post(updateConversation, {
              // groupname:groupname,
              converid:currentConversationID,
              members:list
            });





            const c = conversations.slice()
            for(var j = 0;j<conversations.length;j++){
              if((conversations[j].matchId)&&(currentChat.matchId)&&conversations[j].matchId===currentChat.matchId){
                c[j].members = list;
              }
            }

            const cList = []
            for(var j = 0; j<conversations.length;j++){
              if(conversations[j].matchId!==currentChat.matchId){
                cList.push(conversations[j])
              }
            }

            


            const g = groups.slice()
            for(var j = 0;j<groups.length;j++){
              if((groups[j].matchId)&&(currentChat.matchId)&&groups[j].matchId===currentChat.matchId){
                g[j].members = list;
              }
            }

            const gList = []
            for(var j = 0; j<groups.length;j++){
              if((groups[j].matchId)&&(groups[j].matchId!==currentChat.matchId)){
                gList.push(groups[j])
              }
            }

            console.log(gList)
            setConversations(cList)
            setAllGroups(gList)

            const matchId = currentChat.matchId;
            const isGroup = true;
            socket.current.emit("send-group-conversation-update", {
                            
              to:list,
              data:{matchId,list,isGroup},
              data2:c
          });


            socket.current.emit("send-group-update", {
                    
                to:list,
                data:{matchId,list,isGroup},
                data2: g
            });
        
        
                          
                          
           

            console.log(gList)
            
            setCurrentChat(undefined)
            setModalOpen(current => !current)


        }

        console.log(list)
    }

    const createGroup = ()=>{
      setSecondModalOpen(current => !current)
    }


  return (
    // <div className="modalBackground">
      <div>
          <div className="modalWrapper">
          <div className="brand">
            <h2>
              <span>Members</span>
            </h2>
          </div>
            <div className="modalContainer">
          
        
              
              {currentConversationInfo&&currentConversationInfo.map((c)=>(
                <div>
                    <div className="imgbx">
                      <img src="logo192.png" className="cover"/>
                      

                    </div>
                    <div>{c.username}</div>
                </div>
                
                  

              ))} 
              <div>
                <div className="imgbx">
                  <IoAddCircleOutline size="45px" style={{cursor:'pointer'}} onClick={createGroup}/>
                  
                </div>
                <div>invite</div>
              </div>
              
              {/* <IoAddCircleOutline size = {{width:'45px',height:'45px'} } style={{cursor:'pointer'}} onClick={createGroup}/> */}
        
              </div>

              <button className="styledButton" onClick={quit}>Leave</button>
          </div>
            
      

            
        </div>
    // </div>
  );
}

export default ChatHeaderModal;