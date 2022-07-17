const { createProxyMiddleware } = require('http-proxy-middleware');
import configData from "./config.json";

module.exports = function(app) {
  const api_url = 
  (process.env.NODE_ENV === 'production') ? 
  configData.sever_address : configData.localhost_address;
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: api_url,
    })
  );
};