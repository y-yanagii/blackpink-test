import colors from 'vuetify/es5/util/colors'
const webpack = require('webpack');

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - blackpink-test',
    title: 'blackpink-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/cube.ico' }
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
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
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
    }
  },
}
