const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://madanmohanreddyvanga4:Mongodb%4095@cluster0.zja0idn.mongodb.net/Course_preview')

const UserSchema = {
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}

const AdminSchema = {
    username: String,
    password: String
}

const CourseSchema = {
    title: String,
    description: String,
    imageLink: String,
    price: Number
}

const User = mongoose.model('User', UserSchema);

const Admin = mongoose.model('Admin', AdminSchema);

const Course = mongoose.model('Course', CourseSchema)

module.exports = {
    User,
    Admin,
    Course
}