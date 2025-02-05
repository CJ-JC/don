const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://donymusic-server.vercel.app",
            changeOrigin: true,
            secure: false,
        })
    );
};
