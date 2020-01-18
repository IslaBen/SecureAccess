const mongoose = require("mongoose");

var schema = mongoose.Schema({
    email : String,
    password : String,
})


module.exports = mongoose.model("User",schema);
