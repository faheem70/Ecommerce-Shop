const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your name"]
    },
    email: {
        type: String,
    },
    number: {
        type: String,
        required: [true, "Please Enter Your Number"]
    }

})

module.exports = mongoose.model("Detail", detailSchema);