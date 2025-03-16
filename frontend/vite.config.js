import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173, // Ensure that the frontend runs on port 5173
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: 'http://localhost:3001',  // Your backend URL
        changeOrigin: true,               // Allow cross-origin requests
        secure: false,                    // Disable SSL check (useful for dev)
        // rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: Rewrite the path
      },
    },
  },
  plugins: [
    // You can also print out the server configuration here
    {
      name: 'print-config',
      configureServer(server) {
        console.log('Vite is starting with the following configuration:');
        console.log(`Frontend running at http://localhost:${server.config.server.port}`);
        console.log('Proxying /api to http://localhost:3001');
      }
    }
  ]
});
