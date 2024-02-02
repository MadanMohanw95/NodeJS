const express = require('express');
const z = require('zod');
const app = express();
app.use(express.json())
const userMiddleware = (req, res, next) => {
    if (req.headers.username !== 'Madan') {
        res.send(403).json({
            msg: "User not found"
        })
    } else {
        next();
    }
}

const kidneyMiddleware = (req, res, next) => {
    const schema = z.array(z.number());
    const kidneyIds = req.body.kidneyIds;
    const response = schema.safeParse(kidneyIds);
    if (!response.success) {
        res.send(411).json({
            msg: "Incorrect Inputs"
        })
    } else {
        next();
    }
}

const healthCheckup = (req, res) => {
    res.send("success")
}

app.get('/health-checkup', userMiddleware, kidneyMiddleware, healthCheckup)

app.post('/health-checkup/insert', userMiddleware, kidneyMiddleware, healthCheckup)


// Global catches
app.use((err, req, res, next) => {
    res.json({
        msg: "Something went wrong!"
    })
});

app.listen(4000);