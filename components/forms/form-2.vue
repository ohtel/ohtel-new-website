<template>
  <div>
    <Toaster ref="toaster" />
    <!-- Title Field -->
    <div class="form-row">
      <label>Title:</label>
      <input
        class="styled-input"
        type="text"
        v-model="adDetails.title"
        placeholder="Enter title"
        required
      />
    </div>
    <!-- Product Form -->
    <div class="form-row">
      <label>Description:</label>
      <textarea
        class="styled-input"
        v-model="adDetails.description"
        placeholder="Enter description"
      ></textarea>
    </div>
    <div class="form-row">
      <label>File Upload:</label>
      <div class="file-upload-wrapper">
        <input
          class="styled-input w-100"
          style="color: #f4f4f4;"
          type="file"
          @change="handleFileUpload"
          accept=".pdf"
        />
        <a v-if="adDetails.fileUploadName" @click="extractLinkName(adDetails.fileUploadName)" style="cursor: pointer;" target="_blank">
  {{ extractFileName(adDetails.fileUploadName) }}
</a>
        <!-- <span v-if="adDetails.fileUploadName" class="file-upload-name">
          {{ adDetails.fileUploadName }}
        </span> -->
      </div>
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
    <!-- Add Product Button -->

    <!-- Display Products -->
    <div v-if="adDetails.products.length">
      <h5 class="text-center">Added Products</h5>
      <div
        v-for="(product, index) in adDetails.products"
        :key="index"
        class="product-item-popup"
      >
        <p>{{ product.productName }} - {{ product.units }} units</p>
        <button @click="editProduct(index)">Edit</button>
        <button @click="deleteProduct(index)">Delete</button>
      </div>
    </div>
    <div class="form-row justify-content-center">
      <button
        class="save-button"
        @click="openAddProductModal"
        :disabled="adDetails.products.length >= 20"
      >
        Add Product
      </button>
    </div>

    <!-- Modal for Adding/Editing Products -->
    <div v-if="showProductModal" class="modal-overlay">
      <div class="modal">
        <form @submit.prevent="submitProductForm">
          <h3>{{ isEditing ? "Edit" : "Add" }} Product</h3>
          <!-- Image Upload -->
          <div class="d-flex add-product-fields">
            <label class="w-50">Image Upload:</label>
            <input
              class="w-50 colour-white"
              type="file"
              @change="handleProductImageUpload"
              accept="image/*"
            />
          </div>
          <span
            class="margin-left-auto"
            v-if="adDetails.productForm.imageName"
            >{{ adDetails.productForm.imageName }}</span
          >
          <div class="d-flex add-product-fields">
            <label class="w-50">File Upload:</label>
            <input
              class="w-50 colour-white"
              type="file"
              @change="handleProductPdfUpload"
              accept=".pdf"
            />
          </div>
          <span class="margin-left-auto" v-if="adDetails.productForm.pdfFile">{{
            adDetails.productForm.pdfFile
          }}</span>
          <div class="d-flex add-product-fields">
            <label class="w-50">Link:</label>
            <input
              class="w-50"
              type="text"
              v-model="adDetails.productForm.link"
              placeholder="Link"
            />
          </div>
          <div class="d-flex add-product-fields">
            <label class="w-50">Product Name:</label>
            <input
              class="w-50"
              type="text"
              v-model="adDetails.productForm.productName"
              placeholder="Product Name"
              required
            />
          </div>
          <div class="d-flex add-product-fields">
            <label class="w-50">Units Available:</label>
            <input
              class="w-50"
              type="number"
              v-model="adDetails.productForm.units"
              placeholder="Units Available"
              @input="validateField('units', 'Units cannot be negative.')"
              required
            />
          </div>
          <div class="d-flex add-product-fields">
            <label class="w-50">Unit type:</label>
            <input
              class="w-50"
              type="text"
              v-model="adDetails.productForm.unit_type"
              placeholder="Unit Type"
              required
            />
          </div>
          <div class="d-flex add-product-fields">
            <label class="w-50">MRP price:</label>
            <input
              class="w-50"
              type="number"
              v-model="adDetails.productForm.mrp"
              placeholder="MRP"
              @input="validateField('mrp', 'MRP cannot be negative.')"
              required
            />
          </div>
          <div class="d-flex add-product-fields">
            <label class="w-50">Offer Price:</label>
            <input
              class="w-50"
              type="number"
              v-model="adDetails.productForm.offerPrice"
              placeholder="Offer Price"
              @input="
                validateField('offerPrice', 'Offer Price cannot be negative.')
              "
            />
          </div>

          <button type="submit">
            {{ isEditing ? "Update" : "Add" }} Product
          </button>
          <button @click.prevent="closeProductModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import Toaster from "~/components/Toaster.vue";
