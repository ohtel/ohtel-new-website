<template>
  <div>
    <NuxtLayout />
    <Toaster ref="toaster" />
    <div class="page-container">
      <h1 class="heading-title">
        <span class="animated-text">🗂️ Sub-Category List</span>
      </h1>
      <!-- Category Tabs Section -->
      <div class="header-section">
        <div class="tabs">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="['tab', { active: selectedCategory === category.id }]"
            @click="fetchSubCategories(category.id, category.category_title,statusFilter)"
          >
            {{ category.category_title }} 
          </button>
        </div>
      </div>

      <!-- Filter Section -->
       <div class="d-flex justify-content-between">
        <div> Total : {{ subCategories.length }} Sub-Categories</div>
      
       
      
      <div class="filter-section d-flex">
        <label>Show:</label>
        <select v-model="statusFilter" @change="applyFilter">
         
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          class="add-category-button"
          @click="showAddCategoryModal = true"
        >
          Add {{ currentSubCategoryTitle=='Applicant'?'Applicant Sub Category':'Sub Category' }}
        </button>
      </div>
    </div>
    <!-- Show loader while data is loading -->
    <div v-if="isLoading" class="loader-container">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <!-- Subcategory Cards -->
      <div v-if="subCategories.length > 0&&!isLoading" class="subcategory-cards">
  <div
    v-for="subCategory in subCategories"
    :key="subCategory.id"
    class="subcategory-card"
    @click="goToSubCategoryDetails(subCategory.id, categoryTitle)"
  >
    <img
      :src="getImagePath(subCategory.sub_category_images)"
      alt="subcategory image"
      class="subcategory-image"
    />
    <div class="subcategory-details">
      <h5>{{ subCategory.sub_category_title }}</h5>
      <p>
        {{
          subCategory.sub_category_description ||
          "No description available"
        }}
      </p>

      <!-- Button Group at the bottom -->
      <div class="button-group">
        <button @click.stop="openEditModal(subCategory)">Edit</button>
        <button @click.stop="openDeleteModal(subCategory)">{{  statusFilter === "active" ? 'inactivate' : 'activate' }}</button>
      </div>
    </div>
  </div>
</div>

      <!-- Loading and Error Messages -->
     
      <div v-if="error" class="error-message">{{ error }}</div>

      <!-- Inline Modals -->
      <!-- <div v-if="showViewModal" class="modal-overlay">
        <div class="modal-content">
          <h2>View Subcategory</h2>
          <div class="input-group">
    <label>Sub-Category Title: {{ selectedSubCategory.sub_category_title }}</label>
  </div>
    <div class="input-group">
    <label>Sub-Category Description: {{ selectedSubCategory.sub_category_description }}</label>
  </div>
    <div v-if="selectedImageUrl" class="image-preview">
      <img :src="selectedImageUrl" alt="Image Preview" class="preview-image"  />
    </div>
    <div class="modal-buttons">
      <button class="close-button" @click="closeModal">Close</button>
    </div>
        </div>
      </div> -->

      <div v-if="showEditModal" class="modal-overlay">
  <div class="modal-content">
    <h2>Edit Subcategory</h2>

    <!-- Title Input -->
   
    <div class="input-group">
    <label>Sub-Category Title:</label>
    <input class="styled-input" v-model="selectedSubCategory.sub_category_title"  placeholder="Edit Title" />
  </div>
    <!-- Description Input -->
    <div class="input-group">
    <label>Sub-Category Description:</label>
    <input class="styled-input"   v-model="selectedSubCategory.sub_category_description"  placeholder="Edit Description" />
  </div>


    <!-- Image Upload Input -->
    <div class="image-upload">
      <label>Image Upload:</label>
      <input type="file" id="image_upload" @change="onImageChange" accept="image/*"  />
    </div>

    <!-- Image Preview -->
    <div v-if="selectedImageUrl" class="image-preview">
      <!-- <img :src="selectedImageUrl"  alt="Image Preview" class="preview-image"  /> -->
      <img  :src="getImagePath(selectedImageUrl)"  alt="Image Preview" class="preview-image"  /> 
     
    </div>

    <!-- Modal Buttons -->
    <div class="modal-buttons">
      <button class="save-button" @click="saveEdits">Save</button>
      <button class="close-button" @click="closeModal">Cancel</button>
    </div>
  </div>
