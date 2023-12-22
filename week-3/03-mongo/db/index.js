const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://niharhegde163:niharhegde@cluster0.jsuzkoy.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('connected', () => {
    console.log('Connected to database successfully!');
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
});
const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCources:[String],
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    image: String,
});

 const Admin = mongoose.model('Admin', AdminSchema);
 const User = mongoose.model('User', UserSchema);
 const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}