import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, BuildOptions } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import manifest from './manifest.json';
import devManifest from './manifest.json';
import pkg from './package.json';


const isDev = process.env.__DEV__ === 'true';
// set this flag to true, if you want localization support
const localize = false;

export const baseManifest = {
    ...manifest,
    version: pkg.version,
    ...(isDev ? devManifest : {}),
    ...(localize ? {
      name: '__extName__',
      description: '__extDescription__',
      default_locale : 'en'
    } : {})
};

export const baseBuildOptions: BuildOptions = {
  sourcemap: isDev,
  emptyOutDir: isDev
};

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
  ],
  publicDir: resolve(__dirname, 'public'),
});