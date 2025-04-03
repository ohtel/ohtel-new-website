export default defineNuxtRouteMiddleware((to) => {
  // Only redirect if we're on the root path
  if (to.path === '/') {
    // Ensure this is client-side execution
    if (process.client) {
      // Check if user is logged in (has access token)
      const token = localStorage.getItem('accessToken')
      
      if (token) {
        // If logged in, redirect to main-dashboard
        return navigateTo('/main-dashboard')
      }
    }
  }
}) 