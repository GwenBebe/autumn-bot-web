const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
app.use(express.static(__dirname + "/dist/autumn-bot-web/browser"));

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    cookieDomainRewrite: {
      "api.autumnbot.net": "www.autumnbot.net",
    },
  })
);

app.get("/*", function (req, res) {
  console.log("GANG GANG");
  console.log(req.cookies);
  res.sendFile(
    path.join(__dirname, "dist/autumn-bot-web/browser", "index.html")
  );
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log(`Listening on port ${process.env.PORT || 8080}`);
