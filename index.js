const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send();
});


app.use(
  "/proxy",
  createProxyMiddleware({
    target: "https://api.langflow.astra.datastax.com",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("Origin", "https://api.langflow.astra.datastax.com");
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*"; // React app's URL
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Content-Type, Authorization";
    },
  })
);

module.exports = app
