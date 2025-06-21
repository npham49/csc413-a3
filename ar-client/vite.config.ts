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
    allowedHosts: ['5135-134-87-188-4.ngrok-free.app'],
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