import { BASE_URL, ENDPOINTS } from "../environment.js";
export default {
  components: {
    Toaster,
  },
  data() {
    return {
      adDetails: {
        title: "",
        description: "",
        fileUpload: null,
        fileUploadName: "",
        products: [],
        sellerOrBuyer: "Seller",
        images: [],
        files: [],
        productForm: {
          productName: "",
          link: "",
          units: "",
          unit_type: "",
          mrp: "",
          offerPrice: "",
          image: null,
          pdf: null,
          imageName: "",
          pdfFile: ""
        }
      },
      showProductModal: false,
      isEditing: false,
      editIndex: null,
      uploaded_image_ids: []
    };
  },
  props: {
    dataFromParent: [],
  },
  mounted() {
    if (this.dataFromParent) {
      // Map basic fields
      this.adDetails.title = this.dataFromParent.title || "";
      this.adDetails.description = this.dataFromParent.description || "";
      this.adDetails.sellerOrBuyer = this.dataFromParent.sellerOrBuyer || "Seller";
      this.uploaded_image_ids = this.dataFromParent.uploaded_image_ids || [];
      this.adDetails.ad_id = this.dataFromParent.ad_id;
      this.adDetails.category = this.dataFromParent.category;
      this.adDetails.fileUploadName = this.dataFromParent.document_uploaded || "";

      console.log("form-2.vue mounted - dataFromParent:", this.dataFromParent);
      console.log("form-2.vue mounted - product list:", this.dataFromParent.product_list);

      // Handle product list
      if (Array.isArray(this.dataFromParent.product_list)) {
        this.adDetails.products = this.dataFromParent.product_list.map((product) => ({
          productName: product.name || "",
          link: product.url || "",
          units: product.unit || "",
          unit_type: product.unit_available || "",
          mrp: product.price || "",
          offerPrice: product.offer_price || "",
          image: product.image ? [product.image] : null,
          imageName: product.image ? product.image.split('/').pop() : "", 
          pdf: product.catalog ? [product.catalog] : null,
          pdfFile: product.catalog ? product.catalog.split('/').pop() : "",
          id: product.id || ""
        }));
        console.log("form-2.vue mounted - mapped products:", this.adDetails.products);
      }
    }
  },
  computed: {
    isFormValid() {
      const form = this.adDetails.productForm;
      return (
        form.productName &&
        form.units &&
        form.unit_type &&
        form.mrp &&
        form.link &&
        form.units >= 0 &&
        form.mrp >= 0 &&
        (!form.offerPrice || form.offerPrice >= 0) &&
        form.image &&
        form.pdf
      );
    }
  },
  methods: {
    extractFileName(fileUploadName){
      // return fileUploadName
      return fileUploadName.split('/').pop();
    },
    extractLinkName(data) {
    try {
      const url = new URL(data);
      return window.open(url.href, '_blank');
    } catch (e) {
      console.error('Invalid URL:', data);
      return null;
    }
  },

    validateField(fieldName, errorMessage) {
      if (this.adDetails.productForm[fieldName] < 0) {
        this.adDetails.productForm[fieldName] = 0; // Reset the value to 0 if negative
        this.$refs.toaster.showToast(errorMessage, "error");
      }
    },
    handleFileUpload(event) {
      const files = event.target.files; // Get the FileList object
      if (files && files.length > 0) {
        const file = files[0]; // Get the first file
        if (file.size > 5000000) {
          // 5MB size limit (5 * 1024 * 1024 bytes)
          this.$refs.toaster.showToast(
            "File size should be less than 5MB.",
            "error"
          );
          event.target.value = ""; // Clear the file input for re-selection
        } else {
         
          this.adDetails.fileUpload = file; // Store the valid file (single file, not FileList)
          this.adDetails.fileUploadName = file.name; // Store the file name for display
          this.$refs.toaster.showToast(
            "File uploaded successfully.",
            "success"
          );
        }
      } else {
        this.$refs.toaster.showToast("No file selected.", "error");
      }
    },
    openAddProductModal() {
      // Open modal to add product
      this.showProductModal = true;
      this.isEditing = false;
      this.resetProductForm();
    },
    closeProductModal() {
      // Close modal without saving
      this.showProductModal = false;
    },
    handleProductImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.adDetails.productForm.image = file; // Store the file object
        this.adDetails.productForm.imageName = file.name; // Save the file name for display
      }
    },
    handleProductPdfUpload(event) {
      const file = event.target.files[0]; // Get the first file from the input
      if (file) {
        if (file.size > 5000000) {
          // Check if the file size exceeds 5MB (5 * 1024 * 1024 bytes)
          this.$refs.toaster.showToast(
            "File size should be less than 5MB.",
            "error"
          );
          event.target.value = ""; // Clear the file input for re-selection
        } else {
          this.adDetails.productForm.pdf = file; // Store the valid file
          this.adDetails.productForm.pdfFile = file.name; // Store the file name
          this.$refs.toaster.showToast(
            "File uploaded successfully.",
            "success"
          );
        }
      } else {
        this.$refs.toaster.showToast("No file selected.", "error");
      }
    },
    submitProductForm() {
      // Validate all required fields
      const missingFields = [];
      const invalidFields = [];

      // Required fields validation with specific messages
      if (!this.adDetails.productForm.productName) {
        missingFields.push('Product Name');
        this.$refs.toaster.showToast('Please enter a product name', 'error');
      }
      if (!this.adDetails.productForm.units) {
        missingFields.push('Units Available');
        this.$refs.toaster.showToast('Please enter the number of units available', 'error');
      }
      if (!this.adDetails.productForm.unit_type) {
        missingFields.push('Unit Type');
        this.$refs.toaster.showToast('Please specify the unit type (e.g., pieces, kg, etc.)', 'error');
      }
      if (!this.adDetails.productForm.mrp) {
        missingFields.push('MRP Price');
        this.$refs.toaster.showToast('Please enter the MRP price', 'error');
      }
      if (!this.adDetails.productForm.link) {
        missingFields.push('Link');
        this.$refs.toaster.showToast('Please enter the link', 'error');
      }
      if (!this.adDetails.productForm.image) {
        missingFields.push('Product Image');
        this.$refs.toaster.showToast('Please upload a product image', 'error');
      }
      if (!this.adDetails.productForm.pdf) {
        missingFields.push('Product PDF');
        this.$refs.toaster.showToast('Please upload a product PDF', 'error');
      }

      // Numeric validation with specific messages
      if (this.adDetails.productForm.units && this.adDetails.productForm.units < 0) {
        invalidFields.push('Units cannot be negative');
        this.$refs.toaster.showToast('Number of units cannot be negative', 'error');
      }
      if (this.adDetails.productForm.mrp && this.adDetails.productForm.mrp < 0) {
        invalidFields.push('MRP cannot be negative');
        this.$refs.toaster.showToast('MRP price cannot be negative', 'error');
      }
      if (this.adDetails.productForm.offerPrice && this.adDetails.productForm.offerPrice < 0) {
        invalidFields.push('Offer Price cannot be negative');
        this.$refs.toaster.showToast('Offer price cannot be negative', 'error');
      }

      // If there are any validation errors, return early
      if (missingFields.length > 0 || invalidFields.length > 0) {
        return;
      }

      // If validation passes, proceed with adding/updating the product
      if (this.isEditing) {
        // Update existing product and ensure the id is preserved
        this.adDetails.products[this.editIndex] = {
          ...this.adDetails.productForm,
          id: this.adDetails.products[this.editIndex].id, // Retain the original ID
        };
        this.$refs.toaster.showToast('Product updated successfully', 'success');
      } else {
        // Add new product
        if (this.adDetails.products.length < 20) {
          this.adDetails.products.push({ ...this.adDetails.productForm });
          this.$refs.toaster.showToast('Product added successfully', 'success');
        }
      }
      this.closeProductModal();
      console.log("after edit products", this.adDetails.products);
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
      this.files.splice(index, 1);
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

    editProduct(index) {
      this.isEditing = true;
      this.editIndex = index;
      this.adDetails.productForm = { ...this.adDetails.products[index] };
      this.showProductModal = true;
    },
    deleteProduct(index) {
      this.adDetails.products.splice(index, 1);
    },
    resetProductForm() {
      this.adDetails.productForm = {
        productName: "",
        units: "",
        mrp: "",
        offerPrice: "",
        link: "",
        imageName: "",
        pdfFile: "",
        image: null,
        pdf: null,
      };
    },
    getFormData() {
      // Format the data similar to form-1
      const formattedData = {
        title: this.adDetails.title || '',
        description: this.adDetails.description || '',
        products: this.adDetails.products.map(product => ({
          productName: product.productName || '',
          link: product.link || '',
          units: product.units ? product.units.toString() : '',
          unit_type: product.unit_type || '',
          mrp: product.mrp ? product.mrp.toString() : '',
          offerPrice: product.offerPrice ? product.offerPrice.toString() : '',
          image: product.image || null,
          pdf: product.pdf || null
        })),
        files: this.adDetails.files || [],
        fileUpload: this.adDetails.fileUpload || null,
        document_uploaded: this.adDetails.fileUpload || null
      };

      // Add debug logging similar to form-1
      console.log("form-2.vue getFormData() called, returning:", formattedData);
      console.log("form-2.vue title:", formattedData.title);
      console.log("form-2.vue description:", formattedData.description);
      console.log("form-2.vue products:", formattedData.products);
      console.log("form-2.vue files:", formattedData.files);
      console.log("form-2.vue document_uploaded:", formattedData.document_uploaded);

      return formattedData;
    },
  },
};
</script>
  
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: block;
}

