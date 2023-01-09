import { fileURLToPath, URL } from "node:url";
import path from "path";
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from "rollup-plugin-visualizer";

import ViteRestart from "vite-plugin-restart";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
import { formatEnv } from './src/utils/formatEnv'

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  let env = loadEnv(mode.mode, process.cwd());
  env = formatEnv(env)
  console.log('env', env);
  return {
    base: "/x7",
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variable.scss";',
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      VitePWA({
        manifest: {
          name: "x7-manage",
          short_name: "x7",
          theme_color: "#ffffff",
          icons: [
            {
              src: "icon-192x192.png", // <== don't add slash, for testing
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "icon-512x512.png", // <== don't remove slash, for testing
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts静态资源缓存
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "einyun-js-css-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "einyun-image-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/svgIcons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),

      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus(),
      ViteRestart({
        restart: ["vite.config.[jt]s", ".env.*"],
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      }),
      env.VITE_USER_NODE_ENV === 'report' && visualizer({
        emitFile: true,//是否被触摸
        filename: "test.html",//生成分析网页文件名
        open: true,//在默认用户代理中打开生成的文件
        gzipSize: true,//从源代码中收集 gzip 大小并将其显示在图表中
        brotliSize: true,//从源代码中收集 brotli 大小并将其显示在图表中
      })
    ],
    server: {
      cors: true,
      host: "0.0.0.0",
      https: false,
      proxy: {},
    },
    build: {
      minify: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true
      //   }
      // },
      rollupOptions: {},
      sourcemap: false,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".json", ".vue", ".scss", ".css"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@store": fileURLToPath(new URL("./src/stores/modules", import.meta.url)),
      },
    },
  }
});
