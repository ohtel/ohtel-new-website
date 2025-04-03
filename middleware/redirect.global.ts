export default defineNuxtRouteMiddleware((to, from) => {
  // Only redirect if we're on the root path
  if (to.path === '/') {
    // Ensure this is client-side execution
    if (process.client) {
      try {
        const token = localStorage.getItem('accessToken')
        
        if (token) {
          // Check if this is a direct access to root (no previous route)
          if (!from.path || from.path === '/') {
            // Use window.location for hard refresh when coming from root
            window.location.href = '/main-dashboard'
            return
          } else {
            // Use normal navigation for internal routing
            return navigateTo('/main-dashboard')
          }
        }
      } catch (error) {
        console.error('Error in redirect middleware:', error)
      }
    }
  }
}) 