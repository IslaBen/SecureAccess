const mongoose = require("mongoose");

var AccessLogSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    person : {type: mongoose.Schema.Types.ObjectId , ref:'person'},
    door : {type : Number}
},{
    timestamps: true
})

module.exports = mongoose.model("Accesslog",AccessLogSchema);
