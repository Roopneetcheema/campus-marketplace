const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  console.log("========== UPLOAD REQUEST ==========");
  console.log("FILE RECEIVED:", !!req.file);

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image provided",
      });
    }

    console.log("Uploading to Cloudinary...");

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "campus-marketplace",
    });

    console.log("UPLOAD SUCCESS");
    console.log("URL:", result.secure_url);

    res.json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Image upload failed",
    });
  }
};

module.exports = {
  uploadImage,
};