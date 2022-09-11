import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'BNIL - Landing Page',
    title: 'Landing App',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-recaptcha.js'
    },
    {
      src: '~/plugins/composition-api.js'
    },
    {
      src: '~/plugins/axios.js'
    },
    {
      src: '~/plugins/prototype.js'
    },
    {
      src: '~/plugins/vue-select.js'
    },
    {
      src: '~/plugins/floating-vue.js'
    },
    {
      src: '~/plugins/idle-vue.js'
    },
    {
      src: '~/plugins/wording-lib.js'
    },
    {
      src: '~/plugins/vee-validation.js'
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-healthcheck',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    // Simple proxy
    "/api/v1/": {
      target: "http://172.20.8.75/",
      // target: "http://10.20.10.34/",
      // target: "http://34.124.156.103:8888/",
      // target: "http://localhost:5020/",
      pathRewrite: { "^/api/v1/": "/api/v1/" }
    },
    "/test/v1/": {
      target: "http://172.20.8.75/",
      // target: "http://10.20.10.34/",
      // target: "http://34.124.156.103:8888/",
      // target: "http://localhost:5020/",
      pathRewrite: { "^/test/v1/": "/test/v1/" }
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  healthcheck: {
    path: '/health-check',
    contentType: 'application/json',
    healthy: () => {
      return JSON.stringify({
        result: 'Healty'
      })
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
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
  build: {},

  auth: {
    strategies: {
      local: {
        // scheme: 'refresh',
        token: {
          property: 'result.username',
          type: '',
          maxAge: 3600,
          global: true,
        },
        refreshToken: {
          // property: 'refresh_token',
          // data: 'refresh_token',
          // maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'result.username',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: '/login',
            method: 'post'
          },
          // refresh: { url: 'https://app.semesta.io/api/27b2cab7f9a61ad9c07077f5dc1f8315/customers/refresh-token', method: 'post' },
          // logout: { url: 'https://app.semesta.io/api/27b2cab7f9a61ad9c07077f5dc1f8315/customers/logout', method: 'get' },
          user: {
            url: '/user',
            method: 'get'
          }
        },
      }
    },
    // redirect: {
    //   login: '/auth/login',
    //   logout: '/auth/login',
    //   home: '/transaction/status'
    // }
  },

  components: {
    dirs: [
      '~/components',
      '~/components/submission_transaction'
    ]
  },
  // Serve local port
  server: {
    host: '0.0.0.0',
    port: 3000 // default: 3000
  },

  // Router
  router: {
    // middleware: ['auth']
  }
}
