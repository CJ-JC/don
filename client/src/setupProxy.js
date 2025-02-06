import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://don-server.vercel.app",
            changeOrigin: true,
            secure: false,
        })
    );
};
