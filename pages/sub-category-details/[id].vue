<template>
  <div>
    <NuxtLayout />
    <Toaster ref="toaster" />
    <div class="page-container">
      <!-- Filter Section -->
     <div class="d-flex justify-content-between">
      <!-- <h3 class="head-applicant">
       <a class="back" href="/dashboard/views/sub_category/">Aplicant</a> /{{ title }}
      </h3> -->
      <h1 class="heading-title">
        <span class="animated-text">📋  <a class="back" href="/dashboard/views/sub_category/">Aplicant</a> /{{ title }}</span>
      </h1>
      <div class="filter-section d-flex">
        <label>Show:</label>
        <select v-model="statusFilter" @change="applyFilter">
          <!-- <option value="all">All</option> -->
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          class="add-category-button"
          @click="openAddModal()"
        >
          Add Sub Category
        </button>
      </div>
     </div>

      <!-- Subcategory Cards -->
      <h5 v-if="subCategories.length === 0" class="no-data text-center">no sub categories avaialable <a href="/dashboard/views/sub_category/">click here</a> to go back</h5>
      <div v-if="subCategories.length > 0" class="subcategory-cards">
        <div
          v-for="subCategory in subCategories"
          :key="subCategory.id"
          class="subcategory-card"
         
        >
          <img
            :src="subCategory.applicant_sub_sub_category_images"
            alt="subcategory image"
            class="subcategory-image"
          />
          <div class="subcategory-details">
            <h5>{{ subCategory.applicant_role_title }}</h5>
            <p>
              {{
                subCategory.applicant_role_description ||
                "No description available"
              }}
            </p>
            <!-- Button Group at the bottom -->
            <div class="button-group">
              <button @click="openViewModal(subCategory)">View</button>
              <button @click="openEditModal(subCategory)">Edit</button>
              <button @click="openDeleteModal(subCategory)">{{  statusFilter === "active" ? 'inactivate' : 'activate' }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading and Error Messages -->
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error-message">{{ error }}</div>

      <!-- Inline Modals -->

      <div v-if="showViewModal" class="modal-overlay">
        <div class="modal-content">
          <h2>View Subcategory</h2>
          <div
            v-if="selectedSubCategory.applicant_sub_sub_category_images"
            class="image-preview"
          >
            <img
              :src="selectedSubCategory.applicant_sub_sub_category_images"
              alt="Image Preview"
              class="preview-image"
            />
          </div>
          <div class="input-group">
            <label
              >Sub-Category Title:
              {{ selectedSubCategory?.applicant_role_title }}</label
            >
          </div>
          <div class="input-group">
            <label
              >Sub-Category Description:
              {{ selectedSubCategory.applicant_role_description }}</label
            >
          </div>

          <div class="modal-buttons align-self-center">
            <button class="close-button" @click="closeModal">Close</button>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->

      <div v-if="showEditModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Edit Subcategory</h2>

          <!-- Title Input -->

          <div class="input-group">
            <label>Sub-Category Title:</label>
            <input
              class="styled-input"
              v-model="selectedSubCategory.applicant_role_title"
              placeholder="Edit Title"
            />
          </div>
          <!-- Description Input -->
          <div class="input-group">
            <label>Sub-Category Description:</label>
            <input
              class="styled-input"
              v-model="selectedSubCategory.applicant_role_description"
              placeholder="Edit Description"
            />
          </div>

          <!-- Image Upload Input -->
          <div class="image-upload">
            <label>Image Upload:</label>
            <input
              type="file"
              id="image_upload"
              @change="onImageChange"
              accept="image/*"
            />
          </div>

          <!-- Image Preview -->
          <div v-if="selectedImageUrl || imagePreview" class="image-preview">
            <!-- <img :src="selectedImageUrl"  alt="Image Preview" class="preview-image"  /> -->
            <img
              :src="
                selectedImageUrl ? getImagePath(selectedImageUrl) : imagePreview
              "
              alt="Image Preview"
              class="preview-image"
            />
          </div>
          <!-- Modal Buttons -->
          <div class="modal-buttons">
            <button class="save-button" @click="saveEdits()">Save</button>
            <button class="close-button" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>

      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal-content">
          <h2 class="modal-title">{{  statusFilter === "active" ? 'inactivate' : 'activate' }} Subcategory</h2>
          <p>
            Are you sure you want to {{  statusFilter === "active" ? 'inactivate' : 'activate' }}
            {{ selectedSubCategory?.applicant_role_title }}?
          </p>

          <div class="modal-buttons">
            <button class="save-button" @click="confirmDelete">
              Yes, {{  statusFilter === "active" ? 'inactivate' : 'activate' }}
            </button>
            <button class="close-button" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>

   
        <div v-if="showAddCategoryModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Add Subcategory </h2>

          <!-- Title Input -->

          <div class="input-group">
            <label>Sub-Category Title:</label>
            <input
              class="styled-input"
              v-model="addSubCategoryTitle"
              placeholder="Edit Title"
            />
          </div>
          <!-- Description Input -->
          <div class="input-group">
            <label>Sub-Category Description:</label>
            <input
              class="styled-input"
              v-model="addSubCategoryDescription"
              placeholder="Edit Description"
            />
          </div>

          <!-- Image Upload Input -->
          <div class="image-upload">
            <label>Image Upload:</label>
            <input
              type="file"
              id="image_upload_add"
              @change="onImageChangeAdd"
              accept="image/*"
            />
          </div>

          <!-- Image Preview -->
          <div v-if="imagePreview_add" class="image-preview_add">
            <!-- <img :src="selectedImageUrl"  alt="Image Preview" class="preview-image"  /> -->
            <img
              :src=" selectedImageUrl_add "
              alt="Image Preview_add"
              class="preview-image"
            />
          </div>
          <!-- Modal Buttons -->
          <div class="modal-buttons">
            <button class="save-button" @click="addCategory()">Save</button>
            <button class="close-button" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>
      </div>
  
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../../environment.js";

export default {
  data() {
    return {
      categories: [],
      selectedCategory: null,
      subCategories: [],
      filteredSubCategories: [],
      statusFilter: "active",
      loading: false,
      error: null,
      // Modal states
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showAddCategoryModal: false,
      selectedSubCategory: null,
      newCategoryTitle: "",
      newCategoryDescription: "",
      imagePreview: null,
      imagePreview_add: false,
      addSubCategoryTitle:'',
      addSubCategoryDescription:'',
      title:'',
      image_upload: null,
      image_upload_add: null,
    };
  },
  async created() {
    await this.fetchSubCategories(this.statusFilter);
  },
  methods: {
    async fetchSubCategories(statusFilter) {
      try {
        const token = localStorage.getItem("accessToken");

        // Fetch subcategory data based on category selection
        let response;

        response = await axios.get(
          `${BASE_URL}${ENDPOINTS.SUBCATEGORY_DETAILS}${this.$route.params.id}/?is_active=${statusFilter=='active'?true:false}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        this.subCategories = response.data.results || [];
        this.title=this.subCategories[0].applicant_sub_category_name
        // this.applyFilter();
      } catch (error) {
        this.error = "Failed to load subcategories";
      } finally {
        this.loading = false;
      }
    },

    applyFilter() {
      // this.filteredSubCategories =
      //   this.statusFilter === "all"
      //     ? this.subCategories
      //     : this.subCategories.filter((subCategory) =>
      //         this.statusFilter === "active"
      //           ? subCategory.isActive
      //           : !subCategory.isActive
      //       );

      this.fetchSubCategories(this.statusFilter);
    },

    openViewModal(subCategory) {
      
      this.selectedSubCategory = subCategory;
      this.showViewModal = true;
    },

    openEditModal(subCategory) {
      this.selectedSubCategory = { ...subCategory };
      this.showEditModal = true;
      this.imagePreview = subCategory.applicant_sub_sub_category_images;
    },
    openAddModal(){
      this.showAddCategoryModal = true;
    },

    openDeleteModal(subCategory) {
      this.selectedSubCategory = subCategory;
      this.showDeleteModal = true;
    },

    closeModal() {
      this.showViewModal = false;
      this.showEditModal = false;
      this.showDeleteModal = false;
      this.showAddCategoryModal = false;
      this.imagePreview = null;
      this.selectedImageUrl = null;
      this.selectedImageUrl_add = null;
      this.imagePreview_add = false;
      this.image_upload = null;
      this.image_upload_add = null;
    },

   async addCategory() {
      // Handle add category logic here

     
      // Handle saving edits
      const formData = new FormData();
      formData.append('applicant_role_title', this.addSubCategoryTitle);
      formData.append('applicant_role_description', this.addSubCategoryDescription);
      formData.append('applicant_sub_category', this.$route.params.id);
      // formData.append('id', this.selectedSubCategory.id);
      if (this.image_upload_add) {
        formData.append('applicant_sub_sub_category_images', this.image_upload_add);
      }

  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.ADD_APPLICANT_ROLE}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log('Subcategory updated successfully:', response.data);
    this.$refs.toaster.showToast(
      "Subcategory updated successfully",
      "success"
    );
    this.fetchSubCategories(this.statusFilter);
    this.closeModal();
  } catch (error) {
    console.error('Error updating subcategory:', error);
  }

      this.closeModal();
    },

   async saveEdits() {
      // Handle saving edits
      const formData = new FormData();
      formData.append('applicant_role_title', this.selectedSubCategory.applicant_role_title);
      formData.append('applicant_role_description', this.selectedSubCategory.applicant_role_description);
      formData.append('applicant_sub_category', this.selectedSubCategory.applicant_sub_category);
      formData.append('id', this.selectedSubCategory.id);
      if (this.image_upload) {
        formData.append('applicant_sub_sub_category_images', this.image_upload);
      }

  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.put(
      `${BASE_URL}${ENDPOINTS.EDIT_APPLICANT_SUBCATEGORY}${this.selectedSubCategory.id}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log('Subcategory updated successfully:', response.data);
    this.$refs.toaster.showToast(
      "Subcategory updated successfully",
      "success"
    );
    this.fetchSubCategories(this.statusFilter);
    this.closeModal();
  } catch (error) {
    console.error('Error updating subcategory:', error);
  }

    },

   async confirmDelete() {
      // Handle confirming delete
      try {
    const token = localStorage.getItem("accessToken");
    const payload={
        id: this.selectedSubCategory.id,
        is_active: this.statusFilter === "active" ? false: true
        
      }
    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.APPLICANT_ROLE_TOGGLE}`,payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Subcategory updated successfully:', response.data);
    this.$refs.toaster.showToast(
      "Subcategory deleted successfully",
      "success"
    );
    this.fetchSubCategories(this.statusFilter);
    this.closeModal();
  } catch (error) {
    console.error('Error updating subcategory:', error);
  }
    },
    onImageChangeAdd(event) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    this.image_upload_add = file; // Update the image file
    this.selectedImageUrl_add = null; // Clear previous URL
    this.imagePreview_add = null; // Clear previous preview

    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedImageUrl_add = e.target.result; // Set new image URL
      this.imagePreview_add = true;
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  } else {
    // Reset state if no file is selected
    this.image_upload_add = null;
    this.selectedImageUrl_add = null;
    this.imagePreview_add = false;
  }
},
onImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    this.image_upload = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target.result; // Preview updates correctly
    };
    reader.readAsDataURL(file);
  } else {
    this.imagePreview = null; // Clear preview if no file selected
    this.image_upload = null;
  }
},
    getImagePath(subCategory) {
      let imagePath = subCategory || "default_image_url";

      // Check if the path contains '/media/media' and replace it with '/media'
      if (imagePath.includes("/media/media")) {
        imagePath = imagePath.replace("/media/media", "/media");
      }

      return imagePath;
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
  margin-left: 240px;
}

/* Tabs and Filter Section */
.header-section {
  display: flex;
  flex-direction: column; /* Stack the tabs and filter on separate lines */
  gap: 10px;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
}
.tabs button {
  font-weight: 100;
}
.tab {
  background-color: #f0f0f0;
  /* padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px; */
  cursor: pointer;
  margin-top: 12px;
  font-size: 15px;
}

.tab.active {
  background-color: #47509b;
  color: white;
}

.add-category-button {
  background-color: #47509b;
  color: #ffffff;
  padding: 4px 16px;
  border-radius: 5px;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: end;
  margin-bottom: 12px;
}

.filter-section label {
  margin-right: 8px;
}

/* Subcategory Cards */
.subcategory-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.subcategory-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 350px;
  justify-content: space-around;
}

.button-group {
  display: flex;
  gap: 10px; /* Space out buttons to prevent overlap */
  margin-top: 10px;
  justify-content: center;
}

.button-group button {
  background-color: #47509b;
  color: white;
  border: none;
  padding: 2px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
}
/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.error-message {
  color: red;
}
.subcategory-image {
  width: 100% !important;
  height: 150px !important; /* Set a fixed height */
  width: -webkit-fill-available;
  object-fit: cover; /* Ensures the image scales to fit the container without stretching */
  border-radius: 5px; /* Optional: gives a rounded look to the image edges */
}
.preview-image {
  height: 83px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.back{
  color: #47509b;
  text-decoration: none;
}
.heading-title{
  font-size: 26px;
}
.heading-title::before,
  .heading-title::after {
   
    width: 0px;
    
  }
</style>