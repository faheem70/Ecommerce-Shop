const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    uid: String,
    phoneNumber: String,
    displayName: String,
    email: String,
})

module.exports = mongoose.model("Otp", otpSchema);