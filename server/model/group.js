const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupname: {
        type: String,
        required: true,
        min: 1,
        max: 20,
        // unique: true,
    },

    matchId:{
        type:String,
        required:true
    },

    members:{
        type: Array,
        require:true
    },


    coverUrl: {
        type: String,
        required: false,
    },


})


module.exports = mongoose.model("Groups", groupSchema);
