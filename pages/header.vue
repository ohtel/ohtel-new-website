<template>
    <div class="header-main">
      <img
        src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/ohtel_logo.svg"
        alt="Ohtel Logo"
        class="logo"
      />
      <div class="right-menu">
        <nav>
          <ul class="nav-list">
            <!-- Conditionally render links based on user info in localStorage -->
            <li v-if="isUserLoggedIn"><a href="#">Home</a></li>
            <li v-if="isUserLoggedIn"><a href="#">About</a></li>
            <li v-if="isUserLoggedIn" class="location">
              <span class="location-icon">📍</span>
              <span class="location-name">Location Name</span>
            </li>
            <li>
              <!-- <button class="login-button" @click="handleLogin">Login</button> -->
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  // Create a reactive variable to hold the user info
  const userInfo = ref(null);
  
  // Computed property to check if the user is logged in
  const isUserLoggedIn = computed(() => !!userInfo.value);
  
  // Method to handle login button click
  const handleLogin = () => {
    // Redirect to login page
   router.push('/login');
  };
  
  // Ensure localStorage is accessed only on the client side
  onMounted(() => {
    const storedUserInfo = localStorage.getItem('user-info');
    if (storedUserInfo) {
      userInfo.value = JSON.parse(storedUserInfo);
    }
  });
  </script>
  
  <style scoped>
  .header-main {
    display: flex;
    justify-content: space-between; /* Align items to the edges */
    align-items: center; /* Vertically center items */
    padding-left: 20px;
    padding-right: 75px;
    border-bottom: 1px solid #d0c7c7;
    position: relative;
    z-index: 1;
    height: 70px;
  }
  
  .logo {
    max-height: 100%; /* Ensure the logo fits within the header */
  }
  
  .right-menu {
    display: flex; /* Enable flexbox for the right menu */
  }
  
  .nav-list {
    list-style-type: none; /* Remove default list styling */
    display: flex; /* Use flexbox for horizontal alignment */
    gap: 20px; /* Space between menu items */
  }
  
  .nav-list li {
    display: flex; /* Center items vertically */
    align-items: center; /* Center items vertically */
  }
  
  .nav-list a {
    text-decoration: none; /* Remove underline from links */
    color: #000; /* Set link color */
    font-weight: bold; /* Bold links */
  }
  
  .location {
    display: flex; /* Align location icon and name in a row */
    align-items: center; /* Center vertically */
  }
  
  .location-icon {
    margin-right: 5px; /* Space between icon and name */
  }
  
  .login-button {
    background-color: #ffffff; /* Set button background color */
    cursor: pointer; /* Change cursor on hover */
    border: none; /* Add a border */
    color: #47509B; /* Set button text color */
    border-radius: 12px;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    width: 215px;
    height: 72px;
  }
  
  .login-button:hover {
    background-color: #9a1f6b; /* Darker shade on hover */
    color: #ffffff;
  }
  
  @media (max-width: 1200px) {
    .header-main {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  </style>