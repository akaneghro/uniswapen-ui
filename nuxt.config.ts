import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        "@": resolve(__dirname, "/"),
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
    },
    app: {
        head: {
            title: "Uniswapen",
            meta: [
                {
                    charset: "utf-8",
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    name: "description",
                    content:
                        "This is an Uniswap implementation for closed interval pools.",
                },
            ],
        },
    },
    css: ["~/assets/main.scss"],
    debug: true, // Can be set to false to disable console.log
    devtools: { enabled: true },
    devServer: {
        port: 8888,
    },
    modules: ["@pinia/nuxt"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: { API_BASE_URL: "http://localhost:8080/" },
    },
});
