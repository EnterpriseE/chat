import React , { useState, useEffect, useRef }from 'react'
import './Chatbox.css'
import axios from 'axios';
import {  getAllMessagesRoute,sendMessageRoute } from "../../../routes/APIRoutes";
import {  getAllConversation,startConversation } from "../../../routes/APIRoutes";
import { io } from "socket.io-client";
import  ChatHeaderModal  from "../../Rightbar/ChatHeaderModal/ChatHeaderModal"

import ChatInput from '../ChatInput/ChatInput'



function Chatbox( { setCurrentChat ,groups, setAllGroups, currentConversation, setCurrentConversations, conversations, setConversations,setOuterConversation, currentConversationInfo ,setConversationInfo ,currentChat, setSecondModalOpen,users,modalOpen,setSelectedMembers,setModalOpen ,socket}) {
  // console.log(setModalOpen)
  // const [messages, setMessages] = useState();
  console.log(currentConversation)
  const [cUser, setCUser] = useState();
  const [currentMessages, setCurrentMessages] = useState();

  
  const [arrivalMessage, setArrivalMessage] = useState();
  const [arrivalConversation, setArrivalConversation] = useState();

  // const [flag,setFlag] = useState(0);
  const [messages, setMessages] = useState();
  // const [currentConversation, setCurrentConversations] = useState();
  // const [conversations, setConversations] = useState();


  
  // const cUser = JSON.parse(
  //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  // );

  // console.log

  const scrollRef = useRef();
  useEffect(()=>{
      const f1 = async()=>{
            const data = await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );

            setCUser(data)
            const response = await axios.post(getAllConversation, {
              user:data
            });
  
            setConversations(response.data);

            console.log(response)
      }
      f1();


      

      // if (socket.current) {

        

      //   socket.current.on("msg-recieve", (data) => {
  
      //     console.log(data)
      //     setArrivalMessage(data);
      //   });
      // }
  
  
    },[])


    // useEffect(()=>{
      
      

    // }, [])


    useEffect(()=>{
      console.log(conversations)

      var dict = {}
      const f2 = async() =>{

        console.log(conversations)

        if(conversations){
          console.log(conversations)
          for(var i = 0; i< conversations.length; i++){
            // console.log(conversations.data)
    
            const res = await axios.post(getAllMessagesRoute,{
              conversationId:conversations[i]._id,
            })
  
            // console.log(res.data)
    
    
            dict[conversations[i]._id] = res.data
            
          }
          // console.log(dict)
          setMessages(dict)
        }


        if(socket.current){
          console.log(socket.current)
          socket.current.on("recieve-conversation", (data) => {
    
            console.log(data)
            if(data.data){
              setArrivalConversation(data.data);
            }else{
              setArrivalConversation(data);
            }
            
            
          });
  
        }


      }

      f2();



      



    },[conversations])



    useEffect( () => {
      // setFlag(1)
      // console.log(messages)
      if (socket.current) {
        socket.current.on("msg-recieve", (data) => {
  
          console.log(data)
          setArrivalMessage(data);
          
          
        });
      }
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);




    const setCurrentConversationInfo = (currentConversation,users ) =>{
      var res_lis = []
      // console.log(currentConversation)
      // console.log(users)

      if(currentConversation && users){
        for(var i = 0; i<users.length; i++){
          for(var j = 0; j<currentConversation.members.length; j++){
            if(users[i]._id === currentConversation.members[j]){
              // console.log(users[i])
              res_lis.push(users[i])
            }
          }
          
        }
      }
      // console.log(res_lis)

      setConversationInfo(res_lis)
    }



  useEffect(()=>{
    console.log(currentConversation)
    console.log(messages)
    const f = async()=>{
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      // console.log(messages)

      



      if(!conversations){
        
        const response = await axios.post(startConversation, {
          from:data._id,
          to:currentChat._id
        });

        socket.current.emit("create-conversation", {
          to: currentChat._id,
          data:response.data
        });

        

        console.log("ok")
      }else{
        console.log(conversations);
        
        var temp = false;
        
        for(var i = 0; i< conversations.length; i++){
          // console.log(currentChat.groupname)
          var temp2 = true;
          if(currentChat.groupname){
            // console.log(conversations[i])
            
            for(var j =0;j< currentChat.members.length;j++){
              temp2 = true;
              console.log(conversations[i].members)
              console.log(currentChat.members)

                if(conversations[i].matchId===currentChat.matchId) {
                  console.log("googood")
                  console.log(conversations[i])
                  // console.log(conversations[i].members)
                  setCurrentConversations(conversations[i])
                  setOuterConversation(conversations[i])
                  // console.log(users)
                  // setCurrentMessages(messages[conversations[i]._id])


                  setCurrentConversationInfo(conversations[i],users)

                  if(messages[conversations[i]._id]!==undefined){
                    setCurrentMessages(messages[conversations[i]._id])
                  }else{
                    setMessages(prevState => ({
                      ...prevState,
                      [conversations[i]._id]: new Array()
                  }))
                    // messages[response.data._id] = new Array()
                    setCurrentMessages(new Array())
                  }

                  break;
                }
              
              
            }
            
          }
          else if(conversations[i].members.length===2&&conversations[i].members.includes(currentChat._id)){
            console.log("verygood")
            console.log(cUser)
            console.log(conversations)
            setCurrentConversations(conversations[i])
            setOuterConversation(conversations[i])
            // console.log(users)
            
            setCurrentConversationInfo(conversations[i],users)
            


            
            setCurrentMessages(messages[conversations[i]._id])
            

            // console.log(messages[conversations.data[i]._id])
            // console.log(conversations.data[i]._id)
            temp =true;
            break;
          }
          
        }
        
        if(!temp&&!currentChat.groupname){
          console.log("goodAgain")
          const response = await axios.post(startConversation, {
            from:data._id,
            to:currentChat._id
          });

          socket.current.emit("create-conversation", {
            to: currentChat._id,
            data:response.data
          });




          console.log(conversations)
          // conversations.data.push(response.data);/////////////////////////////////////

          setConversations((p)=>(
            [...p, response.data]
          ))
          // console.log(response.data)
          setCurrentConversations(response.data)
          setOuterConversation(conversations[i])
          setCurrentConversationInfo(response.data,users)

          setMessages(prevState => ({
            ...prevState,
            [response.data._id]: new Array()
        }))
          // messages[response.data._id] = new Array()
          setCurrentMessages(new Array())
          // console.log(messages)
                    
        }
        
      }
      
  }
  if(currentChat){
    f();
  }
  

  },[currentChat])


  // console.log(conversations)



  useEffect(() => {
    console.log(conversations)
    if(arrivalConversation){

      console.log(arrivalConversation)
      // if(){

      // }
      var flag = true

      for(var i = 0; i< conversations.length; i++){

        if((arrivalConversation.matchId)&&(conversations[i].matchId)&&(conversations[i].matchId===arrivalConversation.matchId)){
          const c = conversations.slice()

          c[i].members = arrivalConversation.members
          setConversations(c)
          flag = false
        }
      }


      if(flag){
        setConversations((p)=>(
          [...p, arrivalConversation]
          
        ))
      }
      
      if(currentConversation&&(currentConversation._id===arrivalConversation._id)){

        setCurrentConversations( arrivalConversation)
        setCurrentConversationInfo( arrivalConversation,users)

      }
      
      // console.log(arrivalMessage)
      
      
      // setCurrentMessages([...currentMessages,response.data])
    }
  }, [arrivalConversation]);

  useEffect(() => {
    
    if(arrivalMessage){
      // console.log(arrivalMessage)

      
      // console.log(messages[arrivalMessage.data.conversationId])
      // messages[arrivalMessage.data.conversationId].push(arrivalMessage.data);


      if(currentConversation){
        // console.log(currentConversation)
        // console.log(arrivalMessage)
        if(currentConversation._id===arrivalMessage.data.conversationId){

          // console.log(arrivalMessage)
          // console.log(currentMessages)
          setCurrentMessages([...currentMessages,arrivalMessage.data]);
        }else{

          // var t = arrivalMessage.data.conversationId



          setMessages(prevState => ({
            ...prevState,
            [arrivalMessage.data.conversationId]:[...messages[arrivalMessage.data.conversationId],arrivalMessage.data]



        }))
         
        }

        
      }else{

        // console.log(arrivalMessage.data)
        setMessages((prevState) => ({

          ...prevState,
          [arrivalMessage.data.conversationId]:[...messages[arrivalMessage.data.conversationId],arrivalMessage.data]
      }))
      }
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      // console.log(arrivalMessage)
      
      
      // setCurrentMessages([...currentMessages,response.data])
    }
  }, [arrivalMessage]);



  // useEffect (()=>{
  //   console.log(currentConversation)
  //   console.log(users)
    
    


  // },[currentChat])
  
 
  
  const handleSendMsg = (msg) => {

    console.log(cUser)
    const f = async ()=>{
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      
      


      // console.log(currentChat._id)
      const response = await axios.post(sendMessageRoute, {
        conversationId:currentConversation._id,
        from: data._id,
        to: currentChat._id,
        message: msg,
      });

      console.log(response)
      console.log(currentMessages)
  
      
      setCurrentMessages((p)=>([...p,response.data]))


      setMessages((prevState) => ({

        ...prevState,
        [currentConversation._id]:[...messages[currentConversation._id],response.data]
    }))


      if(currentChat.groupname){
        console.log("goooooooood")
        socket.current.emit("send-groupmsg", {
          to: currentChat.members,
          
          data:response.data
        });
      }else{
        socket.current.emit("send-msg", {
          to: currentChat._id,
          data:response.data
        });
      }

      // console.log(response)
      // console.log(currentConversation._id)
      // console.log(currentMessages)
      // msgs.push({ fromSelf: true, message: msg });

      // console.log(response.data)
      
      // currentMessages.push(response.data)
      // msgs.push({ fromSelf: true, message: msg });
      // setMessages(msgs);
    }
      
    f();
  };





  return (
    <div>
      {/* <video autoplay muted loop id="myVideo">
        <src="rain.mp4" type="video/mp4">
        Your browser does not support HTML5 video.
      </video> */}

      {modalOpen && <ChatHeaderModal
      modalOpen = {modalOpen}
      setCurrentChat = {setCurrentChat}
      conversations={conversations}
      groups = {groups}
       socket = {socket}
       setAllGroups = {setAllGroups}
       setCurrentConversations = {setCurrentConversations}
       setConversations = {setConversations}

        currentChat = {currentChat}
        setConversationInfo = {setConversationInfo}
        setModalOpen = { setModalOpen }
        setSecondModalOpen = { setSecondModalOpen}   
        currentConversationID = {currentConversation._id} 
        setSelectedMembers = {setSelectedMembers}
        currentConversationMembers = {currentConversation.members}
        currentConversationInfo = {currentConversationInfo}
      />
      
      }   


      <div className='chatBox'>

      {currentChat&&currentMessages&& currentMessages.map((c) => (


        
        <div >
          {
            (c.sender!==cUser._id)?
            <div ref={scrollRef}>
                <div class="message fred_message">
                  <p>{c.text}</p>
                </div>

                {/* <div>{c.createdAt}</div> */}
            </div>
              
            :
            
            <div ref={scrollRef}>
              <div class="message my_message">
                <p>{c.text}</p>
              </div>
              {/* <div>{c.createdAt}</div> */}
            </div>
              

          }

          {/* {c.receiver===currentChat._id?1:2} */}
          
          
          
          
        </div>


              
      ))}
        
      
      </div>
      
      <ChatInput currentChat = {currentChat} handleSendMsg={handleSendMsg}/>
    </div>
    
  )
}

export default Chatbox