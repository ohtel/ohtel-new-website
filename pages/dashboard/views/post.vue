<template>
  <div>
    <NuxtLayout />
    <Toaster ref="toaster" />
    <div class="page-container">
      <h1 class="heading-title">
        <span class="animated-text">📢 List of Ads</span>
      </h1>
      <!-- Show loader while data is loading -->
      <div v-if="isLoading" class="loader-container">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <!-- Tabs for Active and Expired -->

      <div
        v-else
        class="d-flex flex-row justify-content-between align-items-center flex-wrap filter-section"
      >
        <!-- Left Section: Tabs -->
        <div
          v-if="!userId"
          class="tabs d-flex flex-row align-items-center me-3"
        >
          <button
            :class="{ active: isActiveTab && !isMyAdsTab }"
            @click="ctrlTabs(false, 1)"
            class="tab-button"
          >
            Active Ads ({{ activeCount }})
          </button>
          <button
            :class="{ active: !isActiveTab && !isMyAdsTab }"
            @click="ctrlTabs(true, 1)"
            class="tab-button"
          >
            Expired Ads ({{ expiredCount }})
          </button>
          <button
            :class="{ active: isMyAdsTab }"
            @click="fetchMyAds(1)"
            class="tab-button"
          >
            My Ads ({{ myAdsCount }})
          </button>
        </div>

        <!-- Middle Section: User Info -->
        <div v-else class="user-info d-flex align-items-center me-3">
          <h2 class="m-0">
            Ads Posted by {{ userName }}
            <button @click="clearParams" class="user-close ms-2">❌</button>
          </h2>
        </div>

        <!-- Right Section: Search and Filters -->
        <div class="search-filters d-flex align-items-center me-3">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Search ads"
            class="form-control search-input me-2"
          />
          <select
            id="categoryDropdown"
            v-model="selectedFilter"
            @change="onFilterChange(expired)"
            class="form-select me-2"
          >
            <option value="old_to_new">Old to New</option>
            <option value="new_to_old">New to Old</option>
          </select>
          <button
            class="filter-category-button me-2 save-button"
            @click="openFilterModal()"
          >
            <i class="fas fa-filter"> Filter</i>
          </button>
          <button
            class="save-button filter-category-button"
            @click="openAddModal()"
          >
            <i class="fas fa-plus"> Add Ads</i>
          </button>
        </div>

        <!-- Selected Category Info -->
        <!-- <div v-if="selectedCategory" class="category-details ms-3">
    <h5 class="m-0">
      <strong>Title:</strong> {{ getSelectedCategory.title }}
      <span class="ms-3"><strong>Description:</strong> {{ getSelectedCategory.description }}</span>
    </h5>
  </div> -->
      </div>
      <!-- Selected Subcategories Section -->
<div v-if="selectedSubCategories && selectedSubCategories.length > 0" class="selected-subcategories mt-3">
  <h5>Selected Subcategories:</h5>
  <div class="d-flex flex-wrap">
    <!-- Display each selected subcategory -->
    <span
      v-for="(subCategory, index) in selectedSubCategories"
      :key="index"
      class="badge me-2 mb-2"
    >
      {{ mapSubCategoryToTitle(subCategory) }}
      <button
        type="button"
        class="btn-close mb-2 ms-2"
        aria-label="Clear"
        @click="removeSubCategory(subCategory)"
      ></button>
    </span>
  </div>
  <button
    class="btn btn-danger mt-2 mb-2 "
    @click="clearSubCategories"
  >
    Clear All Subcategories
  </button>
