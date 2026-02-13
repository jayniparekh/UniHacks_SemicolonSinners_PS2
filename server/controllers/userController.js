import User from '../models/User.js';

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