<template>
  <div>
    <Toaster ref="toaster" />

    <div class="form-row">
        <label>Ad Title:</label>
        <input
          class="styled-input"
          type="text"
          v-model="adDetails.title"
          placeholder="Enter ad title"
          required
        />
      </div>
    <div class="form-row">
      <label>Name:</label>
      <input
        class="styled-input"
        type="text"
        v-model="adDetails.name"
        placeholder="Enter your name"
      />
    </div>

    <div class="form-row">
      <label>Profile:</label>
      <textarea
        class="styled-input"
        v-model="adDetails.profile"
        placeholder="Enter your profile details"
      ></textarea>
    </div>

    <div class="form-row">
      <label>Company Name:</label>
      <input
        class="styled-input"
        type="text"
        v-model="adDetails.companyName"
        placeholder="Enter company name"
      />
    </div>

    <div class="form-row">
      <label>Services:</label>
      <textarea
        class="styled-input"
        v-model="adDetails.services"
        placeholder="Enter services provided"
      ></textarea>
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
      <label>Upload Images:</label>
      <button class="save-button" @click.prevent="handleImageTrigger">
        Select Images
      </button>
      <input
        type="file"
        multiple
        accept="image/*"
        @change="handleImageUpload"
        style="opacity: 0"
        ref="imageInputRef"
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
        name: "",
        profile: "",
        companyName: "",
        services: "",
        documentFile: null,
        documentName: "",
        images: [],
        files: [],
        sellerOrBuyer: "Seller",
      },
      uploaded_image_ids: [],
    };
  },

  props: {
    dataFromParent: {
      type: Object,
      default: () => ({}),
    },
  },

  mounted() {
    if (this.dataFromParent) {
      this.adDetails.name = this.dataFromParent.name || "";
      this.adDetails.profile = this.dataFromParent.profile || "";
      this.adDetails.companyName = this.dataFromParent.companyName || "";
      this.adDetails.services = this.dataFromParent.services || "";
      this.adDetails.sellerOrBuyer = this.dataFromParent.sellerOrBuyer || "Seller";
      this.uploaded_image_ids = this.dataFromParent.uploaded_image_ids || [];
      this.adDetails.documentName = this.dataFromParent.document_uploaded || "";
    }
  },

  methods: {
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

    handleImageTrigger() {
      this.$refs.imageInputRef.click();
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
        const token = localStorage.getItem("accessToken");
        const payload = {
          category_id: this.dataFromParent.category,
          ad_id: this.dataFromParent.ad_id,
          image_id: imageId,
        };

        const response = await axios.post(
          `${BASE_URL}${ENDPOINTS.DELETE_IMAGE}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const deletedImageId = response.data.image_id;
        this.$refs.toaster.showToast("Image deleted Successfully", "success");
        this.uploaded_image_ids = this.uploaded_image_ids.filter(
          (image) => image.id !== deletedImageId
        );
      } catch (error) {
        console.error("Error deleting image:", error);
        this.$refs.toaster.showToast("Error deleting image", "error");
      }
    },

    getFormData() {
      return {
        ...this.adDetails,
        document_uploaded: this.adDetails.documentFile,
      };
    },
  },
};
</script>

<style scoped>
/* Reuse the same styles from form-5.vue */
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

.image-preview {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-item {
  position: relative;
}

.image-item img {
  max-width: 100px;
  max-height: 100px;
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

.styled-radio {
  display: none;
}

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

.styled-radio:checked + .radio-label {
  background-color: #47509b;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
.display-none {
  display: none;
}   
</style> 