</div>

      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal-content">
          <h2 class="modal-title">Delete Subcategory</h2>
          <p>
            Are you sure you want to {{  statusFilter === "active" ? 'inactivate' : 'activate' }} 
            {{ selectedSubCategory?.sub_category_title }}?
          </p>

          <div class="modal-buttons">
            <button class="save-button" @click="confirmDelete(selectedSubCategory)">Yes, {{  statusFilter === "active" ? 'inactivate' : 'activate' }} </button>
            <button class="close-button" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>

      <div v-if="showAddCategoryModal" class="modal modal-overlay">
  <div class="modal-content">
    <h2 class="title-popup">
      Add New {{ currentSubCategoryTitle === 'Applicant' ? 'Applicant' : 'Sub Category' }}
    </h2>

    <!-- Category Title Input -->
    <div class="input-group">
      <label>Category Title:</label>
      <input class="styled-input" v-model="newCategoryTitle" placeholder="Category Title" />
    </div>

    <!-- Category Description Input -->
    <div class="input-group">
      <label>Category Description:</label>
      <input class="styled-input" v-model="newCategoryDescription" placeholder="Category Description" />
    </div>

    <!-- Image Upload Section -->
    <div class="input-group">
      <label for="categoryImage">Upload Image:</label>
      <input type="file" id="categoryImage" @change="previewImage" accept="image/*" />
    </div>

    <!-- Image Preview Section -->
    <div v-if="imagePreview" class="image-preview">
      <img :src="imagePreview" alt="Image Preview" class="preview-image" />
    </div>

    <!-- Conditional Dropdown for Applicant Sub Category -->
    <div v-if="currentSubCategoryTitle === 'Applicant'" class="input-group">
  <label>Applicant Sub Category:</label>
  <select v-model="selectedApplicantSubCategory" class="styled-select">
    <option value="Individual">Individual</option>
    <option value="Department">Department</option>
  </select>
</div>

    <!-- Modal Buttons -->
    <div class="modal-buttons">
      <button class="save-button" @click="addCategory">
        Add {{ currentSubCategoryTitle === 'Applicant' ? 'Applicant Role' : 'Sub Category' }}
      </button>
      <button class="close-button" @click="closeModal">Cancel</button>
    </div>
  </div>
