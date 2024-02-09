const express = require('express');
const userMiddleware = require('../middleware/userMiddleware')

const router = express.Router();

router.get('/courses', userMiddleware, async (req, res) => {
    const response = await Course.find({})
    res.json({courses: response});
});

router.post('/courses/:courseId', (req, res) => {

})

module.exports = router