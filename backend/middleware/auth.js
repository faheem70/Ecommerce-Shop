const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Otp = require("../models/otpModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);


  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

exports.isAuthOrOtpLogin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (token) {
      // If a token exists, try to authenticate the user
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Otp.findOne({ uid: decodedData.uid });
      console.log(user);
      req.user = user;
      return next();
    }
  } catch (error) {
    // Token verification failed, continue to check OTP login
  }

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

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});