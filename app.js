const express = require('express');
const httpProxy = require('http-proxy');

const app = express();

// Create a proxy server
const proxy = httpProxy.createProxyServer({
    target: '', // HTTPS Ethereum RPC endpoint
    changeOrigin: true,
    secure: false, // Set to true if the target endpoint uses valid SSL certificates
});

// Handle all routes and forward requests to the proxy server
app.use((req, res) => {
    console.log(`Proxying request: ${req.method} ${req.url}`);

    // Proxy the request
    proxy.web(req, res, (error) => {
        if (error) {
            console.error('Proxy error:', error);
            res.status(500).send('An error occurred while proxying the request.');
        }
    });
});

// Define the port for the proxy server to listen on
const port = 3334;
app.listen(port, () => {
    console.log(`Proxy server is listening on port ${port}`);
});
