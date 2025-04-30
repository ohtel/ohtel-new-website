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
        <button @click="sendOtp" class=" w-100 mobile-login">
          Send OTP
        </button>
      </div>

      <div v-if="loginError" class="alert alert-danger mt-2">
        {{ loginError }}
      </div>

    

      <!-- Google Login -->
      <button @click="signInWithGoogle" class="btn mobile-login google-login-button w-100">
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

.mobile-login{
  background-color: #502cc7;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    height: 48px;
  color: white;
  margin-bottom: 10px;
}
.google-login-button{
  background-color: #efeaff;
    border: none;
    color: #2f2f2f;
    font-size: 16px;
    font-weight: 400;
    height: 52px;
}
.input-icon{
  left: 15px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
}
.password-input{
  background: #fff;
    border: 1px solid #cdbeff;
    border-radius: 5px !important;
    color: #6c6c6c;
    font-size: 13px;
    padding: 18px 40px 18px 50px;
    position: relative;
    z-index: 1;
}
.main {
  padding: 0;
  height: 100vh;
  padding: 16px;
}

.login-inputs {
  height: 100%;
  justify-content: space-between;
}

.input-group {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 15px; /* Space between icon and input edge */
  top: 50%;
  transform: translateY(-50%);
  z-index: 10; /* Ensure the icon is above the input field */
  pointer-events: none; /* Prevent click interference with the icon */
}

/* Style input focus state */
.password-input:focus,
.form-check-input:focus {
  border-color: #a20584; /* Change border color on focus */
  box-shadow: none; /* Remove shadow (optional) */
  outline: none; /* Remove the default outline */
}
.carousel-section {
  border-radius: 15px;
  height: 100%;
  display: flex;
  justify-content: right;
  width: fit-content;
  position: relative;
}

.inputs {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.image-placeholder {
  width: 100%;
  height: auto;
  font-size: 24px;
  text-align: center;
}
.center-section {
  width: 500px;
}
.sub-options {
  margin-top: 16px;
  margin-bottom: 30px;
}

.bottom-border {
  width: 30%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.17);
}
.form-check-label {
  margin-left: 7px;
}
.forgot-password {
  color: #4d4d4d;
  text-decoration: none;
  font-size: 12px;
  font-weight: 300;
}
.form-check-label {
  font-size: 12px;
  font-weight: 300;
}
.or-text {
  font-size: 13px;
  font-weight: 400;
}
.login-buttons {
  margin-top: 24px;
  justify-content: space-between;
  gap: 13px;
  margin-bottom: 30px;
}
.buttons {
  background-color: #502cc7;
  height: 48px;
  font-size: 13px;
  font-weight: 400;
  border-radius: 4px;
  border: none;
}
.icon-space {
  margin-right: 10px;
}
.password-input {
  color: #6c6c6c;
  font-size: 13px;
  border-radius: 5px !important;
  border: 1px solid #cdbeff;
  padding: 18px 40px 18px 50px; /* Adjust left padding to fit the icon */
  background: #fff;
  position: relative;
  z-index: 1; /* Ensure the input is still focusable below the icon */
}
.google-login-button {
  background-color: #efeaff;
  color: #2f2f2f;
  font-size: 16px;
  font-weight: 400;
  border: none;
  height: 52px;
}
.no-account {
  position: absolute;
  bottom: 55px;
}
.sign-up-now {
  text-decoration: none;
}
.carousel-dots {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #d6d6d6fc;
  border-radius: 50%;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out, background-color 0.5s ease-in-out,
    transform 0.4s ease, box-shadow 0.4s ease;
}

.dot.active {
  opacity: 1;
  border-radius: 15px;
  background-color: #ffffff;
}
.heading-class {
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: center;
  color: white;
}
.changing-head {
  font-size: 24px;
  font-weight: 500;
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 66px;
}
.otp-container {
  display: flex;
  justify-content: space-between;
  width: 200px;
}

.otp-input {
    font-size: 18px;
    text-align: center;
    border: none;
    border-radius: 4px;
    border-radius: var(--radi-mlg, 8px);
    background-color: #EFEAFF;
    width: 70px;
    height: 70px;
}
.otp-div{
    margin-top: 24px;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
}
.login-btn{
    margin-bottom: 24px;
}
@media (max-width: 1024px) {
  .carousel-section{
    display: none!important;
  }
  .center-section {
    width: 100%!important;
  }
  .login-inputs{
    justify-content: center!important;
  }
}
</style>