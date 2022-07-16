const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const api_url = process.env.NODE_ENV === 'production' ? 'https://intense-basin-91551.herokuapp.com' : 'http://localhost:4000';
  app.use(
    '/api',
    createProxyMiddleware({
      target: api_url,
      
      // changeOrigin: true,
      // onProxyRes: function (proxyRes, req, res) {
      //       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      //   }
    })
  );
};