const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoute");
const conversationRoutes = require("./routes/conversationRoutes")
const groupRoute = require("./routes/groupRoute")



require("dotenv").config();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/group", groupRoute);





const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// global
global.Users = new Map();
global.Groups = new Map();

// console.log(global.Users)
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    // console.log(userId)
    
    Users.set(userId, socket.id);

    // console.log()
  });


  socket.on("user-register", (data) => {

    // console.log(data)
    const sendRegisterSocket = Users.get(data.to);
    console.log("sendRegisterSocket:"+sendRegisterSocket)
    if (sendRegisterSocket) {
      socket.to(sendRegisterSocket).emit("recieve-register", data);
    }
  });


  socket.on("create-conversation", (data) => {

    // console.log(data)
    const sendUserSocket = Users.get(data.to);
    // console.log("sendUserSocket:"+sendUserSocket)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("recieve-conversation", data);
    }
  });


  socket.on("send-msg", (data) => {

    // console.log(data)
    const sendUserSocket = Users.get(data.to);
    // console.log(to)
    // console.log(data.data)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  });

  socket.on("send-groupmsg", (data) => {

    // console.log(data)

    for(var i = 0; i<data.to.length;i++){
      const sendUserSocket = Users.get(data.to[i]);
      // console.log(to)
      // console.log(data.data)
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data);
      }
    }
    
  });


  socket.on("send-group-conversation-update", (data) => {
    console.log("send_group_conversation-update")
    // console.log(data)

    for(var i = 0; i<data.to.length;i++){
      const sendGroupsSocket = Users.get(data.to[i]);
      console.log("sendUserSocket:"+sendGroupsSocket)
      if (sendGroupsSocket) {
        // console.log("send_group_in")
        // console.log(data)
        var g = undefined
        for(var j = 0; j< data.data2.length;j++){
          // console.log(data.data.matchId)
          // console.log(data.data2[j].groupname)
          if((data.data2[j].matchId) && data.data.matchId===data.data2[j].matchId){
            g = data.data2[j]
          }
        }

        socket.to(sendGroupsSocket).emit("recieve-conversation", g);

      }
    }
   
   
    
  });

  socket.on("send-group-update", (data) => {
    console.log("send-group-update")
    console.log(data)


    for(var i = 0; i<data.to.length;i++){
      const sendGroupsSocket = Users.get(data.to[i]);
      // console.log("sendUserSocket:"+sendGroupsSocket)
      if (sendGroupsSocket) {
        // console.log("send_group_in")


        // console.log(data)
        var g = undefined
        for(var j = 0; j< data.data2.length;j++){
          // console.log(data.data.matchId)
          // console.log(data.data2[j].groupname)
          if(data.data.matchId===data.data2[j].groupname){
            g = data.data2[j]
          }
        }

        console.log(g)

        socket.to(sendGroupsSocket).emit("recieve-group-update", g);
      }
    }
    
  });



  socket.on("send-group-create", (data) => {
    console.log("send-group-create")
    // console.log(data)
    // console.log("send-group-create")
    // console.log(data2)
    for(var i = 0; i<data.to.length;i++){
      const sendGroupsSocket = Users.get(data.to[i]);
      console.log("sendUserSocket:"+sendGroupsSocket)
      if (sendGroupsSocket) {
          // console.log("send_group_in")
          console.log(data.data2)
  
        socket.to(sendGroupsSocket).emit("recieve-group-update", data.data2);
      }

    }
    
   
    
  });


  socket.on("send-group-conversation-create", (data) => {
    // console.log("send_group_conversation-update")
    // console.log(data)
  
    
    for(var i = 0; i<data.to.length;i++){
      const sendGroupsSocket = Users.get(data.to[i]);
      console.log("sendUserSocket:"+sendGroupsSocket)
      if (sendGroupsSocket) {
  
        socket.to(sendGroupsSocket).emit("recieve-conversation", data.data2);
    
      }
    }
   
    
  });

  

 
});


