
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(createProxyMiddleware('/api/v1/products', // replace with your endpoint
    {
      target: 'http://localhost:4000',

      changeOrigin: true,
    } // replace with your target
  ));
  app.use(createProxyMiddleware('/api/v1/product', // replace with your endpoint
    {
      target: 'http://localhost:4000',
      changeOrigin: true,
    } // replace with your target
  ));

  app.use(
    '/api/v1/login',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/register',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/me',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/logout',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/me/update',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/password/update',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/password/forgot',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/stripeapikey',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/payment/process',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/payment/cod',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/order/new',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/orders/me',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/orders',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/order',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/review',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/admin/products',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/admin/product',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/admin/product/new',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/admin/orders',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/admin/order',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/admin/users',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/admin/user',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/admin/reviews',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/user/cart',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/v1/cart/add',
    createProxyMiddleware({
      target: 'http://localhost:4000'
      ,
      changeOrigin: true,
    })
  );

}