<template>
  <div>
    <div class="header-main">
      <img
        src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/ohtel_logo.svg"
        alt="Ohtel Logo"
        class="logo"
      />
      <div class="right-menu">
        <nav>
          <button class="menu-toggle" @click="toggleMobileMenu">
            ☰
          </button>
          <ul class="nav-list">
            <!-- Conditionally render links based on user info in localStorage -->
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/main-dashboard')}" class="nav-title" @click="navigateTo('/main-dashboard')">Home</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/main-dashboard/about')}" class="nav-title" @click="navigateTo('/main-dashboard/about')">About</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/main-dashboard/contact_us')}" class="nav-title" @click="navigateTo('/main-dashboard/contact_us')">Contact Us</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/main-dashboard/blogs')}" class="nav-title" @click="navigateTo('/main-dashboard/blogs')">Blogs</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/view-ads')}" class="nav-title"  @click="navigateTo('/view-ads')">View Ads</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/profile')}" class="nav-title"  @click="navigateTo('/profile')">Profile</a></li>
            <li v-if="isUserLoggedIn" class="location" @click="openGoogleMap">
              <span class="location-icon"><img src="/assets/images/location-icon.svg" alt=""></span>
              <span class="location-name nav-title">{{ locationName }}</span>
            </li>
            <li v-if="isUserLoggedIn">
              <button class="login-button" @click="postAds()">Post Ad </button>
            </li>
            <li v-if="isUserLoggedIn && isGuestUser">
              <button class="login-outline-button" @click="navigateToLogin()">Login</button>
            </li>
            <li v-if="isUserLoggedIn && !isGuestUser">
              <button class="login-outline-button" @click="logout()">Logout</button>
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
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <ul class="mobile-nav-list">
        <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/main-dashboard')}" class="nav-title" @click="navigateTo('/main-dashboard')">Home</a></li>
        <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/main-dashboard/about')}" class="nav-title" @click="navigateTo('/main-dashboard/about')">About</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/main-dashboard/contact_us')}" class="nav-title" @click="navigateTo('/main-dashboard/contact_us')">Contact Us</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/main-dashboard/blogs')}" class="nav-title" @click="navigateTo('/main-dashboard/blogs')">Blogs</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/view-ads')}" class="nav-title"  @click="navigateTo('/view-ads')">View Ads</a></li>
            <li v-if="isUserLoggedIn"><a :class="{'active': isActiveRoute('/profile')}" class="nav-title"  @click="navigateTo('/profile')">Profile</a></li>
        <li v-if="isUserLoggedIn" class="location" @click="openGoogleMap">
          <span class="location-icon"><img src="/assets/images/location-icon.svg" alt=""></span>
          <span class="location-name nav-title">{{ locationName }}</span>
        </li>
        <li v-if="isUserLoggedIn">
          <button class="login-button" @click="postAds">Post Ad </button>
        </li>
        <li v-if="isUserLoggedIn && isGuestUser">
          <button class="login-outline-button" @click="navigateToLogin()">Login</button>
        </li>
        <li v-if="isUserLoggedIn && !isGuestUser">
          <button class="login-outline-button" @click="logout()">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import googleMap from '../components/googleMap.vue';
  
  export default {
    components: {
      googleMap,
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      // Create a reactive variable to hold the user info
      const userInfo = ref(null);
      const locationName = ref('Fetching location...');
      const showMap = ref(false);
      const mapCenter = ref(null);
      const isMobileMenuOpen = ref(false);
      const locationFetched = ref(false);
  
      // Computed property to check if the user is logged in
      const isUserLoggedIn = computed(() => {
        const accessToken = localStorage.getItem('accessToken');
        return  !!accessToken;
      });
  
      // Computed property to check if the user is a guest user
      const isGuestUser = computed(() => {
        const user = localStorage.getItem('user');
        return user && user.includes('GUEST_USER');
      });
  
      // Method to handle login button click
      const handleLogin = () => {
        // Redirect to login page
        // router.push('/login');
      };
     const postAds=()=>{
       router.push('/post-ad');
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
              locationFetched.value = true;
              localStorage.setItem('locationName', locationName.value);
              localStorage.setItem('mapCenter', JSON.stringify(mapCenter.value));
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
          localStorage.setItem('locationName', locationName.value);
          localStorage.setItem('mapCenter', JSON.stringify(mapCenter.value));
        }
      };
  
      // Method to toggle mobile menu
      const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value;
      };
  
      // Method to close mobile menu
      const closeMobileMenu = () => {
        isMobileMenuOpen.value = false;
      };
  
      // Method to check if the current route matches the given path
      const isActiveRoute = (path) => {
        return route.path === path;
      };
  
      // Method to navigate to a specific route
      const navigateTo = (path) => {
        const storedMapCenter = JSON.parse(sessionStorage.getItem('mapCenter'));
        const storedLocationName = sessionStorage.getItem('locationName');

        // Check if location data is already available
        if (!storedMapCenter || !storedLocationName) {
          fetchLocation(); // Fetch location if not available
        }

        router.push(path);
        closeMobileMenu();
      };
  
      // Method to handle login button click
      const navigateToLogin = () => {
        window.location.href = '/';
      };
  
      // Method to handle logout
      const logout = () => {
        localStorage.clear();
        window.location.href = '/';
      };
  
      // Ensure localStorage is accessed only on the client side
      onMounted(() => {
        // Clear location data from localStorage on refresh
        const clearLocationData = () => {
          localStorage.removeItem('mapCenter');
          localStorage.removeItem('locationName');
        };

        // Add event listener for beforeunload to clear local storage
        window.addEventListener('beforeunload', clearLocationData);

        const storedUserInfo = localStorage.getItem('user-info');
        if (storedUserInfo) {
          userInfo.value = JSON.parse(storedUserInfo);
        }
        const storedLocationName = localStorage.getItem('locationName');
        const storedMapCenter = localStorage.getItem('mapCenter');
        if (storedLocationName && storedMapCenter) {
          locationName.value = storedLocationName;
          mapCenter.value = JSON.parse(storedMapCenter);
        } else {
          fetchLocation(); // Fetch location if not available in local storage
        }

        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('beforeunload', clearLocationData);
        };
      });
  
      return {
        userInfo,
        isUserLoggedIn,
        isGuestUser,
        handleLogin,
        postAds,
        navigateToLogin,
        logout,
        locationName,
        showMap,
        openGoogleMap,
        closeGoogleMap,
        handleMapEvent,
        mapCenter,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        isActiveRoute,
        navigateTo,
      };
    },
  };
  </script>
  
  <style scoped>
  .header-main {
    border-bottom: 0.5px solid #d8cece;
    padding: 20px 2%;
    display: flex;
    justify-content: space-between; /* Align items to the edges */
    align-items: center; /* Vertically center items */
  }
  
  .logo {
    max-height: 100%; /* Ensure the logo fits within the header */
  }
  
  .right-menu {
    display: flex; /* Enable flexbox for the right menu */
  }
  
  .nav-list {
    margin-bottom: 0px;
    list-style-type: none; /* Remove default list styling */
    display: flex; /* Use flexbox for horizontal alignment */
    gap: 20px; /* Space between menu items */
  }
  
  .nav-list-mobile {
    display: none;
  }
  
  .nav-list li {
    display: flex; /* Center items vertically */
    align-items: center; /* Center items vertically */
  }
  
  .nav-title{
    text-decoration: none; /* Remove underline from links */
    color: var(--Neutral-800, #170F49);
    text-align: center;
    font-family: Raleway;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .nav-title.active {
    color: #A20584; 
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
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
    padding: 9px 35px;
    font-size: 20px;
    font-weight: 600;
    flex: 1 0 0;
    color: #fff;
    border: none;
    align-self: stretch;
    border-radius: 12px;
    background: linear-gradient(180deg, #47509B 0%, #A20584 100%);
  }
  
  .login-button:hover {
    background-color: #9a1f6b; /* Darker shade on hover */
    color: #ffffff;
  }
  
  .login-outline-button {
    padding: 9px 35px;
    font-size: 20px;
    font-weight: 600;
    flex: 1 0 0;
    color: #A20584;
    background-color: transparent;
    border: 2px solid #A20584;
    align-self: stretch;
    border-radius: 12px;
    margin-left: 10px;
  }
  
  .login-outline-button:hover {
    background-color: rgba(162, 5, 132, 0.1);
  }
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
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
    /* max-width: 600px; */
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
  
  .mobile-menu {
    display: none;
  }
  
  .mobile-nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    align-items: center;
  }
  
  .mobile-nav-list li {
    display: flex;
    align-items: center;
  }
  
  @media (max-width: 1024px) {
    .header-main {
      padding: 10px;
    }
  
    .nav-list {
      display: none;
    }
  
    .nav-list-mobile {
      display: flex;
    }
  
    .menu-toggle {
      display: block;
    }
  
    .mobile-menu {
      display: block;
    }
  }
  </style>
