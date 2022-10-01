const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        max: 20,
        unique: true,
    },

    

    // password: {
    //     type: String,
    //     required: true,
    //     min: 1,
    //     max: 20,
    // },

    // email: {
    //     type: String,
    //     required: true,
    //     // unique: true,
    //     max: 50,
    // },

    // coverUrl: {
    //     type: String,
    //     required: false,
    // },


})


module.exports = mongoose.model("Users", userSchema);
