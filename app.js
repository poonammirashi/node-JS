const express = require('express');

const bodyparser = require("body-parser");

const app = express();

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyparser.urlencoded({extended: false}));
 
app.use('/shop', shopRouter);
app.use('/admin', adminRouter);

app.use((res, req,next) => {
    req.status(404).send("<h1>page not found</h1>")
});

app.listen(4000);