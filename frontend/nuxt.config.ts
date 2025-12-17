// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/fa/admin/**': {ssr: false},
    '/en/admin/**': {ssr: false},
    '/fa/dashboard/**': {ssr: false},
    '/en/dashboard/**': {ssr: false},
  },
  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },

  experimental: {
    // viewTransition: true,
    spaLoadingTemplateLocation: 'body',
  },

  devtools: {enabled: true},
  modules: [// '@nuxt/eslint',
    // '@nuxt/content',
    '@nuxt/ui', '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/i18n', 'nuxt-echarts', 'nuxt-tiptap-editor'],
  spaLoadingTemplate: 'assets/html/spa-loading.html',
  css: [
    '~/assets/css/main.css',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'fa',
        name: 'پارسی',
        file: 'fa.json'
      }]
  },

  future: {
    compatibilityVersion: 4
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
    },
  },

  echarts: {
    charts: ['LineChart', 'LinesChart',],
    components: [
      'AriaComponent',
      'TooltipComponent',
      'AxisPointerComponent',
      'GridComponent',
      'DatasetComponent',
      'TitleComponent',
    ],
  },

  icon: {
    localApiEndpoint: "/_nuxt_icon"
  },

  nitro: {
    devProxy: {
      '/api': 'http://localhost:8000/api',
      '/static': 'http://localhost:8000/static',
      '/media': 'http://localhost:8000/media',
    }
  },

  compatibilityDate: '2024-11-27'
})