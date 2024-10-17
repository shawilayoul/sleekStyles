const bycript = require("bcryptjs");
const User = require("../models/authModel.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  sendVeryficationEmail,
  sendWelcomeEmail,
  sendresetPasswordEmail,
  sentResetSuccessEmail,
} = require("../mailtrap/mail.js");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bycript.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresDate: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });
    await newUser.save();
    // generting token
    const token = generateTokenAndSetCookie(res, newUser._id);

    //verfiy email
    await sendVeryficationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "user has been created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error sending verification email" });
  }
};
// generting token
const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETkEY, {
    expiresIn: "7d",
  });
  
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    // Do not include secure flag for local development with HTTP:
    secure: false,
    path: '/',
    //secure: process.env.NODE_ENV === "production"
  });

  return token;
};

//verify email
const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresDate: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "wrong verification code or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresDate = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.username);
    res
      .status(200)
      .json({ message: "your email has been verified successfully" });
  } catch (error) {
    console.error(`error while verifing the code ${error}`);
  }
};
// sigin
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: true, message: "user dose not exist" });
    }
    const verifiedPassword = await bycript.compare(password, user.password);
    if (!verifiedPassword) {
      return res
        .status(400)
        .json({ success: true, message: "Invalide password" });
    }

   generateTokenAndSetCookie(res, user._id);

    user.lastLogin = Date.now();

    await user.save();
    
    res.status(200).json({
      success: true,
      message: "user login successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error", error);
  }
};

//user logout
const logOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json("logged out successfully");
};

//forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json("user not found");
  }
  const restToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1hour

  user.resetPasswordToken = restToken;
  user.resetPasswordExpiresAt = resetPasswordExpiresAt;

  await user.save();

  await sendresetPasswordEmail(
    user.email,
    `https://sleekstyles.onrender.com/resetpassword/${restToken}`
  );

  res.status(200).json("password reset link send to your email ");
};
// restpassword

const resetPasssword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json("user not found or expire token");
  }

  const hashPassword = await bycript.hash(password, 10);

  user.password = hashPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  await sentResetSuccessEmail(user.email);

  res.status(200).json("password has been reset successfully");
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("password");
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  signIn,
  signUp,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPasssword,
  checkAuth,
};
