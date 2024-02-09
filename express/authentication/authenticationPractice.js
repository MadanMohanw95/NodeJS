const express = require('express')
const z = require('zod')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

const jwtPwd = "Enrich9023"


const usernameSchema = z.string();
const passwordSchema = z.string().min(6, {message: "password should be atleast 6 characters long"});
const emailSchema = z.string();

const validationMiddleware = (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        const isUsernameValid = usernameSchema.safeParse(username)
        const isPwdValid = passwordSchema.safeParse(password)
        const isEmailValid = emailSchema.safeParse(email)
        if (!isUsernameValid.success && !isPwdValid.success && !isEmailValid.success) {
            res.json({msg: "input validation failed"})
        } else {
            next();
        }
    } catch (err) {
        res.json({msg: "input validation failed"})
    }
}

const jwtVerificationMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedPayload = jwt.verify(token, jwtPwd)
        if (decodedPayload) {
            next();
        }
    } catch (err) {
        res.json({msg: "Failed jwt verification"})
    }
}

app.post('/signin', validationMiddleware, (req, res) => {
    const token = jwt.sign(req.body, jwtPwd);
    res.json({token: token});
})

app.get('/users', jwtVerificationMiddleware, (req, res) => {
    res.send(true);
})

app.listen(2000)

