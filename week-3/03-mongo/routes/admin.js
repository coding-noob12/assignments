const { Router } = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
   // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const existingAdmin = await Admin.findOne({username:username});
    if(existingAdmin){
        res.status(400).send("Admin already exisits!");
        return
    }else{
        const admin  = await Admin.create({
            username:username,
            password:password
        })
        res.json({
            message: 'Admin created successfully'
        })
    }

    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const newCource = await Course.create({
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        image:req.body.image,
    })
    res.json({
         message:"Cource created successfully"
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allCource = await Course.find()
    res.json(allCource);
});



module.exports = router;