import User from '../models/User.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const updateUser = async (req, res) => {
    try{
    const {userId} = req.params;
        
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
    });
    }
    catch(error){
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

export const updateProfileImage = async (req, res) => {
    try {
        // 1. Get the file path (usually from middleware like Multer)
        const filePath = req.file.path;

        // 2. Upload to Cloudinary
        const result = await uploadToCloudinary(filePath);

        // 3. Save the secure_url to your User Schema
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { "reviewerProfile.profileImage": result.secure_url },
            { new: true }
        );

        res.json({ message: "Image uploaded!", url: result.secure_url });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error });
    }
};