<template>
  <div>
    <NuxtLayout></NuxtLayout>
    <div class="page-container">
      <h1 class="heading-title">
        <span class="animated-text">📜 Subscription Plans</span>
      </h1>

      <!-- Filter Dropdown -->
      <div class="filter-container d-flex">
        <div class="d-flex">
          <label class="form-label" for="categoryFilter">Filter by Category: &nbsp;</label>
          <select class="form-select" v-model="selectedCategory" @change="filterSubscriptions">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.category_title">
              {{ category.category_title }}
            </option>
          </select>
        </div>
        <div>
          <button class="add-category-button save-button" @click="openAddModal">Add Subscription Plan</button>
        </div>
      </div>

      <!-- Subscription Plans Table -->
      <table v-if="subscriptions.length" class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Plan Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount Price</th>
            <th>Validity Days</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subscription, index) in filteredSubscriptions" :key="index">
            <td>{{ subscription.id }}</td>
            <td>{{ subscription.plan_name }}</td>
            <td>{{ subscription.category_title }}</td>
            <td>{{ subscription.plan_price }}</td>
            <td>{{ subscription.discount_price }}</td>
            <td>{{ subscription.validity_days }}</td>
            <td>{{ subscription.plan_description }}</td>
            <td class="d-flex">
              <div @click="viewSubscription(subscription)"><i class="fas fa-eye"></i></div>
              <div class="view-btn" @click="openEditModal(subscription)"><i class="fas fa-edit"></i></div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No subscription plans available.</p>

      <!-- View Modal -->
      <div v-if="showViewModal" class="modal">
        <div class="modal-content">
          <h2>Subscription Preview</h2>
          <p><strong>ID:</strong> {{ currentSubscription.id }}</p>
          <p><strong>Plan Name:</strong> {{ currentSubscription.plan_name }}</p>
          <p><strong>Category:</strong> {{ currentSubscription.category_title }}</p>
          <p><strong>Price:</strong> {{ currentSubscription.plan_price }}</p>
          <p><strong>Discount Price:</strong> {{ currentSubscription.discount_price }}</p>
          <p><strong>Validity Days:</strong> {{ currentSubscription.validity_days }}</p>
          <p><strong>Description:</strong> {{ currentSubscription.plan_description }}</p>
          <button class="close-button" @click="showViewModal = false">Close</button>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showEditModal || showAddModal" class="modal modal-overlay">
        <div class="modal-content">
          <h2>{{ isEditMode ? 'Edit Subscription' : 'Add Subscription Plan' }}</h2>
          <div class="input-group">
            <label>Plan Name:</label>
            <input class="styled-input" v-model="currentSubscription.plan_name" placeholder="Enter plan name" />
          </div>
          <div class="input-group">
            <label>Category:</label>
            <select class="styled-input" v-model="currentSubscription.category_title">
              <option value="">Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.category_title">
                {{ category.category_title }}
              </option>
            </select>
          </div>
          <div class="input-group">
            <label>Price:</label>
            <input class="styled-input" v-model="currentSubscription.plan_price" type="number" placeholder="Enter price" />
          </div>
          <div class="input-group">
            <label>Discount Price:</label>
            <input class="styled-input" v-model="currentSubscription.discount_price" type="number" placeholder="Enter discount price" />
          </div>
          <div class="input-group">
            <label>Validity Days:</label>
            <input class="styled-input" v-model="currentSubscription.validity_days" type="number" placeholder="Enter validity days" />
          </div>
          <div class="input-group">
            <label>Description:</label>
            <textarea class="styled-input" v-model="currentSubscription.plan_description" placeholder="Enter description"></textarea>
          </div>

          <div class="modal-buttons">
            <button class="save-button" @click="isEditMode ? updateSubscription() : addSubscription()">
              {{ isEditMode ? 'Save Changes' : 'Add Plan' }}
            </button>
            <button class="close-button" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from "../environment.js";
export default {
  layout: "default",
  data() {
    return {
      subscriptions: [],
      categories: [],
      selectedCategory: "",
      filteredSubscriptions: [],
      showViewModal: false,
      showEditModal: false,
      showAddModal: false,
      isEditMode: false,
      currentSubscription: {},
    };
  },
  async mounted() {
    await this.fetchCategories();
    await this.fetchSubscriptions();
  },
  methods: {
    async fetchSubscriptions() {
   

      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${BASE_URL}${ENDPOINTS.SUBSCRIPITON_LIST}?page=1`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        this.subscriptions = response.data.results;
        this.filteredSubscriptions = this.subscriptions;
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    },
    async fetchCategories() {
      // Fetch categories logic here
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.CATEGORY}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          });
        this.categories = response.data.result;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    filterSubscriptions() {
      // Filter logic here
      this.filteredSubscriptions = this.selectedCategory
        ? this.subscriptions.filter(
            (sub) => sub.category_title === this.selectedCategory
          )
        : this.subscriptions;
    },
    viewSubscription(subscription) {
      this.currentSubscription = subscription;
      this.showViewModal = true;
    },
    openAddModal() {
      this.currentSubscription = {};
      this.isEditMode = false;
      this.showAddModal = true;
    },
    openEditModal(subscription) {
      this.currentSubscription = { ...subscription };
      this.isEditMode = true;
      this.showEditModal = true;
    },
    closeModal() {
      this.showEditModal = false;
      this.showAddModal = false;
      this.showViewModal = false;
    },
    async updateSubscription() {
      // Update logic here
      const payload = {
      main_category: this.currentSubscription.id,
      plan_description: this.currentSubscription.plan_description,
      plan_name: this.currentSubscription.plan_name,
      plan_price: this.currentSubscription.plan_price,
      validity_days: this.currentSubscription.validity_days,
    };
      try {
        const token = localStorage.getItem("accessToken");
        await axios.put(
          `${BASE_URL}${ENDPOINTS.EDITSUBSCRIPTION}${this.currentSubscription.id}/`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        this.showEditModal = false;
        await this.fetchSubscriptions(); // Refresh data
      } catch (error) {
        console.error("Error updating subscription:", error);
      }
    },
    async addSubscription() {
      // Add subscription logic here
    },
  },
};
</script>
<style>
.page-container {
  padding: 20px;
  margin-left: 240px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 10px;
  text-align: left;
  /* border-bottom: 1px solid #ddd; */
  border: 1px solid #ddd;
}

table th {
  background-color: #f9f9f9!important;
}

table td {
  white-space: nowrap;
}

.filter-container {
  margin-bottom: 20px;
  justify-content: space-between;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
.view-btn {
  margin-left: 30px;
}
.form-select:focus {
  outline: none; /* Remove the default outline */
  border-color: #ced4da; /* Keep the border color the same or set to desired color */
  box-shadow: none; /* Remove any box shadow */
}
.form-select {
  width: fit-content;
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
.form-label{
  margin-bottom: 0px;
  align-self: center;
}
</style>