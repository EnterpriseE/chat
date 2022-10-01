const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema({
    

    matchId:{
        type:String,
    },
    members:{
        type: Array,
        require:true
    }
,



},


);

module.exports = mongoose.model("Conversation", conversationSchema);
