// vite.config.ts
import { defineConfig } from "file:///C:/Users/alexa/OneDrive%20-%20K%C3%B8benhavns%20Erhvervsakademi/SoftwareDevelupment/3.sem/bachelor_projekt/customer/frontend/Bachelor_project_frontend_customer/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/alexa/OneDrive%20-%20K%C3%B8benhavns%20Erhvervsakademi/SoftwareDevelupment/3.sem/bachelor_projekt/customer/frontend/Bachelor_project_frontend_customer/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 4001
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  },
  resolve: {
    alias: {
      util: "rollup-plugin-node-polyfills/polyfills/util",
      sys: "util"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4YVxcXFxPbmVEcml2ZSAtIEtcdTAwRjhiZW5oYXZucyBFcmh2ZXJ2c2FrYWRlbWlcXFxcU29mdHdhcmVEZXZlbHVwbWVudFxcXFwzLnNlbVxcXFxiYWNoZWxvcl9wcm9qZWt0XFxcXGN1c3RvbWVyXFxcXGZyb250ZW5kXFxcXEJhY2hlbG9yX3Byb2plY3RfZnJvbnRlbmRfY3VzdG9tZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFsZXhhXFxcXE9uZURyaXZlIC0gS1x1MDBGOGJlbmhhdm5zIEVyaHZlcnZzYWthZGVtaVxcXFxTb2Z0d2FyZURldmVsdXBtZW50XFxcXDMuc2VtXFxcXGJhY2hlbG9yX3Byb2pla3RcXFxcY3VzdG9tZXJcXFxcZnJvbnRlbmRcXFxcQmFjaGVsb3JfcHJvamVjdF9mcm9udGVuZF9jdXN0b21lclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYWxleGEvT25lRHJpdmUlMjAtJTIwSyVDMyVCOGJlbmhhdm5zJTIwRXJodmVydnNha2FkZW1pL1NvZnR3YXJlRGV2ZWx1cG1lbnQvMy5zZW0vYmFjaGVsb3JfcHJvamVrdC9jdXN0b21lci9mcm9udGVuZC9CYWNoZWxvcl9wcm9qZWN0X2Zyb250ZW5kX2N1c3RvbWVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDQwMDEsXHJcbiAgfSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGVzYnVpbGRPcHRpb25zOiB7XHJcbiAgICAgIGRlZmluZToge1xyXG4gICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIHV0aWw6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy91dGlsJyxcclxuICAgICAgc3lzOiAndXRpbCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZvQixTQUFTLG9CQUFvQjtBQUMxcUIsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
