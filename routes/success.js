const path = require('path');

const express = require('express');

const rootdir = require('../util/path');

const router = express.Router();

router.get("/success", (req, res, next)=> {
    res.sendFile(path.join(rootdir, 'views', 'success.html'));
});

module.exports = router;