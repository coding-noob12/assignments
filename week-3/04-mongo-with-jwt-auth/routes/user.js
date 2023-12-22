const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const jwtSecret = "asdfqwer";
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;

  const userExists = await User.findOne({ username: username });
  if (userExists) {
    res.status(400).send("User already exists!");
    return;
  }

  await User.create({
    username,
    password,
  });
  res.json({
    message: "user created succesfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const userExists = await User.findOne({ username: username });
  if (!userExists) {
    res.status(400).send("Invalid credentials");
    return;
  }

  if (userExists.username === username && userExists.password === password) {
    const token = jwt.sign({ username: username }, jwtSecret);
    res.json({ token: token });
  } else {
    res.status(400).send("Invalid credentials");
    return;
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({}, "-__v");
  res.json(allCourses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    const user = req.user;
    const courseId = req.params.courseId;
    // check if the course is present or not
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    // check if user already purchased the course

    if (user.purchasedCourses.includes(course.id)) {
      return res.status(400).json({ error: "Course already purchased" });
    }
    user.purchasedCourses.push(course.id);
    await user.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing request" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await req.user.populate("purchasedCourses", "-__v");
  res.json({ purchasedCourses: user.purchasedCourses });
});

module.exports = router;
