const {
    getAllConversation,
    startConversation,
    startGroupConversation,
    updateConversation
  } = require("../controller/conversationController");
  
  const router = require("express").Router();
  
  router.post("/getAllConversation", getAllConversation);
  router.post("/startConversation", startConversation);
  router.post("/startGroupConversation",startGroupConversation);
  router.post("/updateConversation",updateConversation);

  

//   router.post("/setavatar/:id", setAvatar);
//   router.get("/logout/:id", logOut);
  
  module.exports = router;