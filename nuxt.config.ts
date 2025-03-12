export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/css/global.css', // Your global CSS
    'bootstrap/dist/css/bootstrap.css', // Bootstrap CSS
    '@fortawesome/fontawesome-free/css/all.css', // Font Awesome CSS
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css'
  ],
  modules: ['@pinia/nuxt'], // Register Pinia
  plugins: [
    '~/plugins/auth.js', // Global plugin for auth
    '@/plugins/google-maps.js', // Google Maps plugin
  ],
  runtimeConfig: {
    public: {
      googleMapsApiKey: 'AIzaSyBsG-EGz_k6QKG0eAHN03mtKQQKVMKmCq0', // Load Google Maps API key from environment
    },
  },
  app: {
    head: {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsG-EGz_k6QKG0eAHN03mtKQQKVMKmCq0&libraries=places`,
          async: true,
          defer: true,
        },
      ],
    },
  },
  build: {
    transpile: ['primevue']
  }
});