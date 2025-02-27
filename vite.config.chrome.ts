import { resolve } from 'path';
import { mergeConfig, defineConfig } from 'vite';
import { crx, ManifestV3Export } from '@crxjs/vite-plugin';
import baseConfig, { baseManifest, baseBuildOptions } from './vite.config.base';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

const outDir = resolve(__dirname, 'dist_chrome');

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          // background: {
          //   service_worker: 'src/v1/service-worker.js',
          //   type: 'module'
          // },
        } as ManifestV3Export,
        browser: 'chrome',
        // contentScripts: {
        //   injectCss: true,
        // }
      })
    ],
    build: {
      ...baseBuildOptions,
      outDir,
      rollupOptions: {
        input: {
          finished: 'src/pages/finished/index.html'
        }
      }
    },
  })
)