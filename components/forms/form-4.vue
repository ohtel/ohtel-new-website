<template>
  
    <div>
      <div class="form-row">
              <label>Ad Title:</label>
              <input
                class="styled-input"
                type="text"
                v-model="adDetails.title"
                placeholder="Enter ad title"
              />
            </div>
        <div class="d-flex add-product-fields">
      <label class="w-50">Company logo:</label>
      <input
        class=" colour-white styled-input mb-2"
        type="file"
        @change="handleImageUpload"
        
      />
    </div>
    <span class="margin-left-auto" v-if="adDetails.imageFile">{{
      adDetails.pdfFile
    }}</span>
            <div class="form-row">
              <label>Address of the business:</label>
              <textarea
                class="styled-input"
                v-model="adDetails.addressOfTheBusiness"
                placeholder="Enter address of the business"
              ></textarea>
            </div>
            <div class="form-row">
              <label>Staff Requirement:</label>
              <textarea
                class="styled-input"
                type="text"
                v-model="adDetails.staffRequirement"
                placeholder="Enter details of staff requirement"
              ></textarea>
            </div>
           
            <!-- <div class="form-row">
              <label>Price:</label>
              <input
                class="styled-input"
                type="number"
                v-model="adDetails.price"
                placeholder="Enter price"
              />
            </div> -->
            <!-- <div class="form-row">
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
            <div v-if="adDetails.images.length" class="styled-input">
              <h5 class="text-center">Selected Images</h5>
              <div class="image-preview">
                <div
                  v-for="(img, index) in adDetails.images"
                  :key="index"
                  class="image-item"
                >
                  <img :src="img" class="selected-images" alt="Uploaded image" />
                  <button
                    class="image-remove"
                    @click.prevent="removeImage(index)"
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div> -->
            <!-- <div class="button-group">
              <button class="save-button" @click.prevent="openGoogleMap">
                Select Location
              </button>
            </div> -->
            <!-- Modal for Google Map -->
           
          
            <!-- <div class="main-radio">
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
            </div> -->
            <section>
                 <!-- Walk-In Interview Section -->
    <div class="walk-in-section">
      <h3>Walk-In Interview</h3>
      <div
        v-for="(interview, index) in adDetails.walkInInterviews"
        :key="index"
        class="walk-in-form"
      >
        <div class="form-row">
          <label>Date:</label>
          <input
            type="date"
            class="styled-input"
            v-model="interview.date"
            :min="getTodayDate()"
          />
        </div>
        <div class="form-row">
          <label>Time:</label>
          <input
            type="time"
            class="styled-input"
            v-model="interview.time"
          />
        </div>
        <div class="form-row">
          <label>Address:</label>
          <textarea
            class="styled-input"
            v-model="interview.interview_address"
            placeholder="Enter interview address"
          ></textarea>
        </div>
        <button
          class="delete-button"
          @click.prevent="removeInterview(index)"
        >
          ❌ Remove
        </button>
      </div>
      <!-- Add More Button -->
      <button
        class="add-button"
        @click.prevent="addWalkInInterview"
        :disabled="adDetails.walkInInterviews.length >= 3"
      >
      ✚ Add Walk-In Interview
      </button>
    </div>
            </section>
    </div>
  </template>
  
  <script>
  export default {
  
      data() {
      return {
        adDetails: {
          companyLogoUpload: null,
          category: "",
        //   sellerOrBuyer: "Seller",
          subCategory: "",
          staffRequirement: "",
          title: "",
          price: "",
          address: "",
          images: [],
          expiryDate: "",
          addressOfTheBusiness: "",
          walkInInterviews: [
        {
          date: "",
          time: "",
          interview_address: "",
        },
      ],
        
        },
        // Initial entry for the walk-in interview
      };
    },
    props: {
    dataFromParent: [],
  },
    mounted() {
      if (this.dataFromParent) {
      console.log("this.dataFromParent", this.dataFromParent);
      this.adDetails.dealType = this.dataFromParent.dealType;
      this.adDetails.price = this.dataFromParent.price;
      this.adDetails.area = this.dataFromParent.area;
      this.adDetails.description = this.dataFromParent.description;
      this.adDetails.sellerOrBuyer = this.dataFromParent.sellerOrBuyer;
      this.uploaded_image_ids = this.dataFromParent.uploaded_image_ids;
      this.adDetails.ad_id = this.dataFromParent.ad_id;
      this.adDetails.category = this.dataFromParent.category;
      this.adDetails.candidateName = this.dataFromParent.candidateName;
      this.adDetails.education = this.dataFromParent.education;
      this.adDetails.workExperience = this.dataFromParent.experience;
      this.adDetails.cuisineType = this.dataFromParent.cuisineType;
      this.adDetails.previousEmployer = this.dataFromParent.previousEmployer;
      this.adDetails.previousSalary = this.dataFromParent.previousSalary;
      this.adDetails.preferedCity = this.dataFromParent.preferredCity;
      this.adDetails.resume = this.dataFromParent.resume;
      this.adDetails.title = this.dataFromParent.title;
    }
    },
    methods: {
      getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
  
  handleImageUpload(event) {
      const files = event.target.files;
      this.adDetails.companyLogoUpload = files;
    },
      removeImage(index) {
        this.adDetails.images.splice(index, 1);
        this.files.splice(index, 1);
      },
  
      handleTrigger() {
        // Trigger the file input click
        this.$refs.inputRef.click();
      },
      getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    addWalkInInterview() {
      if (this.adDetails.walkInInterviews.length < 3) {
        this.adDetails.walkInInterviews.push({
          date: "",
          time: "",
          address: "",
        });
      }
    },
    removeInterview(index) {
      this.adDetails.walkInInterviews.splice(index, 1);
    },
    getFormData() {
      // Return form data to the parent
      return this.adDetails;
    },
  },
  }
  </script>
  
  <style scoped>
  
  legend {
    font-weight: bold;
  }
  
  .form-row {
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
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
  
  
  .walk-in-section {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: -webkit-center;
}
.walk-in-section h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #47509b;
}
.walk-in-form {
  margin-bottom: 15px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.walk-in-form .form-row {
  margin-bottom: 10px;
}
.add-button,
.delete-button {
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}
.add-button {
  background-color: #47509b;
  color: white;
}
.add-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
.delete-button {
  background-color: #a20584;
  color: white;
}
  
  
  
  </style>