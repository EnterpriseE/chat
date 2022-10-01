const {
    getAllMessages,
    setMessage
  } = require("../controller/messageController");
  
  const router = require("express").Router();
  
  router.post("/getAllMessages", getAllMessages);
  router.post("/setMessage", setMessage);


//   router.post("/setavatar/:id", setAvatar);
//   router.get("/logout/:id", logOut);
  
  module.exports = router;