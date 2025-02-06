const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://don-gold.vercel.app",
            changeOrigin: true,
            secure: false,
        })
    );
};
