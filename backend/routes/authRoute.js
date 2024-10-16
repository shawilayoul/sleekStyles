const express = require("express");
const {
  signIn,
  signUp,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPasssword,
  checkAuth,
} = require("../controllers/authController");
const { verfiyToken } = require("../middleware/verifyToken");
const User = require("../models/authModel");
const router = express.Router();

router.get("/checkAuth", async(req, res) => {
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
  }});
router.post("/register", signUp);
router.post("/login", signIn);
router.post("/logOut", logOut);
router.post("/verifyEmail", verifyEmail);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPasssword/:token", resetPasssword);
module.exports = router;
