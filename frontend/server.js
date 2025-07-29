const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Serve static files from /public
app.use(express.static('public'));

// Proxy API requests to backend service
app.use('/api', createProxyMiddleware({
  target: 'http://backend-service:3000',
  changeOrigin: true,
}));

app.listen(80, () => {
  console.log('✅ Frontend server running on port 80');
});
