import colors from 'vuetify/es5/util/colors'
const webpack = require('webpack');

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - blink-games',
    title: 'BLINK GAMES',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'BLACKPINKに関するクイズゲームです。他数のモードでゲームや他のBLINKと競うこともできます。' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@uzr4b' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://blink-games.app/ogp.png' },
      // { hid: 'twitter:image', name: 'twitter:image', content: 'http://localhost:3000/ogp.png' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'BLINK GAMES' },
      { hid: 'og:url', property: 'og:url', content: 'https://blink-games.app/' },
      // { hid: 'og:url', property: 'og:url', content: 'http://localhost:3000/' },
      { hid: 'og:description', property: 'og:description', content: 'BLACKPINKに関するクイズゲームです。他数のモードでゲームや他のBLINKと競うこともできます。' },
      { hid: 'og:image', property: 'og:image', content: 'https://blink-games.app/ogp.png' },
      // { hid: 'og:image', property: 'og:image', content: 'http://localhost:3000/ogp.png' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'BLINK GAMES' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/yin-and-yang.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/sass/app.scss', lang: 'scss' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-youtube.js' },
    { src: '~/plugins/vee-validate.js' },
    { src: '~/plugins/blackpink-config.js' },
    { src: '~/plugins/persistedState.client.js', ssr: false },
    { src: '~/plugins/utils.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    [
      '@nuxtjs/google-gtag',
      {
        id: 'G-Z5VYF7WDFM',
        debug: true
      }
    ]
  ],
  
  // apiを使用する場合のCORS policy にブロックされる問題
  // 呼び出し側はapi以下の/v1/jp/itunes-music/hot-tracks/all/10/explicit.jsonを指定
  axios: {
    proxy: true,
    prefix: '/search'
  },
  proxy: {
    '/search/': { target: process.env.ITUNES_APPLE_URL, }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    transpile: [
      'vee-validate/dist/rules',
    ],
    extend (config, { isServer, isClient }) {
      // mp3を扱うloader設定
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      });
      // Webスクレイピング用のNode.jsライブラリのpuppeterの設定
      config.externals = config.externals || {}
      if (!isServer) {
        config.node = {
          fs: 'empty',
        }
      }
      if (Array.isArray(config.externals)) {
        config.externals.push({
          puppeteer: require('puppeteer'),
        })
      } else {
        config.externals.puppeteer = require('puppeteer')
      }
      config.output.globalObject = 'this'
      return config
    },
  },

  // Routing configuration
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custome',
        path: '*',
        component: resolve(__dirname, 'pages/errors/404.vue')
      })
    },
    middleware: ["authenticated"],
  },
}
