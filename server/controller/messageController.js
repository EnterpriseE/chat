const Message = require("../model/message");
// const bcrypt = require("bcrypt");

// module.exports.setMessage = async (req,res,next) =>{
//     try {
//         const { text } = req.body;
//         const user = await User.findOne({ username });
//         if (!user)
//           return res.json({ msg: "Incorrect Username or Password", status: false });
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid)
//           return res.json({ msg: "Incorrect Username or Password", status: false });



//         delete user.password;
//         return res.json({ status: true, user });
//       } catch (ex) {
//         next(ex);
//       }


// }


module.exports.setMessage = async (req, res, next) =>{


    // const users = await User.insert()
    // console.log("99")

    try{
        const { from, to, message ,conversationId} = req.body;

        
    
        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(from)
        const messageText = await Message.create({
          conversationId:conversationId,
          text: message ,
          // members: [from, to],
          sender: from,
          receiver: to
        }); 


        if (messageText) return res.json(messageText);
    else return res.json({ msg: "Failed to add message to the database" });
       
    }catch (ex) {
        next(ex);
    }
  


}

module.exports.getAllMessages = async (req, res, next) => {
  // console.log("good")
  try {
    const { conversationId } = req.body;

    const messages = await Message.find({
      conversationId: conversationId,
    }).sort({ updatedAt: 1 });

    // const projectedMessages = messages.map((msg) => {
    //   return {
    //     // fromSelf: msg.sender.toString() === from,
    //     message: msg.message.text,
    //   };
    // });
    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};