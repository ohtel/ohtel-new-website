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
          type="email"
          class="password-input form-control"
          v-model="email"
          :placeholder="loginState === 'mobile' ? 'Enter Mobile Number or Email' : 'Enter Email Address'"
        />
        <!-- <small v-if="emailError" class="text-danger">{{ emailError }}</small> -->
      </div>

      <!-- Password Input with Icon -->
      <div class="input-group w-100 position-relative">
        <span class="input-icon">
          <img src="../assets/images/login/password_icon.svg" alt="Password Icon" />
        </span>
        <input
          type="password"
          class="password-input form-control"
          v-model="password"
          placeholder="Enter Password"
        />
        <!-- <small v-if="passwordError" class="text-danger">{{ passwordError }}</small> -->
      </div>

      <!-- Remember Me and Forgot Password -->
      <div class="sub-options d-flex justify-content-between">
        <!-- <div>
          <input class="form-check-input" type="checkbox" id="flexCheckDefault" />
          <label class="pl-1 form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div> -->
        <div>
          <!-- <a class="forgot-password" @click="emitForgotPassword">Forgot Password?</a> -->
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

<script setup>
import { useAuthStore } from '../store'
import { ref } from 'vue'
import axios from 'axios'
import { BASE_URL, ENDPOINTS } from '../environment.js'; 
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const loginState = ref('mobile')
const emailError = ref('')
const passwordError = ref('')
const loginError = ref('')
const router = useRouter()

const emit = defineEmits(['login', 'login-failed', 'forgot-password'])

const emitForgotPassword = () => {
  emit('forgot-password')
}

const validateInputs = () => {
  emailError.value = ''
  passwordError.value = ''
  loginError.value = ''

  if (!email.value) {
    emailError.value = 'Email or Mobile Number is required.'
  } else if (loginState.value === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
  }

  if (!password.value) {
    passwordError.value = 'Password is required.'
  }

  return !emailError.value && !passwordError.value
}

const emitLogin = async () => {
  if (!validateInputs()) {
    loginError.value = emailError.value || passwordError.value
    return
  }

  try {
    const response = await axios.post(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
      identifier: email.value,
      // phone: email.value,
      password: password.value,
    })

    console.log('Login successful:', response.data?.result)
    localStorage.setItem('accessToken', response.data.result.token)
    emit('login', {
      email: email.value,
      password: password.value,
      response: response.data,
    })
    const userConfig = {
          name: response.data?.result.user.name || "Unknown User",
          profilePhoto: response.data?.result.user.profilePhoto || "https://via.placeholder.com/150",
          email: response.data?.result.user.email || "No Email Provided",
          phone: response.data?.result.data?.user.phone || "No Phone Provided",
          id: response.data?.result.user.id
        };

        // Store user config in localStorage
    localStorage.setItem("user_config", JSON.stringify(userConfig));
    localStorage.setItem("justLoggedIn", "true");
    router.push('/dashboard')
  } catch (error) {
    if (error.response && error.response.status !== 200) {
      loginError.value = error.response.data.detail || 'Invalid Email or Phone'
    } else {
      loginError.value = error.message || 'An unknown error occurred.'
    }
    emit('login-failed', loginError.value)
  }
}

const loginStatusChange = () => {
  loginState.value = loginState.value === 'mobile' ? 'email' : 'mobile'
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    console.log('Current Access Token:', accessToken)
  } else {
    console.error('Access token is undefined or empty')
  }
}
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