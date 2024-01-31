const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 你想要代理的路径
    createProxyMiddleware({
      target: 'http://localhost:8000', // 代理的目标地址
      changeOrigin: true,
      pathRewrite:{'^/api':''}
    })
  );
};