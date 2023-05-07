const path = require('path');

const rootdir = require('../util/path');

exports.getAddProducts = (req, res, next)=> {
    // console.log("in the middleware!");
    res.sendFile(path.join(rootdir, 'views', 'contact-us.html'));
}

exports.postProducts =(req, res, next) => {
    console.log(req.body);
    res.redirect("/success");
}

exports.successProducts = (req, res, next)=> {
    res.sendFile(path.join(rootdir, 'views', 'success.html'));
}