const express = require('express');

const router = express.Router();

router.get("/", (req, res, next)=> {
    // console.log("in the another  middleware!");
    res.send("<h1> HEllo from express</h1>");
});

module.exports = router;