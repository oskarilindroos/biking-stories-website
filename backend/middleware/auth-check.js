const jwt = require("jsonwebtoken");

// Token authentication
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, "secretkey");
    // req.userId = decodedToken._id;
    req.userInfo = { uid: decodedToken._id, name: decodedToken.name };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
