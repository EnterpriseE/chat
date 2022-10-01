import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from '../../logo.svg';

import "./login.css";
// import { loginCall } from "../../apiCalls";
// import { AuthContext } from "../../context/AuthContext";
// import { CircularProgress } from "@mui/material";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginRoute } from "../../routes/APIRoutes";
import { useNavigate,Link } from "react-router-dom";



//登陆页面，点击提价表单，跑handleClick方法
export default function Login() {
  // const email = useRef();
  // const password = useRef();
  // const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
  
    // password: "",
  });

  const validateForm = ()=>{


    const { username} = values;
    if (username === "") {
      toast.error("username is required.", toastOptions);
      return false;
    } 
    return true;


  }
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()){
      const { username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }

    
  };

  

  return (
    <div>
       <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          {/* <h3 className="loginLogo">Liberté<br/>Égalité<br/> Fraternité</h3> */}


          <div className="login-header">
                <img src={logo} className="login-logo" alt="logo" />
                
              </div>
          
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              name = "username"
              // type="username"
              required
              className="loginInput"
              onChange={(e) => handleChange(e)}
              // ref={email}
            />
          
            <button className="loginButton" type="submit">
              Log In
            </button>

            <Link to="/register" >
              <button className="loginRegisterButton">
              Create a New Account
                
              </button>
            </Link>
            
          </form>
        </div>
      </div>
    </div>
      <ToastContainer />
    </div>
   
  );
}
