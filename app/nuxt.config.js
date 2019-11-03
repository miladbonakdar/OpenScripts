export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    bodyAttrs: {
      dir: 'rtl'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.rawgit.com/rastikerdar/samim-font/v4.0.2/dist/font-face.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.rawgit.com/rastikerdar/tanha-font/v0.10/dist/font-face.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/bootstrap.css',
    '@/assets/css/animate.css',

    '@/assets/fonts/ionicons/css/ionicons.min.css',
    '@/assets/fonts/fontawesome/css/font-awesome.min.css',
    '@/assets/fonts/flaticon/font/flaticon.css',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
    'hover.css/css/hover-min.css',

    '@/assets/css/style.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/eventBus.js',
    { src: '~/plugins/filters.js', ssr: false },
    { src: '~/plugins/globalComponents.js', ssr: false },
    '~/plugins/auth.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:5001/api/'
        : 'http://localhost:5000/api/'
  },
  recaptcha: {
    hideBadge: true, // Hide badge element (v3)
    language: 'fa', // Recaptcha language (v2)
    siteKey: '6Lf4k7oUAAAAAM13diHiv7UUTmaiMQsGcHGcN7LY', // Site key for requests
    version: 3 // Version
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
