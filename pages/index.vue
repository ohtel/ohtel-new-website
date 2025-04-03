<template>
  <div class="mainClass">
    <Login v-if="!isLoggedIn" />
  </div>
</template>

<script>
import Login from '../pages/login.vue';
import axios from 'axios';
import { BASE_URL } from '../environment.js';

export default {
  components: {
    Login,
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  async mounted() {
    // Only proceed if we're on the client side
    if (process.client) {
      // Check if user is logged in
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.isLoggedIn = true;
        this.$router.push('/main-dashboard');
      } else {
        // If no token, perform skip login
        try {
          // Clear all data from local storage first
          localStorage.clear();

          const response = await axios.get(`${BASE_URL}user/guest_user/`, {}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log('Guest login successful:', response.data);
          localStorage.setItem('accessToken', response.data.result);
          localStorage.setItem('user', response.data.detail);
          this.isLoggedIn = true;
          this.$router.push('/main-dashboard');
        } catch (error) {
          console.error('Failed to login as guest:', error);
          this.isLoggedIn = false;
        }
      }
    }
  }
};
</script>

<style>
</style>