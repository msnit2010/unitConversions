const http = require('http');

const checkHealth = () => {
  http.get('http://localhost:5000/api/health', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
      console.log('Health check response:', JSON.parse(data));
    });
  }).on('error', (err) => {
    console.error('Health check failed:', err.message);
  });
};

checkHealth(); 