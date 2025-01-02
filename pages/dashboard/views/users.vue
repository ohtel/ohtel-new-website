<template>
  <div>
    <NuxtLayout></NuxtLayout>
    <Toaster ref="toaster" />
    <div class="page-container">
      <h1 class="heading-title">
        <span class="animated-text">👥 User Profile List</span>
      </h1>

      <!-- Search and Filter Controls -->
      <div class="search-filter">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          placeholder="Search users using name, email, phone..."
          class="search-input"
        />
        <select class="select-filter" v-model="filterOption" @change="fetchUserData">
          <option value="">All</option>
          <option value="oldtonew">Old to New</option>
          <option value="newtoold">New to Old</option>
        </select>
      </div>
        <!-- Show loader while data is loading -->
  <div v-if="isLoading" class="loader-container">
        <div class="spinner-border " role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <table v-if="!isLoading"  class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.full_name }}</td>
            <td>{{ user.email || "N/A" }}</td>
            <td>{{ user.phone || "N/A" }}</td>
            <td>{{ user.created_at }}</td>

            <td>
              <div
                @click="showOptions(user.id, $event)"
                class="options-button d-flex"
              >
                <div @click="openEditModal(user)">
                  <i class="fas fa-edit"></i>
                </div>
                <div @click="openDeleteModal(user)">
                  <i class="fas fa-trash-alt"></i>
                </div>
                <div >
                  <button  @click="navigateToUserAds(user.id,user.full_name)" class="view-button">User Ads</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

   <!-- Edit Modal -->
   <div v-if="editModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Edit User</h2>

        <div class="input-group">
          <label for="name">Full Name:</label>
          <input
            id="name"
            v-model="selectedUser.full_name"
            class="styled-input"
          />
        </div>

        <div class="input-group">
          <label for="email">Email:</label>
          <input id="email" v-model="selectedUser.email" class="styled-input" />
        </div>

        <div class="input-group">
          <label for="phone">Phone:</label>
          <input id="phone" v-model="selectedUser.phone" class="styled-input" />
        </div>

        <div class="modal-buttons">
          <button class="save-button" @click="saveEdit">Save</button>
          <button class="close-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="viewModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">View User</h2>
        <p><strong>Full Name:</strong> {{ selectedUser.full_name }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email || "N/A" }}</p>
        <p><strong>Phone:</strong> {{ selectedUser.phone || "N/A" }}</p>

        <button class="close-button" @click="closeModal">Close</button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Delete User</h2>
        <p>
          Are you sure you want to delete
          <strong>{{ selectedUser.full_name }}</strong
          >?
        </p>

        <div class="modal-buttons">
          <button class="save-button" @click="confirmDelete">
            Yes, Delete
          </button>
          <button class="close-button" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../environment.js";
import Toaster from "~/components/Toaster.vue";

export default {
  components: { Toaster },
  layout: "default",
  data() {
    return {
      users: [],
      searchQuery: "",
      filterOption: "",
      typingTimer: null,
      selectedUser: null,
      editModalVisible: false,
      viewModalVisible: false,
      deleteModalVisible: false,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchUserData();
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    navigateToUserAds(user_id,name) {
      const userId = 123; // Replace with the dynamic user ID
      this.$router.push(`/dashboard/views/post?user_id=${user_id}&name=${name}`);
    },
    async fetchUserData() {
      this.isLoading = true; // Start the loader
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${BASE_URL}${ENDPOINTS.USERS}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              search: this.searchQuery,
              filter: this.filterOption,
              page: 1,
            },
          }
        );
        this.users = response.data.result.data;
        this.isLoading = false; // Stop the loader
      } catch (error) {
        this.isLoading = false; // Stop the loader
        console.error("Failed to fetch user data", error);
      }
    },
    handleSearch() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.fetchUserData();
      }, 500); // Set debounce delay in ms
    },
    showOptions(userId, event) {
      event.stopPropagation();
      this.optionsVisible = this.optionsVisible === userId ? null : userId;
    },
    handleOutsideClick(event) {
      if (
        !event.target.closest(".options-menu") &&
        !event.target.closest(".options-button")
      ) {
        this.optionsVisible = null;
      }
    },
    openEditModal(user) {
      this.selectedUser = { ...user };
      this.editModalVisible = true;
    },
    openViewModal(user) {
      this.selectedUser = { ...user };
      this.viewModalVisible = true;
    },
    openDeleteModal(user) {
      this.selectedUser = { ...user };
      this.deleteModalVisible = true;
    },
    async saveEdit() {
      const token = localStorage.getItem("accessToken");
      const payload = {
        email: this.selectedUser.email,
        name: this.selectedUser.full_name,
        phone: this.selectedUser.phone,
      };

      try {
        // Send updated user data via API
        const response = await axios.put(
          `${BASE_URL}${ENDPOINTS.USER_UPDATE}?user=${this.selectedUser.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log success and possibly refresh user data or update UI
        this.$refs.toaster.showToast(`User Edited successfully`, "success");
        this.fetchUserData(); // Refresh user list if necessary
        this.closeModal(); // Close the modal after successful save
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async confirmDelete() {
      const token = localStorage.getItem("accessToken");
      try {
        // Send delete request for the selected user
        const response = await axios.delete(
          `${BASE_URL}${ENDPOINTS.USER_UPDATE}?user=${this.selectedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.$refs.toaster.showToast(
          `User deleted successfully: ${this.selectedUser.full_name}`,
          "success"
        );
        // Log successful deletion and refresh user list or update UI
        console.log("User deleted successfully", response.data);
        this.fetchUserData(); // Refresh user list if needed
        this.closeModal(); // Close the modal after deleting
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    closeModal() {
      this.editModalVisible = false;
      this.viewModalVisible = false;
      this.deleteModalVisible = false;
    },
  },
};
</script>

<style scoped>
.page-container {
  flex-grow: 1;
  padding: 20px;
  margin-left: 240px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.user-table th {
  background-color: #f2f2f2;
}

.options-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.options-menu button {
  display: block;
  width: 100%;
  padding: 8px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
}

.options-menu button:hover {
  background-color: #f0f0f0;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  color: white;
  cursor: pointer;
}

.options-button {
  justify-content: space-around;
}
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Slight transparency */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 90%;
  text-align: center;
}

/* Modal Title */
.modal-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* Input Group */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}

/* Labels */
.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

/* Styled Input Fields */
.styled-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.styled-input:focus {
  border-color: #007bff;
}

/* Buttons */
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button,
.close-button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.save-button {
  background-color: #47509b;
}
.close-button {
  background-color: #a20584;
}
/* Additional Styles for Search and Filter */
.search-filter {
  outline: none; 
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  outline-color: #47509B; 
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 350px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

}
.select-filter{
  width: 170px;
  outline-color: #47509B;
}
.user-table th,
.user-table td {
  padding: 8px; /* Reduce padding */
  font-size: 12px; /* Smaller text */
}
.user-table th {
  font-size: 13px; /* Slightly larger for headers */
}
</style>