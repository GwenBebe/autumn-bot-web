const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
app.use(express.static(__dirname + "/dist/autumn-bot-web/browser"));
console.log(process.env.NODE_ENV);
app.use(
  "/api",
  createProxyMiddleware({
    target:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4200"
        : "https://api.autumnbot.net",
    changeOrigin: true,
    cookieDomainRewrite: {
      "api.autumnbot.net": "www.autumnbot.net",
    },
  })
);

app.get("/*", function (req, res) {
  console.log(`GET ${req.path} FROM ${req.ip}`);

  res.sendFile(
    path.join(__dirname, "dist/autumn-bot-web/browser", "index.html")
  );
});
// Start the app by listening on the default Heroku port
app.listen(8080);
console.log(`Listening on port ${8080}`);
