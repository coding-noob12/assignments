const { User, Course } = require("../db");
const userMiddleware = require("../middleware/userMiddleware");
const { Router } = require("express");
const router = Router();



router.post('/signup', async (req, res) => {
    // Implement admin signup logic
     const username = req.body.username;
     const password = req.body.password;
 
     const existingUser = await User.findOne({username:username});
     if(existingUser){
         res.status(400).send("User already exisits!");
         return;
     }
 
     const user  = await User.create({
         username:username,
         password:password
     })
     res.json({
         message: 'User created successfully'
     })
 });

 router.get('/cources', async (req, res) => {
    // Implement admin signup logic
     const allCources  = await Course.find()
     res.json(allCources)
 });

 router.put('/cources/:courceId',userMiddleware, async (req, res) => {
    // Implement admin signup logic
    try {
        const courseId = req.params.courceId;
    const course = await Course.findById(courseId);
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }
      const user = await User.findOne({username:req.headers.username});
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      const existingCourseIndex =  user.purchasedCources.includes(courseId);

      if(existingCourseIndex){
        res.status(400).json({ message: 'Course already purchased' });
      return;
      }else{
        user.purchasedCources.push(courseId);
      }
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Error processing request' });
    }
 });

 router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.headers.username });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    //const purchasedCoursess = await Course.find({ _id: { $in: user.purchasedCourses } });
    const purchasedCoursesss = user.purchasedCources;
    const course1  = await Course.find({_id: {$in :purchasedCoursesss}})
    res.json(course1)

    // Send the retrieved courses as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving courses' });
  }
});

module.exports = router