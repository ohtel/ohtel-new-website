import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
  }),
  actions: {
    saveAccessToken(token) {
      this.accessToken = token;
    },
  },
});