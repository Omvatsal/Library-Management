const users = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || "hbjaj4gha$asf@asvv";

const handlePostrequest = async (req, res) => {
  const { firstName, secondName, email, username, confirmPassword } = req.body;

  try {
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const newUser = await users.create({
      firstName,
      lastName: secondName,
      email,
      username,
      password: confirmPassword, 
    });

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username,email: newUser.email, },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ 
      message: "User created successfully",
      token
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Username already taken" });
    }

    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = handlePostrequest;
