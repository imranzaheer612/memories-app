const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config.json');

module.exports = function(app) {

  const api_url = 
  (process.env.NODE_ENV === 'production') ? 
  config.sever_address : config.localhost_address;
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: api_url,
    })
  );
};