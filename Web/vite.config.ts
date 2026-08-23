import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    {
      name: "clean-static-page-paths",
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (["/gallery", "/privacy", "/sitemap"].includes(request.originalUrl ?? "")) {
            response.statusCode = 308;
            response.setHeader("Location", `${request.originalUrl}/`);
            response.end();
            return;
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((request, response, next) => {
          if (["/gallery", "/privacy", "/sitemap"].includes(request.originalUrl ?? "")) {
            response.statusCode = 308;
            response.setHeader("Location", `${request.originalUrl}/`);
            response.end();
            return;
          }
          next();
        });
      },
    },
  ],
});
