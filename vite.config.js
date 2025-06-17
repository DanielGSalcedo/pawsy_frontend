import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";

/**
 * Vite Configuration File
 *
 * This configuration sets the base public path (also known as the "pathname")
 * for the deployed application. It is required when your app is served from a
 * subdirectory instead of the domain root (e.g., https://example.com/fireploy).
 *
 * The `base` option ensures that all static assets and routes are correctly resolved.
 * It must match the subdirectory you're hosting the app under.
 */
export default ({ mode })  => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT),
      host: true,
      cors: true,
      allowedHosts: [env.VITE_FIREPLOY_HOST],
    },
    preview: {
      port: parseInt(env.VITE_PORT),
      host: true,  // permite 0.0.0.0
      cors: true,
      allowedHosts: [env.VITE_FIREPLOY_HOST],
    },
  });
};
