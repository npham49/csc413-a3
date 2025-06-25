import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    // tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.wasm']
  },
  server: {
    allowedHosts: ['b5ca-2604-3d08-2c84-4600-25eb-88e9-e5da-528.ngrok-free.app', 'ee78-2604-3d08-2c84-4600-bcf6-fbc7-754c-285f.ngrok-free.app'],
    port: 5173, // Default Vite port
    host: true, // Allow external connections
    // https: {
    //   // Enable HTTPS for camera access from external devices
    // },
  },
  optimizeDeps: {
    exclude: ['@zappar/zappar'],
    include: ['ua-parser-js']
  },
  define: {
    global: 'globalThis',
  },
  assetsInclude: ['**/*.wasm'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.wasm')) {
            return 'assets/[name].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  }
})
