<template>
  <div>
    <div class="center-section">
      <h1>Admin Login</h1>
      <p>Welcome Back! Sign in to continue</p>

      <!-- Email Input with Icon -->
      <div class="input-group mb-3 w-100 position-relative">
        <span class="input-icon">
          <img src="../assets/images/login/username_icon.svg" alt="Email Icon" />
        </span>
        <input
          type="number"
          class="password-input form-control"
          v-model="email"
          placeholder="Enter your mobile number"
        />
      </div>

      <div class="center-section">
       
        <!-- OTP Inputs -->
        <div class="otp-div d-flex">
          <input
            v-for="(value, index) in otp"
            :key="index"
            type="text"
            maxlength="1"
            v-model="otp[index]"
            :ref="el => otpInputRefs[index] = el"
            @input="moveToNext($event, index)"
            @keydown.backspace="moveToPrev($event, index)"
            class="otp-input"
          />
        </div>
        <div class="login-buttons d-flex">
          <button @click="verifyOtp" class="btn btn-primary buttons w-100 mobile-login">
            Verify
          </button>
        </div>
      </div>

      <!-- Login Button -->
      <button @click="emitLogin" class="login-btn btn btn-primary buttons w-100 mobile-login">
        Log in
      </button>

      <div v-if="loginError" class="alert alert-danger mt-2">
        {{ loginError }}
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../environment.js';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
      loginState: 'mobile',
      emailError: '',
      passwordError: '',
      loginError: '',
      otp: ['', '', '', ''],
      otpInputRefs: [],
    };
  },
  methods: {
    moveToNext(event, index) {
      const value = event.target.value;
      if (value.length === 1) {
        this.otp[index] = value;
        if (index < this.otp.length - 1) {
          this.$nextTick(() => {
            this.otpInputRefs[index + 1]?.focus();
          });
        }
      }
    },
    moveToPrev(event, index) {
      if (event.key === 'Backspace' && index > 0) {
 
        this.otp[index] = '';
        this.$nextTick(() => {
          this.otpInputRefs[index - 1]?.focus();
        });
      } else if (event.key === 'Backspace' && index === this.otp.length-1) {

        this.otp[index] = '';
      }
    },
    validateInputs() {
      this.emailError = '';
      this.passwordError = '';
      this.loginError = '';

      if (!this.email) {
        this.emailError = 'Email or Mobile Number is required.';
      } else if (
        this.loginState === 'email' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
      ) {
        this.emailError = 'Please enter a valid email address.';
      }

      if (!this.password) {
        this.passwordError = 'Password is required.';
      }

      return !this.emailError && !this.passwordError;
    },
    async emitLogin() {
      if (!this.validateInputs()) {
        this.loginError = this.emailError || this.passwordError;
        return;
      }

      try {
        const response = await axios.post(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
          identifier: this.email,
          password: this.password,
        });

        console.log('Login successful:', response.data?.result);
        localStorage.setItem('accessToken', response.data.result.token);

        const userConfig = {
          name: response.data?.result.user.name || 'Unknown User',
          profilePhoto:
            response.data?.result.user.profilePhoto || 'https://via.placeholder.com/150',
          email: response.data?.result.user.email || 'No Email Provided',
          phone: response.data?.result.data?.user.phone || 'No Phone Provided',
          id: response.data?.result.user.id,
        };

        // Store user config in localStorage
        localStorage.setItem('user_config', JSON.stringify(userConfig));
        localStorage.setItem('justLoggedIn', 'true');

        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.status !== 200) {
          this.loginError = error.response.data.detail || 'Invalid Email or Phone';
        } else {
          this.loginError = error.message || 'An unknown error occurred.';
        }
      }
    },
    verifyOtp() {
      console.log('OTP Verified:', this.otp.join(''));
      // Add OTP verification logic here
    },
    loginStatusChange() {
      this.loginState = this.loginState === 'mobile' ? 'email' : 'mobile';
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        console.log('Current Access Token:', accessToken);
      } else {
        console.error('Access token is undefined or empty');
      }
    },
  },
  mounted() {
    this.otpInputRefs = this.otpInputRefs.slice(0, this.otp.length);
  },
};
</script>

<style>
.text-danger {
  color: red;
}
.alert {
  color: red;
  padding: 5px;
}
</style>