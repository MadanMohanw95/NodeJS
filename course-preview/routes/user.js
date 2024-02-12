const express = require('express');
const userMiddleware = require('../middleware/userMiddleware')
const { User, Course } = require('../mongo');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
const router = express.Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await User.create({
            username,
            password
        });
        res.json({msg: "User created succesfully", token: token})
    } catch (err) {
        res.json({msg: "Something went wrong"})
    }
})

router.post('/signin', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.find({username, password});
    if (user) {
        const token = jwt.sign({username}, JWT_SECRET);
        res.json({token: token});
    } else {
        res.status(411).json("Incorrect username and password")
    }
})

router.get('/courses', userMiddleware, async (req, res) => {
    const response = await Course.find({})
    res.json({courses: response});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const { username } = req.headers;
    const courseId = req.params.courseId;
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({msg: "Updated purchased courses successfully", courseId: courseId})
})

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const { username } = req.headers;
    const user = await User.findOne({ username });
    if (user) {
        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourses
            }
        });
        res.json({purchasedCourses: courses})
    } else {
        res.json({msg: "Username not found"})
    }
})


module.exports = router