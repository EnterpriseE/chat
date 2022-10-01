import axios from "axios";
import React, { useState, useEffect } from "react";
import "./register.css";
import { useNavigate,Link } from "react-router-dom";
// import {  Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../routes/APIRoutes";
import logo from '../../logo.svg';


//注册页
export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    // email: "",
    // password: "",
    // confirmPassword: "",
  });

  // const [arrivalUser, setArrivalUser] = useState();

  // useEffect(()=>{
  //   console.log(socket.current)
  //   socket.current.on("recieve-register", (data) => {
  //     // console.log(data)
  //     setArrivalUser(data);
  //   });

  // },[])

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  const handleValidation = () => {
    const {  username } = values;
   if (username.length <= 1) {
      toast.error(
        "Username should be greater than 1 characters.",
        toastOptions
      );
      return false;
    } 

    return true;
  };


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault();

    if(handleValidation(e)){

      // const user = {
      //   username = 
      // }
      const { username } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        // localStorage.setItem(
        //   process.env.REACT_APP_LOCALHOST_KEY,
        //   JSON.stringify(data.user)
        // );

        alert("Success")
        navigate("/Login");

      }else{
        alert("Failed Register")
      }
    }
   
  };


 

  return (
    
    <div>
       <div className="register">
        <div className="registerWrapper">
          <div className="registerLeft">
              <div className="login-header">
                <img src={logo} className="login-logo" alt="logo" />
                
              </div>
          
        
            
          </div>
          <div className="registerRight">
            <form className="registerBox" onSubmit={handleClick}>
              <input
                placeholder="Username"
                required
                // ref={username}
                name="username"
                onChange={(e) => handleChange(e)}
                className="registerInput"
              />
              {/* <input
                placeholder="Email"
                required
                name="email"
                onChange={(e) => handleChange(e)}
                className="registerInput"
                type="email"
              /> */}
              {/* <input
                placeholder="Password"
                required
                name="password"
                onChange={(e) => handleChange(e)}
                className="registerInput"
                type="password"
                // minLength="1"
              />
              <input
                placeholder="Password Again"
                name="confirmPassword"
                required
                onChange={(e) => handleChange(e)}
                className="registerInput"
                type="password"
              /> */}
              <button className="registerButton" type="submit">
                Sign Up
              </button>


              <Link to="/login" >
                <button className="registerRegisterButton" >Log into Account</button>
              </Link>
              
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
     
    
    // </ToastContainer>
    
  );
}
