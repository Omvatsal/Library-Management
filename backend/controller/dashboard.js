const users = require("../model/user");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle avatar upload
const handleAvatar = upload.single("image");

const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload the avatar to Cloudinary using unsigned preset
    // For unsigned uploads with upload_preset
    const result = await cloudinary.uploader.unsigned_upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      "bookshelf" // Your unsigned preset name
    );

    // Save avatar URL to user profile
    user.avatar = result.secure_url;
    user.avatarPublicId = result.public_id; // Store public ID for later use (optional)
    await user.save();

    return res.json({ avatar: user.avatar });
  } catch (err) {
    console.error("Error in avatar upload:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await users.findById(userId).populate("books").populate({
      path: "reviews.book",
      model: "book",
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleupdate = async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName } = req.body;

  try {
    const updated = await users.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

module.exports = {
  handleGetDashboard,
  handleAvatar,
  updateAvatar,
  handleupdate,
};
