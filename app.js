
const express = require('express');

const app = express();

app.use((req, res, next)=> {
    console.log("in the middleware!");
    next(); // allows the request continue to the next middleware in the line
})

app.use((req, res, next)=> {
    console.log("in the middleware!");
    // res.send({ key1: value });
    res.send("<h1>hii</h1>");
    
});

app.listen(4000);