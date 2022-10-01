import logo from './logo.svg';
import './App.css';
import ChatContainer from './components/ChatContainer/ChatContainer';
import Register from './page/register/Register';
import Login from './page/login/Login';
import Chat from './page/Chat/Chat'
import { useContext, useEffect, useRef, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {

  const [user, setUser] = useState();


  

  useEffect(()=>{
    const f = async()=>{
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
  
      // console.log(data)
      setUser(data)
    }
  
    f()
  },[])

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <Router>
      <Routes>
        
        
        
        <Route exact path="/" element = {user? <Chat />: <Login />}>  </Route>
        <Route path="/login" element = {<Login />}> </Route>
        <Route path="/register" element = {<Register />}></Route>
        
          
        
        {/* <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route> */}

        
      </Routes>
    </Router>
    // <Register />
    // <ChatContainer></ChatContainer>
  );
}

export default App;
