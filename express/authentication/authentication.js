const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://madanmohanreddyvanga4:Mongodb%4095@cluster0.zja0idn.mongodb.net/user_app');

const User = mongoose.model('Users', { name: String, password: String, email: String });

const jwtpwd = "12345"

app.use(express.json())

const userAuthenticationMiddleware = async (req, res, next) => {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ name: username });
    console.log(existingUser)
    if (existingUser) {
        res.status(400).send(
            "username already exists"
        )
        return
    }
    const user = new User({
        name: username,
        email: email,
        password: password
    });

    user.save();
    const token = jwt.sign(username, jwtpwd);
    req.token = token;
    next();
}
app.post('/signin', userAuthenticationMiddleware, (req, res) => {
    res.json({ token: req.token })
})

app.get('/users', (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtpwd);
        res.json({ username: decoded })
    } catch (err) {
        return res.send(403).json({ msg: "invalid token" });
    }
})

app.listen(2000)