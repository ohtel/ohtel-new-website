<template>
  <div>
    <NuxtLayout></NuxtLayout>
    <div class="page-container">
      <h1 class="heading-title">
  <span class="animated-text">🏠 Home Dashboard</span>
</h1>

<div v-if="showWelcomePopup" class="welcome-popup">
  <div class="popup-content">
    <!-- Display user profile photo -->
    <img
      :src="user.profilePhoto"
      alt="Profile Photo"
      class="profile-photo"
    />
    <!-- Welcome heading with the user's name -->
    <h2>Hi, {{ user.name }}!</h2>
    <!-- Admin-specific welcome message -->
    <p>
      Welcome to the Ohtel Admin Panel! Use your dashboard to manage listings, 
      monitor activities, and create meaningful opportunities for our users.
    </p>
    <!-- Close button to dismiss the popup -->
    <button @click="closePopup" class="close-button">Close</button>
  </div>
</div>

      <!-- Show loader while data is loading -->
      <div v-if="isLoading" class="loader-container">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Show dashboard when data is loaded -->
      <div v-else class="dashboard">
  <div
    v-for="item in dashboardData"
    :key="item.title"
    class="dashboard-card"
    @click="navigateTo(item.title)"
  >
    <div class="card-icon">
      <i :class="item.icon"></i>
    </div>
    <h3>{{ item.title }}</h3>
    <p>{{ item.count }}</p>
  </div>
</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../environment.js";

export default {
  data() {
    return {
      dashboardData: [], // Store the API response
      isLoading: true, // Loader state
      showWelcomePopup: false, // State for welcome popup
      user: {},
    };
  },
  mounted() {
    this.checkLoginStatus();
    this.fetchDashboardData();
  },
  methods: {
    navigateTo(title) {
      const routes = {
        "Total Users": "/dashboard/views/users",
        "Sub-Categories": "/dashboard/views/sub_category",
        "Total Active Ads": "/dashboard/views/post",
      };
      const route = routes[title];
      if (route) {
        this.$router.push(route);
      } else {
        console.error("No route defined for this title:", title);
      }
    },
    async fetchDashboardData() {
      try {
        this.isLoading = true; // Start the loader
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("No access token found");
        }

        const response = await axios.get(`${BASE_URL}${ENDPOINTS.DASHBOARD}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Add placeholder icons for testing
        this.dashboardData = response.data.result.map((item, index) => ({
          ...item,
          icon: this.getIcon(index),
        }));
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        this.isLoading = false; // Stop the loader
      }
    },
    getIcon(index) {
      const icons = [
        "fas fa-users",
        "fas fa-chart-bar",
        "fas fa-store",
        "fas fa-tasks",
      ];
      return icons[index % icons.length];
    },
    checkLoginStatus() {
  const justLoggedIn = localStorage.getItem("justLoggedIn");
  
  // Parse user_config from localStorage
  const userConfig = localStorage.getItem("user_config");
  if (userConfig) {
    this.user = JSON.parse(userConfig); // Convert JSON string to object
  }

  console.log(this.user); // Ensure it's an object and has the expected properties
  
  if (justLoggedIn === "true") {
    setTimeout(() => {
      this.showWelcomePopup = true; // Show the popup with a delay
    }, 1000); // 1 second delay for animation/effect
    localStorage.setItem("justLoggedIn", "false"); // Reset the flag
  }
},
    closePopup() {
      this.showWelcomePopup = false;
    },
  },
};
</script>

<style scoped>
.page-container {
  flex-grow: 1;
  padding: 20px;
  margin-left: 240px;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); /* Larger cards */
  gap: 30px; /* Spacing between cards */
  margin-top: 20px;
}

.dashboard-card {
  background: linear-gradient(
    135deg,
    #47509b,
    #d55fa7
  ); /* Gradient background */
  color: white;
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-10px); /* Lift effect on hover */
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
}

.card-icon {
  font-size: 3em;
  margin-bottom: 15px;
  animation: fadeIn 1s ease-in-out;
}

.dashboard-card h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.dashboard-card p {
  font-size: 2.5em;
  font-weight: bold;
}
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Set a fixed height to prevent layout shift */
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
/* Main popup container */
.welcome-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Dark transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease-in-out; /* Fade-in animation */
}

/* Popup content styling */
.popup-content {
  background: #ffffff; /* White background */
  padding: 40px 30px;
  border-radius: 12px; /* Rounded corners */
  text-align: center;
  width: 380px; /* Fixed width */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Soft shadow */
  animation: scaleUp 0.3s ease-out; /* Scale-up effect */
}

/* Profile photo style */
.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid #5213a2; /* Border around profile photo */
}

/* Welcome heading */
.popup-content h2 {
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;
}

/* Admin message styling */
.popup-content p {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 30px;
  font-family: 'Open Sans', sans-serif;
}

/* Close button styling */
.close-button {
  background-color: #a20584;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.3s ease;
}

/* Close button hover effect */
.close-button:hover {
  background-color: #47509B; /* Darker purple */
}

/* Fade-in animation for the popup */
@keyframes fadeIn {
  0% {
    opacity: 0;
   }
  100% {
    opacity: 1;
  }
}

/* Scale-up animation for the popup content */
@keyframes scaleUp {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>