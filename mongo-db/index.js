const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://sushen:Kuber%401180@cluster0.j6hlfsw.mongodb.net/mydatabase?retryWrites=true&w=majority");

const User = mongoose.model('Users', { name: String, email: String, passowrd: String});

app.post("/signup", async function(req,res) {
    const username = req.body.username;
    const passowrd = req.body.passowrd;
    const name = req.body.name;

    const existingUser = await User.findOne({ email: username});

    if(existingUser){
       return res.status(400).send("Ussername already exists");
    }

    const user = new User ({
        name: name,
        email: username,
        passowrd: passowrd
    })

    user.save();
    res.json({
        msg: "User created successfully"
    })
})

app.listen(3000);