</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../environment.js";
import Toaster from "~/components/Toaster.vue"; // Import Toaster
export default {
  components: { Toaster },
  data() {
    return {
      categories: [],
      selectedCategory: null,
      subCategories: [],
      statusFilter: "active",
      loading: false,
      error: null,
      // Modal states
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showAddCategoryModal: false,
      selectedSubCategory: null,
      newCategoryTitle: '',
    newCategoryDescription: '',
    currentSubCategoryTitle: '', // set based on your context
    imagePreview: null, // stores the preview image URL
    categoryImage: null, // Used for the image file in addCategory
      selectedImageUrl: '',
      applicantSubCategories: [],
      selectedApplicantSubCategory: null,
      isLoading: true, // Loader state
    };
  },
  async created() {
    await this.fetchCategories();
    if (this.categories.length > 0) {
      await this.fetchSubCategories(
        this.categories[0].id,
        this.categories[0].category_title,
        this.statusFilter
      );
    }
  },

  methods: {
    async fetchCategories() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.CATEGORY}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter out categories with title "Applicant Roles"
        this.categories = response.data.result
          ? response.data.result.filter(
              (category) => category.category_title !== "Applicant Roles"
            )
          : [];
      } catch (error) {
        this.error = "Failed to load categories";
      }
    },
    async fetchSubCategories(categoryId, categoryTitle,statusFilter) {
      this.isLoading=true // Loader state
      this.currentSubCategoryTitle=categoryTitle
      const selectedCategory = this.categories.find(
        (cat) => cat.id === categoryId
      );
      this.selectedCategory = categoryId;
      this.categoryTitle = categoryTitle;
      this.loading = true;
      this.error = null;

      try {
        const token = localStorage.getItem("accessToken");

        // Check if the selected category title is "Applicant Roles"
        let response;
        if (selectedCategory.category_title === "Applicant Roles") {
          response = await axios.get(
            `${BASE_URL}${ENDPOINTS.APPLICANT_ROLES}?page=1`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // Map the data to match the subCategory format
          this.subCategories = response.data.results.map((item) => ({
            id: item.id,
            sub_category_title: item.applicant_role_title,
            sub_category_description:
              item.applicant_role_description || "No description available",
            sub_category_images:
              item.applicant_sub_sub_category_images || "default_image_url", // Use default if image is null
          }));
          this.isLoading=false // Loader state
        } else if (selectedCategory.category_title === "Applicant") {
          response = await axios.get(
            `${BASE_URL}${ENDPOINTS.APPLICANT}?category_id=${categoryId}&page=1&is_active=${statusFilter === "active" ? true : false}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // Map the data to match the subCategory format
          this.subCategories = response.data.results.map((item) => ({
            id: item.id,
            sub_category_title: item.applicant_sub_category_title,
            sub_category_description:
              item.applicant_sub_category_description ||
              "No description available",
            sub_category_images:
              item.applicant_sub_category_images || "default_image_url", // Use default if image is null
          }));
          this.isLoading=false // Loader state
        } else {
          response = await axios.get(
            `${BASE_URL}${
              ENDPOINTS.SUBCATEGORY
            }?category_id=${categoryId}&is_active=${
              statusFilter === "active" ? true : false
            }&page=1`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.subCategories = response.data.results || [];
          console.log(this.subCategories);
          this.isLoading=false // Loader state
        }

        
      } catch (error) {
        this.isLoading=false // Loader state
        this.error = "Failed to load subcategories";
      } finally {
        this.loading = false;
      }
    },
    applyFilter() {
      this.fetchSubCategories(this.selectedCategory, this.categoryTitle,this.statusFilter);
    },
    openViewModal(subCategory) {
      this.selectedSubCategory = subCategory;
      this.showViewModal = true;
    },
    openEditModal(subCategory) {
      this.selectedImageUrl=subCategory.sub_category_images
      this.selectedSubCategory = { ...subCategory };
      this.showEditModal = true;
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
      this.newCategoryTitle = '';
      this.newCategoryDescription = '';
      this.imagePreview = null;
      this.categoryImage = null;
      this.selectedApplicantSubCategory = null;
  
    },
  
    async addCategory() {
      if (this.currentSubCategoryTitle === 'Applicant') {
        
        const formData = new FormData();
      formData.append('applicant_sub_category_title', this.newCategoryTitle);
      formData.append('applicant_sub_category_description', this.newCategoryDescription);
      formData.append('main_category', this.selectedCategory);
      if (this.categoryImage) {
        formData.append('applicant_sub_category_images', this.categoryImage);
      }
      // Only include applicant subcategory if current category is "Applicant"
      if ( this.selectedApplicantSubCategory) {
        formData.append('applicant_sub_category_type', this.selectedApplicantSubCategory);
      }

      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${BASE_URL}${ENDPOINTS.ADDAPPLICANTSUBCATEGORY}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log('Category added successfully:', response.data);
        this.$refs.toaster.showToast("subcategory added successfully", "success");
        this.fetchSubCategories(this.selectedCategory, this.categoryTitle,this.statusFilter);
        this.closeModal();
      } catch (error) {
        console.error('Error adding category:', error);
      }
      }
      else{

      
      const formData = new FormData();
      formData.append('sub_category_title', this.newCategoryTitle);
      formData.append('sub_category_description', this.newCategoryDescription);
      formData.append('main_category', this.selectedCategory);
      if (this.categoryImage) {
        formData.append('sub_category_images', this.categoryImage);
      }
    

      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${BASE_URL}${ENDPOINTS.ADDSUBCATEGORY}${this.selectedCategory}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log('Category added successfully:', response.data);
        this.$refs.toaster.showToast("subcategory added successfully", "success");
        this.fetchSubCategories(this.selectedCategory, this.categoryTitle,this.statusFilter);
        this.closeModal();
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
    },
async saveEdits() {
  const formData = new FormData();
  this.currentSubCategoryTitle === "Applicant"?formData.append('applicant_sub_category_title', this.selectedSubCategory.applicant_sub_category_title):formData.append('sub_category_title', this.selectedSubCategory.sub_category_title);
  this.currentSubCategoryTitle === "Applicant"?formData.append('applicant_sub_category_description', this.selectedSubCategory.applicant_sub_category_description):formData.append('sub_category_description', this.selectedSubCategory.sub_category_description);
  this.currentSubCategoryTitle === "Applicant"?formData.append('applicant_sub_category_type', this.selectedSubCategory.applicant_sub_category_type):formData.append('main_category', this.selectedCategory);

  if (this.image_upload) {
    this.currentSubCategoryTitle === "Applicant"?formData.append('applicant_sub_category_images', this.image_upload):formData.append('sub_category_images', this.image_upload);
  }

  try {
    const token = localStorage.getItem("accessToken");
    if(this.currentSubCategoryTitle === "Applicant"){
      const response = await axios.put(
      `${BASE_URL}${ENDPOINTS.APPLICANT_EDITSUBCATEGORY}${this.selectedSubCategory.id}/`,
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
    }
   else{
    const response = await axios.put(
      `${BASE_URL}${ENDPOINTS.EDITSUBCATEGORY}${this.selectedSubCategory.id}/`,
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
   }
    this.fetchSubCategories(this.selectedCategory, this.categoryTitle, this.statusFilter);
    this.closeModal();
  } catch (error) {
    console.error('Error updating subcategory:', error);
  }
},
    async confirmDelete(data) {
      console.log(this.categoryTitle)
      console.log(this.selectedCategory)
      const payload={
        subcategory_id: this.categoryTitle === "Applicant"?data.id:data.id,
        category_id:  this.categoryTitle === "Applicant"?this.selectedCategory: data.main_category,
        is_active: this.statusFilter === "active" ? false: true
        
      }
      console.log(payload)
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.STATUSUPDATE}`,payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    this.$refs.toaster.showToast(
          "subcategory deleted successfully",
          "success"
        );
        this.fetchSubCategories(this.selectedCategory, this.categoryTitle, this.statusFilter);
    this.closeModal();
  } catch (error) {
    this.$refs.toaster.showToast(
          "error deleting subcategory ",
          "error"
        );
  }
},
    getImagePath(subCategory) {
      let imagePath = subCategory|| "default_image_url";

      // Check if the path contains '/media/media' and replace it with '/media'
      if (imagePath.includes("/media/media")) {
        imagePath = imagePath.replace("/media/media", "/media");
      }

      return imagePath;
    },
    goToSubCategoryDetails(subCategoryId, subCategoryTitle) {
      if (subCategoryTitle === "Applicant") {
        this.$router.push(`/sub-category-details/${subCategoryId}`);
      }
    },
    previewImage(event) {
    // Get the selected file
    const file = event.target.files[0];
      if (file) {
        this.categoryImage = file;
        this.imagePreview = URL.createObjectURL(file);
      }

    // If a file is selected
    if (file) {
      const reader = new FileReader();
      
      // Set up the file reader onload function
      reader.onload = (e) => {
        // Set the image preview to the file's URL
        this.imagePreview = e.target.result;
      };
      
      // Read the file as a data URL
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, clear the preview
      this.imagePreview = null;
    }
  },

  onImageChange(event) {
    // Get the selected file
    const file = event.target.files[0];
      if (file) {
        this.image_upload = file;
        this.selectedImageUrl = URL.createObjectURL(file);
      }

    // If a file is selected
    if (file) {
      const reader = new FileReader();
      
      // Set up the file reader onload function
      reader.onload = (e) => {
        // Set the image preview to the file's URL
        this.selectedImageUrl = e.target.result;
      };
      
      // Read the file as a data URL
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, clear the preview
      this.imagePreview = null;
    }
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

   .send-button {
    background-color: #47509B;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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
.input-group,.image-upload label {
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
.image-preview{
  margin-right: auto;
  margin-top: 30px;
}
.preview-image{
  height: 83px;
}

</style>