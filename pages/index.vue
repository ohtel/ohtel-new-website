<template>
  <div class="mainClass">
    <ClientOnly>
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../environment.js';

export default {
  data() {
    return {
      loading: true
    }
  },
  async beforeMount() {
    await this.handleNavigation();
  },
  methods: {
    async handleNavigation() {
      if (!process.client) return;

      try {
        const token = localStorage.getItem('accessToken');
        const intentionalLogin = localStorage.getItem('intentionalLogin');
        
        if (token) {
          window.location.href = '/main-dashboard';
        } else if (intentionalLogin === 'true') {
          localStorage.removeItem('intentionalLogin');
          window.location.href = '/loginInitial';
        } else {
          try {
            localStorage.clear();
            const response = await axios.get(`${BASE_URL}user/guest_user/`, {}, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            localStorage.setItem('accessToken', response.data.result);
            localStorage.setItem('user', response.data.detail);
            window.location.href = '/main-dashboard';
          } catch (error) {
            console.error('Failed to login as guest:', error);
            window.location.href = '/loginInitial';
          }
        }
      } catch (error) {
        console.error('Navigation error:', error);
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.mainClass {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
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