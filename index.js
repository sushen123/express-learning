const express = require("express")
const app = express();
const port = 3000

app.use(express.json());

const users = [{
    name: "SUshen",
    kidney: [{
        healthy: false
    }]
}];

app.get("/", function(req,res) {
    const sushenkidneys = users[0].kidney;
    const numberOfKidneys = sushenkidneys.length;
    let numberofHealthyKidneys = 0;
    for(let i=0;i<sushenkidneys.length;i++){
    if(sushenkidneys[i].healthy){
        numberofHealthyKidneys = numberofHealthyKidneys + 1;
    }
}

    const numberofUnhealthyKidneys = numberOfKidneys - numberofHealthyKidneys;
    res.json({
        sushenkidneys,
        numberofHealthyKidneys,
        numberofUnhealthyKidneys
    })
})


app.post("/", function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidney.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done"
    })
})

app.put("/", function(req, res){
    for(let i=0;i<users[0].kidney.length; i++){
        users[0].kidney[i].healthy = true;
    }

    res.json({
        msg: "OK"
    });
})

app.delete("/", function(req,res) {
    const newKidneys = [];
    for(let i=0; i<users[0].kidney.length; i++){
        if(users[0].kidney[i].healthy){
            newKidneys.push({
                healthy: true
            })
        }
    }
    users[0].kidney = newKidneys;
    res.json({
        msg: "done"
    })
})
app.listen(port);