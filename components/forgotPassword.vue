<template>
   <div class="center-section">
          <h1>Forgot Password</h1>
          <p>Welcome Back ! Sign in to continue</p>

          <!-- Email Input with Icon -->
          <div class="input-group mb-3 w-100 position-relative">
            <span class="input-icon">
              <img
                src="../assets/images/login/email_icon.svg"
                alt="Email Icon"
              />
            </span>
            <input
              type="email"
              class="password-input form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email Address"
            />
          </div>

          <!-- Login Buttons -->
          <div class="login-buttons d-flex">
            <button
              @click="emitReset()"
              class="btn btn-primary buttons w-100 mobile-login"
            >
              <span class="icon-space">
                <img src="../assets/images/login/smartphone.svg" alt="" />
              </span>
              Reset Password
            </button>
          </div>

          <!-- Google Login -->
          <button class="btn btn-primary google-login-button w-100">
            <span class="icon-space">
              <img src="../assets/images/login/google_image.svg" alt="" />
            </span>
            Signin Via Google
          </button>
        </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      emitReset() {
        this.$emit('Reset');
      },
      emitLogin() {
        this.$emit('login', {
          email: this.email,
          password: this.password
        });
      }
    }
  };
  </script>

<style>

</style>