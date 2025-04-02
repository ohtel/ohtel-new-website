<template>
  <div>
    <Toast />
    <div class="center-section">
      <h1>Login</h1>
      <p>Welcome Back! Sign in to continue</p>

      <!-- Mobile Number Input with Icon -->
      <div class="input-group mb-3 w-100 position-relative">
        <span class="input-icon">
          <img src="../assets/images/login/username_icon.svg" alt="Mobile Icon" />
        </span>
        <input
          type="text"
          class="password-input form-control"
          v-model="email"
          placeholder="Enter your mobile number or Email"
          @input="validateInput"
        />
      </div>

      <div v-if="showOtpSection" class="center-section">
        <label for="otp-inputs">Enter OTP</label>
        <!-- OTP Inputs -->
        <div id="otp-inputs" class="otp-div d-flex">
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
            @keypress="isNumber($event)"
          />
        </div>
        <div class="login-buttons d-flex">
          <button @click="verifyOtp" class="btn btn-primary buttons w-100 mobile-login">
            Verify
          </button>
        </div>
        <p class="resend-otp" v-if="timer > 0">Resend OTP in {{ timer }} seconds</p>
        <p class="resend-otp" v-else @click="resendOtp">Resend OTP</p>
        <p class="wrong-number" @click="resetState">Wrong mobile number?</p>
      </div>

      <div v-else class="login-buttons d-flex">
        <button @click="sendOtp" class="btn btn-primary buttons w-100 mobile-login">
          Send OTP
        </button>
      </div>

      <div v-if="loginError" class="alert alert-danger mt-2">
        {{ loginError }}
      </div>

    

      <!-- Google Login -->
      <button @click="signInWithGoogle" class="btn btn-primary google-login-button w-100">
        <span class="icon-space">
          <img src="../assets/images/login/google_image.svg" alt="" />
        </span>
        Signin Via Google
      </button>
        <!-- Skip Login Button -->
        <button @click="skipLogin" class="btn btn-outline-secondary w-100 mt-3">
        Skip Login
      </button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../environment.js';
import { useRouter } from 'vue-router';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtgC47qVsVhvtu_GgKNQfSIEtq1a9hPAU",
  authDomain: "ohtel-74809.firebaseapp.com",
  databaseURL: "https://ohtel-74809.firebaseio.com",
  projectId: "ohtel-74809",
  storageBucket: "ohtel-74809.appspot.com",
  messagingSenderId: "3929015854",
  appId: "1:3929015854:web:16cbcac363d595ab4401bf",
  measurementId: "G-05075W8FND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default {
  components: {
    Toast
  },
  data() {
    return {
      email: '',
      loginState: 'mobile',
      emailError: '',
      loginError: '',
      otp: ['', '', '', ''],
      otpInputRefs: [],
      showOtpSection: false,
      timer: 30,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    validateInput(event) {
      const value = event.target.value;
      this.email = value;
    },
    isEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    isNumber(event) {
      if (!/^\d*$/.test(event.key)) {
        event.preventDefault();
      }
    },
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
      } else if (event.key === 'Backspace' && index === this.otp.length - 1) {
        this.otp[index] = '';
      }
    },
    validateInputs() {
      this.emailError = '';
      this.loginError = '';

      if (!this.email) {
        this.emailError = 'Mobile Number or Email is required.';
      } else if (this.isEmail(this.email)) {
        // Email validation passed
        return true;
      } else if (!/^\d{10}$/.test(this.email)) {
        this.emailError = 'Please enter a valid 10-digit mobile number or email address.';
      }

      return !this.emailError;
    },
    async sendOtp() {
      if (!this.validateInputs()) {
        this.loginError = this.emailError;
        return;
      }

      try {
        let response;
        if (this.isEmail(this.email)) {
          // Send OTP to email
          response = await axios.get(
            `${BASE_URL}send-otp-to-email/?email=${this.email}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } else {
          // Send OTP to mobile
          response = await axios.get(
            `${BASE_URL}${ENDPOINTS.OTP_SEND}?phone=${this.email}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }

        console.log('OTP sent:', response.data);
        this.showOtpSection = true;
        this.startTimer();
      } catch (error) {
        this.loginError = error.response?.data?.detail || 'Failed to send OTP';
      }
    },
    async verifyOtp() {
      try {
        let response;
        if (this.isEmail(this.email)) {
          // Verify email OTP
          response = await axios.post(
            `${BASE_URL}email-validate-otp/`,
            {
              email: this.email,
              otp: this.otp.join(''),
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } else {
          // Verify mobile OTP
          response = await axios.post(
            `${BASE_URL}${ENDPOINTS.VALIDATE_OTP}`,
            {
              phone: this.email,
              otp: this.otp.join(''),
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }

        console.log('OTP Verified:', response.data);
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        this.$router.push('/main-dashboard');
      } catch (error) {
        this.loginError = error.response?.data?.detail || 'Failed to verify OTP';
      }
    },
    resetState() {
      this.showOtpSection = false;
      this.email = '';
      this.otp = ['', '', '', ''];
      this.timer = 30;
    },
    startTimer() {
      const interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    },
    async resendOtp() {
      if (this.timer === 0) {
        try {
          let endpoint = '';
          let params = '';

          // Check if input is email or phone
          if (this.isEmail(this.email)) {
            endpoint = `${BASE_URL}send-otp-to-email/`;
            params = `?email=${this.email}`;
          } else {
            endpoint = `${BASE_URL}send-otp-to-phone/`;
            params = `?phone=${this.email}`;
          }

          const response = await axios.get(`${endpoint}${params}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (response.status === 200) {
            this.toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'OTP has been resent successfully',
              life: 5000
            });
            // Start the timer only after successful resend
            this.timer = 30;
            this.startTimer();
          }
        } catch (error) {
          console.error('Error resending OTP:', error);
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response?.data?.detail || 'Failed to resend OTP. Please try again.',
            life: 5000
          });
        }
      }
    },
    async skipLogin() {
      try {
        // Clear all data from local storage
        localStorage.clear();

        const response = await axios.get(`${BASE_URL}user/guest_user/`, {}, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Guest login successful:', response.data);
        localStorage.setItem('accessToken', response.data.result);
        localStorage.setItem('user', response.data.detail);
        this.$router.push('/main-dashboard');
      } catch (error) {
        this.loginError = error.response?.data?.detail || 'Failed to login as guest';
      }
    },
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const token = result._tokenResponse.oauthIdToken;

        console.log('Google Sign-In successful:', result);
        const user_name = user.displayName;
        const user_email = user.email;

        // Call the Google authentication API
        const response = await axios.post(
          `${BASE_URL}google-authenticate/`,
          {
            name: user_name,
            email: user_email,
            google_token: token
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 200) {
          // Store the authentication data
          localStorage.setItem('accessToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data));
          
          // Show success message
          this.toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Google Sign-In successful',
            life: 5000
          });
          
          // Navigate to dashboard
          this.$router.push('/main-dashboard');
        }
      } catch (error) {
        console.error('Google Sign-In error:', error);
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.response?.data?.detail || 'Failed to sign in with Google',
          life: 5000
        });
        this.loginError = error.response?.data?.detail || 'Failed to sign in with Google';
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
.resend-otp {
  cursor: pointer;
  color: blue;
}
.wrong-number {
  cursor: pointer;
  color: blue;
}
</style>