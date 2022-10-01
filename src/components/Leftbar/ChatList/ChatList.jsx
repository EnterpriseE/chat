import React, { useEffect,useState } from 'react'
import ChatBlock from './ChatBlock'
import "./ChatList.css"
function ChatList({groups,currentUser ,users, handleUserChatChange}) {
  console.log(groups)
  // const userList = users
  //如果要拿值，这么写
  // console.log(userList)
  // const [currentUser, setCurrentUser] = useState();

  // useEffect(()=>{

  //   setAllUsers(users)

  //   console.log(allUsers)


  // },[])


  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (u) => {
    // e.preventDefault();
    console.log(u)
    setCurrentSelected(u);
    handleUserChatChange(u);
  };

  // console.log(currentSelected)

  return (
    <div className='chatList'>

      {/* <ChatBlock /> */}

      {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}

      {groups&& groups.map((g) => (
        
        <div onClick={() => changeCurrentChat(g)}>
          <ChatBlock otherUser={g}/>
          {/* <ListConversation otherUser={otherUser} currentUser={user} /> */}
        </div>
        


              
      ))}

      
      {users&& users.map((u) => (
        (u.username!==currentUser)&&
        <div onClick={() => changeCurrentChat(u)}>
          <ChatBlock otherUser={u}/>
          {/* <ListConversation otherUser={otherUser} currentUser={user} /> */}
        </div>
        


              
      ))}

    


    </div>
  )
}

export default ChatList