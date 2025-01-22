<template>
  <div>
    <Toaster ref="toaster" />

    <div class="popup-overlay">
      <div class="popup-content">
        <h1>{{ edit ? "Edit" : "Add" }} Advertisement</h1>
        <!-- <form @submit.prevent="submitAd"> -->
        <!-- Ad Details Section -->
        <fieldset class="fieldset-class">
          <legend class="form-legend">Ad Details</legend>
          <div class="form-row">
            <label>Category:</label>
            <select
              class="styled-input"
              v-model="adDetails.category"
              @change="fetchSubCategories(adDetails.category)"
              :disabled=edit
            >
              <!-- Placeholder option -->
              <option value="" disabled selected>Select Category</option>
              <option
                v-for="cat in categories"
                :key="cat.value"
                :value="cat.id"
              >
                {{ cat.category_title }}
              </option>
            </select>
          </div>

          <div v-if="adDetails.category != ''" class="form-row">
            <label>Sub-Category:</label>
            <select
              class="styled-input"
              v-model="adDetails.subCategory"
              :disabled="!adDetails.category"
              @change="fetchSubSubCategories(adDetails.subCategory)"
            >
              <option value="" disabled selected>
                {{
                  adDetails.category
                    ? "Select Sub-Category"
                    : "Select Category to enable Sub-Category"
                }}
              </option>
              <option
                v-for="sub in subCategories"
                :key="sub.id"
                :value="sub.id"
              >
                {{ sub.sub_category_title }}
              </option>
            </select>
          </div>
          <div
            v-if="
              adDetails.subCategory &&
              !others &&
              selectedCategory.category_title === 'Applicant'
            "
            class="form-row"
          >
            <label>Sub-Sub-Category:</label>
            <select
              class="styled-input"
              v-model="adDetails.subSubCategory"
              :disabled="!adDetails.subCategory"
              @change="changeSubSubCategories(adDetails.subSubCategory)"
            >
              <option value="" disabled selected>
                {{
                  adDetails.subCategory
                    ? "Select Sub-Sub-Category"
                    : "Select Sub-Category to enable Sub-Sub-Category"
                }}
              </option>
              <option
                v-for="sub in subSubCategories"
                :key="sub.id"
                :value="sub.applicant_role_title ? sub.id : sub.code"
              >
                {{
                  sub.applicant_role_title
                    ? sub.applicant_role_title
                    : sub.title
                }}
              </option>
            </select>
          </div>
          <div v-if="others == true && others != 'null'" class="form-row">
            <label> Sub-category Title:</label>
            <input
              class="styled-input"
              type="text"
              v-model="adDetails.subCategoryTitle"
              placeholder="Enter ad title"
            />
          </div>
          <div v-if="subSubOthers" class="form-row">
            <label> Sub-Sub-category Title:</label>
            <input
              class="styled-input"
              type="text"
              v-model="adDetails.subSubCategoryTitle"
              placeholder="Enter ad title"
            />
          </div>
          <div class="form-row">
            <label>Ad Title:</label>
            <input
              class="styled-input"
              type="text"
              v-model="adDetails.title"
              placeholder="Enter ad title"
            />
          </div>
          <div v-if="showLevels" class="form-row">
            <label>Level Type:</label>
            <select class="styled-input" v-model="adDetails.levelType">
              <option value="" disabled>Select Work Experience</option>
              <option value="exec">Executive Level</option>
              <option value="mid">Mid Level</option>
              <option value="first">First Level</option>
            </select>
          </div>
          <div class="form-row">
            <label for="expiryDate">Expiry Date:</label>

            <input
              id="expiryDate"
              class="styled-input"
              type="date"
              v-model="adDetails.expiryDate"
              :min="today"
              placeholder="Select expiry date"
            />
          </div>

          <div
            id="mapModal"
            v-if="
              this.selectedCategory &&
              this.selectedCategory?.category_title !== 'Recruiter'
            "
            class="map-modal google-map styled-input"
          >
            <h5 class="text-center">Select Address</h5>
            <div v-if="this.edit&&setLocationValue.lat&&setLocationValue.lng">
              <googleMap
              ref="googleMapComponent"
              @mapEvent="handleMapEvent"
              :mapCenter="setLocationValue"
            ></googleMap>
            </div>
            <div v-else>
              <googleMap
              ref="googleMapComponent"
              @mapEvent="handleMapEvent"
            ></googleMap>
            </div>
            
          </div>
          <div
            v-if="
              this.selectedCategory &&
              this.selectedCategory?.category_title !== 'Recruiter'
            "
            class="form-row"
          >
            <label>Address: </label>
            <textarea
              disabled
              class="styled-input"
              v-model="adDetails.address"
              placeholder="please select address from map"
            ></textarea>
          </div>
          <form1
            v-if="
              this.selectedCategory?.category_title === 'Spaces' ||
              this.selectedCategory?.category_title === 'Used Equipments' ||
              this.selectedCategory?.category_title === 'Shared Spaces'
            "
            ref="form1Ref"
            :dataFromParent="adDetails"
          >
          </form1>
          <form2
            v-if="
              this.selectedCategory?.category_title === 'Market Deals' ||
              this.selectedCategory?.category_title ===
                'Foods Factory/Home Chef'
            "
            ref="form2Ref"
            :dataFromParent="adDetails"
          >
          </form2>
          <form3
            v-if="this.selectedCategory?.category_title === 'Applicant'"
            ref="form3Ref"
              :dataFromParent="adDetails"
          >
          </form3>
          <form4
            v-if="this.selectedCategory?.category_title === 'Recruiter'"
            ref="form4Ref"
             :dataFromParent="adDetails"
          >
          </form4>
        </fieldset>

        <!-- Personal Details Section -->
        <personal-details
          v-if="this.selectedCategory?.category_title"
          :selectedCategory="selectedCategory?.category_title"
          ref="personalDetailsRef"
          :dataFromParent="adDetails"
        ></personal-details>

        <!-- Buttons -->
        <div class="form-buttons">
          <button
            class="close-button"
            type="button"
            @click.prevent="closePopup"
          >
            Close
          </button>
          <button class="save-button" @click="submitAd" type="submit">
            Next
          </button>
        </div>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Toaster from "~/components/Toaster.vue";
