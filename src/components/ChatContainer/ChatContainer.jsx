import { useContext, useEffect, useRef, useState } from "react";
import './ChatContainer.css'
import Leftbar from '../Leftbar/Leftbar/Leftbar'
import Rightbar from '../Rightbar/Rightbar/Rightbar'
import axios from "axios";
import { allUsersRoute,getAllGroups,host } from "../../routes/APIRoutes";
import { io } from "socket.io-client";
import AddModal from "./AddModal/AddModal";


function ChatContainer() {


  const [users, setAllUsers] = useState([]);
  const [groups, setAllGroups] = useState([]);

  const [currentChat, setCurrentChat] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [currentConversationInfo, setConversationInfo] = useState([]);
  const [outerConversation, setOuterConversation] = useState()



  const [currentUser, setUserName] = useState(undefined);
  const [currentUserObject, setCurrentUserObject] = useState();
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [flag,setFlag] = useState(false)

  const [currentConversation, setCurrentConversations] = useState();
  const [conversations, setConversations] = useState();



  const socket = useRef();

  


  // useEffect( ()=>{
    


   
  
  // }, []);


  

  

  useEffect(()=>{
    

    
    
  },[])


  // useEffect(() => {
    
  // }, [currentUserObject]);


  useEffect(()=>{

    const allUsersGroups = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );


      const res = await axios.get(allUsersRoute );
      setAllUsers(res.data);

      const response = await axios.post(getAllGroups, {
        user:data
      });

      console.log(response.data)
      setAllGroups(response.data);



      // const data = await JSON.parse(
      //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      // );
      // console.log(data)

      setUserName(data.username);
      setCurrentUserObject(data)
    

    
    // console.log(data)
    if (data) {
      console.log(data._id)
      socket.current = io(host);
      socket.current.emit("add-user", data._id);

    
    }


    if (socket.current) {

      console.log("goooooooooooooddddddddddddddddd")
      socket.current.on("recieve-group-update", (data) => {

        // console.log("baddddddddddddddddddddddddddddddddd")
        // console.log(groups)
        // console.log(data)


        var f = true
        console.log(response.data)
        for(var i = 0; i< response.data.length; i++){

          if((data.groupname)&&(response.data[i].groupname===data.groupname)){
            const g = response.data.slice()
  
            g[i].members = data.members
            setAllGroups(g)
            f = false
          }
        }

       

        if(f){
          setAllGroups(p=>([...p,data]))
        }

       
      });
      

    }
    };

    
    allUsersGroups();


    console.log(groups)


    // const par = async () =>{
      
    // }

    // par()
  },[])


  // useEffect(()=>{

  // },[groups])



  const handleUserChatChange = (chat) => {
    console.log(chat)
    setCurrentChat(chat);
  };

  return (
    <div className='container'>
      <div>
        {modalOpen&&secondModalOpen&&<AddModal 
        setCurrentChat = {setCurrentChat}
        groups = {groups}
        setAllGroups = {setAllGroups}
        currentConversation = {currentConversation}
        setCurrentConversations = {setCurrentConversations}
        
        conversations = {conversations}
        
        setConversations = {setConversations}
        setOuterConversation = {setOuterConversation}



        outerConversation = {outerConversation}
        setConversationInfo = {setConversationInfo}
        currentConversationInfo = {currentConversationInfo}
        modalOpen = {modalOpen} 
        setModalOpen = {setModalOpen}
        setSecondModalOpen = { setSecondModalOpen} 
        users = {users}
        currentUser = {currentUser}
        currentChat = {currentChat}
        socket = {socket}
        />
        
        }
      </div>
      
      <Leftbar 
      socket = {socket}
      setAllGroups = {setAllGroups}
      setCurrentConversations = {setCurrentConversations}
      setConversations = {setConversations}
      currentChat = {currentChat}


        setConversationInfo = {setConversationInfo}
        groups = {groups}
        currentUser = {currentUser}
        users = {users} 
        setOuterConversation = {setOuterConversation}
        handleUserChatChange={ handleUserChatChange }/>
      <Rightbar 
      setCurrentChat = {setCurrentChat}
      groups = {groups}
       setAllGroups = {setAllGroups}
       setCurrentConversations = {setCurrentConversations}

        currentConversation = {currentConversation}
        
        conversations = {conversations}
        
        setConversations = {setConversations}
        setOuterConversation = {setOuterConversation}
        currentConversationInfo = {currentConversationInfo}
        setConversationInfo = {setConversationInfo}
        setModalOpen ={ setModalOpen }
        setSecondModalOpen = { setSecondModalOpen} 
        modalOpen = {modalOpen}
        currentChat = {currentChat}
        users = {users}
        socket={socket}  />
    </div>
  )
}

export default ChatContainer