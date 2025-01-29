<template>
  <div>
    <Toaster ref="toaster" />
    <div class="form-row">
      <label>Candidate Image Upload:</label>
      <input
        class="styled-input"
        type="file"
        @change="handleImageUpload"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        placeholder="upload candidate image"
      />
    </div>
    <!-- <div class="form-row">
      <label>Address:</label>
      <textarea
        class="styled-input"
        v-model="adDetails.address"
        placeholder="Enter address"
      ></textarea>
    </div> -->
    <div class="form-row">
      <label>Candidate Name:</label>
      <input
        class="styled-input"
        type="text"
        v-model="adDetails.candidateName"
        placeholder="Enter candidate name"
      />
    </div>
    <div class="form-row">
      <label>Education:</label>
      <input
        class="styled-input"
        type="text"
        v-model="adDetails.education"
        placeholder="Enter education "
      />
    </div>
    <div class="form-row">
      <label>Work Experience:</label>
      <input
        class="styled-input"
        type="text"
        v-model="adDetails.workExperience"
        placeholder="Enter Work Experience"
      />
    </div>
    <div class="form-row">
      <label>Cuisine Type:</label>
      <select class="styled-input" v-model="adDetails.cuisineType">
        <option value="" disabled>Select Cuisine Type</option>
        <option
          v-for="cuisine in cuisineList"
          :key="cuisine.id"
          :value="cuisine.id"
        >
          {{ cuisine.cuisine_name }}
        </option>
      </select>
    </div>
    <div class="form-row">
      <label>Previous Employer:</label>
      <input
        class="styled-input"
        type="text"
        v-model="adDetails.previousEmployer"
        placeholder="Enter Previous Employer"
      />
    </div>
    <div class="form-row">
      <label>Previous Salary:</label>
      <input
        class="styled-input"
        type="text"
        v-model="adDetails.previousSalary"
        placeholder="Enter Previous Salary"
      />
    </div>
    <!-- <div class="form-row">
      <label>Preferred Work Location (State):</label>
      <select
        class="styled-input"
        v-model="selectedState"
        @change="updateCities"
      >
        <option value="" disabled>Select State</option>
        <option v-for="state in states" :key="state" :value="state">
          {{ state }}
        </option>
      </select>
    </div>
    <div class="form-row">
      <label>Preferred City:</label>
      <select
        class="styled-input"
        v-model="adDetails.preferedCity"
        :disabled="!selectedState"
      >
        <option value="" disabled>Select City</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div> -->
    <div class="form-row">
      <label>Resume:</label>
      <textarea
        class="styled-input"
        v-model="adDetails.resume"
        placeholder="Enter resume"
      ></textarea>
    </div>
    <div class="form-row">
      <label>File Resume:</label>
      <input
        class="styled-input"
        type="file"
        @change="handleResumePdfUpload"
        accept=".pdf"
        placeholder="Enter area in sq ft"
      />
    </div>
    <span class="margin-left-auto" v-if="adDetails.resumeFile">{{
      adDetails.pdfFile
    }}</span>
    <div class="main-radio">
      <div class="styled-input w-50">
        <h5>Are you willing to relocate ?</h5>
        <div>
          <div class="d-flex justify-content-center radio-options">
            <div class="radio-option">
              <input
                type="radio"
                id="Relocate"
                value="Relocate"
                v-model="adDetails.relocate"
                class="styled-radio"
              />
              <label for="Relocate" class="radio-label">yes</label>
            </div>
            <div class="radio-option">
              <input
                type="radio"
                id="NoRelocate"
                value="NoRelocate"
                v-model="adDetails.relocate"
                class="styled-radio"
              />
              <label for="NoRelocate" class="radio-label">No</label>
            </div>
          </div>
        </div>
      </div>
    </div>

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
  </div>
</template>

  <script>
import cityList from "../../assets/cityList.json";
import { BASE_URL, ENDPOINTS } from "../environment.js";
import Toaster from "~/components/Toaster.vue";
import axios from "axios";
export default {
  components: {
    Toaster,
  },
  data() {
    return {
      adDetails: {
        imageFile: "",
        address: "",
        sellerOrBuyer: "Seller",
        relocate: "Relocate",
        education: "",
        candidateName: "",
        resume: "",
        uploadResume: [],
        workExperience: "",
        previousEmployer: "",
        previousSalary: "",
        preferedWorkLocation: "",
        levelType: "",
        preferedCity: "",
        fileUpload: [],
        cuisineType: "",
      },
      cuisineList: [],
      selectedState: "",
      states: [],
      cities: [],
      cityList: cityList.city_list,
    };
  },
  created() {
    // Populate the states dropdown on component load
    this.states = Object.keys(this.cityList); // Correctly fetch state names
    console.log(this.states);
    this.fetchCuisineList();
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
      this.adDetails.candidateName = this.dataFromParent.candidateName; // Ensure candidate name is fetched
      this.adDetails.education = this.dataFromParent.education;
      this.adDetails.workExperience = this.dataFromParent.experience;
      this.adDetails.cuisineType = this.dataFromParent.cuisineType;
      this.adDetails.previousEmployer = this.dataFromParent.previousEmployer;
      this.adDetails.previousSalary = this.dataFromParent.previousSalary;
      this.adDetails.preferedCity = this.dataFromParent.preferredCity;
      this.adDetails.resume = this.dataFromParent.resume;
    }
  },
  methods: {
    async fetchCuisineList() {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`${BASE_URL}master/cuisine_list/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.cuisineList = response.data.result; // Assuming the data is in `results`
        console.log("cuisine list", this.cuisineList);
      } catch (error) {
        console.error("Error fetching cuisine list:", error);
      }
    },
    updateCities() {
      this.cities = this.cityList[this.selectedState] || []; // Fetch cities for selected state
    },
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    handleImageUpload(event) {
      const files = event.target.files;
      this.adDetails.fileUpload = files;
    },
    handleResumePdfUpload(event) {
  const files = event.target.files; // Get the FileList object
  if (files && files.length > 0) { // Ensure there is at least one file
    const file = files[0]; // Get the first file// Check the file object during debugging
    if (file.size > 5000000) { // Check if file size exceeds 5MB (5 * 1024 * 1024)
      this.$refs.toaster.showToast(
        "File size should be less than 5MB.",
        "error"
      );
      event.target.value = ""; // Clear the file input for re-selection
    } else {
      this.adDetails.uploadResume = file; // Store the valid file (single file, not FileList)
      this.$refs.toaster.showToast(
        "File uploaded successfully.",
        "success"
      );
    }
  } else {
    this.$refs.toaster.showToast("No file selected.", "error");
  }
},
    removeImage(index) {
      this.adDetails.images.splice(index, 1);
      this.files.splice(index, 1);
    },

    handleTrigger() {
      // Trigger the file input click
      this.$refs.inputRef.click();
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.adDetails.uploadResume = files;
    },
    getFormData() {
      // Return form data to the parent
      return this.adDetails;
    },
  },
};
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
</style>