const {
    createGroup,
    getAllGroups,
    updateGroup
  } = require("../controller/groupController");
  
  const router = require("express").Router();
  
//   router.post("/getAllConversation", getAllConversation);
  router.post("/createGroup", createGroup);
  router.post("/getAllGroups", getAllGroups);
  router.post("/updateGroup", updateGroup);


  

//   router.post("/setavatar/:id", setAvatar);
//   router.get("/logout/:id", logOut);
  
  module.exports = router;