.product-item-popup {
  margin-bottom: 10px;
  text-align: center;
}

.product-item-popup button {
  margin-left: 10px;
}

.save-button {
  margin-top: 10px;
}

.styled-input {
  margin-bottom: 10px;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #47509b;
  color: white;
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
  padding: 0px;
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
.form-row {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  margin-bottom: 10px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 450px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
  position: relative;
}

.modal h3 {
  font-size: 20px;
  font-weight: bold;
  color: #47509b;
  margin-bottom: 20px;
  text-align: center;
}

.modal form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal input[type="text"],
.modal input[type="number"],
.modal input[type="file"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.modal input[type="text"]:focus,
.modal input[type="number"]:focus,
.modal input[type="file"]:focus {
  border-color: #47509b;
  outline: none;
  box-shadow: 0 0 5px rgba(71, 80, 155, 0.5);
}

.modal button {
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #47509b;
  color: white;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.modal button:hover {
  background-color: #3c468d;
}

.modal button[type="submit"] {
  background-color: #4caf50; /* Add Product Button */
}

.modal button[type="submit"]:hover {
  background-color: #45a044;
}

.modal button.cancel {
  background-color: #f44336;
}

.modal button.cancel:hover {
  background-color: #e03127;
}

.modal .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
}

.modal .close-button:hover {
  color: #47509b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.add-product-fields {
  justify-content: space-evenly;
}
.colour-white {
  color: white;
}
.margin-left-auto {
  margin-left: auto;
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
.file-upload-wrapper{
  width: 68%;
}
</style>