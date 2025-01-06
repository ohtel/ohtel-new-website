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
            <li v-if="isUserLoggedIn"><a href="#">Services</a></li>
            <li v-if="isUserLoggedIn"><a href="#">Contact</a></li>
            <li v-if="isUserLoggedIn" class="location" @click="openGoogleMap">
              <span class="location-icon">📍</span>
              <span class="location-name">{{ locationName }}</span>
            </li>
            <li v-if="!isUserLoggedIn">
              <button class="login-button" @click="handleLogin">Login</button>
            </li>
          </ul>
        </nav>
      </div>
      <div v-if="showMap" class="map-modal">
        <div class="map-popup">
          <span class="close-icon" @click="closeGoogleMap">✖</span>
          <google-map ref="googleMapComponent" @mapEvent="handleMapEvent" :mapCenter="mapCenter"></google-map>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import googleMap from '../components/googleMap.vue';
  
  export default {
    components: {
      googleMap,
    },
    setup() {
      const router = useRouter();
      // Create a reactive variable to hold the user info
      const userInfo = ref(null);
      const locationName = ref('Fetching location...');
      const showMap = ref(false);
      const mapCenter = ref(null);
  
      // Computed property to check if the user is logged in
      const isUserLoggedIn = computed(() => {
        const accessToken = localStorage.getItem('accessToken');
        return  !!accessToken;
      });
  
      // Method to handle login button click
      const handleLogin = () => {
        // Redirect to login page
        router.push('/login');
      };
  
      // Method to fetch location using Google Maps API
      const fetchLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = "AIzaSyBsG-EGz_k6QKG0eAHN03mtKQQKVMKmCq0";
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              const addressComponents = data.results[0].address_components;
              const cityComponent = addressComponents.find(component =>
                component.types.includes('locality')
              );
              locationName.value = cityComponent ? cityComponent.long_name : 'Location not found';
              mapCenter.value = { lat: latitude, lng: longitude };
            } else {
              locationName.value = 'Location not found';
            }
          });
        } else {
          locationName.value = 'Geolocation is not supported by this browser.';
        }
      };
  
      // Method to open Google Map popup
      const openGoogleMap = () => {
        showMap.value = true;
        if (mapCenter.value) {
          // If mapCenter is already set, use it to center the map
          const googleMapComponent = this.$refs.googleMapComponent;
          googleMapComponent.setLocation(mapCenter.value.lat, mapCenter.value.lng);
        }
      };
  
      // Method to close Google Map popup
      const closeGoogleMap = () => {
        showMap.value = false;
      };
  
      // Method to handle map events
      const handleMapEvent = (eventData) => {
        if (eventData.mapClosed) {
          showMap.value = false;
        }
        if (eventData.address) {
          locationName.value = eventData.address.split(',')[1].trim(); // Extract city name
          mapCenter.value = eventData.locationInformation;
        }
      };
  
      // Ensure localStorage is accessed only on the client side
      onMounted(() => {
        const storedUserInfo = localStorage.getItem('user-info');
        if (storedUserInfo) {
          userInfo.value = JSON.parse(storedUserInfo);
        }
        fetchLocation();
      });
  
      return {
        userInfo,
        isUserLoggedIn,
        handleLogin,
        locationName,
        showMap,
        openGoogleMap,
        closeGoogleMap,
        handleMapEvent,
        mapCenter,
      };
    },
  };
  </script>
  
  <style scoped>
  .header-main {
    display: flex;
    justify-content: space-between; /* Align items to the edges */
    align-items: center; /* Vertically center items */
    padding-left: 75px;
    padding-right: 75px;
    height: 157px;
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
    cursor: pointer; /* Change cursor to pointer */
  }
  
  .location-icon {
    margin-right: 5px; /* Space between icon and name */
  }
  
  .login-button {
    background-color: #ffffff; /* Set button background color */
    cursor: pointer; /* Change cursor on hover */
    border: 1px solid #9a1f6b; /* Add a border */
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
  
  .map-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .map-popup {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    position: relative;
  }
  
  .close-icon {
    position: absolute;
    top: 0px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    z-index: 1;
  }
  
  .styled-input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  @media (max-width: 1200px) {
    .header-main {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  </style>
