const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const { Admin, Course } = require('../mongo');

const router = express.Router();

router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({})
    res.json({courses: response});
});

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({
        username: username,
        password: password
    });
    res.json({msg: "Admin created succesfully"})
})

router.post('/courses', async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const { title, description, price, imageLink } = req.body;
    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    });

    res.json({msg: "Course created successfully", courseId: newCourse._id})
})

module.exports = router