import { BASE_URL, ENDPOINTS } from "../environment.js";
import googleMap from "../components/googleMap.vue";
import form1 from "../components/forms/form-1.vue";
import form2 from "../components/forms/form-2.vue";
import form3 from "../components/forms/form-3.vue";
import form4 from "../components/forms/form-4.vue";
import personalDetails from "../components/forms/presonal-details.vue";
export default {
  components: {
    googleMap,
    form1,
    form2,
    form3,
    form4,
    personalDetails,
    Toaster,
  },
  data() {
    return {
      adDetails: {
        category: "",
        sellerOrBuyer: "Seller",
        subCategory: "",
        subSubCategory: "",
        title: "",
        dealType: "",
        description: "",
        area: "",
        price: "",
        address: "",
        images: [],
        expiryDate: "",
        city: "",
        state: "",
        subCategoryTitle: "",
        subSubCategoryTitle: "",
        levelType: "",
      },
      showLevels: false,
      formDataFromPersonalDetails: {},
      formDataFromChild: {},
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
      subSubCategories: [],
      dealTypes: ["Sell", "Rent", "Lease", "Partner", "Invest"],
      showMap: false,
      searchQuery: "",
      suggestions: [],
      map: null,
      marker: null,
      defaultLocation: { lat: 12.9716, lng: 77.5946 },
      setLocationValue: { lat: null, lng: null },
      selectedCategory: null,
      today: this.getTodayDate(),
      files: [],
      others: "null",
      subSubOthers: false,
      edit: false,
    };
  },
  props: {
    initialData: [],
  },
  async mounted() {
    await this.fetchCategories();
    if (this.initialData) {
      this.edit = true;
      this.selectedCategory = this.initialData.ad.type;
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
              category_id:
                this.initialData.category.name == "Jobs"
                  ? 3
                  : this.initialData.category.id,
              ad_uuid: this.initialData.ad.uuid,
              type: this.initialData.ad.type,
            },
          }
        );
        this.selectedPost = response.data; // Assuming the response contains the ad details
        this.showViewModal = true; // Show the modal after data is fetched
        this.assignValues(this.selectedPost);
        if (this.edit) {
          this.$nextTick(() => {
            this.$refs.googleMapComponent.initializeMap(); // Refresh the googleMap component
          });
        }
      } catch (error) {
        console.error("Error fetching ad details:", error);
      }
    } else {
      this.setLocationValue.lat = 12.9716;
      this.setLocationValue.lng = 77.5946;
      this.defaultLocation.lat = 12.9716;
      this.defaultLocation.lng = 77.5946;
    }
  },
  methods: {
    assignValues(data) {
      // Reassign `setLocationValue` to ensure reactivity
      this.setLocationValue = {
        lat: data.result.ad.coordinate.latitude,
        lng: data.result.ad.coordinate.longitude,
      };
      this.defaultLocation = { ...this.setLocationValue }; // Ensure defaultLocation is also updated
      this.adDetails.category =
        data.result.ad.main_category == 3 ? 8 : data.result.ad.main_category;
      this.fetchSubCategories(
        data.result.ad.main_category == 3 ? 8 : data.result.ad.main_category
      );
      this.adDetails.title = data.result.ad.ad_title;
      this.adDetails.description = data.result.ad.ad_description;
      this.adDetails.subCategory = data.result.ad.sub_category;
  
     
      this.adDetails.address = data.result.ad.address;
      this.adDetails.dealType = data.result.ad.deal_type;
      this.adDetails.price = data.result.ad.price;
      this.adDetails.area = data.result.ad.area;
      this.adDetails.sellerOrBuyer = data.result.ad.ad_type;
      this.adDetails.description = data.result.ad.ad_description;
      this.adDetails.fullName = data.result.ad.ad_posted_by;
      this.adDetails.contact = data.result.ad.contact_number;
      this.adDetails.email = data.result.ad.contact_email;
      this.adDetails.organizationName = data.result.ad.organization_name;
      this.adDetails.preferredContactMethod =
        data.result.ad.can_be_contacted_via_call;
      this.adDetails.preferredContactMethodsEmail =
        data.result.ad.can_be_contacted_via_email;
      this.adDetails.uploaded_image_ids = data.result.ad.image_ids;
      this.adDetails.ad_id = data.result.ad.ad_id;
      this.adDetails.document_uploaded=data.result.ad.document_uploaded;
      this.adDetails.previousSalary = data.result.ad.previous_salary;
      (this.adDetails.product_list = data.result.ad.product_list),
        (this.adDetails.candidateName = data.result.ad.candidate_name),
        (this.adDetails.education = data.result.ad.education),
        (this.adDetails.experience = data.result.ad.working_experience),    
        (this.adDetails.cuisineType = data.result.ad.cuisine_type),
        (this.adDetails.previousEmployer = data.result.ad.previous_employer),
        (this.adDetails.expiryDate = data.result.ad.expiry.split("T")[0]);
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
    closePopup() {
      this.$emit("close");
    },
    async fetchSubCategories(categoryId) {
      this.showLevels = false;
      this.subSubOthers = false;
      this.adDetails.subCategory = "";
      this.others = "null";
      try {
        // Find the selected category based on categoryId
        this.selectedCategory = this.categories.find(
          (category) => category.id === categoryId
        );

        if (!this.selectedCategory) {
          console.error("Category not found", this.selectedCategory);
          return;
        }

        const token = localStorage.getItem("accessToken");
        // Check if category_title is 'Applicant'
        if (this.selectedCategory.category_title === "Applicant") {
          const response = await axios.get(
            `${BASE_URL}${ENDPOINTS.APPLICANT_SUBCATEGORY}?category_id=3&type=Applicant`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.subCategories = response.data.result.data;
        } else {
          const response = await axios.get(
            `${BASE_URL}${ENDPOINTS.SUBCATEGORY}?category_id=${categoryId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.subCategories = response.data.results;
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    },
    changeSubSubCategories(subCategoryId) {
      const selectedSubSubCategory = this.subSubCategories.find(
        (subCategory) => subCategory.id === subCategoryId
      );
      if (typeof subCategoryId === "number") {
        this.showLevels = true;
      } else {
        this.showLevels = false;
      }
      if (
        selectedSubSubCategory &&
        selectedSubSubCategory.applicant_role_title == "Others"
      ) {
        this.subSubOthers = true;
      } else {
        this.subSubOthers = false;
      }
    },
    async fetchSubSubCategories(subCategoryId) {
      this.subSubCategories = "";
      this.adDetails.subSubCategory = "";
      this.subSubOthers = false;
      try {
        // Find the subcategory with the matching ID
        const selectedSubCategory = this.subCategories.find(
          (subCategory) => subCategory.id === subCategoryId
        );
        if (selectedSubCategory) {
          // Check if the sub_category_title is "Others"
          if (selectedSubCategory.sub_category_title === "Others") {
            this.others = true;
          } else {
            this.others = false;
          }

          // Assign sub_sub_category_list or levels based on availability
          this.subSubCategories =
            selectedSubCategory.sub_sub_category_list?.length > 0
              ? selectedSubCategory.sub_sub_category_list
              : selectedSubCategory.levels || [];
        } else {
          // Handle the case where the subcategory ID doesn't exist
          console.error(`Subcategory with ID ${subCategoryId} not found.`);
          this.subSubCategories = [];
          this.others = false; // Reset others flag if no subcategory is found
        }
      } catch (error) {
        console.error("Error fetching sub-subcategories:", error);
      }
    },
    async submitAd() {
      let formRefPersonalDetails = null;
      if (this.$refs.personalDetailsRef) {
        formRefPersonalDetails = this.$refs.personalDetailsRef;
        this.formDataFromPersonalDetails = formRefPersonalDetails.getFormData();
      }
      let formRef = null;
      // Determine which form is currently active based on selectedCategory
      if (
        this.selectedCategory?.category_title === "Spaces" ||
        this.selectedCategory?.category_title === "Used Equipments" ||
        this.selectedCategory?.category_title === "Shared Spaces"
      ) {
        formRef = this.$refs.form1Ref;
      } else if (
        this.selectedCategory?.category_title === "Market Deals" ||
        this.selectedCategory?.category_title === "Foods Factory/Home Chef"
      ) {
        formRef = this.$refs.form2Ref;
      } else if (this.selectedCategory?.category_title === "Applicant") {
        formRef = this.$refs.form3Ref;
      } else if (this.selectedCategory?.category_title === "Recruiter") {
        formRef = this.$refs.form4Ref;
      }
      // Validate the formRef and call the respective `getFormData` method
      if (formRef && typeof formRef.getFormData === "function") {
        this.formDataFromChild = formRef.getFormData();
        // Proceed with additional logic, e.g., API call
      } else {
      }
      await this.getCityAndState(
        this.defaultLocation.lat,
        this.defaultLocation.lng
      );

      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      // Adding required payload details for Spaces,Used Equipments,Shared Spaces
      if (
        this.selectedCategory?.category_title === "Spaces" ||
        this.selectedCategory?.category_title === "Used Equipments" ||
        this.selectedCategory?.category_title === "Shared Spaces"
      ) {
        // Validation: Collect missing fields
        const missingFields = [];
        if (!this.selectedCategory?.category_title) {
          missingFields.push("Category");
        }
        if (!this.defaultLocation.lat || !this.defaultLocation.lng) {
          missingFields.push("Location Coordinates");
        }
        if (!this.selectedCategory.id) {
          missingFields.push("Main Category");
        }
        if (!this.formDataFromChild.sellerOrBuyer) {
          missingFields.push("Ad Type");
        }
        if (
          !this.adDetails.subCategoryTitle &&
          this.others == true &&
          this.others != "null"
        ) {
          missingFields.push("Sub Category Title");
        }

        if (!this.adDetails.city) {
          missingFields.push("City");
        }
        if (!this.adDetails.state) {
          missingFields.push("State");
        }
        if (!this.adDetails.expiryDate) {
          missingFields.push("Expiry Date");
        }
        if (!this.adDetails.subCategory) {
          missingFields.push("Sub Category");
        }
        if (!this.formDataFromChild.dealType) {
          missingFields.push("Deal Type");
        }
        if (!this.adDetails.address) {
          missingFields.push("Address");
        }
        if (!this.formDataFromPersonalDetails.fullName) {
          missingFields.push("Contact Person");
        }
        if (
          !this.formDataFromPersonalDetails.contact &&
          !this.formDataFromPersonalDetails.email
        ) {
          missingFields.push("Contact information");
        }

        // Check if there are missing fields
        if (missingFields.length > 0) {
          // Show toaster with missing fields
          this.$refs.toaster.showToast(
            `Please fill the following fields: ${missingFields.join(", ")}`,
            "error"
          );
          return; // Stop submission
        }

        // Proceed with form data submission
        const formData = new FormData();
        formData.append(
          "coordinate",
          JSON.stringify({
            longitude: this.defaultLocation.lng,
            latitude: this.defaultLocation.lat,
          })
        );
        formData.append(
          "ad_city_cordinate",
          JSON.stringify({
            longitude: this.defaultLocation.lng,
            latitude: this.defaultLocation.lat,
          })
        );
        formData.append(
          "location",
          JSON.stringify({
            point: {
              longitude: this.defaultLocation.lng,
              latitude: this.defaultLocation.lat,
            },
          })
        );
        formData.append("main_category", this.selectedCategory.id);
        formData.append("ad_type", this.formDataFromChild.sellerOrBuyer);
        formData.append("ad_city", this.adDetails.city);
        formData.append("state", this.adDetails.state);
        formData.append("ad_name", this.adDetails.title);
        formData.append("sub_category", this.adDetails.subCategory);
        formData.append("deal_type", this.formDataFromChild.dealType);
        formData.append("ad_description", this.formDataFromChild.description);
        formData.append("area", this.formDataFromChild.area);
        formData.append("price", this.formDataFromChild.price);
        formData.append("address", this.adDetails.address);
        const expiryDate = new Date(this.adDetails.expiryDate); // Convert the date string to a Date object
        const utcExpiryDate = expiryDate.toISOString(); // Convert to ISO 8601 UTC format
        formData.append("expiry", utcExpiryDate);
        formData.append(
          "other_sub_category_text",
          this.adDetails.subCategoryTitle
        );

        for (const file of this.formDataFromChild.files) {
          formData.append("image_ids", file);
        }

        formData.append(
          "contact_person",
          this.formDataFromPersonalDetails.fullName || ""
        );
        formData.append(
          "contact_number",
          this.formDataFromPersonalDetails.contact || ""
        );
        formData.append(
          "contact_email",
          this.formDataFromPersonalDetails.email || ""
        );
        formData.append(
          "organization_name",
          this.formDataFromPersonalDetails.organizationName || ""
        );
        formData.append(
          "can_be_contacted_via_call",
          this.formDataFromPersonalDetails.preferredContactMethodsPhone
        );
        formData.append(
          "can_be_contacted_via_email",
          this.formDataFromPersonalDetails.preferredContactMethodsEmail
        );
        formData.append("can_be_contacted_via_message", false);
        formData.append("can_be_called_for_interview", false);
        formData.append("interview_list", JSON.stringify([]));

        try {

          let response;
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };

          if (!this.edit) {
            response = await axios.post(
              `${BASE_URL}${ENDPOINTS.ADDADS_SUS}`,
              formData,
              { headers }
            );
          } else {
            response = await axios.put(
              `${BASE_URL}${ENDPOINTS.EDIT_SUS}${this.selectedPost.result.ad.ad_id}/`,
              formData,
              { headers }
            );
          }

          // Show success message
          this.$refs.toaster.showToast("Ad Submitted Successfully", "success");

          // Close popup after a short delay
          setTimeout(() => {
            this.closePopup();
          }, 1000);
        } catch (error) {
          // Improved error handling
          console.error("Error during request:", error);

          if (error.response && error.response.data) {
            // Extract and format error messages from the response
            const responseData = error.response.data;
            const errorMessages = Object.keys(responseData)
              .map((key) => {
                const message = Array.isArray(responseData[key])
                  ? responseData[key].join(", ")
                  : responseData[key];
                return `${key}: ${message}`;
              })
              .join(". ");

            // Show formatted error messages in the toaster
            this.$refs.toaster.showToast(errorMessages, "error");
          } else {
            // Fallback for unexpected errors
            this.$refs.toaster.showToast(
              "An unexpected error occurred.",
              "error"
            );
          }
        }
      }
      //Additional required fields for market deals and foods
      else if (
        this.selectedCategory?.category_title === "Market Deals" ||
        this.selectedCategory?.category_title === "Foods Factory/Home Chef"
      ) {
        // Validation: Collect missing fields
        const missingFields = [];

        if (!this.defaultLocation.lat || !this.defaultLocation.lng) {
          missingFields.push("Location Coordinates");
        }
        if (!this.selectedCategory.id) {
          missingFields.push("Main Category");
        }
        if (!this.formDataFromChild.sellerOrBuyer) {
          missingFields.push("Ad Type");
        }
        if (!this.adDetails.city) {
          missingFields.push("City");
        }
        if (!this.adDetails.state) {
          missingFields.push("State");
        }
        if (!this.adDetails.expiryDate) {
          missingFields.push("Expiry Date");
        }
        if (!this.adDetails.title) {
          missingFields.push("Ad Title");
        }
        if (!this.adDetails.subCategory) {
          missingFields.push("Sub Category");
        }
        if (!this.formDataFromChild.description) {
          missingFields.push("Ad Description");
        }
        if (!this.adDetails.address) {
          missingFields.push("Address");
        }
        if (!this.formDataFromPersonalDetails.fullName) {
          missingFields.push("Contact Person");
        }
        if (
          !this.formDataFromPersonalDetails.contact &&
          !this.formDataFromPersonalDetails.email
        ) {
          missingFields.push("Contact information");
        }

        // Check if there are missing fields
        if (missingFields.length > 0) {
          this.$refs.toaster.showToast(
            `Please fill the following fields: ${missingFields.join(", ")}`,
            "error"
          );
          return; // Stop submission
        }
        // Prepare FormData payload
        const formData = new FormData();
        // Transform product list to desired format

        const transformedProducts = this.formDataFromChild.products.map(
          (product) => ({
            product_image:
              product.image instanceof File ? product.image : product.image, // Check if it's a file
            name: product.productName || "",
            unit_available: product.units || 0,
            unit: product.unit_type || "",
            price: product.mrp || 0,
            offer_price: product.offerPrice || 0,
            product_catalog:
              product.pdf instanceof File ? product.pdf : product.pdf, // Check if it's a file
            url: product.link || "",
            id: product.id || "",
          })
        );
        // Append each file to the FormData
        transformedProducts.forEach((product, index) => {
          if (product.product_image) {
            formData.append(`product_image_${index}`, product.product_image);
          }
          if (product.product_catalog) {
            formData.append(
              `product_catalog_${index}`,
              product.product_catalog
            );
          }
        });
        // Append JSON string of product list without file references
        const productListWithoutFiles = transformedProducts.map(
          ({ product_image, product_catalog, ...rest }) => rest
        );
        formData.append(
          "product_list",
          JSON.stringify(productListWithoutFiles)
        );

        formData.append(
          "coordinate",
          JSON.stringify({
            longitude: this.defaultLocation.lng,
            latitude: this.defaultLocation.lat,
          })
        );
        formData.append(
          "location",
          JSON.stringify({
            point: {
              longitude: this.defaultLocation.lng,
              latitude: this.defaultLocation.lat,
            },
          })
        );
        formData.append("main_category", this.selectedCategory.id);
        formData.append("ad_type", this.formDataFromChild.sellerOrBuyer);
        formData.append("city", this.adDetails.city);
        formData.append("state", this.adDetails.state);
        const expiryDate = new Date(this.adDetails.expiryDate); // Convert the date string to a Date object
        const utcExpiryDate = expiryDate.toISOString(); // Convert to ISO 8601 UTC format
        formData.append("expiry", utcExpiryDate);
        formData.append("ad_name", this.adDetails.title);
        formData.append("sub_category", this.adDetails.subCategory);
        formData.append("ad_description", this.formDataFromChild.description);
        formData.append("address", this.adDetails.address);
        formData.append("product_length", transformedProducts.length);

        formData.append("document_uploaded", this.formDataFromChild.fileUpload);

        if (this.formDataFromChild.files.length > 0) {
          for (const file of this.formDataFromChild.files) {
            formData.append("image_ids", file); // Assuming `file` is a binary file
          }
        }
        // Add binary files

        // Add transformed products

        formData.append(
          "contact_person",
          this.formDataFromPersonalDetails.fullName || ""
        );
        formData.append(
          "contact_email",
          this.formDataFromPersonalDetails.email || ""
        );
        formData.append(
          "organization_name",
          this.formDataFromPersonalDetails.organizationName || ""
        );
        formData.append(
          "contact_number",
          this.formDataFromPersonalDetails.contact || ""
        );
        formData.append(
          "can_be_contacted_via_email",
          !!this.formDataFromPersonalDetails.preferredContactMethodsEmail
        );
        formData.append("interview_list", JSON.stringify([])); // Assuming an empty list

        try {
         
          let response;
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };

          if (!this.edit) {
            response = await axios.post(
              `${BASE_URL}${ENDPOINTS.ADDADS_MF}`,
              formData,
              { headers }
            );
          } else {
            response = await axios.put(
              `${BASE_URL}${ENDPOINTS.EDIT_MARKET_AND_FOODS}${this.selectedPost.result.ad.ad_id}/`,
              formData,
              { headers }
            );
          }
          this.$refs.toaster.showToast("Ad Submitted Successfully", "success");
          setTimeout(() => {
            this.closePopup();
          }, 1000);
        } catch (error) {
          // Handle error response
          if (error.response && error.response.data) {
            const responseData = error.response.data;

            // Check if 'detail' contains the error message
            if (responseData.detail) {
              try {
                // Extract key-value pairs using regex
                const detailString = responseData.detail;
                const errorMatches = [
                  ...detailString.matchAll(
                    /'(\w+)': \[ErrorDetail\(string="(.*?)"/g
                  ),
                ];

                // Format error messages
                const errorMessages = errorMatches
                  .map((match) => `${match[1]} - ${match[2]}`) // Combine field and message
                  .join(". "); // Separate with periods

                // Show formatted error messages in the toaster
                this.$refs.toaster.showToast(errorMessages, "error");
              } catch (parseError) {
                // Fallback if parsing fails
                this.$refs.toaster.showToast(
                  "Invalid error response format.",
                  "error"
                );
              }
            } else {
              // Generic fallback for errors without 'detail'
              this.$refs.toaster.showToast(
                "An unexpected error occurred.",
                "error"
              );
            }
          } else {
            // Fallback for network or unexpected errors
            this.$refs.toaster.showToast(
              "An unexpected error occurred.",
              "error"
            );
          }
        }
      } else if (this.selectedCategory?.category_title === "Applicant") {
        const missingFields = [];

        if (!this.defaultLocation.lat || !this.defaultLocation.lng) {
          missingFields.push("Location Coordinates");
        }
        if (!this.selectedCategory.id) {
          missingFields.push("Main Category");
        }

        // if (!this.adDetails.city) {
        //   missingFields.push("City");
        // }
        if (this.showLevels && this.adDetails.levelType == "") {
          missingFields.push("Level Type");
        }
        // if (!this.adDetails.state) {
        //   missingFields.push("State");
        // }
        if (!this.adDetails.expiryDate) {
          missingFields.push("Expiry Date");
        }
        if (!this.formDataFromChild.cuisineType) {
          missingFields.push("Cuisine Type");
        }
        if (!this.adDetails.subSubCategory && this.adDetails.subCategory) {
          missingFields.push("Sub Sub Category");
        }
        if (this.others == true && this.adDetails.subCategoryTitle == "") {
          missingFields.push("Sub Category Title");
        }
        if (
          this.subSubOthers == true &&
          this.adDetails.subSubCategoryTitle === ""
        ) {
          missingFields.push("Sub Sub Category Title");
        }
        if (!this.adDetails.title) {
          missingFields.push("Ad Title");
        }
        if (!this.adDetails.subCategory) {
          missingFields.push("Sub Category");
        }
        if (!this.adDetails.address) {
          missingFields.push("Address");
        }
        if (!this.formDataFromChild.education) {
          missingFields.push("Education");
        }
        if (!this.formDataFromChild.workExperience) {
          missingFields.push("Working Experience");
        }
        if (this.formDataFromChild.relocate == null) {
          missingFields.push("Willingness to Relocate");
        }
        if (!this.formDataFromChild.previousEmployer) {
          missingFields.push("Previous Employer");
        }
        if (!this.formDataFromChild.previousSalary) {
          missingFields.push("Previous Salary");
        }
        if (!this.formDataFromPersonalDetails.fullName) {
          missingFields.push("Contact Person");
        }
        if (
          !this.formDataFromPersonalDetails.contact &&
          !this.formDataFromPersonalDetails.email
        ) {
          missingFields.push("Contact information");
        }

        // Check if there are missing fields
        if (missingFields.length > 0) {
          // Show toaster with missing fields
          this.$refs.toaster.showToast(
            `Please fill the following fields: ${missingFields.join(", ")}`,
            "error"
          );
          return; // Stop submission
        }

        // Proceed with form data submission
        const formData = new FormData();
        formData.append(
          "coordinate",
          JSON.stringify({
            longitude: this.defaultLocation.lng,
            latitude: this.defaultLocation.lat,
          })
        );
        formData.append(
          "location",
          JSON.stringify({
            point: {
              longitude: this.defaultLocation.lng,
              latitude: this.defaultLocation.lat,
            },
          })
        );
        formData.append("main_category", this.selectedCategory.id);
        formData.append("ad_type", "Applicant");
        // formData.append("ad_city", this.adDetails.city);
        // formData.append("state", this.adDetails.state);
        formData.append("cuisine_type", this.formDataFromChild.cuisineType);
        if (this.others == true && this.adDetails.subCategoryTitle != "") {
          formData.append("other", this.adDetails.subCategoryTitle);
        }
        const expiryDate = new Date(this.adDetails.expiryDate); // Convert the date string to a Date object
        const utcExpiryDate = expiryDate.toISOString(); // Convert to ISO 8601 UTC format
        formData.append("expiry", utcExpiryDate);
        if (
          !this.others &&
          (this.adDetails.subSubCategory == "exec" ||
            this.adDetails.subSubCategory == "mid" ||
            this.adDetails.subSubCategory == "first")
        ) {
          formData.append("level_type", this.adDetails.subSubCategory);
        } else if (
          !this.others &&
          this.adDetails.subSubCategory != "exec" &&
          this.adDetails.subSubCategory != "mid" &&
          this.adDetails.subSubCategory != "first"
        ) {
          formData.append("sub_sub_category", this.adDetails.subSubCategory);
        }

        if (
          this.subSubOthers == true &&
          this.adDetails.subSubCategoryTitle != ""
        ) {
          formData.append(
            "sub_sub_category_other",
            this.adDetails.subSubCategoryTitle
          );
        }
        formData.append("ad_name", this.adDetails.title);
        formData.append("sub_category", this.adDetails.subCategory);
        formData.append("candidate_name", this.formDataFromChild.candidateName);
        formData.append("resume_description", this.formDataFromChild.resume);
        formData.append("address", this.adDetails.address);
        formData.append("education", this.formDataFromChild.education);
        formData.append(
          "working_experience",
          this.formDataFromChild.workExperience
        );
        formData.append(
          "will_to_relocate",
          this.formDataFromChild.relocate == "Relocate" ? true : false
        );
        formData.append("profile_image", this.formDataFromChild.fileUpload[0]);
        formData.append("resume_upload", this.formDataFromChild.uploadResume);
        formData.append(
          "previous_employer",
          this.formDataFromChild.previousEmployer
        );
        formData.append(
          "previous_salary",
          this.formDataFromChild.previousSalary
        );
        formData.append(
          "preferred_cities",
          this.formDataFromChild.preferedCity
        );

        formData.append(
          "contact_person",
          this.formDataFromPersonalDetails.fullName || ""
        );
        formData.append(
          "contact_number",
          this.formDataFromPersonalDetails.contact || ""
        );
        formData.append(
          "contact_email",
          this.formDataFromPersonalDetails.email || ""
        );
        formData.append(
          "can_be_contacted_via_call",
          this.formDataFromPersonalDetails.preferredContactMethodsPhone? this.formDataFromPersonalDetails.preferredContactMethodsPhone:false
        );
        formData.append(
          "can_be_contacted_via_email",
          this.formDataFromPersonalDetails.preferredContactMethodsEmail? this.formDataFromPersonalDetails.preferredContactMethodsEmail:false
        );
        formData.append(
          "can_be_contacted_via_message",
          this.formDataFromChild.canBeContactedViaMessage || false
        );
        formData.append(
          "can_be_called_for_interview",
          this.formDataFromChild.canBeCalledForInterview || false
        );
        formData.append("interview_list", JSON.stringify([]));
        if (this.showLevels && this.adDetails.levelType != "") {
          formData.append("level_type", this.adDetails.levelType);
        }

        try {
          const response = await axios.post(
            `${BASE_URL}${ENDPOINTS.ADDADS_APPLICANT}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          this.$refs.toaster.showToast("Ad Submitted Successfully", "success");
          setTimeout(() => {
            this.closePopup();
          }, 1000);
        } catch (error) {
          // Handle error response
          if (error.response && error.response.data) {
            const responseData = error.response.data;

            // Check if 'detail' contains the error message
            if (responseData.detail) {
              try {
                // Extract key-value pairs using regex
                const detailString = responseData.detail;
                const errorMatches = [
                  ...detailString.matchAll(
                    /'(\w+)': \[ErrorDetail\(string="(.*?)"/g
                  ),
                ];

                // Format error messages
                const errorMessages = errorMatches
                  .map((match) => `${match[1]} - ${match[2]}`) // Combine field and message
                  .join(". "); // Separate with periods

                // Show formatted error messages in the toaster
                this.$refs.toaster.showToast(errorMessages, "error");
              } catch (parseError) {
                // Fallback if parsing fails
                this.$refs.toaster.showToast(
                  "Invalid error response format.",
                  "error"
                );
              }
            } else {
              // Generic fallback for errors without 'detail'
              this.$refs.toaster.showToast(
                "An unexpected error occurred.",
                "error"
              );
            }
          } else {
            // Fallback for network or unexpected errors
            this.$refs.toaster.showToast(
              "An unexpected error occurred.",
              "error"
            );
          }
        }
      } else if (this.selectedCategory?.category_title === "Recruiter") {
        // Validation: Collect missing fields
        const missingFields = [];

        if (!this.defaultLocation.lat || !this.defaultLocation.lng) {
          missingFields.push("Location Coordinates");
        }
        if (!this.selectedCategory.id) {
          missingFields.push("Main Category");
        }
        if (!this.adDetails.city) {
          missingFields.push("City");
        }
        if (!this.adDetails.state) {
          missingFields.push("State");
        }
        if (!this.adDetails.expiryDate) {
          missingFields.push("Expiry Date");
        }
        if (!this.adDetails.title) {
          missingFields.push("Ad Title");
        }
        if (!this.adDetails.subCategory) {
          missingFields.push("Sub Category");
        }
        if (this.others == true && this.adDetails.subCategoryTitle == "") {
          missingFields.push("Sub Category Title");
        }
        if (!this.formDataFromChild.addressOfTheBusiness) {
          missingFields.push("Address of the Business");
        }
        if (!this.formDataFromPersonalDetails.fullName) {
          missingFields.push("Contact Person");
        }
        if (
          !this.formDataFromPersonalDetails.contact &&
          !this.formDataFromPersonalDetails.email
        ) {
          missingFields.push("Contact information");
        }

        // Check if there are missing fields
        if (missingFields.length > 0) {
          // Show toaster with missing fields
          this.$refs.toaster.showToast(
            `Please fill the following fields: ${missingFields.join(", ")}`,
            "error"
          );
          return; // Stop submission
        }

        // Proceed with form data submission
        const formData = new FormData();
        formData.append(
          "coordinate",
          JSON.stringify({
            longitude: this.defaultLocation.lng,
            latitude: this.defaultLocation.lat,
          })
        );
        formData.append(
          "location",
          JSON.stringify({
            point: {
              longitude: this.defaultLocation.lng,
              latitude: this.defaultLocation.lat,
            },
          })
        );
        if (this.others) {
          formData.append(
            "other_sub_category_text",
            this.adDetails.subCategoryTitle
          );
        }
        formData.append("main_category", this.selectedCategory.id);
        if (this.formDataFromChild.companyLogoUpload != null) {
          formData.append(
            "organization_logo",
            this.formDataFromChild.companyLogoUpload[0]
          );
        }
        formData.append(
          "office_address",
          this.formDataFromChild.addressOfTheBusiness
        );

        formData.append("requirement", this.formDataFromChild.staffRequirement);
        formData.append(
          "organization_name",
          this.formDataFromPersonalDetails.organizationName
        );
        formData.append("ad_city", this.adDetails.city);
        formData.append("state", this.adDetails.state);
        const expiryDate = new Date(this.adDetails.expiryDate); // Convert the date string to a Date object
        const utcExpiryDate = expiryDate.toISOString(); // Convert to ISO 8601 UTC format
        formData.append("expiry", utcExpiryDate);
        formData.append("ad_name", this.adDetails.title);
        formData.append("sub_category", this.adDetails.subCategory);
        formData.append(
          "contact_person",
          this.formDataFromPersonalDetails.fullName || ""
        );
        formData.append(
          "contact_number",
          this.formDataFromPersonalDetails.contact || ""
        );
        formData.append(
          "contact_email",
          this.formDataFromPersonalDetails.email || ""
        );
        formData.append(
          "can_be_contacted_via_call",
          this.formDataFromPersonalDetails.preferredContactMethodsPhone
        );
        formData.append(
          "can_be_contacted_via_email",
          this.formDataFromPersonalDetails.preferredContactMethodsEmail
        );
        formData.append(
          "can_be_contacted_via_message",
          this.formDataFromChild.canBeContactedViaMessage || false
        );
        formData.append(
          "can_be_called_for_interview",
          this.formDataFromChild.walkInInterviews.length > 0 ? true : false
        );
        formData.append(
          "interview_list",
          JSON.stringify(this.formDataFromChild.walkInInterviews)
        );

        try {
          const response = await axios.post(
            `${BASE_URL}${ENDPOINTS.ADDADS_RECRUITER}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          this.$refs.toaster.showToast("Ad Submitted Successfully", "success");
          setTimeout(() => {
            this.closePopup();
          }, 1000);
        } catch (error) {
          // Handle error response
          if (error.response && error.response.data) {
            const responseData = error.response.data;

            // Check if 'detail' contains the error message
            if (responseData.detail) {
              try {
                // Extract key-value pairs using regex
                const detailString = responseData.detail;
                const errorMatches = [
                  ...detailString.matchAll(
                    /'(\w+)': \[ErrorDetail\(string="(.*?)"/g
                  ),
                ];

                // Format error messages
                const errorMessages = errorMatches
                  .map((match) => `${match[1]} - ${match[2]}`) // Combine field and message
                  .join(". "); // Separate with periods

                // Show formatted error messages in the toaster
                this.$refs.toaster.showToast(errorMessages, "error");
              } catch (parseError) {
                // Fallback if parsing fails
                this.$refs.toaster.showToast(
                  "Invalid error response format.",
                  "error"
                );
              }
            } else {
              // Generic fallback for errors without 'detail'
              this.$refs.toaster.showToast(
                "An unexpected error occurred.",
                "error"
              );
            }
          } else {
            // Fallback for network or unexpected errors
            this.$refs.toaster.showToast(
              "An unexpected error occurred.",
              "error"
            );
          }
        }
      } else {
        const missingFields = [];
        if (!this.selectedCategory?.category_title) {
          missingFields.push("Category");
        }
        if (missingFields.length > 0) {
          // Show toaster with missing fields
          this.$refs.toaster.showToast(
            `Please fill : ${missingFields.join(", ")}`,
            "error"
          );
          return; // Stop submission
        }
      }
    },
    // Fetch current location using Geolocation API
    fetchCurrentLocation() {
      this.openGoogleMap();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.setLocation(latitude, longitude);
          },
          (error) => {
            alert("Error fetching current location: " + error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },

    // Open the Google Map modal
    openGoogleMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            // Location access is enabled, proceed to show the map
            this.showMap = true;
          },
          (error) => {
            // Handle errors (e.g., user denied access or location unavailable)
            if (error.code === error.PERMISSION_DENIED) {
              alert(
                "Location access is disabled. Please enable location access in your browser settings to use this feature."
              );
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              alert(
                "Location information is unavailable. Please try again later."
              );
            } else if (error.code === error.TIMEOUT) {
              alert("Request to fetch location timed out. Please try again.");
            } else {
              alert("An unknown error occurred while accessing location.");
            }
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    },

    handleMapEvent(eventData) {
      if (eventData.mapClosed) {
        this.showMap = false;
      }
      if (this.initialData) {
        this.defaultLocation.lat = this.setLocationValue.lat;
        this.defaultLocation.lng = this.setLocationValue.lng;
      } else {
        this.defaultLocation.lat = eventData.locationInformation.lat;
        this.defaultLocation.lng = eventData.locationInformation.lng;
      }
      this.adDetails.address = eventData.address;
    },
    handleTrigger() {
      // Trigger the file input click
      this.$refs.inputRef.click();
    },
    async getCityAndState(lat, lng) {
      const apiKey = "AIzaSyBsG-EGz_k6QKG0eAHN03mtKQQKVMKmCq0";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          const addressComponents = data.results[0].address_components;

          // Extract city and state
          this.adDetails.city = addressComponents.find((component) =>
            component.types.includes("locality")
          )?.long_name;
          this.adDetails.state = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.long_name;
        } else {
          console.error("Geocoding API error:", data.status);
        }
      } catch (error) {
        console.error("Error fetching city/state:", error);
      }
    },
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>
  
  <style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden; /* Prevent the body from scrolling */
}

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 800px;
  max-height: 90vh; /* Ensures the content doesn't overflow the screen height */
  overflow-y: auto; /* Makes the content scrollable along the Y-axis */
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle shadow */
}

fieldset {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

legend {
  font-weight: bold;
}

.form-row {
  display: flex;
  justify-content: space-between;
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
.styled-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
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
.form-legend {
  font-weight: normal;
}
.form-buttons {
  padding: 10px;
}

.button-group {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
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
}
/* Container for the main section */
.main-checkbox {
  margin-top: 20px;
  margin: 20px;
  justify-items: center;
  text-align: -webkit-center;
}

.styled-input h5 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

/* Flexbox layout for checkbox options */
.checkbox-options {
  display: flex;
  gap: 20px;
  align-items: center;
}

/* Hide the default checkbox input */
.styled-checkbox {
  display: none;
}

/* Style the label as custom checkbox */
.checkbox-label {
  font-size: 16px;
  color: #555;
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

/* Selected (checked) state */
.styled-checkbox:checked + .checkbox-label {
  background-color: #0bb0cc;
  color: white;
  font-weight: bold;
  border-color: #0bb0cc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Disabled state */
.styled-checkbox:disabled + .checkbox-label {
  background-color: #e0e0e0;
  color: #999;
  cursor: not-allowed;
  border-color: #ddd;
}

/* Hover effect */
.checkbox-label:hover {
  background-color: #f5f5f5;
  border-color: #aaa;
}

.fieldset-class {
  background-color: #f4f4f4;
  border-radius: 1%;
}
.google-map {
  margin-top: 30px;
}
</style>