const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../model/user"); 
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});


const handleforgotrequest= async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 1800000; // 1/2 hour expiration
    await user.save();

    const mailOptions = {
      from: "jhaomv16@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Please click the following link to reset your password:\n ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    res.send({ message: "Password reset link sent" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const handleResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      // Find the user by reset token
      const user = await User.findOne({ resetToken: token });
      if (!user) return res.status(404).send({ message: "Invalid or expired token" });
  
      // Check if the token has expired
      if (user.resetTokenExpire < Date.now()) {
        return res.status(400).send({ message: "Token expired" });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password and clear the reset token
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpire = undefined;
      await user.save();
  
      res.send({ message: "Password successfully reset" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  };

  module.exports = {
    handleforgotrequest,
    handleResetPassword
  };
