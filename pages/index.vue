<template>
  <div class="mainClass">
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../environment.js';

export default {
  data() {
    return {
      isLoading: true
    };
  },
  async mounted() {
    // Only proceed if we're on the client side
    if (process.client) {
      try {
        // Check if user is logged in
        const token = localStorage.getItem('accessToken');
        const intentionalLogin = localStorage.getItem('intentionalLogin');
        
        if (token) {
          this.isLoading = false;
          await this.$router.push('/main-dashboard');
        } else if (intentionalLogin === 'true') {
          // If user clicked login button, go to login page
          localStorage.removeItem('intentionalLogin');
          this.isLoading = false;
          await this.$router.push('/loginInitial');
        } else {
          // If no token and not intentional login, perform skip login
          try {
            localStorage.clear();
            const response = await axios.get(`${BASE_URL}user/guest_user/`, {}, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            localStorage.setItem('accessToken', response.data.result);
            localStorage.setItem('user', response.data.detail);
            this.isLoading = false;
            await this.$router.push('/main-dashboard');
          } catch (error) {
            console.error('Failed to login as guest:', error);
            this.isLoading = false;
            await this.$router.push('/loginInitial');
          }
        }
      } catch (error) {
        console.error('Navigation error:', error);
        this.isLoading = false;
      }
    }
  }
};
</script>

<style>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #A20584;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>