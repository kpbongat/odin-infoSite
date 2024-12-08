const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const reqUrl = new URL(
      `http://${req.headers.host ?? "localhost"}${req.url}`
    );
    const path = reqUrl.pathname;
    const fileName = path === "/" ? "./index.html" : `.${path}.html`;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(8080);