</div>

      <!-- Table to Display Ads -->
      <div v-if="ads.length > 0 && !isLoading" class="ads-card-container">
        <div v-for="ad in ads" :key="ad.ad.id" class="ad-card">
          <!-- Image Carousel -->
          <div class="carousel-container">
            <div
              v-for="(image, index) in getFormattedImages(ad.ad_image)"
              :key="index"
              class="carousel-image"
            >
              <img :src="image" alt="Ad Image" />
            </div>
          </div>

          <!-- Title & Activation Toggle -->
          <div class="ad-header post-slider">
            <h3>{{ ad.ad.title }}</h3>
            <label class="switch">
              <input
                type="checkbox"
                :checked="ad.active"
                @change="toggleStatus(ad)"
              />
              <span class="slider round"></span>
            </label>
          </div>

          <!-- Type and Category -->
          <div class="ad-type-category">
            <div
              :class="[
                'card-type',
                ad.ad.type === 'Buyer'
                  ? 'buyer'
                  : ad.ad.type === 'Recruiter'
                  ? 'recruiter'
                  : 'seller',
              ]"
            >
              {{ ad.ad.type }}
            </div>
            <div :class="['card-category', getCategoryClass(ad.category.name)]">
              {{ ad.category.name }}
            </div>
          </div>

          <!-- Additional Details -->
          <div class="ad-details">
            <p><strong>Expiry:</strong> {{ ad.expiry }}</p>
            <p><strong>Contact Person:</strong> {{ ad.user_details.name }}</p>
            <p><strong>Location:</strong> {{ ad.ad_info2 }}</p>
            <p><strong>Posted On:</strong> {{ ad.ad_posted_on }}</p>
          </div>
      
          <!-- Actions -->
          <div class="options-button d-flex">
            <div @click="openViewModal(ad)">
              <i class="fas fa-eye"></i>
            </div>
            <div v-if="isMyAdsTab" @click="openEditModal(ad)">
              <i class="fas fa-edit"></i>
            </div>
            <div
              @click="openDeleteModal(ad.ad?.id, ad.category?.id, ad.ad?.type)"
            >
              <i class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p v-if="!isLoading">No ads found for {{ userName }}</p>
      </div>
      <!-- Pagination Controls -->
      <div class="pagination" v-if="totalPages > 1">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="pagination-button"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="pagination-button"
        >
          Next
        </button>
      </div>

      <!-- View Post Modal -->
      <div v-if="showViewModal" class="modal-overlay">
        <div class="modal-content w-100 position-relative">
          <button @click="closeViewModal" class="details-close">❌</button>
          <h2 class="modal-title">Ad Details</h2>

          <!-- Carousel for Ad Images -->
          <div class="d-flex gap-5">
            <div
              v-if="
                this.selectedCategory != 'Applicant' &&
                this.selectedCategory != 'Recruiter'
              "
              class="carousel-container-popup"
            >
              <button class="carousel-button left" @click="prevImage">‹</button>
              <div class="carousel-popup">
                <div
                  class="carousel-slide"
                  v-for="(image, index) in selectedPost.result?.ad?.image_ids"
                  :key="image.id"
                  :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                >
                  <img :src="image.ad_image" :alt="'Ad Image ' + (index + 1)" />
                  <p class="image-count">
                    {{ index + 1 }} /
                    {{ selectedPost.result?.ad?.image_ids?.length }}
                  </p>
                </div>
              </div>
              <button class="carousel-button right" @click="nextImage">
                ›
              </button>
            </div>
            <!-- Ad Image Carousel for Applicant -->
            <div v-else class="carousel-container-popup">
              <!-- <button class="carousel-button left" @click="prevImage">‹</button> -->
              <div class="carousel-popup">
                <div
                  class="carousel-slide"
                  :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                >
                  <img
                    :src="
                      selectedCategory == 'Applicant'
                        ? selectedPost.result?.ad?.profile_image
                        : selectedPost.result?.ad?.ad_image
                    "
                  />
                </div>
              </div>
              <!-- <button class="carousel-button right" @click="nextImage">
                › 
              </button>-->
            </div>

            <!-- Ad Information -->
            <div class="ad-details">
              <p>
                <strong>Title:</strong> {{ selectedPost.result.ad.ad_title }}
              </p>
              <p><strong>Name:</strong> {{ selectedPost.result.ad.ad_name }}</p>
              <p>
                <strong>Description:</strong>
                {{ selectedPost.result.ad.ad_description }}
              </p>
              <p><strong>Price:</strong> ₹{{ selectedPost.result.ad.price }}</p>
              <p>
                <strong>Deal Type:</strong>
                {{ selectedPost.result.ad.deal_type }}
              </p>
              <p>
                <strong>Category:</strong>
                {{ selectedPost.result.ad.category_name }}
              </p>
              <p>
                <strong>Sub-Category:</strong>
                {{ selectedPost.result.ad.sub_category_name }}
              </p>
              <p>
                <strong>Area:</strong> {{ selectedPost.result.ad.area }} sq ft
              </p>
              <p>
                <strong>Contact Person:</strong>
                {{ selectedPost.result.ad.contact_person }}
              </p>
              <p>
                <strong>Contact Number:</strong>
                {{ selectedPost.result.ad.contact_number }}
              </p>
              <p>
                <strong>Email:</strong>
                {{ selectedPost.result.ad.contact_email }}
              </p>
              <p>
                <strong>Posted On:</strong>
                {{ selectedPost.result.ad.ad_posted_on }}
              </p>
              <p>
                <strong>Status:</strong>
                {{ selectedPost.result.ad.is_active ? "Active" : "Inactive" }}
              </p>
              <p>
                <strong>Location:</strong> {{ selectedPost.result.ad.address }}
              </p>
            </div>
          </div>
          <div
            v-if="selectedPost?.result?.ad?.product_list?.length > 0"
            class="product-details"
          >
            <h2 class="modal-title">Product Details</h2>
            <div class="product-section">
              <div class="product-grid">
                <div
                  v-for="(product, index) in selectedPost.result?.ad
                    ?.product_list"
                  :key="index"
                  class="product-card"
                >
                  <img
                    :src="product.image || '/placeholder.jpg'"
                    alt="Product Image"
                    class="product-image"
                  />
                  <div class="product-info">
                    <h3>{{ product.name || "Unnamed Product" }}</h3>
                    <p>
                      Price:
                      {{ product.price > 0 ? `$${product.price}` : "Free" }}
                    </p>
                    <p v-if="product.offer_price > 0">
                      Offer Price: ${{ product.offer_price }}
                    </p>
                    <p>
                      Available: {{ product.unit_available }} {{ product.unit }}
                    </p>
                  </div>
                  <div>
                    <a
                      class="button-pdf-download"
                      :href="product.catalog"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Catelog
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content-delete">
          <h2 class="modal-title">Delete Post</h2>
          <p>
            Are you sure you want to delete post ID-
            <strong>{{ postToDelete.id }}</strong
            >?
          </p>

          <div class="modal-buttons">
            <button class="close-button" @click="closeDeleteModal">
              Cancel
            </button>
            <button class="save-button" @click="confirmDelete">
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
      <!-- Add Post Modal -->

      <div v-if="showAddModal" class="modal-overlay">
        <div class="modal-content-add-ads">
          <addAds @close="handleClose" />
        </div>
      </div>
      <div v-if="showEditModal" class="modal-overlay">
        <div class="modal-content-add-ads">
          <addAds @close="handleClose"  :initialData="adDetails" />
        </div>
      </div>

      <!-- Filter Modal -->
      <div v-if="showFilterModal" class="modal-overlay">
        <div class="modal-content p-3">
          <!-- Modal Header -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="m-0">Filter Ads</h5>
            <button class="btn btn-danger btn-sm" @click="handleClose()">
              ✖
            </button>
          </div>

          <!-- Category Dropdown -->
          <div class="mb-3">
            <label for="category" class="form-label">Select Category</label>
            <select
              id="category"
              class="form-select"
              v-model="selectedCategoryId"
              @change="handleCategoryChange"
            >
              <option value="" disabled>Select a Category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.category_title }}
              </option>
            </select>
          </div>

          <!-- Subcategories Multi-Select -->
          <div v-if="subCategories.length > 0" class="mb-3">
            <label class="form-label">Select Subcategories</label>
            <div class="row">
              <div
                class="col-12 col-md-6 col-lg-4 mb-2"
                v-for="subCategory in subCategories"
                :key="subCategory.id"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`subCategory-${subCategory.id}`"
                    :value="subCategory.id"
                    v-model="selectedSubCategories"
                  />
                  <label
                    class="form-check-label"
                    :for="`subCategory-${subCategory.id}`"
                  >
                    {{ subCategory.sub_category_title }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="d-flex justify-content-end mt-3">
            <button class="btn btn-secondary me-2" @click="handleClose()">
              Close
            </button>
            <button class="btn btn-success" @click="applyFilter()">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toaster from "~/components/Toaster.vue";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../environment.js";
import addAds from "../../../components/addAds.vue";
export default {
  components: { Toaster, addAds },
  data() {
    return {
      ads: [],
      activeCount: 0,
      expiredCount: 0,
      isActiveTab: true,
      currentPage: 1,
      totalPages: 1,
      showModal: false,
      showViewModal: false,
      postToDelete: {},
      selectedPost: {}, // Stores information about the post to be viewed
      isLoading: true, // Loader state
      showAddModal: false,
      showEditModal: false,
      isActiveTab: true,
      isMyAdsTab: false,
      myAdsCount: null,
      currentIndex: 0,
      categories: [],
      selectedFilter: "new_to_old",
      userId: null,
      expired: false,
      typingTimer: null,
      searchQuery: "",
      showFilterModal: false, // Controls the filter modal visibility
      categories: [], // Stores the fetched categories
      subCategories: [], // Stores the fetched subcategories
      selectedCategoryId: "", // Selected category ID
      selectedSubCategories: [], // Selected subcategory IDs (multi-select)
    };
  },
  mounted() {
    // Check if 'user_id' exists in the query parameters
    if (this.$route.query.user_id) {
      this.userId = this.$route.query.user_id; // Store the user ID
      this.userName = this.$route.query.name;
    }
    this.fetchAdCounts();
    this.fetchAds(false, 1);
    this.fetchCategories();
  },
  methods: {
   
    handleSearch() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        if(this.isMyAdsTab){
          this.fetchMyAds(1);
        }
        else{
          this.fetchAds(this.expired, 1);
        }
     
      }, 500); // Set debounce delay in ms
    },
    ctrlTabs(expired,page) {
      this.expired=expired;
      this.fetchAds(expired,page);
      
    },
    clearSubCategories() {
    this.selectedSubCategories = [];
    this.selectedCategoryId = "";
    this.subCategories=[]
    if(this.isMyAdsTab){
      this.fetchMyAds(1)
    }
    else{
      this.fetchAds(this.expired, 1);
    }

  },
   // Map subcategory ID to its title
   mapSubCategoryToTitle(subCategoryId) {
    const subCategory = this.subCategories.find(sub => sub.id === subCategoryId);
    console.log("subCategory",this.subCategories)
    console.log("subcategory",subCategory)
    return subCategory ? subCategory.sub_category_title : "Unknown";
  },
    // Handle removing a single subcategory from the selection
    removeSubCategory(subCategory) {
    const index = this.selectedSubCategories.indexOf(subCategory);
    if (index !== -1) {
      this.selectedSubCategories.splice(index, 1);
    }
    if(this.isMyAdsTab){
      this.fetchMyAds(1)
    }
    else{
      this.fetchAds(this.expired, 1);
    }

  },
    // Open Filter Modal
    openFilterModal() {
      this.showFilterModal = true;
      this.fetchCategories(); // Fetch categories when the modal opens
    },

    onFilterChange(expired) {
      this.filter = this.selectedFilter;
      if(this.isMyAdsTab){
        this.fetchMyAds(expired, 1);
      }
      else{
        this.fetchAds(expired, 1);
      }
     
    },
    clearParams() {
      this.$router.push({ path: this.$route.path, query: {} });
      this.userId = null;
      this.userName = null;
      this.fetchAds(false, 1);
    },
    async fetchCategories() {
      this.showLevels = false;
      // Fetch categories logic here
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.CATEGORY}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter out the category with title 'Applicant Roles'
        this.categories = response.data.result.filter(
          (category) => category.category_title !== "Applicant Roles"
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    nextImage() {
      if (
        this.currentIndex <
        this.selectedPost.result?.ad?.image_ids?.length - 1
      ) {
        this.currentIndex++;
      }
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    async fetchAdCounts() {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.POST_COUNT}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        this.activeCount = data.active_count;
        this.expiredCount = data.expired_count;
        this.myAdsCount = data.myads_count;
      } catch (error) {
        console.error("Error fetching post counts:", error);
      }
    },
    async fetchAds(expired, page = 1) {
      this.isLoading = true; // Start the loader
      const token = localStorage.getItem("accessToken");
      if (this.userId) {
        try {
          this.isActiveTab = !expired;
          this.isMyAdsTab = false;
          this.currentPage = page;
          // Construct the query object dynamically
          const params = new URLSearchParams({
            page: page,
            expired: expired ? 1 : 0,
            sort: this.selectedFilter,
            user_id: this.userId,
          });

          // Add `category` and `sub_category` only if they are available
          if (this.selectedCategoryId) {
            // Convert category to an array and append
            params.append("category", this.selectedCategoryId);
          }
          if (this.searchQuery) {
            params.append("search", this.searchQuery);
          }

          if (
            this.selectedSubCategories &&
            this.selectedSubCategories.length > 0
          ) {
            // Append each sub_category value separately
            this.selectedSubCategories.forEach((id) =>
              params.append("sub_category", id)
            );
          }
          const response = await fetch(
            `${BASE_URL}${ENDPOINTS.ADS_LIST}?${params.toString()}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await response.json();
          this.ads = data.results;
          this.totalPages = data.pages || 1;
          this.isLoading = false;
          this.showFilterModal = false;
        } catch (error) {
          this.isLoading = false;
          console.error("Error fetching ads:", error);
        }
      } else {
        try {
          this.isActiveTab = !expired;
          this.isMyAdsTab = false;
          this.currentPage = page;
          const params = new URLSearchParams({
            page: page,
            expired: expired ? 1 : 0,
            sort: this.selectedFilter,
          });

          // Add `category` and `sub_category` only if they are available
          if (this.selectedCategoryId) {
            // Convert category to an array and append
            params.append("category", this.selectedCategoryId);
          }
          if (this.searchQuery) {
            params.append("search", this.searchQuery);
          }
          if (
            this.selectedSubCategories &&
            this.selectedSubCategories.length > 0
          ) {
            // Append each sub_category value separately
            this.selectedSubCategories.forEach((id) =>
              params.append("sub_category", id)
            );
          }
          const response = await fetch(
            `${BASE_URL}${ENDPOINTS.ADS_LIST}?${params.toString()}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await response.json();
          this.ads = data.results;
          this.totalPages = data.pages || 1;
          this.isLoading = false;
          this.showFilterModal = false;
        } catch (error) {
          this.isLoading = false;
          console.error("Error fetching ads:", error);
        }
      }
    },
    async fetchMyAds(page = 1) {
      this.isLoading = true; // Start the loader
      const token = localStorage.getItem("accessToken");
      const userConfig = JSON.parse(localStorage.getItem("user_config"));
      if (userConfig.id) {
        try {
          this.isActiveTab = false;
        this.isMyAdsTab = true;
        this.currentPage = page;
          this.currentPage = page;
          // Construct the query object dynamically
          const params = new URLSearchParams({
            page: page,
            sort: this.selectedFilter,
            user_id: userConfig.id,
          });

          // Add `category` and `sub_category` only if they are available
          if (this.selectedCategoryId) {
            // Convert category to an array and append
            params.append("category", this.selectedCategoryId);
          }
          if (this.searchQuery) {
            params.append("search", this.searchQuery);
          }

          if (
            this.selectedSubCategories &&
            this.selectedSubCategories.length > 0
          ) {
            // Append each sub_category value separately
            this.selectedSubCategories.forEach((id) =>
              params.append("sub_category", id)
            );
          }
          const response = await fetch(
            `${BASE_URL}${ENDPOINTS.ADS_LIST}?${params.toString()}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await response.json();
          this.ads = data.results;
          this.totalPages = data.pages || 1;
          this.isLoading = false;
          this.showFilterModal = false;
        } catch (error) {
          this.isLoading = false;
          console.error("Error fetching ads:", error);
        }
      }
    },
    async openViewModal(ad) {
      this.selectedCategory = ad.ad.type;
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${BASE_URL}${ENDPOINTS.ADS_DETAILS}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              category_id: ad.category.name == "Jobs" ? 3 : ad.category.id,
              ad_uuid: ad.ad.uuid,
              type: ad.ad.type,
            },
          }
        );
        this.selectedPost = response.data; // Assuming the response contains the ad details
        this.showViewModal = true; // Show the modal after data is fetched
      } catch (error) {
        console.error("Error fetching ad details:", error);
      }
    },
    closeViewModal() {
      this.showViewModal = false;
      this.selectedPost = {};
    },
    async toggleStatus(ad) {
      const token = localStorage.getItem("accessToken");
      const newStatus = !ad.active;
      try {
        const url = `${BASE_URL}${ENDPOINTS.ACTIVATE_CARD}?ad_id=${ad.ad.id}&ad_category=${ad.category.id}&ad_type=${ad.ad.type}&active=${newStatus}`;
        const response = await fetch(url, {
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          ad.active = newStatus;
          this.$refs.toaster.showToast(
            `Post status updated to ${ad.active ? "active" : "inactive"}`,
            "success"
          );
        } else {
          console.error("Failed to toggle status");
        }
      } catch (error) {
        console.error("Error toggling status:", error);
      }
    },
    openDeleteModal(postId, categoryId, type) {
      this.postToDelete = { id: postId, category: categoryId, type };
      this.showModal = true;
    },
    closeDeleteModal() {
      this.showModal = false;
      this.postToDelete = {};
    },
    async confirmDelete() {
      const { id, category, type } = this.postToDelete;
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.delete(
          `${BASE_URL}${ENDPOINTS.AD_DELETE}?ad_id=${id}&ad_category=${category}&ad_type=${type}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          this.$refs.toaster.showToast(
            `Post ID-${id} deleted successfully!`,
            "success"
          );
          this.fetchAdCounts();
          this.fetchAds(!this.isActiveTab, this.currentPage);
        } else {
          console.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        this.closeDeleteModal();
      }
    },
    nextPage() {
      if (this.isMyAdsTab) {
        this.fetchMyAds(this.currentPage + 1);
      } else {
        if (this.currentPage < this.totalPages) {
          this.fetchAds(!this.isActiveTab, this.currentPage + 1);
        }
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.fetchAds(!this.isActiveTab, this.currentPage - 1);
      }
    },
    getCategoryClass(category) {
      const formattedCategory = category.toLowerCase().replace("/", "-");
      switch (formattedCategory) {
        case "spaces":
          return "spaces";
        case "used equipments":
          return "used-equipments";
        case "shared spaces":
          return "shared-spaces";
        case "foods factory-home chef": // Adjusted here
          return "foods-factory";
        case "market deals":
          return "market-deals";
        case "applicant roles":
          return "applicant-roles";
        case "recruiter":
          return "recruiter";
        case "applicant":
          return "applicant";
        default:
          return "default-class";
      }
    },
    // Method to extract and return formatted image URLs
    getFormattedImages(adImageStr) {
      // Remove the brackets and single quotes, then split the string by commas
      const cleanedStr = adImageStr.replace(/[(')]/g, "");
      const imageUrls = cleanedStr.split(",");

      // Filter out any empty strings from the imageUrls array
      const validImageUrls = imageUrls.filter((image) => image.trim() !== "");

      // Map the valid image URLs to the correct format with base URL
      return validImageUrls.map((image) => `${image.trim()}`);
    },
    openAddModal() {
      this.showAddModal = true;
    },
    openEditModal(ad) {
      console.log("ads data from post page",ad)
      this.adDetails=ad
      this.showEditModal = true;
    },
    handleClose() {
      this.showAddModal = false;
      this.showFilterModal = false;
      this.showEditModal = false;
    },
    // Fetch Categories (API Call)
    async fetchCategories() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.CATEGORY}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Exclude category with title 'Applicant Roles'
        this.categories = response.data.result.filter(
          (category) => category.category_title !== "Applicant Roles"
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    // Handle Category Selection Change
    async handleCategoryChange() {
      if (this.selectedCategoryId) {
        try {
          this.subCategories = []; // Clear previous subcategories
          this.selectedSubCategories = []; // Clear selected subcategories

          // Find the selected category based on selectedCategoryId
          this.selectedCategory = this.categories.find(
            (category) => category.id === this.selectedCategoryId
          );

          if (!this.selectedCategory) {
            console.error("Category not found");
            return;
          }

          const token = localStorage.getItem("accessToken");
          let response;

          // Check if category_title is 'Applicant'
          if (this.selectedCategory.category_title === "Applicant") {
            response = await axios.get(
              `${BASE_URL}${ENDPOINTS.APPLICANT_SUBCATEGORY}?category_id=3&type=Applicant`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            this.subCategories = response.data.result.data; // Use data for Applicant
            console.log("Applicant Subcategories:", this.subCategories);
          } else {
            response = await axios.get(
              `${BASE_URL}${ENDPOINTS.SUBCATEGORY}?category_id=${this.selectedCategoryId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            this.subCategories = response.data.results; // Use standard subcategories
            console.log(" Subcategories:", this.subCategories);
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      }
    },

    // Apply Filter Logic
    applyFilter() {
      console.log("Selected Category ID:", this.selectedCategoryId);
      console.log("Selected Subcategory IDs:", this.selectedSubCategories);

      // Perform any filter API call or update data here
      this.$emit("applyFilter", {
        categoryId: this.selectedCategoryId,
        subCategoryIds: this.selectedSubCategories,
      });
      if(this.isMyAdsTab){
        this.fetchMyAds(1);
      }
      else{
        this.fetchAds(!this.isActiveTab, 1);
      }
    
     

    },
  },
};
</script>
  
<style>
.page-container {
  flex-grow: 1;
  padding: 20px;
  margin-left: 240px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
.page-container h1 {
  margin-bottom: 20px;
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
  background-color: #f9f9f9;
}

table td {
  white-space: nowrap;
}
.card-container {
  display: flex;
  gap: 10px; /* Space between type and category */
}

/* Common styles for card-type and card-category */
.card-type {
  border-radius: 8px; /* Rounded corners */
  padding: 10px; /* Padding inside the card */
  font-weight: bold; /* Bold text */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow for card effect */
  min-width: 100px; /* Ensure a minimum width */
  text-align: center; /* Center align text */
  color: white; /* White text color for better contrast */
}
.card-category {
  border-radius: 8px; /* Rounded corners */
  padding: 10px; /* Padding inside the card */

  min-width: 100px; /* Ensure a minimum width */
  text-align: center; /* Center align text */
}

/* Specific colors for Buyer and Seller */
.card-type.buyer {
  background-color: #303ec1; /* Color for Buyer */
}
.card-type.recruiter {
  background-color: #e97c23; /* Color for Buyer */
}

.card-type.seller {
  background-color: #bc1d9f; /* Color for Seller */
}

/* Specific background colors for each category */
.card-category.spaces {
  color: #3498db;
  border: 1.5px solid #3498db;
}

.card-category.used-equipments {
  color: #27ae60; /* Example color for Used Equipments */
  border: 1.5px solid #27ae60;
}

.card-category.shared-spaces {
  color: #9b59b6; /* Example color for Shared Spaces */
  border: 1.5px solid #9b59b6;
}

.card-category.foods-factory {
  color: #f39c12; /* Example color for Foods Factory/Home Chef */
  border: 1.5px solid #f39c12;
}

.card-category.market-deals {
  color: #e74c3c; /* Example color for Market Deals */
  border: 1.5px solid #e74c3c;
}

.card-category.applicant-roles {
  color: #8e44ad; /* Example color for Applicant Roles */
  border: 1.5px solid #8e44ad;
}

.card-category.recruiter {
  color: #1abc9c; /* Example color for Recruiter */
  border: 1.5px solid #1abc9c;
}

.card-category.applicant {
  color: #c0392b; /* Example color for Applicant */
  border: 1.5px solid #c0392b;
}

.options-button {
  justify-content: space-around;
}
/* Toggle switch container */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-left: 10px;
}

/* Hide the default checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider for the toggle button */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.post-slider .slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: -3px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

/* When the checkbox is checked */
input:checked + .slider {
  background-color: #47509b;
}

.add-button {
  background-color: #47509b;
}
input:checked + .slider:before {
  transform: translateX(20px);
}

/* Rounded slider */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
/* Modal Styles */
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
  width: 450px;
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

.page-container {
  flex-grow: 1;
  padding: 20px;
  margin-left: 240px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

/* Toaster Style */
.toaster {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.tabs button {
  padding: 5px 20px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
}

.tabs button.active {
  background-color: #47509b;
  color: white;
}

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
  color: white;
}
.close-button {
  background-color: #a20584;
  color: white;
}
.btn-danger{
  background-color: #a20584;
  color: white;
}
.ads-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.ad-card {
  width: calc(25% - 16px); /* 4 items per row */
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.carousel-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.carousel-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.ad-header {
  display: flex;
  justify-content: space-between;
  padding: 22px;
  align-items: center;
  height: 80px;
}

.ad-header h3 {
  font-size: 16px;
  margin: 0;
}

.ad-type-category {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
}

.card-type,
.card-category {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 9px;
}

.buyer {
  background-color: #ffeb3b;
}

.recruiter {
  background-color: #4caf50;
}

.seller {
  background-color: #2196f3;
}

.ad-details {
  padding: 12px;
  font-size: 14px;
}

.options-button {
  display: flex;
  justify-content: space-around;
  padding: 8px;
}

.switch {
  position: relative;
}

.switch input {
  opacity: 0;
}

.switch .slider {
  width: 34px;
  height: 20px;
  background-color: #ccc;
  border-radius: 50px;
  position: absolute;
  cursor: pointer;
}

.switch input:checked + .slider {
  background-color: #47509b;
}

.switch .slider.round {
  border-radius: 34px;
}
.tabs button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.carousel-container-popup {
  position: relative;
  width: 100%; /* Adjust as needed */
  height: 300px; /* Adjust as needed */
  overflow: hidden;
  margin: auto;
}
.ad-details {
  text-align: left;
}
.carousel-popup {
  display: flex;
  transition: transform 0.3s ease-in-out;
  height: 90%;
}

.carousel-slide {
  min-width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.carousel-slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.image-count {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 50%;
  z-index: 10;
}

.carousel-button.left {
  left: 10px;
}

.carousel-button.right {
  right: 10px;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.modal-overlay {
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100%; */
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  word-break: break-all;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  /* max-width: 600px; */
  max-height: 90vh;
  overflow-y: auto; /* Ensure content is scrollable if it overflows */
  position: relative;
}
.modal-content-delete {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  text-align-last: center;
  max-height: 90vh;
  overflow-y: auto; /* Ensure content is scrollable if it overflows */
  position: relative;
}

.product-section {
  padding: 20px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.product-info {
  padding: 10px;
  text-align: center;
}
.catalog-download {
  margin-top: 20px;
  text-align: center;
}
.button-pdf-download {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.button-pdf-download {
  padding: 10px 20px;
  background-color: #47509b;
  text-decoration: none;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 4px;
  margin-bottom: 20px;
}
.button-pdf-download:hover {
  background-color: #acadba;
  color: white;
}
.popup-close {
  align-self: center;
}
.details-close {
  font-size: 8px;
  height: 25px;
  width: 25px;
  position: fixed;
  top: 40px;
  right: 7%;
  border-radius: 50%;
  border-width: 0px;
  border: 1px solid black;
  background-color: #ffffff;
  z-index: 1;
}
.modal-content-add-ads {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.user-close {
  font-size: 20px;
  width: 30px;
  height: 30px;
  padding: 0px;
  border-radius: 8px;
  background-color: white;
}
.filter-section {
  margin-bottom: 30px;
}
.search-input {
  outline-color: #47509b;
  margin-right: 3px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.filter-category-button {
  margin-right: 3px;
  padding: 10px 20px;
  background-color: #47509b;
  color: white;
}
.filter-section {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* Prevent wrapping to next line */
  gap: 1rem; /* Add spacing between elements */
  overflow-x: auto; /* Scroll horizontally if needed */
}

.tabs .tab-button {
  white-space: nowrap; /* Prevent button text from breaking */
  margin-right: 0.5rem;
}

.search-input,
.form-select {
  min-width: 200px; /* Prevent inputs from shrinking too small */
}

.user-info h2 {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.user-close {
  cursor: pointer;
  font-size: 1rem;
  color: red;
}

.filter-category-button,
.btn {
  white-space: nowrap; /* Prevent button text from wrapping */
}

.category-details h5 {
  white-space: nowrap;
  font-size: 1rem;
}
.form-check {
  display: flex;
  align-items: center;
}

.form-check-input {
  margin-right: 8px;
}
.badge{
background-color: #47509b;
}
</style>