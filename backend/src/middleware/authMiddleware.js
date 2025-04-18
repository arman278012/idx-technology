const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('notes-token');
        if (!token) {
            return res.status(401).json({ message: 'Access Denied: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
    
module.exports = authMiddleware;