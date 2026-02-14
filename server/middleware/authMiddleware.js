import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    // 1. Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extract the token from the "Bearer <token>" string
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Find the user in DB and attach to req.user (excluding password)
            // This is what prevents the "Cannot read properties of undefined" error!
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: "User not found with this token." });
            }

            // 5. Move to the next function (the controller)
            next();
        } catch (error) {
            console.error("Auth Error:", error);
            res.status(401).json({ message: "Not authorized, token failed." });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token provided." });
    }
};