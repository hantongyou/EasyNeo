const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/backend',
        createProxyMiddleware({
            target: 'http://localhost:8088/',    //要访问的地址
            changeOrigin: true,
            pathRewrite: {
                '^/backend': '',
            }
        })
    );
    // 可以代理多个
    // app.use(
    //     '/api',
    //     createProxyMiddleware({
    //         target: 'https://i.maoyan.com',
    //         changeOrigin: true,
    //     })
    // );
};

