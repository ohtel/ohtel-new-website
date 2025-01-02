<template>
  <div class="main">
    <div class="login-inputs d-flex">
      <div
        v-if="state === 'login'"
        class="inputs col-md-6 d-flex flex-column justify-content-center align-items-center"
      >
      <LoginComponent 
      @forgot-password="handleForgotPassword"
      @login="handleLogin"
    />
      </div>
      <div
        v-if="state === 'forgotPassword'"
        class="inputs col-md-6 d-flex flex-column justify-content-center align-items-center"
      >
       <forgotPassword 
       @reset="handleResetPassword"
       />
      </div>
      <div
        v-if="state === 'resetPassword'"
        class="inputs col-md-6 d-flex flex-column justify-content-center align-items-center"
      >
        <div class="center-section">
          <h1>Reset Link sent to email!</h1>
          <p>
            A reset password link has been sent to your registered email address
            “some*****@gmail.com”
          </p>
          <!-- Login Buttons -->
          <div class="login-buttons d-flex">
            <button
              @click="stateChange('login')"
              class="btn btn-primary buttons w-100 mobile-login"
            >
              <span class="icon-space">
                <img src="../assets/images/login/smartphone.svg" alt="" />
              </span>
              Login Now
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
      </div>

      <div
        v-if="state === 'otp_section'"
        class="inputs col-md-6 d-flex flex-column justify-content-center align-items-center"
      >
      
        <div class="center-section">
          <h1>Login Via OTP</h1>
          <p>
            A reset password link has been sent to your registered email address
            “some*****@gmail.com”
          </p>
          <!-- Login Buttons -->
          <div class="otp-div d-flex">
            <input
                  v-for="(value, index) in otp"
                  :key="index"
                  type="text"
                  maxlength="1"
                  v-model="otp[index]"
                  ref="otpInput"
                  @input="moveToNext($event, index)"
                  @keydown.backspace="moveToPrev($event, index)"
                  class="otp-input"
    />
          </div>
         <div class="login-buttons d-flex">
            <button @click="backToLogin" class="btn btn-primary buttons w-100 mobile-login">
              Verify
            </button>
        </div>
          <!-- Google Login -->
          <button class="btn btn-primary google-login-button w-100">
            <span class="icon-space">
              <img src="../assets/images/login/google_image.svg" alt="" />
            </span>
            Signin Via Google
          </button>
        <!-- </div> -->
    
  </div>
      </div>
      <!-- Carousel Section -->
      <div class="carousel-section col-md-6 d-flex">
        <img :src="images[currentIndex]" alt="Carousel Image" />
        <div class="heading-class">
          <h2 class="changing-head">{{ headings[currentIndex] }}</h2>
        </div>
        <div class="carousel-dots">
          <span
            v-for="(image, index) in images"
            :key="index"
            :class="{ active: index === currentIndex }"
            class="dot"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image1 from "../assets/images/caurosel/caurosel1.svg";
import image2 from "../assets/images/caurosel/caurosel2.svg";
import image3 from "../assets/images/caurosel/caurosel1.svg";
import image4 from "../assets/images/caurosel/caurosel2.svg";
import LoginComponent from '../components/loginInitial.vue';
export default {
  components: {
    LoginComponent
  },
  data() {
    return {
      // state: "login",
      state:'login',
      images: [image1, image2, image3, image4],
      headings: [
        "",
        "From Cook to Manager, From rented space to owning a property we got your back.",
        "Jobs",
        "From Cook to Manager, From rented space to owning a property we got your back.",
      ],
      currentIndex: 0,
      otp: ['', '', '', ''] // Initial state for 4 OTP digits
    };
  },
  methods: {
    login() {
      // this.state = "otp_section"; 
    },
    backToLogin() {
      this.state = "login"; // Switch back to login view
    },
    stateChange(state) {
      this.state = state;
    },
    updateIndex() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    moveToNext(event, index) {
      // Check if input is not empty and index is not the last one
      if (event.target.value && index < 3) {
        this.$refs.otpInput[index + 1].focus(); // Move to the next input
      }
    },
    moveToPrev(event, index) {
      // Check if input is empty and index is not the first one
      if (!event.target.value && index > 0) {
        this.$refs.otpInput[index - 1].focus(); // Move to the previous input
      }
    },
    checkOTP() {
      const otpCode = this.otp.join(""); // Combine all digits
      if (otpCode.length === 4) {
        console.log("Entered OTP:", otpCode); // Handle OTP validation logic here
      }
    },
    handleForgotPassword() {
      this.state = "forgotPassword";
    },
    handleLogin({ email, password }) {
      // this.state = "otp_section";
    },
    handleResetPassword() {
      this.state = "resetPassword";
    }

  },
  mounted() {
    this.interval = setInterval(this.updateIndex, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style>
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
</style>