<template>
  <div>
    <NuxtLayout></NuxtLayout>
    <Toaster ref="toaster" />
    <div class="page-container">
      <h1 class="heading-title">
        <span class="animated-text">📋 Category List</span>
      </h1>
      <!-- Show loader while data is loading -->
      <div v-if="isLoading" class="loader-container">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <!-- Filter Dropdown -->
      <div v-else class="d-flex justify-content-between">
        <div class="filter-dropdown">
          <button
            class="btn btn-primary change_order_btn"
            @click="showPopup = true"
          >
            Change Order
          </button>
        </div>
      </div>

      <!-- Card List View -->
      <div class="card-list-container">
        <div
          v-if="filteredCategories.length === 0 && !isLoading"
          class="empty-state text-center"
        >
          No data available.
        </div>
        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="category-card"
        >
          <div class="card-header">
            <h3 class="category-title">
              {{ category.category_title }}
            </h3>
            <!-- <label class="toggle-switch">
              <input
                type="checkbox"
                :checked="category.is_active"
                @change="toggleCategoryStatus(category)"
              />
              <span class="slider round"></span>
            </label> -->
          </div>
          <img
            :src="category.category_images"
            alt="Category Image"
            class="category-image"
          />
          <p class="category-description">
            {{ category.category_description || "No description available" }}
          </p>
          <div class="card-footer">
            <span class="sub-category-count">
              Sub-Categories: {{ category.sub_category_count }}
            </span>
          </div>
        </div>
      </div>

      <!-- Popup Modal for Drag and Drop -->
      <div v-if="showPopup" class="modal-overlay">
        <div class="modal-content">
          <h2>Reorder Categories</h2>
          <div
            v-for="(category, index) in categoryOrder"
            :key="category.id"
            class="draggable-card"
            draggable="true"
            @dragstart="dragStart(index)"
            @dragover="dragOver($event)"
            @drop="drop(index)"
          >
            {{ category.category_title }}
          </div>
          <div class="d-flex reorder-buttons">
            <button class="applybtn reorder-buttons" @click="applyChanges">
              Apply Changes
            </button>
            <button class="closebtn" @click="showPopup = false">Close</button>
          </div>
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
  data() {
    return {
      categories: [],
      statusFilter: "all",
      filteredCategories: [],
      showPopup: false,
      categoryOrder: [],
      draggedItem: null,
      isLoading: true,
    };
  },
  async mounted() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.isLoading = true; // Start the loader
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.CATEGORY}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filter out the object with "category_title" as "Applicant Roles"
        this.categories = response.data.result.filter(
          (category) => category.category_title !== "Applicant Roles"
        );
        this.filteredCategories = this.categories;
        this.categoryOrder = [...this.categories];
        this.isLoading = false; // Stop the loader
      } catch (error) {
        console.error("Error fetching categories:", error);
        this.$refs.toaster.showToast("Error fetching categories.", "error");
        this.isLoading = false; // Stop the loader
      }
    },
    applyFilter() {
      if (this.statusFilter === "active") {
        this.filteredCategories = this.categories.filter(
          (category) => category.is_active
        );
      } else if (this.statusFilter === "inactive") {
        this.filteredCategories = this.categories.filter(
          (category) => !category.is_active
        );
      } else {
        this.filteredCategories = this.categories;
      }
    },
    async toggleCategoryStatus(category) {
      const token = localStorage.getItem("accessToken");
      const isActive = !category.is_active;
      const payload = { active: isActive };

      try {
        const url = `${BASE_URL}${ENDPOINTS.CHANGE_STATUS}?id=${category.id}`;
        const response = await axios.post(url, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // this.categories = response.data;
        this.fetchCategories();
        // this.filteredCategories = this.categories;
        // this.categoryOrder = [...this.categories];
        this.$refs.toaster.showToast(
          `Category status updated to ${isActive ? "active" : "inactive"}`,
          "success"
        );
      } catch (error) {
        console.error("Error updating category status:", error);
        this.$refs.toaster.showToast(
          "Error updating category status.",
          "error"
        );
      }
    },
    dragStart(index) {
      this.draggedItem = this.categoryOrder[index];
    },
    dragOver(event) {
      event.preventDefault();
    },
    drop(index) {
      const droppedItem = this.draggedItem;
      this.categoryOrder = this.categoryOrder.filter(
        (item) => item.id !== droppedItem.id
      );
      this.categoryOrder.splice(index, 0, droppedItem);
      this.draggedItem = null;
    },
    async applyChanges() {
      const token = localStorage.getItem("accessToken");
      const updatedOrder = this.categoryOrder.map((category, index) => ({
        id: category.id,
        order: index + 1,
      }));

      try {
        await axios.post(
          `${BASE_URL}${ENDPOINTS.ORDER_CHANGE}`,
          { updated_list: updatedOrder },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.fetchCategories();
        this.showPopup = false;
        this.$refs.toaster.showToast(
          "Category order updated successfully",
          "success"
        );
      } catch (error) {
        console.error("Error updating category order:", error);
        this.$refs.toaster.showToast("Error updating category order.", "error");
      }
    },
  },
};
</script>

<style>
.page-container {
  flex-grow: 1;
  padding: 10px; /* Reduced padding */
  margin-left: 240px; /* Adjusted margin */
}

.filter-dropdown {
  margin-bottom: 10px; /* Reduced margin */
}

.card-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Reduced gap between cards */
  margin-top: 15px; /* Reduced margin */
}

.category-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px; /* Reduced padding */
  width: 260px; /* Narrower cards */
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); /* Slightly lighter shadow */
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* Reduced margin */
}

.category-title {
  font-size: 1em; /* Reduced font size */
  font-weight: bold;
  color: #47509b;
}

.category-description {
  font-size: 0.85em; /* Reduced font size */
  color: #555;
  margin-bottom: 8px; /* Reduced margin */
}

.category-image {
  width: 100%;
  height: 120px; /* Reduced height */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px; /* Reduced margin */
}

.card-footer {
  font-size: 0.8em; /* Reduced font size */
  color: #999;
  display: flex;
  justify-content: space-between;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  border-radius: 50%;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #47509b;
}
.category-card input:checked + .slider:before {
  transform: translateX(12px);
}

.empty-state {
  text-align: center;
  font-style: italic;
  color: #999;
  font-size: 0.9em; /* Reduced font size */
}

.change_order_btn {
  background-color: #47509b;
  font-size: 0.9em; /* Adjusted button font size */
}

.draggable-card {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  cursor: move;
}

.applybtn {
  background-color: #47509b;
  color: #fff;
  border-radius: 6px; /* Adjusted border radius */
  padding: 8px 12px; /* Adjusted padding */
  font-size: 0.9em; /* Adjusted font size */
}

.closebtn {
  background-color: #a20584;
  color: #fff;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.9em;
}

.reorder-buttons {
  gap: 8px; /* Reduced gap */
  justify-content: space-between;
}
</style>