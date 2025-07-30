const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 80;

// Serve files from 'frontend-dist' folder
app.use(express.static(path.join(__dirname, 'frontend-dist')));

// Proxy API calls to backend service inside K8s
app.use('/api', createProxyMiddleware({
  target: 'http://backend-service:3000',
  changeOrigin: true
}));

app.listen(PORT, () => {
  console.log(`✅ Frontend server running on port ${PORT}`);
});
