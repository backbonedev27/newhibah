const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const secretKey = config.development.secretKey;

const login = async (req, res) => {
  const { nik, password } = req.body;

  if (!nik || !password) {
    return res.status(400).json({ message: "NIK or password cannot be empty" });
  }

  try {
    // Check if the user with the provided NIK exists in the database
    const user = await User.findOne({ where: { nik } });

    if (!user) {
      return res.status(404).json({ message: "NIK is not registered" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // User is authenticated, generate a JWT token
    const token = jwt.sign({ userId: user.id, nik: user.nik }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });

    if (user.roleid === 1) {
      return res.status(200).json({ token, message: "Admin login successful" });
    } else if (user.roleid === 2) {
      return res.status(200).json({ token, message: "User login successful" });
    } else {
      return res.status(200).json({ token, message: "Login successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  // Tanggapi permintaan logout dengan respons status 200 OK
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { login, logout };
