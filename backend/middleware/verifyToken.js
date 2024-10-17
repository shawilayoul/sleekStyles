const jwt = require("jsonwebtoken"); // Make sure this is imported

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Ensure the key is correctly spelled in your .env file
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken };
