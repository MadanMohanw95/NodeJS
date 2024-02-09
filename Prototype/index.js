const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');

app.get('/', function(req, res) {
    res.send("Hello Nodejs!");
});
app.use(express.json());
app.post('/insert', function(req, res) {
    req.body;
    res.send("1")
})

app.get('/route-handler', (req, res) => {
    res.json({
        'name': "Madan Mohan Reddy",
        "role": "Fullstack"
    });
});
app.listen(port)