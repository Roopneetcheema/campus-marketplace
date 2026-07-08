const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image provided",
      });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const result =
      await cloudinary.uploader.upload(
        base64Image,
        {
          folder: "campus-marketplace",
        }
      );

    res.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Image upload failed",
    });
  }
};

module.exports = {
  uploadImage,
};