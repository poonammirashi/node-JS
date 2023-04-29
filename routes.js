const fs=require("fs");

const  requesthandler = (req,res) => {
    const url =req.url;
    const method = req.method;
    if (url === '/') {
        fs.readFile("home.txt",{encoding: "utf-8"}, (err, data) => {
            if(err){
                console.log(err);
            }
            console.log("data", data);
            res.write('<html>');
            res.write('<head><title>Enter message</title></head>');
            res.write(`<body>${data}</body>`)
            res.write(`<body><form action="/home" method="POST"><input type="text" name="home"><button type="submit">home</button></form></body>`);
            // res.write('<body><form action="/about" method="POST"><input type="text" name="aboutus"><button type="submit">about us</button></form></body>');
            // res.write('<body><form action="/node" method="POST"><input type="text" name="node"><button type="submit">node</button></form></body>');
            res.write('</html>');
            return res.end();
        })
    
    
    } else if (url === '/home' && method === 'POST') {
        const body = [];
        req.on("data", (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        })
        req.on("end", () => {
            const parsedbody = Buffer.concat(body).toString();
            // console.log(parsedbody);
            const message = parsedbody.split("=")[1];
            fs.writeFile("home.txt", message, err => {
                res.setHeader("locatoin","/");
                res.write(`<body><h3>${message}</h3><form action="/home" method="POST"><input type="text" name="home"><button type="submit">home</button></form></body>`);
                res.statusCode = 302;
                return res.end();
            });
        })
    
    
    }
    else if (url === '/about' && method === 'POST') {
        console.log("poonam")
        res.setHeader('textcontent', 'html/text');
        res.write('<html>');
        res.write('<head><title>my first page</title></head>');
        res.write('<body><h1>wellcome to  about us page</h1></body>')
        res.write('</html>');
        return res.end();
    } else {
        res.setHeader('textcontent', 'html/text');
        res.write('<html>');
        res.write('<head><title>my second page</title></head>');
        res.write('<body><h1>wellcome to  my node js server</h1></body>')
        res.write('</html>');
        return res.end();
        // process.exit();
    }
}
module.exports={
    handler:requesthandler,
    someText: "some hard code"
}

// module.exports.handler = requesthandler;
// module.exports.someText = "some hard code"

// exports.handler = requesthandler;
// exports.someText = "some hard code";