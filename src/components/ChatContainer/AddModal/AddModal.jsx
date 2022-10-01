import React ,{ useState } from 'react'
import ChatBlock from '../../Leftbar/ChatList/ChatBlock'
import './AddModal.css'
import axios from 'axios';
// import { useState } from "react";
import {  createGroup,startGroupConversation,updateConversation,updateGroup } from "../../../routes/APIRoutes";
import { v4 as uuid } from 'uuid';
import { io } from "socket.io-client";
import { useEffect } from 'react';


function AddModal({setCurrentChat, groups, setAllGroups, currentConversation, setCurrentConversations, conversations, setConversations,outerConversation, setConversationInfo,currentChat,currentConversationInfo,modalOpen,setModalOpen,setSecondModalOpen,users,currentUser,socket }) {

    // console.log(outerConversation._id)
    const [selectedUsers, setSelectedUsers] = useState({});
    const [goodUsers,setGoodUsers] = useState([]);

    useEffect(()=>{
        console.log(users)
        console.log(currentChat)
        if(currentChat.groupname){
            var l = [];
            for(var i =0;i<users.length;i++){

                if(currentChat.members.includes(users[i]._id)){
                    continue;
                }else{
                    l.push(users[i]);
                }
                
               
                setGoodUsers(l)
            }

            
        }else{
            var tUsers = users.filter((u) => u._id !== currentChat._id)
            setGoodUsers(tUsers)
        }
    },[groups])

    const changeSelectedUsers = (u) =>{
        // console.log(u)
        // console.log(currentUser)

        // const { name, value } = {u.username,u};
        if(u){
            if(selectedUsers&&selectedUsers[u._id]){
                console.log(selectedUsers)
                setSelectedUsers(prevState => {
                    // ...prevState
    
    
                    const copy = {...prevState};
    
                    delete copy[u._id];
    
                    return copy;
                });
    
                
            }else{
                setSelectedUsers(prevState => ({
                    // ...prevState
    
                    ...prevState,
                    [u._id]: u
    
    
                }));
            }
        }
        
        
    }

    const closeModal = (e) =>{
        e.preventDefault();
        setSecondModalOpen(current => !current)
    }

    const submit = (e) =>{
        e.preventDefault();
        console.log(e)
        console.log(selectedUsers)
        var list = []

        for(var i = 0; i<currentConversationInfo.length;i++){
            list.push(currentConversationInfo[i]._id)
        }

        for(let i in selectedUsers){

            
            list.push(selectedUsers[i]._id)
        }
        // console.log(list)


        const g = async() =>{

            // update
            if(currentChat.groupname){
                const response = await axios.post(updateGroup, {
                    groupname:currentChat.groupname,
                    members:list
                  });



                  //setCurrentChat
                  console.log(response)


                  const response2 = await axios.post(updateConversation, {
                    // groupname:groupname,
                    converid:outerConversation._id,
                    matchId:currentChat.groupname,
                    members:list
                  });



                



                  const g2 = groups.slice()
                  for(var i = 0; i<(groups.length);i++){
                    if(groups[i]._id===currentChat._id){
                       


                        
                        console.log(g2[i])
                        g2[i].members = list

                        setAllGroups(g2)

                    }
                  }
                  const c = conversations.slice()
                  for(var i = 0; i<conversations.length;i++){
                    if(conversations[i]._id===outerConversation._id){

                        
                        c[i].members = list
                        
                        setConversations(c)
                        
                        
                        // 
                        // console.log(list)
                        // console.log(currentConversationInfo)

                        // console.log(selectedUsers)

                        
                        // var r = [
                        // const r = [...selectedUsers.values()];


                        for (let k in selectedUsers) {
                            console.log(k + ' is ' + selectedUsers[k])
                            // r.push(selectedUsers[k])


                            setConversationInfo((p)=>(
                                [...p,selectedUsers[k]]
                            ))
                        }


                        console.log(response2.data)
                        // setConversationInfo((p)=>(
                        //     [...p, r]
                        // ))



                        
                        const matchId = currentChat.matchId;
                        const isGroup = true;
                        socket.current.emit("send-group-update", {
                    
                            to:list,
                            data:{matchId,list,isGroup},
                            data2:g2
                          });
        
        
                          
                          
                          socket.current.emit("send-group-conversation-update", {
                            
                            to:list,
                            data:{matchId,list,isGroup},
                            data2:c
                          });



                    }
                  }
                  

                //   setConversationInfo
            }else{//create a group
                var groupname = "Group"+uuid();
                const response = await axios.post(createGroup, {
                    groupname:groupname,
                    matchId:groupname,
                    members:list
                  });
    
                  
                  const response2 = await axios.post(startGroupConversation, {
                    // converid:outerConversation._id,
                    matchId:groupname,
                    members:list
                  });



                  console.log(response.data)
                // const s = {
                //     groupname:currentChat.groupname,
                //     members:list
                // }

                // console.log(response.data)
                setAllGroups((p)=>[...p,response.data])
                setConversations((p)=>[
                    ...p,response2.data
                ])

                

                const matchId = groupname;
                // const list = response.data.members;
                const isGroup = true;
                socket.current.emit("send-group-create", {
                    
                    to:list,
                    data:{matchId,list,isGroup},
                    data2:response.data
                  });


                  
                  
                  socket.current.emit("send-group-conversation-create", {
                    
                    to:list,
                    data:{matchId,list,isGroup},
                    data2:response2.data
                  });





                // setConversations((p)=>(
                //     [...p,selectedUsers[k]]
                // ))


                // socket.current.emit("send-group-create", {
                    
                //     to:list,
                //     data:response.data,
                //     data2:response2.data
                //   });


                //   socket.current.emit("send-group-conversation", {
                    
                //     to:list,
                //     data:response2.data
                //   });
            }


           
           
              
           
        }
        g()

        

        // selectedUsers

        setModalOpen(current => !current) 
        setSecondModalOpen(current => !current)
    }
    // const {vals} = this.state;
  return (
    <div className='outer'>
        <div className="brand">
            <h2>
              <span>Members Selection</span>
            </h2>
          </div>
        <div className='add_modalContainer'>
        
            <div className='add_chatList'>


                {goodUsers&& goodUsers.map((u) => (

                    (u.username!=currentUser)&&
                    <div onClick={() => changeSelectedUsers(u)}>
                        <ChatBlock otherUser={u}/>
                    </div>
                    


                        
                ))}




            </div>

            <form className='add_right'>
                <div>
                    {selectedUsers&&
                        Object.keys(selectedUsers).map((key,values) => ( 
                        <p> {key}</p> 
                        ))
                    }
                </div>
                
            </form>

            

        </div>
        <div className='buttonLayout'>

            <button className="styledButton2" onClick={(e) => submit(e)}>submit</button>
            <button className="styledButton3" onClick={(e) => closeModal(e)}>close</button>
        </div>

        
    </div>
    
  )
}

export default AddModal