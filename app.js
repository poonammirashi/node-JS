const express = require('express');
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended: false}));

app.use("/add-product", (req, res, next)=> {
    // console.log("in the middleware!");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">add product</button></form>');
});

app.post("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
})

app.use("/", (req, res, next)=> {
    // console.log("in the another  middleware!");
    res.send("<h1> HEllo from express</h1>");
});


app.listen(4000);