<template>
  <div>
    <NuxtLayout></NuxtLayout>
    <div class="page-container">
      <h1>Notification List</h1>

      <!-- Notification Table -->
      <table class="notification-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Action Type</th>
            <th>Full Name</th>
            <th>Add ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="notifications.length === 0">
            <td colspan="5" class="empty-state text-center">No data available.</td>
          </tr>
          <tr v-for="notification in notifications" :key="notification.id">
            <td>{{ notification.id }}</td>
            <td>{{ formatDate(notification.created_at) }}</td>
            <td>{{ notification.action_type }}</td>
            <td>{{ notification.full_name }}</td>
            <td>{{ notification.affected_resource  }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from "../environment.js";
export default {
  data() {
    return {
      notifications: [], // Store API data here
    };
  },
  created() {
    this.fetchNotifications(); // Fetch data when component is created
  },
  methods: {
    async fetchNotifications() {
      const token = localStorage.getItem("accessToken"); // Get access token from local storage

      try {
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.NOTIFICATION}?page=1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Set notifications data from API response
        this.notifications = response.data.results;
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    },

    // Optional: Format the date if needed
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>
<style>
.page-container {
  padding: 20px;
  margin-left: 240px;
}

.notification-table {
  width: 100%;
  border-collapse: collapse;
}

.notification-table th, 
.notification-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.notification-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.notification-table tr:hover {
  background-color: #f5f5f5;
}
</style>