//const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Otp = require("../models/otpModel");

exports.otpLogin = catchAsyncErrors(async (req, res) => {
    try {
        const { uid, phoneNumber, displayName, email } = req.body;

        // Check if the user already exists in the database
        let user = await Otp.findOne({ uid });

        if (!user) {
            // If the user does not exist, create a new user
            user = new Otp({
                uid,
                phoneNumber,
                displayName,
                email,
            });

            await user.save();
        }

        res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
