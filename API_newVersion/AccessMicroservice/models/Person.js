const mongoose = require("mongoose");

var personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    lastName : String,
    rfID : String,
    rooms : [{type: String}]
})


module.exports = mongoose.model("person",personSchema);
