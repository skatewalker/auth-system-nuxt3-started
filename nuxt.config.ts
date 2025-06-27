// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-auth', '@pinia/nuxt', '@prisma/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  eslint: {
    config: {
      rules: {
        'vue/multi-word-component-names': 'warn',
        'no-console': 'warn',
      },
    },
  },
  auth: {
    isEnabled: true,
    originEnvKey: process.env.NUXT_AUTH_ORIGIN,
    baseURL: process.env.NUXT_PUBLIC_API_BASE,
    provider: {
      type: 'authjs', //refresh
      trustHost: false,
      defaultProvider: 'google',
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      enablePeriodically: 1000,
      enableOnWindowFocus: true,
    },
  },
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
    googleCredentials: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
});
