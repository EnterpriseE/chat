import React , { useState, useEffect, useRef }from 'react'
// import {BiHappyAlt} from 'react-ionicons'
// import from 'r'
import './ChatInput.css'
function ChatInput({currentChat,handleSendMsg}) {

	const [msg, setMsg] = useState("");
	const sendChat = (e) => {
		console.log("sendChat")
		e.preventDefault();
		if (msg.length > 0) {
			handleSendMsg(msg);
			console.log(msg)
		  	setMsg("");
		}
	  };


  return (
    <div class="chatbox_input">
		{/* <BiHappyAlt></BiHappyAlt> */}
		{/* <ion-icon name="attach-outline" role="img" class="md hydrated" aria-label="attach outline"></ion-icon> */}
		<form id="chat-form" onSubmit={(e) => sendChat(e)}>
			<input type="text" 
				
				id="msg" 
				name = "msg"
				placeholder="Type a message" 
				autocomplete="off" 
				value={msg}
				style={{width:"90%"}}
				onChange={(e) => setMsg(e.target.value)}
			/>
			<button class="btn btn-success"><i class="fas fa-paper-plane"></i> Send</button>
		</form>
					
		{/* <ion-icon name="mic" role="img" class="md hydrated" aria-label="mic"></ion-icon> */}
	</div>
  )
}

export default ChatInput