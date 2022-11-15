const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/auth", "/images", "/socket.io"],
    createProxyMiddleware({
      target: "http://localhost:4567/",
      ws: true,
      changeOrigin: true,
    })
  );
};
