const { User } = require("../db");


// Middleware for handling auth
const userMiddleware = async (req, res, next)=> {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    let username = req.headers.username;
    let password = req.headers.password;
  
    try {
      const user = await User.findOne({ username })
      if (password === user.password) {
        // res.json({ message: "Login successful" });
        next();
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

}



module.exports = userMiddleware;