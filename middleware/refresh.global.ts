export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    // Check if we're on the main-dashboard route
    if (to.path === '/main-dashboard') {
      // Check if this is the first visit (no referrer)
      if (!document.referrer) {
        // Refresh the page
        window.location.reload();
      }
    }
  }
}) 