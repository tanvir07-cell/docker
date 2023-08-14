var http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello Web Server</h1>");
  })

  .listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
    console.log("Process id is : ", process.pid);
  });
