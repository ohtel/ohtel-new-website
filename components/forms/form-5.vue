<template>
    <div>
      <Toaster ref="toaster" />
      <div class="form-row">
        <label>Vendor Name:</label>
        <input
          class="styled-input"
          type="text"
          v-model="adDetails.vendorName"
          placeholder="Enter vendor name"
        />
      </div>
  
      <div class="form-row">
        <label>Product Brand:</label>
        <input
          class="styled-input"
          type="text"
          v-model="adDetails.productBrand"
          placeholder="Enter product brand"
        />
      </div>
  
      <div class="form-row">
        <label>Material Type:</label>
        <input
          class="styled-input"
          type="text"
          v-model="adDetails.materialType"
          placeholder="Enter material type"
        />
      </div>
  
      <!-- <div class="form-row">
        <label>Deal Type:</label>
        <select class="styled-input" v-model="adDetails.dealType">
          <option value="" disabled>Select Deal Type</option>
          <option v-for="type in dealTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div> -->
  
      <div class="form-row">
        <label>Description:</label>
        <textarea
          class="styled-input"
          v-model="adDetails.description"
          placeholder="Enter description"
        ></textarea>
      </div>
      <!-- <div class="form-row">
              <label>Address of the business:</label>
              <textarea
                class="styled-input"
                v-model="adDetails.addressOfBusiness"
                placeholder="Enter address of the business"
              ></textarea>
            </div> -->
      <!-- <div class="form-row">
        <label>Area in Sq Feet:</label>
        <input
          class="styled-input"
          type="number"
          v-model="adDetails.area"
          placeholder="Enter area in sq ft"
          @input="validateField('area', 'Area cannot be negative.')"
        />
      </div> -->
      <div class="form-row">
        <label>Price:</label>
        <input
          class="styled-input"
          type="number"
          v-model="adDetails.price"
          placeholder="Enter price"
          @input="validateField('price', 'price cannot be negative.')"
        />
      </div>
      <div class="form-row">
        <label>Upload Document (PDF):</label>
        <button class="save-button" @click.prevent="handleDocumentTrigger">
          Select Document
        </button>
        <input
          type="file"
          accept=".pdf"
          @change="handleDocumentUpload"
          style="opacity: 0"
          ref="documentInputRef"
        />
      </div>

      <div v-if="adDetails.documentName" class="form-row">
        <label>Selected Document:</label>
        <span>{{ adDetails.documentName }}</span>
      </div>

      <div class="form-row">
        <label>Upload Company Logo:</label>
        <button class="save-button" @click.prevent="handleLogoTrigger">
          Select Logo
        </button>
        <input
          type="file"
          accept="image/*"
          @change="handleLogoUpload"
          style="opacity: 0"
          ref="logoInputRef"
        />
      </div>

      <div v-if="adDetails.logoName" class="form-row">
        <label>Selected Logo:</label>
        <span>{{ adDetails.logoName }}</span>
      </div>

      <div class="form-row">
        <label>Upload Images:</label>
  
        <button class="save-button" @click.prevent="handleTrigger">
          Select Images
        </button>
        <input
          type="file"
          multiple
          @change="handleImageUpload"
          style="opacity: 0"
          ref="inputRef"
        />
      </div>
      <div v-if="uploaded_image_ids?.length > 0" class="styled-input mb-3">
        <h5 class="text-center">Uploaded Images</h5>
        <div class="image-preview">
          <div
            v-for="(img, index) in uploaded_image_ids"
            :key="index"
            class="image-item"
          >
            <img
              :src="img.ad_image"
              class="selected-images"
              alt="Uploaded image"
            />
            <button
              class="image-remove"
              @click.prevent="removeUploadedImage(img.id)"
            >
              ❌
            </button>
          </div>
        </div>
      </div>
      <div v-if="adDetails.images.length" class="styled-input">
        <h5 class="text-center">Selected Images</h5>
        <div class="image-preview">
          <div
            v-for="(img, index) in adDetails.images"
            :key="index"
            class="image-item"
          >
            <img :src="img" class="selected-images" alt="Uploaded image" />
            <button class="image-remove" @click.prevent="removeImage(index)">
              ❌
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="button-group">
              <button class="save-button" @click.prevent="openGoogleMap">
                Select Location
              </button>
            </div> -->
      <!-- Modal for Google Map -->
  
      <div class="main-radio">
        <div class="styled-input w-50">
          <h5>Seller or Buyer</h5>
          <div>
            <div class="d-flex justify-content-center radio-options">
              <div class="radio-option">
                <input
                  type="radio"
                  id="Seller"
                  value="Seller"
                  v-model="adDetails.sellerOrBuyer"
                  class="styled-radio"
                />
                <label for="Seller" class="radio-label">Seller</label>
              </div>
              <div class="radio-option">
                <input
                  type="radio"
                  id="Buyer"
                  value="Buyer"
                  v-model="adDetails.sellerOrBuyer"
                  class="styled-radio"
                />
                <label for="Buyer" class="radio-label">Buyer</label>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Toaster from "~/components/Toaster.vue";
  import { BASE_URL, ENDPOINTS } from "../../environment.js";
  export default {
    components: {
      Toaster,
    },
  
    data() {
      return {
        adDetails: {
          category: "",
          sellerOrBuyer: "Seller",
          subCategory: "",
          title: "",
          dealType: "",
          description: "",
          area: "",
          price: "",
          images: [],
          expiryDate: "",
          city: "",
          state: "",
          files: [],
          vendorName: "",
          productBrand: "",
          materialType: "",
          documentFile: null,
          documentName: "",
          logoFile: null,
          logoName: "",
        },
        personalDetails: {
          fullName: "",
          contact: "",
          email: "",
          organizationName: "",
          preferredContactMethod: "",
          preferredContactMethodsEmail: false,
          preferredContactMethodsPhone: false,
        },
        categories: [],
        subCategories: [],
        showMap: false,
        searchQuery: "",
        suggestions: [],
        map: null,
        marker: null,
        defaultLocation: { lat: 12.971598, lng: 77.594566 },
        selectedCategory: null,
        today: this.getTodayDate(),
        uploaded_image_ids: [],
      };
    },
    props: {
      dataFromParent: [],
    },
    mounted() {
      if (this.dataFromParent) {
        console.log("this.dataFromParent", this.dataFromParent);
        this.adDetails.price = this.dataFromParent.price;
        this.adDetails.description = this.dataFromParent.description;
        this.adDetails.sellerOrBuyer = this.dataFromParent.sellerOrBuyer;
        this.uploaded_image_ids = this.dataFromParent.uploaded_image_ids;
        this.adDetails.ad_id = this.dataFromParent.ad_id;
        this.adDetails.category = this.dataFromParent.category;
        this.adDetails.vendorName = this.dataFromParent.vendorName;
        this.adDetails.productBrand = this.dataFromParent.productBrand;
        this.adDetails.materialType = this.dataFromParent.materialType;
        
        // Handle PDF document from API response
        if (this.dataFromParent.documentFile) {
          const pdfUrl = this.dataFromParent.documentFile;
          this.adDetails.documentFile = pdfUrl; // Store the full URL
          this.adDetails.documentName = pdfUrl.split('/').pop(); // Extract filename
        }
        
        // Handle logo from API response
        if (this.dataFromParent.logoName) {
          const logoUrl = this.dataFromParent.logoName;
          this.adDetails.logoFile = logoUrl; // Store the full URL
          this.adDetails.logoName = logoUrl.split('/').pop(); // Extract filename
        }
      }
    },
    methods: {
      validateField(fieldName, errorMessage) {
        if (this.adDetails[fieldName] < 0) {
          this.adDetails[fieldName] = 0; // Reset the value to 0 if negative
          this.$refs.toaster.showToast(errorMessage, "error");
        }
      },
      getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
  
      handleImageUpload(event) {
        this.adDetails.files = Array.from(event.target.files);
        this.adDetails.files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.adDetails.images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      },
      removeImage(index) {
        this.adDetails.images.splice(index, 1);
        this.adDetails.files.splice(index, 1);
      },
      async removeUploadedImage(imageId) {
        try {
          // Prepare payload
          const payload = {
            category_id: this.adDetails.category, // Assuming 'category' contains the category ID
            ad_id: this.adDetails.ad_id, // Ad ID
            image_id: imageId, // The ID of the image to be removed
          };
  
          // Retrieve the token
          const token = localStorage.getItem("accessToken");
  
          // Make the API call
          const response = await axios.post(
            `${BASE_URL}${ENDPOINTS.DELETE_IMAGE}`, // API endpoint
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Specify JSON format for payload
              },
            }
          );
  
          // Handle success response
          const deletedImageId = response.data.image_id;
          this.$refs.toaster.showToast("image deleted Successfully", "success");
          // Remove the image from `uploaded_image_ids`
          this.uploaded_image_ids =
            this.uploaded_image_ids.filter(
              (image) => image.id !== deletedImageId
            );
        } catch (error) {
          // Handle errors
          console.error("Error deleting image:", error);
        }
      },
  
      handleTrigger() {
        // Trigger the file input click
        this.$refs.inputRef.click();
      },
      handleDocumentTrigger() {
        this.$refs.documentInputRef.click();
      },
      handleDocumentUpload(event) {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
          this.adDetails.documentFile = file;
          this.adDetails.documentName = file.name;
        } else {
          this.$refs.toaster.showToast("Please select a PDF file", "error");
        }
      },
      handleLogoTrigger() {
        this.$refs.logoInputRef.click();
      },
      handleLogoUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          this.adDetails.logoFile = file;
          this.adDetails.logoName = file.name;
        } else {
          this.$refs.toaster.showToast("Please select an image file", "error");
        }
      },
      getFormData() {
        return {
          ...this.adDetails,
          document_uploaded: this.adDetails.documentFile,
          logo_uploaded: this.adDetails.logoFile,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  legend {
    font-weight: bold;
  }
  
  .form-row {

    align-items: center;
    margin-bottom: 10px;
  }
  
  .form-row label {
    flex: 1;
  }
  
  .form-row input,
  .form-row select,
  .form-row textarea {
    flex: 2;
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .image-preview {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .image-item img {
    max-width: 100px;
    max-height: 100px;
  }
  .image-item {
    position: relative;
  }
  
  .image-item button {
    display: block;
  }
  .form-buttons {
    padding: 10px;
  }
  .selected-images {
    height: 60px;
  }
  .image-remove {
    font-size: 8px;
    height: 25px;
    width: 25px;
    position: absolute;
    top: -8px;
    right: -9px;
    border-radius: 50%;
    border-width: 0px;
    border: 1px solid black;
    background-color: #ffffff;
  }
  /* Container for radio options */
  .radio-buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  
  /* Hide the default radio button */
  .styled-radio {
    display: none;
  }
  
  /* Style the label as custom radio button */
  .radio-label {
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    position: relative;
    background-color: #e0e0e0;
    color: #333;
  }
  
  /* Style the label for the selected state */
  .styled-radio:checked + .radio-label {
    background-color: #47509b; /* Green color when selected */
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Optional: Add transition effect */
  .styled-radio:checked + .radio-label::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(76, 175, 80, 0.2); /* Light green background when selected */
    z-index: -1;
  }
  .radio-options {
    gap: 10px;
  }
  .main-radio {
    margin-top: 20px;
    justify-items: center;
    text-align: -webkit-center;
  }
  
  .styled-input h5 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  </style>