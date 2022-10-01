const Conversation = require("../model/conversation");


module.exports.updateConversation = async (req, res, next) =>{
  // const users = await User.insert()
  try{
      const {converid,members,matchId} = req.body;

  
      // const hashedPassword = await bcrypt.hash(password, 10);


      const conversation = await Conversation.updateOne(
        { _id:converid },
        // {matchId:matchId},
        // { $addToSet: members:{$addToSet:  [members]  } },
        { $set: { members: members } },
      
      );
      // delete user.password;
      res.json(conversation );
  }catch (ex) {
      next(ex);
  }

}


module.exports.startConversation = async (req, res, next) => {
    
    try {
      const { from, to } = req.body;
  
      const conversation = await Conversation.create({
        
          members: [from, to],
          
      })
  
      
      res.json(conversation);
    } catch (ex) {
      next(ex);
    }
  };


  module.exports.startGroupConversation = async (req, res, next) => {
    
    try {
      const { members,matchId } = req.body;
      
      const conversation = await Conversation.create({
          matchId:matchId,
          members:  members,
          
      })
  
      
      res.json(conversation);
    } catch (ex) {
      next(ex);
    }
  };


  // module.exports.startConversation = async (req, res, next) => {
  //   console.log("good")
  //   try {
  //     const { from, to } = req.body;
  
  //     const conversation = await Conversation.create({
        
  //         members: [from, to],
          
  //     })
  
      
  //     res.json(conversation);
  //   } catch (ex) {
  //     next(ex);
  //   }
  // };



  module.exports.getAllConversation = async (req, res, next) => {
    // console.log("also good")
    try {
      const { user } = req.body;
      
      // var chck = to.length();
  
      var id = user._id;

      const conversation = await Conversation.find({
        
        members: {
          $in: [id]
        },
          
      })

      // console.log(conversation)
  
      
      
      res.json(conversation);
    } catch (ex) {
      next(ex);
    }
  };
