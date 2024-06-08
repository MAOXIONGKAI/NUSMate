//Setting up Proxy server to by-pass CORS Policy for certain API whose response
//does not contain Access-Control-Allow-Origin header
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const cors = require("cors");

app.use(cors());
app.options("*", cors());

app.use(
  "/api/personalitypolice/new_test",
  createProxyMiddleware({
    target: "https://api.personalitypolice.com/v1/new_test",
    changeOrigin: true,
    pathRewrite: {
      "^/api/personalitypolice": "",
    },
    onProxyRes: (proxyRes, req, res) => {
      res.headers["Access-Control-Allow-Origin"] = "*";
      res.headers["Access-Control-Allow-Methods"] =
        "GET, POST, PUT, DELETE, OPTIONS";
      res.headers["Access-Control-Allow-Headers"] =
        "Origin, X-Requested-With, Content-Type, Accept, Authorization";
    },
  })
);

app.listen(3001, () => {
  console.log("Proxy server is running on port 3001");
});
