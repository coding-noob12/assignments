const jwt = require('jsonwebtoken');
const { User } = require('../db');
const jwtSecret = "asdfqwer"

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization?.replace("Bearer ", "");

    try {
        const result = jwt.verify(token, jwtSecret);
        const user = await User.where({ username: result.username }).findOne();
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "Invalid credentials" });
    }
}

module.exports = userMiddleware;