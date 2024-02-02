const express = require('express')
const app = express();
const bodyParams = require('body-parser')

app.use(bodyParams.json());

const users = [
    {
        name: 'Mitchell',
        livers: [
            {
                healthy: false
            }
        ]
    }
]

app.get('/', function(req, res) {
    const headers = req.headers;
    console.log(headers);
    res.send("Success");
})
app.post('/insert', function(req, res) {
    const headers = req.headers;
    const body = req.body;
    res.send(body);
});

app.get('/user', function(req, res) {
    const mitchUser = users[0].livers;
    const noOflivers = mitchUser.length;
    let noOfHealthylivers = 0;
    for (i=0; i<mitchUser.length;i++) {
        if (mitchUser[i].healthy) {
            noOfHealthylivers += 1;
        }
    }
    const noOfUnhealthylivers = noOflivers - noOfHealthylivers;
    res.json({
        noOflivers,
        noOfHealthylivers,
        noOfUnhealthylivers
    })
})

app.post('/user/insert', function(req, res) {
    const isHealthy = req.body.healthy; 
    users[0].livers.push({healthy: isHealthy});
    res.json({users})
});



app.put('/user/update', function(req,res) {
    for(i=0;i<users[0].livers.length; i++) {
        users[0].livers[i].healthy = true;
    }
    res.json({})
})


app.delete('/user/delete', function(req, res) {
    if(isThereAtleastOneUnhealthyLiver()) {
        const healthyLivers = users[0].livers.filter((liver) => {
            return liver.healthy === true;
        })
        users[0].livers = healthyLivers;
        res.json(users[0]);
    } else {
        res.send(411).json({msg: "done"})
    }



})

const isThereAtleastOneUnhealthyLiver = () => {
    let isThereAtleastOneUnhealthyLiver = false
    users[0].livers.filter((liver) => {
        if (!liver.healthy) {
            isThereAtleastOneUnhealthyLiver = true
        }
    });
    return isThereAtleastOneUnhealthyLiver
}

app.listen(5000);