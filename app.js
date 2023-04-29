const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/home" method="POST"><input type="text" name="home"><button type="submit">home</button></form></body>');
        // res.write('<body><form action="/about" method="POST"><input type="text" name="aboutus"><button type="submit">about us</button></form></body>');
        // res.write('<body><form action="/node" method="POST"><input type="text" name="node"><button type="submit">node</button></form></body>');
        res.write('</html>');
        return res.end();

    }
    if (url === '/home' && method === 'POST') {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        req.on("end", () => {
            const parsedbody = Buffer.concat(body).toString();
            // console.log(parsedbody);
            const message = parsedbody.split("=")[1];
            fs.writeFile("home.txt", message, err => {
                res.setHeader("locatoin", "/");
                res.write(`<body><h1>${message}</h1><form action="/home" method="POST"><input type="text" name="home"><button type="submit">home</button></form></body>`);
                res.statusCode = 302;
                return res.end();
            });
        })


    }
    if (url === '/about' && method === 'POST') {
        console.log("poonam")
        res.setHeader('location', '/');
        res.write('<html>');
        res.write('<head><title>my first page</title></head>');
        res.write('<body><h1>wellcome to  about us page</h1></body>')
        res.write('</html>');
        return res.end();
    }
    if (url === '/node' && method === 'POST') {
        res.setHeader('location', '/');
        res.write('<html>');
        res.write('<head><title>my second page</title></head>');
        res.write('<body><h1>wellcome to  my node js server</h1></body>')
        res.write('</html>');
        return res.end();
        // process.exit();
    }
})
server.listen(4000)