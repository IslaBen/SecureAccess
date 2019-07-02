const mongoose = require("mongoose");

var RoomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    position : Number,
    state : Boolean,
})


module.exports = mongoose.model("room",RoomSchema);