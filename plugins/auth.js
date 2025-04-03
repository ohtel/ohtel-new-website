export default defineNuxtPlugin((nuxtApp) => {

  // Using NuxtApp's `router` instance to add a global navigation guard
  nuxtApp.$router.beforeEach((to, from, next) => {

    // Ensure this is client-side execution
    if (process.client) {
      const token = localStorage.getItem('accessToken');
      const intentionalLogin = localStorage.getItem('intentionalLogin');

      // Don't redirect if going to login page or if it's an intentional login
      if (to.path === '/loginInitial' || intentionalLogin === 'true') {
        return next();
      }

      // Redirect to login if no token is found and the user isn't already on the login page
      if (!token && to.path !== '/') {
        return next('/');
      }
    }

    next(); // Allow the navigation to proceed if no conditions are met
  });
});