const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

app.use(express.json());

const ALL_USERS = [
    {
        username: "sushensame@gmail.com",
        password: "123",
        name: "Sushen Oli"
    },
    {
        username: "kuber1180@gmail.com",
        password: "567565",
        name: "Kuber Oli"
    },
    {
        username: "sudha@gmail.com",
        password: "453453",
        name: "Sudha Oli",
    },
    {
        username: "ranju@gmail.com",
        password: "234634",
        name: "Ranju Oli"
    }
];

function userExists(username, password) {
    let userExists = false;
    for(let i=0;i<ALL_USERS.length;i++){
        if(ALL_USERS[i].username === username && ALL_USERS[i].password === password){
            userExists = true;     
        }

        return userExists;
       
    }
}

app.post("/signin", function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        return res.status(403).json({
            msg: "User does not exist in our in memory db",
        });
    }

    var token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function(req,res) {
    const token = req.headers.authorization;
   
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        
        return res.json({
            users: ALL_USERS.filter(function(value) {
                if(value.username==username){
                    return true;
                }
                else{
                    return false;
                }
            })
        })

    
})

app.listen(3000);