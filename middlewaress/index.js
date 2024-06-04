const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/health-checkup", function(req,res) {
    const kidneys = req.body.kidneys;
    const kidneylength = kidneys.length;

    res.send("You have " + kidneylength + " kidneys");

});
//global catches it helps to if something went wrong in the input validation it will automatically pops sorry msg
app.use(function(err,req,res,next){
    res.json({
        msg: "Sorry something went wrong in our server "
    })
})


app.listen(port);