<template>
  <fieldset class="fieldset-class">
          <legend class="form-legend">Personal Details </legend>
          <div class="form-row">
            <label>Full Name:</label>
            <input
              class="styled-input"
              type="text"
              v-model="personalDetails.fullName"
              placeholder="Enter full name"
            />
          </div>
          <div class="form-row">
            <label>Contact:</label>
            <input
              class="styled-input"
              type="text"
              v-model="personalDetails.contact"
              placeholder="Enter contact number"
            />
          </div>
          <div class="form-row">
            <label>Email:</label>
            <input
              class="styled-input"
              type="email"
              v-model="personalDetails.email"
              placeholder="Enter email"
            />
          </div>
          <div v-if="selectedCategory&&selectedCategory!=='Applicant'" class="form-row">
            <label>Organization Name:</label>
            <input
              class="styled-input"
              type="text"
              v-model="personalDetails.organizationName"
              placeholder="Enter organization name"
            />
          </div>
          <div class="main-checkbox">
            <div class="styled-input w-50">
              <h5>Preferred Contact Method</h5>
              <div class="d-flex justify-content-center checkbox-options">
                <div class="checkbox-option">
                  <input
                    type="checkbox"
                    id="contactByPhone"
                    value="phone"
                    v-model="personalDetails.preferredContactMethodsPhone"
                    :disabled="!personalDetails.contact"
                    class="styled-checkbox"
                  />
                  <label for="contactByPhone" class="checkbox-label"
                    >Phone</label
                  >
                </div>
                <div class="checkbox-option">
                  <input
                    type="checkbox"
                    id="contactByEmail"
                    value="email"
                    v-model="personalDetails.preferredContactMethodsEmail"
                    :disabled="!personalDetails.email"
                    class="styled-checkbox"
                  />
                  <label for="contactByEmail" class="checkbox-label"
                    >Email</label
                  >
                </div>
              </div>
            </div>
          </div>
        </fieldset>
</template>

<script>
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      personalDetails: {
        fullName: "",
        contact: "",
        email: "",
        organizationName: "",
        preferredContactMethodsPhone: true,
        preferredContactMethodsEmail: true,
      },
      selectedCategory: null,
    };
  },
  props: {
    dataFromParent: []
  },

mounted() {
    const userConfig = localStorage.getItem("user_config");
    if (this.dataFromParent.length==0 && userConfig) {
      const user = JSON.parse(userConfig);
      // Update the personalDetails object with fetched data
      this.personalDetails.fullName = user.name || "";
      this.personalDetails.contact = user.phone !== "No Phone Provided" ? user.phone : "";
      this.personalDetails.email = user.email !== "No Email Provided" ? user.email : "";
    }
    else{
      console.log("data from personal details",this.dataFromParent)
      this.personalDetails.fullName = this.dataFromParent.fullName || "";
      this.personalDetails.contact = this.dataFromParent.contact !== "No Phone Provided" ? this.dataFromParent.contact : "";
      this.personalDetails.email = this.dataFromParent.email !== "No Email Provided" ? this.dataFromParent.email : "";
      this.personalDetails.organizationName = this.dataFromParent.organizationName || "";
      this.personalDetails.preferredContactMethodsPhone =this.dataFromParent.preferredContactMethod
      this.personalDetails.preferredContactMethodsEmail =this.dataFromParent.preferredContactMethodsEmail
    }
},
methods: {
    getFormData() {
      // Return form data to the parent
      return this.personalDetails;
    },
    validateForm() {
      const missingFields = [];
      const invalidFields = [];
      
      // Required fields for all users
      if (!this.personalDetails.fullName) missingFields.push("Full Name");
      
      // Mobile number validation
      if (!this.personalDetails.contact) {
        missingFields.push("Contact Number");
      } else {
        // Indian mobile number validation (10 digits starting with 6-9)
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(this.personalDetails.contact)) {
          invalidFields.push("Please enter a valid 10-digit mobile number");
        }
      }
      
      // Email validation
      if (!this.personalDetails.email) {
        missingFields.push("Email");
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.personalDetails.email)) {
          invalidFields.push("Please enter a valid email address");
        }
      }
      
      // Required fields for non-applicant users
      if (this.selectedCategory && this.selectedCategory !== 'Applicant') {
        if (!this.personalDetails.organizationName) missingFields.push("Organization Name");
      }
      
      // Check if at least one contact method is selected
      if (!this.personalDetails.preferredContactMethodsPhone && !this.personalDetails.preferredContactMethodsEmail) {
        missingFields.push("Preferred Contact Method");
      }
      
      // Show toast message if there are missing or invalid fields
      if (missingFields.length > 0 || invalidFields.length > 0) {
        let message = '';
        if (missingFields.length > 0) {
          message += `Please fill in the following fields: ${missingFields.join(", ")}`;
        }
        if (invalidFields.length > 0) {
          message += message ? '\n' : '';
          message += invalidFields.join('\n');
        }
        
        this.toast.add({
          severity: 'error',
          summary: 'Validation Error',
          detail: message,
          life: 5000
        });
      }
      
      return {
        isValid: missingFields.length === 0 && invalidFields.length === 0,
        missingFields: [...missingFields, ...invalidFields]
      };
    }
}
}
</script>

<style scoped>
.fieldset-class {
  border-radius: 1%;
}
.form-legend {
  font-weight: normal;
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
/* Container for the main section */
.main-checkbox {
  margin-top: 20px;
  margin: 20px;
  justify-items: center;
  text-align: -webkit-center;
}
/* Flexbox layout for checkbox options */
.checkbox-options {
  display: flex;
  gap: 20px;
  align-items: center;
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
</style>