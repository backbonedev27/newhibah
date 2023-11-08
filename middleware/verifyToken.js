const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config/config.json");
const secretKey = config.development.secretKey;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "You must to Login",
    });
  }

  const JWTToken = token.split(" ").pop();

  try {
    const data = jwt.verify(JWTToken, secretKey);

    const user = await User.findByPk(data.userId); // Ensure correct user identifier

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = verifyToken;
