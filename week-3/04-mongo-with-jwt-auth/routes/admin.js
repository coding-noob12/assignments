const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt  = require("jsonwebtoken")

const jwtSecret = "asdfqwer"

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
const {username,password} = req.body;

    const userExists = await Admin.findOne({username:username});
    if(userExists){
        res.status(400).send("Admin already exists!");
        return;
    }
    await Admin.create({
        username:username,
        password:password
    })
    res.json({
        message:"Admin created succesfully!"
    })

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username,password} = req.body;

    const adminExists = await Admin.findOne({username:username});
    if(!adminExists){
        res.status(400).send("Invalid credentials");
        return;
    }

    if(adminExists.username === username && adminExists.password === password){
        const token = jwt.sign({username:username},jwtSecret);
        res.json({token:token})
    }else{
        res.status(400).send("Invalid credentials");
        return
    }
    
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const {title,description, price,image} = req.body;
    await Course.create({
        title,
        description,
        price,
        image
    })
    res.json({
        message:"Cource created succesfully!"
    })
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const allCources = await Course.find({},"-__v")
    res.json(allCources)
});

module.exports = router;