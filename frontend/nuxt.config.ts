// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },

  experimental: {
    // viewTransition: true,
    spaLoadingTemplateLocation: 'body',
  },

  devtools: {enabled: true},
  modules: [// '@nuxt/eslint',
    '@nuxt/ui', // '@nuxt/content',
    '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/i18n', 'nuxt-echarts'],

  css: ['~/assets/css/main.css'],
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
  ui: {
    colorMode: true,
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

  compatibilityDate: '2024-11-27'
})