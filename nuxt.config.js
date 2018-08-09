const pkg = require("./package");

const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "spa",

  /*
  ** Headers of the page
  */
  head: {
    // title: pkg.name,
    title: "MOQA Admin",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ],
    script: [
      { src: "https://developers.kakao.com/sdk/js/kakao.min.js" }
      // { src: "polyfill.min.js" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#FFFFFF" },

  /*
  ** Global CSS
  */
  css: ["vuetify/src/stylus/main.styl", "~assets/styles/main.css"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ["@/plugins/vuetify"],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // npm install babel-loader@next --save 를 반드시 해주어야 한다. @ 관련된 업그레이드 babel-loader 인듯
    babel: {
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-syntax-dynamic-import"]
    },
    vendor: ["@babel/polyfill"],

    extend(config, ctx) {
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
  // transition: {
  //   name: "fade",
  //   mode: "out-in"
  // }
};
