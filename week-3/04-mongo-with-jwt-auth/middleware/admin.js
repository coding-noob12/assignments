const jwt = require('jsonwebtoken')
// Middleware for handling auth
const jwtSecret = "asdfqwer"

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization?.replace("Bearer ", "");

    try {
        jwt.verify(token,jwtSecret);
        next();
        
    } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
}

module.exports = adminMiddleware;