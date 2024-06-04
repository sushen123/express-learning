//input validation
//zod is one of the libraries for input-validation
const zod = require("zod");
const express = require("express");
const { default: errorMap } = require("zod/locales/en.js");
const app = express();

// const schema = zod.array(zod.number());
app.use(express.json());


const schema = zod.object({
    email: zod.string(),
    password: zod.string(),
    country: zod.literal("NP").or(zod.literal("US")),
    kidneys: zod.array(zod.number())
})

app.use(express.json())


app.post("/health-checkup", function(req,res) {
    const validationResult = schema.safeParse(req.body);
    if(!validationResult.success){
        res.status(411).send(validationResult)
        return;
    }

    res.status(200).json({
        msg: "Validation successful"
    });
})

app.listen(3000);