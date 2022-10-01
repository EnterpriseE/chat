const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    

        conversationId:{
            type:String,
            required: true,
        },
        text: {
            type: String,
            min: 1,
        },

        sender: {
            type: String,
            // ref: "User",
            required: true,
        },

        receiver: {
            type: String,
            // ref: "User",
            required: true,
        },

    
   


},
{
    timestamps: true,

}

);


module.exports = mongoose.model("Message", messageSchema);
