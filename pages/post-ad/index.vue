<template>
  <div class="main-section">
    <headerSection />
    <div
      class="card p-6 max-w-3xl mx-auto main-div"
    >
      <h1 class="text-3xl font-bold text-gray-800 mb-4 text-center">
        Post Your Ad
      </h1>
      <p class="text-gray-500 mb-10 text-center">
        Ready to Scale? Let's Build Something Great Together!
      </p>
      <div class="stepper-content-wrapper">
        <Stepper value="1" class="custom-stepper">
          <StepItem value="1">
            <Step>
              <div class="step-header">
                <div class="step-number-container">
                  <span
                    class="step-number"
                    :class="{ 'active-step': progress >= 20 }"
                    >1</span
                  >
                  <div class="vertical-progress-bar">
                    <div
                      class="vertical-progress-bar-fill"
                      :style="{ height: `${progress > 20 ? 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
                <div class="justify-items-left">
                  <span class="step-count">Step 1:</span>
                  <div class="step-title">Select Category</div>
                </div>
              </div>
            </Step>
          </StepItem>
          <div class="step-line" :class="{ active: progress >= 20 }"></div>
          <StepItem value="2">
            <Step>
              <div class="step-header">
                <div class="step-number-container">
                  <span
                    class="step-number"
                    :class="{ 'active-step': progress >= 40 }"
                    >2</span
                  >
                  <div class="vertical-progress-bar">
                    <div
                      class="vertical-progress-bar-fill"
                      :style="{ height: `${progress > 40 ? 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
                <div class="justify-items-left">
                  <span class="step-count">Step 2:</span>
                  <div class="step-title">Select Ad Type</div>
                </div>
              </div>
            </Step>
          </StepItem>
          <div class="step-line" :class="{ active: progress >= 40 }"></div>
          <StepItem value="3">
            <Step>
              <div class="step-header">
                <div class="step-number-container">
                  <span
                    class="step-number"
                    :class="{ 'active-step': progress >= 60 }"
                    >3</span
                  >
                  <div class="vertical-progress-bar">
                    <div
                      class="vertical-progress-bar-fill"
                      :style="{ height: `${progress > 60 ? 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
                <div class="justify-items-left">
                  <span class="step-count">Step 3:</span>
                  <div class="step-title">Select Sub Category</div>
                </div>
              </div>
            </Step>
          </StepItem>
          <div class="step-line" :class="{ active: progress >= 60 }"></div>
          
          <!-- New Sub-Sub-Category Step -->
          <StepItem value="3.5" v-if="showSubSubCategoryStep">
            <Step>
              <div class="step-header">
                <div class="step-number-container">
                  <span
                    class="step-number"
                    :class="{ 'active-step': progress >= 70 }"
                    >3.5</span
                  >
                  <div class="vertical-progress-bar">
                    <div
                      class="vertical-progress-bar-fill"
                      :style="{ height: `${progress > 70 ? 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
                <div class="justify-items-left">
                  <span class="step-count">Step 3.5:</span>
                  <div class="step-title">Select Sub-Sub-Category</div>
                </div>
              </div>
            </Step>
          </StepItem>
          <div class="step-line" v-if="showSubSubCategoryStep" :class="{ active: progress >= 70 }"></div>
          
          <StepItem value="4">
            <Step>
              <div class="step-header">
                <div class="step-number-container">
                  <span
                    class="step-number"
                    :class="{ 'active-step': progress >= 80 }"
                    >4</span
                  >
                  <div class="vertical-progress-bar">
                    <div
                      class="vertical-progress-bar-fill"
                      :style="{ height: `${progress > 80 ? 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
                <div class="justify-items-left">
                  <span class="step-count">Step 4:</span>
                  <div class="step-title">Additional Info</div>
                </div>
              </div>
            </Step>
          </StepItem>
          <div class="step-line" :class="{ active: progress >= 80 }"></div>
          <StepItem value="5">
            <Step>
              <div class="step-header">
                <div class="step-number-container">
                  <span
                    class="step-number"
                    :class="{ 'active-step': progress >= 100 }"
                    >5</span
                  >
                  <div class="vertical-progress-bar">
                    <div
                      class="vertical-progress-bar-fill"
                      :style="{ height: `${progress > 100 ? 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
                <div class="justify-items-left">
                  <span class="step-count">Step 5:</span>
                  <div class="step-title">Personal Informations</div>
                </div>
              </div>
            </Step>
          </StepItem>
          <div class="step-line" :class="{ active: progress >= 100 }"></div>
          <StepItem value="6">
            <Step>
              <div class="step-header">
                <div class="step-number-container">
                  <span
                    class="step-number"
                    :class="{ 'active-step': progress >= 120 }"
                    >6</span
                  >
                  <div class="vertical-progress-bar">
                    <div
                      class="vertical-progress-bar-fill"
                      :style="{ height: `${progress > 120 ? 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
                <div class="justify-items-left">
                  <span class="step-count">Step 6:</span>
                  <div class="step-title">Select Subscription Plan</div>
                </div>
              </div>
            </Step>
          </StepItem>
          <div class="step-line" :class="{ active: progress >= 120 }"></div>
          <StepItem value="7">
            <Step>
              <div class="step-header">
                <div class="step-number-container">
                  <span
                    class="step-number"
                    :class="{ 'active-step': progress === 140 }"
                    >7</span
                  >
                  <div>
                    <div
                      :style="{ height: `${progress === 140 ? 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
                <div class="justify-items-left">
                  <span class="step-count">Step 7:</span>
                  <div class="step-title">Review & Publish</div>
                </div>
              </div>
            </Step>
          </StepItem>
        </Stepper>
        <div class="step-content">
          <div v-if="progress === 20">
            <div class="d-flex justify-content-start mb-4">
              <div></div>
            </div>
            <div class="flex flex-col items-center h-48">
              <div class="content-box">
                <section class="category-section py-12 px-6 bg-gray-50">
                  <div class="max-w-6xl mx-auto">
                    <!-- Header -->

                    <!-- Card List -->
                    <div class="d-grid grid-cols-1 md:grid-cols-2 grid-section">
                      <div
                        v-for="card in cards"
                        :key="card.id"
                        :class="[
                          'd-flex items-start bg-white p-4 card-section align-items-center gap-3',
                          { 'selected-card': selectedCategory === card.id },
                        ]"
                        @click="selectCategory(card)"
                      >
                        <!-- Image -->
                        <img
                          :src="card.category_images"
                          alt="Card Image"
                          class="w-28 h-20 object-cover"
                        />
                        <!-- Content -->
                        <div class="ml-4 text-left">
                          <h3 class="category-card-title">
                            {{ card.category_title }}
                          </h3>
                          <p class="category-subtitle">
                            {{ card.category_description }}
                          </p>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                          >
                            <path
                              d="M12.0001 8C12.0001 8 20 13.8919 20 16C20 18.1083 12 24 12 24"
                              stroke="#161C2D"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div class="d-flex justify-content-end py-4">
              <button
                label="Next"
                class="next-button"
                :disabled="!selectedCategory"
                @click="handleNextStep(2)"
              >
                Next
              </button>
            </div>
          </div>
          <div v-if="progress === 40">
            <div class="d-flex justify-content-start mb-4">
              <button
                label="Back"
                class="back-button"
                severity="secondary"
                @click="handleBackStep(1)"
              >
                Back
              </button>
            </div>
            <div class="flex flex-col items-center h-48">
              <div class="content-box">
                <section class="category-section py-12 px-6 bg-gray-50">
                  <div class="max-w-6xl mx-auto">
                    <!-- Header -->

                    <!-- Card List -->
                    <div class="d-grid grid-cols-1 md:grid-cols-2 grid-section">
                      <div
                        v-for="card in step2Cards"
                        :key="card.id"
                        :class="[
                          'd-flex items-start bg-white p-4 card-section align-items-center gap-3 justify-space-between',
                          { 'selected-card': selectedStep2Card === card.id },
                        ]"
                        @click="selectStep2Card(card)"
                      >
                        <!-- Image -->
                        <div class="d-flex">
                          <img
                            src="/assets/images/ohtel_logo.png"
                            alt="Card Image"
                            class="w-28 h-20 object-cover-buyer-seller"
                          />
                          <!-- Content -->
                          <div class="ml-4 text-left">
                            <h3 class="category-card-title">
                              {{ card.title }}
                            </h3>
                            <p class="category-subtitle">
                              {{ card.description }}
                            </p>
                          </div>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                          >
                            <path
                              d="M12.0001 8C12.0001 8 20 13.8919 20 16C20 18.1083 12 24 12 24"
                              stroke="#161C2D"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div class="d-flex justify-content-end py-4">
              <button
                label="Next"
                class="next-button"
                :disabled="!selectedStep2Card"
                @click="handleNextStep(3)"
              >
                Next
              </button>
            </div>
          </div>
          <div v-if="progress === 60">
            <div class="d-flex justify-content-start mb-4">
              <button
                label="Back"
                class="back-button"
                severity="secondary"
                @click="handleBackStep(2)"
              >
                Back
              </button>
            </div>
            <div class="flex flex-col items-center h-48">
              <div class="content-box subcategory-card">
                <section class="category-section py-12 px-6 bg-gray-50 div-grid">
               
               <div
                 v-for="card in step3Cards"
                 :key="card.id"
                 :class="['card-subcategory', { 'selected-card-subcategory': selectedStep3Card === card.id }]"
                 @click="selectStep3Card(card.id)"
               >
                 <!-- Image -->
                 <img
                   :src="card.sub_category_images"
                   alt="Card Image"
                   class="w-28 h-20 object-cover-step3"
                 />
                 <!-- Content -->
                 <div class="ml-4 text-left">
                   <h3 class="subcategory-card-title">
                     {{ card.sub_category_title }}
                   </h3>
                 </div>
               </div>
            
         </section>
              </div>
            </div>
            <div class="d-flex justify-content-end py-4">
              <button
                label="Next"
                class="next-button"
                :disabled="!selectedStep3Card"
                @click="handleNextStep(4)"
              >
                Next
              </button>
            </div>
          </div>
          <div v-if="progress === 70">
            <div class="d-flex justify-content-start mb-4">
              <button
                label="Back"
                class="back-button"
                severity="secondary"
                @click="handleBackStep(3)"
              >
                Back
              </button>
            </div>
            <div class="flex flex-col items-center">
              <div class="content-box subcategory-card">
                <section class="category-section py-12 px-6 bg-gray-50">
                  <h3 class="text-xl font-bold mb-6 text-center">Select Sub-Sub-Category</h3>
                  <div class="div-grid">
                    <div
                      v-for="subSubCat in subSubCategories"
                      :key="subSubCat.id"
                      :class="[
                        'card-subcategory cursor-pointer',
                        { 'selected-card-subcategory': selectedSubSubCategory === subSubCat.id }
                      ]"
                      @click="selectSubSubCategory(subSubCat)"
                    >
                      <div class="text-center p-4">
                        <h3 class="subcategory-card-title">
                          {{ subSubCat.applicant_role_title || subSubCat.sub_sub_category_title || subSubCat.title }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div class="d-flex justify-content-end py-4">
              <button
                label="Next"
                class="next-button"
                :disabled="!selectedSubSubCategory"
                @click="handleNextStep(4)"
              >
                Next
              </button>
            </div>
          </div>
          <div v-if="progress === 80">
            <div class="d-flex justify-content-start mb-4">
              <button
                label="Back"
                class="back-button"
                severity="secondary"
                @click="handleBackStep(3)"
              >
                Back
              </button>
            </div>
            <div class="flex flex-col items-center h-48">
              <div class="content-box">
                <section class="category-section py-12 px-6 bg-gray-50">
                  <div class="max-w-6xl mx-auto">
                    <!-- Add Other Sub Category Input if needed -->
                    <div v-if="adDetails.isOtherSubCategory" class="form-group mb-4">
                      <label class="form-label">Enter Sub Category Name</label>
                      <input
                        type="text"
                        v-model="adDetails.otherSubCategoryText"
                        class="form-control styled-input"
                        placeholder="Enter sub category name"
                        required
                      />
                    </div>

                    <!-- Add Other Sub-Sub Category Input if needed -->
                    <div v-if="adDetails.isOtherSubSubCategory" class="form-group mb-4">
                      <label class="form-label">Enter Sub-Sub Category Name</label>
                      <input
                        type="text"
                        v-model="adDetails.otherSubSubCategoryText"
                        class="form-control styled-input"
                        placeholder="Enter sub-sub category name"
                        required
                      />
                    </div>

                    <!-- Dynamic Form Component -->
                    <div
                      id="mapModal"
                      v-if="this.adType !== 'Recruiter'"
                      class="map-modal google-map styled-input"
                    >
                      <h5 class="text-center">Select Address </h5>
                      <div>
                        <googleMap
                          ref="googleMapComponent"
                          @mapEvent="handleMapEvent"
                        ></googleMap>
                      </div>
                    </div>
                    <div
                      v-xif="this.adType !== 'Recruiter'
                      "
                      class="form-row justify-space-between mb-2"
                    >
                      <label>Address: </label>
                      <textarea
                        disabled
                        class="styled-input address-class"
                        v-model="adDetails.address"
                        placeholder="please select address from map"
                      ></textarea>
                    </div>
                    <form1
                      v-if="
                        this.selectedCategoryDetails?.id === 1 ||
                        this.selectedCategoryDetails?.id === 2 ||
                        this.selectedCategoryDetails?.id === 5
                      "
                      ref="form1Ref"
                      :dataFromParent="adDetails"
                    ></form1>
                    <form2
                      v-if="
                        this.selectedCategoryDetails?.id === 4 ||
                        this.selectedCategoryDetails?.id === 6
                      "
                      ref="form2Ref"
                      :dataFromParent="adDetails"
                    ></form2>
                    <form3
                      v-if="this.adType === 'Applicant'"
                      ref="form3Ref"
                      :dataFromParent="adDetails"
                    ></form3>
                    <form4
                      v-if="this.adType === 'Recruiter'"
                      ref="form4Ref"
                      :dataFromParent="adDetails"
                    ></form4>
                    <form5
                      v-if="this.selectedCategoryDetails?.id === 11"
                      ref="form5Ref"
                      :dataFromParent="adDetails"
                    ></form5>
                    <form6
                      v-if="this.selectedCategoryDetails?.id === 12"
                      ref="form6Ref"
                      :dataFromParent="adDetails"
                    ></form6>
                    
                  </div>
                </section>
              </div>
            </div>
            <div class="d-flex justify-content-end py-4">
              <button
                label="Next"
                class="next-button"
                @click="handleNextStep(5)"
              >
                Next
              </button>
            </div>
          </div>
          <div v-if="progress === 100">
            <div class="d-flex justify-content-start mb-4">
              <button
                label="Back"
                class="back-button"
                severity="secondary"
                @click="handleBackStep(4)"
              >
                Back
              </button>
            </div>
            <div class="flex flex-col items-center h-48">
              <div class="content-box">
                <section class="category-section py-12 px-6 bg-gray-50">
                  <div class="max-w-6xl mx-auto">
                    <!-- Personal Details Component -->
                    <personal-details
                      ref="personalDetailsRef"
                      :dataFromParent="adDetails"
                    ></personal-details>
                  </div>
                </section>
              </div>
            </div>
            <div class="d-flex justify-content-end py-4">
              <button
                label="Next"
                class="next-button"
                @click="handleNextStep(6)"
              >
                Next
              </button>
            </div>

          </div>
          <div v-if="progress === 120">
            <div class="d-flex justify-content-start mb-4">
              <button
                label="Back"
                class="back-button"
                severity="secondary"
                @click="handleBackStep(5)"
              >
                Back
              </button>
            </div>
            <div class="flex flex-col items-center h-48">
              <div class="content-box">
                <section class="category-section py-12 px-6 bg-gray-50">
                  <div class="max-w-6xl mx-auto">
                    <!-- Subscription Plan Selection -->
                    <div class="d-grid grid-cols-1 md:grid-cols-2 grid-section">
                      <div
                        v-for="plan in subscriptionPlans"
                        :key="plan.id"
                        :class="[
                          'd-flex items-start bg-white p-4 card-section align-items-center gap-3',
                          { 'selected-card': selectedSubscriptionPlan === plan.id },
                        ]"
                        @click="selectSubscriptionPlan(plan.id)"
                      >
                        <!-- Content -->
                        <div class="ml-4 text-left">
                          <h3 class="category-card-title">
                            {{ plan.plan_name }}
                          </h3>
                          <p class="category-subtitle">
                            {{ plan.plan_description }}
                          </p>
                          <p class="category-subtitle">
                            Price: {{ plan.plan_price }} (Discount: {{ plan.discount_price }})
                          </p>
                          <p class="category-subtitle">
                            Validity: {{ plan.validity_days }} days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div class="d-flex justify-content-end py-4">
              <button
                label="Next"
                class="next-button"
                :disabled="!selectedSubscriptionPlan"
                @click="handleNextStep(7)"
              >
                Next
              </button>
            </div>
          </div>
          <div v-if="progress === 140">
            <div class="d-flex justify-content-start mb-4">
              <button
                label="Back"
                class="back-button"
                severity="secondary"
                @click="handleBackStep(6)"
              >
                Back
              </button>
            </div>
            <div class="flex flex-col items-center h-48">
              <div class="content-box review-section">
                <section class="category-section py-12 px-6 bg-gray-50">
                  <div class="max-w-6xl mx-auto">
                    <h2 class="text-2xl font-bold">Review Your Ad</h2>
                    <div class="review-details mt-6">
                      <p><strong>Category:</strong> {{ selectedCategoryDetails?.category_title }}</p>
                      <p><strong>Category ID:</strong> {{ selectedCategoryDetails?.id }}</p>
                      <p><strong>Ad Type:</strong> {{ adType }}</p>
                      <p><strong>Sub Category:</strong> {{ adDetails.subCategory }}</p>
                      <p v-if="adDetails.subSubCategory"><strong>Sub-Sub Category:</strong> {{ adDetails.subSubCategoryTitle }}</p>
                      <p><strong>Ad Title:</strong> {{ adDetails.title }}</p>
                      <p><strong>Description:</strong> {{ adDetails.description }}</p>
                      <p v-if="adDetails.address"><strong>Address:</strong> {{ adDetails.address }}</p>
                      <p v-if="adDetails.city"><strong>City:</strong> {{ adDetails.city }}</p>
                      <p v-if="adDetails.state"><strong>State:</strong> {{ adDetails.state }}</p>
                      <p v-if="adDetails.price"><strong>Price:</strong> {{ adDetails.price }}</p>
                      <p v-if="adDetails.expiryDate"><strong>Expiry Date:</strong> {{ adDetails.expiryDate }}</p>
                      <p v-if="adDetails.vendorName"><strong>Vendor:</strong> {{ adDetails.vendorName }}</p>
                      <p v-if="adDetails.productBrand"><strong>Brand:</strong> {{ adDetails.productBrand }}</p>
                      <p v-if="adDetails.materialType"><strong>Material Type:</strong> {{ adDetails.materialType }}</p>
                      
                      <p><strong>Personal Information:</strong></p>
                      <ul>
                        <li><strong>Name:</strong> {{ adDetails.fullName }}</li>
                        <li><strong>Contact:</strong> {{ adDetails.contact }}</li>
                        <li><strong>Email:</strong> {{ adDetails.email }}</li>
                        <li v-if="adDetails.organizationName"><strong>Organization:</strong> {{ adDetails.organizationName }}</li>
                      </ul>
                    </div>
                    
                    <!-- Add contact details section -->
                    <div class="mt-6 pt-6 border-t border-gray-200">
                      <h3 class="text-xl font-semibold mb-4">Contact Information</h3>
                      <p v-if="adDetails.fullName"><strong>Name:</strong> {{ adDetails.fullName }}</p>
                      <p v-if="adDetails.contact"><strong>Phone:</strong> {{ adDetails.contact }}</p>
                      <p v-if="adDetails.email"><strong>Email:</strong> {{ adDetails.email }}</p>
                      <p v-if="adDetails.organizationName"><strong>Organization:</strong> {{ adDetails.organizationName }}</p>
                    </div>
                    
                    <!-- Add personal details component (hidden) -->
                    <personal-details ref="personalDetailsRef" :dataFromParent="adDetails" style="display: none;"></personal-details>
                  </div>
                </section>
              </div>
            </div>
            <div class="d-flex justify-content-end py-4">
              <button
                label="Next"
                class="next-button"
                @click="handlePublish"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <howToPostAdSection />
    <getTheAppSection />
    <footerSection />
  </div>
</template>

<script>
import headerSection from "../main-pages/headerSection.vue";
import howToPostAdSection from "../main-pages/howToPostAdSection.vue";
import getTheAppSection from "../main-pages/getTheAppSection.vue";
import footerSection from "../main-pages/footerSection.vue";
import form1 from "../components/forms/form-1.vue";
import form2 from "../components/forms/form-2.vue";
import form3 from "../components/forms/form-3.vue";
import form4 from "../components/forms/form-4.vue";
import form5 from "../components/forms/form-5.vue";
import form6 from "../components/forms/form-6.vue";
import googleMap from "../components/googleMap.vue";
import personalDetails from "../../components/forms/presonal-details.vue";
import { BASE_URL, ENDPOINTS } from '../environment.js';

export default {
  components: {
    headerSection,
    howToPostAdSection,
    getTheAppSection,
    footerSection,
    form1,
    form2,
    form3,
    form4,
    form5,
    form6,
    googleMap,
    personalDetails,
    BASE_URL,
    ENDPOINTS,
  },
  data() {
    return {
      progress: 20, // Default to Step 1 (20%)
      selectedCategory: null,
      selectedStep2Card: null,
      selectedStep3Card: null,
      selectedStep4Card: null,
      selectedStep5Card: null,
      selectedSubSubCategory: null,
      showSubSubCategoryStep: false,
      subSubCategories: [],
      selectedSubscriptionPlan: null,
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
        fullName: "",
        contact: "",
        email: "",
        // Additional fields for spaces/equipment categories
        organizationName: "",
        otherSubCategoryText: "",
        canBeContactedViaCall: true,
        canBeContactedViaEmail: true,
        canBeContactedViaMessage: false,
        canBeCalledForInterview: false,
        isOtherSubCategory: false,
        isOtherSubSubCategory: false,
        otherSubSubCategoryText: "",
      },
      defaultLocation: {
        lat: null,
        lng: null
      },
      cards: [],
      step2Cards: [],
      step3Cards: [],
      step4Cards: [],
      step5Cards: [],
      subscriptionPlans: [],
      formData: null,
    };
  },
  methods: {
    handleNextStep(step) {
      debugger;
      // If transitioning from step 3 to 4, check if we need to show sub-sub-category
      if (step === 4 && this.showSubSubCategoryStep && this.progress === 60) {
        // We're moving from sub-category to sub-sub-category
        this.progress = 70; // Set progress to sub-sub-category selection step
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      
      // If moving from step 4 (Additional Info) to step 5, collect form data
      if (step === 5 && this.progress === 80) {
        let formRef = null;
        
        // Determine which form to use based on category ID
        if ([1, 7, 8].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form1Ref;
        } else if ([4, 6].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form2Ref;
        } else if ([8].includes(this.selectedCategoryDetails?.id) && this.adType === 'Applicant') {
          formRef = this.$refs.form3Ref;
        } else if ([7].includes(this.selectedCategoryDetails?.id) && this.adType === 'Recruiter') {
          formRef = this.$refs.form4Ref;
        } else if ([11].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form5Ref;
        } else if ([12].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form6Ref;
        }
        
        // Get form data if form reference exists
        if (formRef && typeof formRef.getFormData === 'function') {
          this.formData = formRef.getFormData();
          console.log("Step 4 to 5: Form data collected:", this.formData);
          
          // Update adDetails with values from the form
          if (this.formData.title) this.adDetails.title = this.formData.title;
          if (this.formData.description) this.adDetails.description = this.formData.description;
          if (this.formData.price !== undefined) this.adDetails.price = this.formData.price;
          if (this.formData.area !== undefined) this.adDetails.area = this.formData.area;
          if (this.formData.dealType) this.adDetails.dealType = this.formData.dealType;
          if (this.formData.files) this.adDetails.images = this.formData.files;
          
          console.log("Updated adDetails:", this.adDetails);
          console.log("Area value after update:", this.adDetails.area);
          console.log("Price value after update:", this.adDetails.price);
        } else {
          console.warn("Could not get form data when moving from step 4 to 5");
        }
      }
      
      // If moving from step 5 (personal details) to step 6, collect personal details data
      if (step === 6 && this.progress === 100) {
        const personalDetailsRef = this.$refs.personalDetailsRef;
        if (personalDetailsRef && typeof personalDetailsRef.getFormData === 'function') {
          const personalData = personalDetailsRef.getFormData();
          console.log("Collected personal details:", personalData);
          
          // Update adDetails with personal information
          this.adDetails.fullName = personalData.fullName;
          this.adDetails.contact = personalData.contact;
          this.adDetails.email = personalData.email;
          this.adDetails.organizationName = personalData.organizationName;
          this.adDetails.preferredContactMethodsPhone = personalData.preferredContactMethodsPhone;
          this.adDetails.preferredContactMethodsEmail = personalData.preferredContactMethodsEmail;
        } else {
          console.warn("Could not get personal details data");
        }
      }
      
      // If moving from step 6 (subscription plan) to step 7, ensure we have all form data
      if (step === 7 && this.progress === 120) {
        let formRef = null;
        
        // Determine which form to use based on category ID
        if ([1, 7, 8].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form1Ref;
        } else if ([4, 6].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form2Ref;
        } else if ([8].includes(this.selectedCategoryDetails?.id) && this.adType === 'Applicant') {
          formRef = this.$refs.form3Ref;
        } else if ([7].includes(this.selectedCategoryDetails?.id) && this.adType === 'Recruiter') {
          formRef = this.$refs.form4Ref;
        } else if ([11].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form5Ref;
        } else if ([12].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form6Ref;
        }
        
        // Check form data again to ensure we have the latest values
        if (formRef && typeof formRef.getFormData === 'function') {
          const formData = formRef.getFormData();
          console.log("Step 6 to 7: Form data verified:", formData);
          
          // Update adDetails with values from the form
          if (formData.title) this.adDetails.title = formData.title;
          if (formData.description) this.adDetails.description = formData.description;
          if (formData.price) this.adDetails.price = formData.price;
          if (formData.area) this.adDetails.area = formData.area;
          if (formData.dealType) this.adDetails.dealType = formData.dealType;
          
          console.log("Before review step - Updated adDetails:", this.adDetails);
        }
      }
      
      this.progress =
        step === 1
          ? 20
          : step === 2
          ? 40
          : step === 3
          ? 60
          : step === 4
          ? 80
          : step === 5
          ? 100
          : step === 6
          ? 120
          : 140;
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
      if (step === 3) {
        this.fetchStep3Cards();
      } else if (step === 4) {
        this.fetchStep4Cards();
      } else if (step === 5) {
        this.fetchStep5Cards();
      } else if (step === 6) {
        this.fetchSubscriptionPlans();
      }
    },
    handleBackStep(step) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      // If we're at step 4 (progress === 80) and going back
      if (this.progress === 80) {
        // Clear the "Others" input fields when going back from step 4
        this.adDetails.otherSubCategoryText = "";
        this.adDetails.otherSubSubCategoryText = "";
        
        // If sub-sub-category step exists, go back to it
        if (this.showSubSubCategoryStep) {
          this.progress = 70;
          return;
        }
      }
      
      // If we're at sub-sub-category step and going back to step 3
      if (this.progress === 70 && step === 3) {
        this.selectedSubSubCategory = null; // Clear sub-sub-category selection
        this.adDetails.subSubCategory = null;
        this.adDetails.subSubCategoryTitle = "";
        this.adDetails.isOtherSubSubCategory = false;
        this.adDetails.otherSubSubCategoryText = "";
        this.progress = 60; // Go back to sub-category selection
        return;
      }
      
      if (step === 1) {
        this.selectedStep2Card = null;
      } else if (step === 2) {
        this.selectedStep3Card = null;
        this.selectedSubSubCategory = null;
        this.showSubSubCategoryStep = false;
        // Clear sub-category related data
        this.adDetails.subCategory = null;
        this.adDetails.subCategoryTitle = "";
        this.adDetails.isOtherSubCategory = false;
        this.adDetails.otherSubCategoryText = "";
        // Clear sub-sub-category related data
        this.adDetails.subSubCategory = null;
        this.adDetails.subSubCategoryTitle = "";
        this.adDetails.isOtherSubSubCategory = false;
        this.adDetails.otherSubSubCategoryText = "";
      } else if (step === 3) {
        this.selectedStep4Card = null;
      } else if (step === 4) {
        this.selectedStep5Card = null;
      }
      
      this.progress =
        step === 1
          ? 20
          : step === 2
          ? 40
          : step === 3
          ? 60
          : step === 4
          ? 80
          : step === 5
          ? 100
          : step === 6
          ? 120
          : 140;
    },
    handleSubmit() {
      const personalDetailsRef = this.$refs.personalDetailsRef;
      if (personalDetailsRef) {
        const personalDetailsData = personalDetailsRef.getFormData();
        console.log("Personal Details:", personalDetailsData);
        // Implement the submit logic here
      }
      console.log("Form submitted");
    },
    async handlePublish() {
      try {
        console.log("Starting publish process...");
        let formRef = null;
        
        // Determine which form to use based on category ID
        if ([1, 7, 8].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form1Ref;
        } else if ([4, 6].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form2Ref;
        } else if ([8].includes(this.selectedCategoryDetails?.id) && this.adType === 'Applicant') {
          formRef = this.$refs.form3Ref;
        } else if ([7].includes(this.selectedCategoryDetails?.id) && this.adType === 'Recruiter') {
          formRef = this.$refs.form4Ref;
        } else if ([11].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form5Ref;
        } else if ([12].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form6Ref;
        }

        // Get form data if form reference exists
        let formData = {};
        if (formRef && typeof formRef.getFormData === 'function') {
          formData = formRef.getFormData();
          console.log("Form data collected:", formData);
          
          // Update adDetails with form values
          if (formData.title) this.adDetails.title = formData.title;
          if (formData.description) this.adDetails.description = formData.description;
          
          // Handle files specifically
          if (formData.files && formData.files.length > 0) {
            console.log("Files found in form data:", formData.files);
            this.adDetails.images = formData.files;
          }
        }

        // When calling submitAdToApi, make sure to pass the files
        const completeData = {
          ...formData,
          title: this.adDetails.title || formData.title,
          description: this.adDetails.description || formData.description,
          price: (this.adDetails.price !== undefined) ? this.adDetails.price : (formData.price || ''),
          area: (this.adDetails.area !== undefined) ? this.adDetails.area : (formData.area || ''),
          address: this.adDetails.address,
          category: this.selectedCategoryDetails?.id,
          subCategory: this.adDetails.subCategory || null,
          subSubCategory: this.adDetails.subSubCategory || null,
          coordinates: this.adDetails.coordinates || {
            latitude: this.adDetails.defaultLocation?.lat || null,
            longitude: this.adDetails.defaultLocation?.lng || null
          },
          city: this.adDetails.city || '',
          state: this.adDetails.state || '',
          fullName: this.adDetails.fullName || '',
          contact: this.adDetails.contact || '',
          email: this.adDetails.email || '',
          organizationName: this.adDetails.organizationName || '',
          preferredContactMethodsPhone: this.adDetails.preferredContactMethodsPhone || false,
          preferredContactMethodsEmail: this.adDetails.preferredContactMethodsEmail || false,
          images: this.adDetails.images || [], // Make sure images are included
        };

        await this.submitAdToApi(completeData);
        
        // Show success message
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your ad has been published successfully!',
          life: 3000
        });
        
        // Navigate to success page or home
        this.$router.push('/');
      } catch (error) {
        console.error("Error in publish process:", error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'An error occurred while publishing your ad.',
          life: 5000
        });
      }
    },
    
    async submitAdToApi(adData) {
      try {
        console.log("submitAdToApi - Data received:", adData);
        const token = localStorage.getItem("accessToken");
        
        if (this.selectedCategoryDetails?.id === 1 || 
            this.selectedCategoryDetails?.id === 2 || 
            this.selectedCategoryDetails?.id === 5) {
          
          const formData = new FormData();
          
          // Add coordinates data
          if (this.defaultLocation && this.defaultLocation.lat && this.defaultLocation.lng) {
            const coordinates = {
              longitude: this.defaultLocation.lng,
              latitude: this.defaultLocation.lat
            };
            
            formData.append('coordinate', JSON.stringify(coordinates));
            formData.append('ad_city_cordinate', JSON.stringify(coordinates));
            formData.append('location', JSON.stringify({point: coordinates}));
          }
          
          // Add required fields for spaces/equipment categories
          formData.append('main_category', this.selectedCategoryDetails.id);
          formData.append('ad_type', this.adType || 'Seller');
          formData.append('ad_city', adData.city || '');
          formData.append('state', adData.state || '');
          formData.append('ad_name', adData.title || '');
          formData.append('ad_description', adData.description || '');
          formData.append('area', adData.area || '');
          formData.append('price', adData.price || '');
          formData.append('sub_category', this.adDetails.subCategory);
          
          // Add sub-sub-category if available
          if (this.adDetails.subSubCategory) {
            formData.append('sub_sub_category', this.adDetails.subSubCategory);
          }
          
          formData.append('deal_type', adData.dealType || 'Rent');
          formData.append('address', this.adDetails.address || '');

          // Handle images
          if (adData.images && adData.images.length > 0) {
            console.log("Processing images for upload, count:", adData.images.length);
            
            // If images are already File objects
            if (adData.images[0] instanceof File) {
              adData.images.forEach((file, index) => {
                formData.append('image_ids', file);
                console.log(`Appending image file ${index + 1} to FormData`);
              });
            }
            // If images are base64 strings
            else if (typeof adData.images[0] === 'string') {
              for (let i = 0; i < adData.images.length; i++) {
                const base64String = adData.images[i];
                // Extract the actual base64 data
                const base64Data = base64String.split(',')[1];
                
                // Convert base64 to blob
                const byteCharacters = atob(base64Data);
                const byteArrays = [];
                
                for (let j = 0; j < byteCharacters.length; j++) {
                  byteNumbers[j] = byteCharacters.charCodeAt(j);
                }
                
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
              }
              
              const blob = new Blob(byteArrays, { type: 'image/png' });
              const file = new File([blob], `image_${i + 1}.png`, { type: 'image/png' });
              
              formData.append('image_ids', file);
              console.log(`Appending converted image ${i + 1} to FormData`);
            }
          }
          
          // Add contact information
          formData.append('contact_person', adData.fullName || '');
          formData.append('contact_number', adData.contact || '');
          formData.append('contact_email', adData.email || '');
          formData.append('organization_name', adData.organizationName || '');
          
          // Contact preferences
          formData.append('can_be_contacted_via_call', adData.preferredContactMethodsPhone !== false);
          formData.append('can_be_contacted_via_email', adData.preferredContactMethodsEmail !== false);
          formData.append('can_be_contacted_via_message', adData.canBeContactedViaMessage === true);
          formData.append('can_be_called_for_interview', adData.canBeCalledForInterview === true);
          
          // Add plan_id
          if (this.selectedSubscriptionPlan) {
            formData.append('plan_id', this.selectedSubscriptionPlan);
          }
          
          // Log all FormData entries for debugging
          console.log("FormData entries:");
          for (let entry of formData.entries()) {
            const value = entry[1] instanceof File ? 
              `File: ${entry[1].name} (${entry[1].size} bytes)` : 
              entry[1];
            console.log(entry[0], ":", value);
          }
          
          // Send the request to the specific endpoint
          const response = await fetch(`${BASE_URL}${ENDPOINTS.POST_ADS_UNDER_SUS}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData
          });
          
          console.log("API Response Status:", response.status);
          
          // Specifically check for 201 status code
          if (response.status === 201) {
            const result = await response.json();
            console.log("API Response:", result);
            
            // Show success message using toast
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Your ad has been published successfully!',
              life: 3000
            });
            
            // Navigate to my-ads page
            this.$router.push('/my-ads');
            return;
          }
          // Check for other success status codes
          else if (response.status >= 200 && response.status < 300) {
            const result = await response.json();
            console.log("API Response:", result);
            
            // Show success message using toast
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Your ad has been published successfully!',
              life: 3000
            });
            
            // Navigate to my-ads page
            this.$router.push('/my-ads');
            return;
          }
          
          // If we get here, there was an error
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to publish ad');
          
        }
        if (this.selectedCategoryDetails?.id === 4 || 
            this.selectedCategoryDetails?.id === 6) {
          debugger;
          const formData = new FormData();
          
          // Get form2 data first
          const form2Ref = this.$refs.form2Ref;
          console.log("form2Ref:", form2Ref);
          let form2Data = null;
          if (form2Ref && typeof form2Ref.getFormData === 'function') {
            form2Data = form2Ref.getFormData();
            console.log("Form 2 data collected:", form2Data);
            
            // Verify the data we're about to send
            console.log("Title from form2:", form2Data?.title);
            console.log("Description from form2:", form2Data?.description);
            
            if (!form2Data?.title || !form2Data?.description) {
              console.warn("Warning: Title or description is empty in form2Data");
            }
          } else {
            console.warn("Could not get form2 data - form2Ref or getFormData not available");
          }

          // Add coordinates data
          if (this.defaultLocation && this.defaultLocation.lat && this.defaultLocation.lng) {
            const coordinates = {
              longitude: this.defaultLocation.lng,
              latitude: this.defaultLocation.lat
            };
            
            formData.append('coordinate', JSON.stringify(coordinates));
            formData.append('ad_city_cordinate', JSON.stringify(coordinates));
            formData.append('location', JSON.stringify({point: coordinates}));
          }
          
          
          formData.append('ad_name', adData.title || '');
          formData.append('ad_description', adData.description || '');
          
          // Add required fields from parent component (index.vue)
          formData.append('main_category', this.selectedCategoryDetails.id);
          formData.append('ad_type', this.adType || 'Seller');
          formData.append('ad_city', adData.city || '');
          formData.append('state', adData.state || '');
          formData.append('sub_category', this.adDetails.subCategory);
          
          // Add sub-sub-category if available
          if (this.adDetails.subSubCategory) {
            formData.append('sub_sub_category', this.adDetails.subSubCategory);
          }
          
          formData.append('address', this.adDetails.address || '');

          // Handle images
          if (adData.images && adData.images.length > 0) {
            console.log("Processing images for upload, count:", adData.images.length);
            adData.images.forEach((file, index) => {
              formData.append('image_ids', file);
            });
          }

          // Add contact information
          formData.append('contact_person', adData.fullName || '');
          formData.append('contact_number', adData.contact || '');
          formData.append('contact_email', adData.email || '');
          formData.append('organization_name', adData.organizationName || '');
          
          // Contact preferences
          formData.append('can_be_contacted_via_call', adData.preferredContactMethodsPhone !== false);
          formData.append('can_be_contacted_via_email', adData.preferredContactMethodsEmail !== false);
          formData.append('can_be_contacted_via_message', adData.canBeContactedViaMessage === true);
          formData.append('can_be_called_for_interview', adData.canBeCalledForInterview === true);
          
          // Add product details from form2
          if (this.formData && this.formData.products) {
            console.log("Products from form2:", this.formData.products);
            const productDetails = this.formData.products.map(product => ({
              name: product.productName,
              url: product.link || '',
              unit: product.units,
              unit_available: product.unit_type,
              price: product.mrp,
              offer_price: product.offerPrice || '',
              image: null,
              catalog: null
            }));
            
            console.log("Mapped product details:", productDetails);
            formData.append('product_list', JSON.stringify(productDetails));
            
            // Handle product images and catalogs
            this.formData.products.forEach((product, index) => {
              // Handle product image
              if (product.image) {
                // If image is a File object
                if (product.image instanceof File) {
                  formData.append(`product_image_${index}`, product.image);
                }
                // If image is an array containing a File object
                else if (Array.isArray(product.image) && product.image.length > 0) {
                  formData.append(`product_image_${index}`, product.image[0]);
                }
              }

              // Handle product catalog (PDF)
              if (product.pdf) {
                // If pdf is a File object
                if (product.pdf instanceof File) {
                  formData.append(`product_catalog_${index}`, product.pdf);
                }
                // If pdf is an array containing a File object
                else if (Array.isArray(product.pdf) && product.pdf.length > 0) {
                  formData.append(`product_catalog_${index}`, product.pdf[0]);
                }
              }
            });
          }
          
          // Add plan_id if available
          if (this.selectedSubscriptionPlan) {
            formData.append('plan_id', this.selectedSubscriptionPlan);
          }
          
          // Log FormData entries for debugging
          console.log("FormData entries:");
          for (let entry of formData.entries()) {
            const value = entry[1] instanceof File ? 
              `File: ${entry[1].name} (${entry[1].size} bytes)` : 
              entry[1];
            console.log(entry[0], ":", value);
          }
          
          // Send request to market and deals endpoint
          const response = await fetch(`${BASE_URL}${ENDPOINTS.POST_ADS_UNDER_MF}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData
          });
          
          console.log("API Response Status:", response.status);
          
          if (response.status === 201 || (response.status >= 200 && response.status < 300)) {
            const result = await response.json();
            console.log("API Response:", result);
            
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Your ad has been published successfully!',
              life: 3000
            });
            
            this.$router.push('/my-ads');
            return;
          }
          
          // Handle error
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to publish ad');
        }
      } catch (error) {
        console.error("API error:", error);
        
        // Show error message using toast
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'An error occurred while publishing your ad.',
          life: 5000
        });
        
        // Re-throw the error to be handled by the calling function
        throw error;
      }
    },
    selectCategory(data) {
      this.selectedCategoryDetails = data;
      this.selectedCategory = data.id;
      this.adDetails.category = data.id;
      console.log("Selected category details:", data, "Category ID:", data.id);
      this.updateStep2Cards(data);
      // Automatically advance to next step
      this.handleNextStep(2);
    },
    selectStep2Card(data) {
      this.adType = data.title;
      this.selectedStep2Card = data.id;
      this.adDetails.sellerOrBuyer = data.id===2 ? "Seller" : "Buyer";
      // Automatically advance to next step
      this.handleNextStep(3);
    },
    selectStep3Card(id) {
      // Find the selected sub-category with its full data
      const selectedSubCategory = this.step3Cards.find(cat => cat.id === id);
      console.log("Selected sub-category full data:", selectedSubCategory);
      
      if (selectedSubCategory) {
        // Store the sub-category ID and title
        this.adDetails.subCategory = selectedSubCategory.id;
        this.adDetails.subCategoryTitle = selectedSubCategory.sub_category_title;
        this.selectedStep3Card = selectedSubCategory.id;
        
        // Check if this is "Others" sub-category
        this.adDetails.isOtherSubCategory = selectedSubCategory.sub_category_title === "Others";
        
        // Check if this sub-category has either levels or sub_sub_category_list
        const hasLevels = selectedSubCategory.levels && selectedSubCategory.levels.length > 0;
        const hasSubSub = selectedSubCategory.sub_sub_category_list && selectedSubCategory.sub_sub_category_list.length > 0;
        
        if (hasLevels || hasSubSub) {
          console.log("Sub-sub-categories or levels found");
          
          // If it has levels, transform them to match the sub-sub-category format
          if (hasLevels) {
            this.subSubCategories = selectedSubCategory.levels.map(level => ({
              id: level.code,
              applicant_role_title: level.title,
              title: level.title,
              sub_sub_category_title: level.title
            }));
          } else {
            // Use the existing sub_sub_category_list
            this.subSubCategories = selectedSubCategory.sub_sub_category_list;
          }
          
          console.log("Processed sub-sub-categories:", this.subSubCategories);
          this.showSubSubCategoryStep = true;
          // Update progress to show sub-sub-category step
          this.progress = 70;
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          console.log("No sub-sub-categories or levels found");
          this.subSubCategories = [];
          this.showSubSubCategoryStep = false;
          this.selectedSubSubCategory = null;
          // Move to the next step since there are no sub-sub-categories
          this.handleNextStep(4);
        }
      }
    },
    selectStep4Card(id) {
      this.selectedStep4Card = id;
    },
    selectStep5Card(id) {
      this.selectedStep5Card = id;
    },
    selectSubscriptionPlan(id) {
      this.selectedSubscriptionPlan = id;
    },
    async fetchStep3Cards() {
      try {
        const token = localStorage.getItem("accessToken");
        let type = this.selectedStep2Card === 2 ? "Seller" : "Buyer";
        if (this.selectedCategory === 3) {
          type = this.selectedStep2Card === 2 ? "Recruiter" : "Applicant";
        }
        const response = await fetch(
          `${BASE_URL}${ENDPOINTS.SUB_CATEGORY}?category_id=${this.selectedCategory}&type=${this.adType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        this.step3Cards = data.result.data;
        console.log("Fetched sub-categories:", this.step3Cards);
        
        // Log which sub-categories have sub-sub-categories
        this.step3Cards.forEach(cat => {
          const hasSubSub = cat.sub_sub_category_list && cat.sub_sub_category_list.length > 0;
          console.log(`Sub-category ${cat.id} (${cat.sub_category_title}) has ${hasSubSub ? cat.sub_sub_category_list.length : 0} sub-sub-categories`);
        });
      } catch (error) {
        console.error("Error fetching step 3 cards:", error);
      }
    },
    async fetchStep4Cards() {
    },
    async fetchStep5Cards() {

    },
    async fetchSubscriptionPlans() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${BASE_URL}${ENDPOINTS.SUBSCRIPTION_PLAN}${this.adDetails.category}/${this.adType}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        this.subscriptionPlans = data.result;
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      }
    },
    async fetchCategories() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `${BASE_URL}${ENDPOINTS.CATEGORY}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        this.cards = data.result.category_list;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    updateStep2Cards(category) {
      this.step2Cards = [
        {
          id: 1,
          title: category.buyer.title,
          description: category.buyer.description,
          image: category.category_images,
        },
        {
          id: 2,
          title: category.seller.title,
          description: category.seller.description,
          image: category.category_images,
        },
      ];
    },
    handleMapEvent(eventData) {
        this.adDetails.address = eventData.address;
      
      // Store city and state if available
      if (eventData.city) {
        this.adDetails.city = eventData.city;
        console.log("City updated from map:", this.adDetails.city);
      }
      
      if (eventData.state) {
        this.adDetails.state = eventData.state;
        console.log("State updated from map:", this.adDetails.state);
      }
      
      if (eventData.mapClosed) {
        this.showMap = false;
      }
      
      // Store location coordinates properly
      if (eventData.locationInformation) {
        this.defaultLocation.lat = eventData.locationInformation.lat;
        this.defaultLocation.lng = eventData.locationInformation.lng;
        
        console.log("Updated location coordinates:", this.defaultLocation);
      }
    },
    selectSubSubCategory(subSubCat) {
      this.selectedSubSubCategory = subSubCat.id;
      this.adDetails.subSubCategory = subSubCat.id;
      // Get the title from any of the possible fields
      const title = subSubCat.applicant_role_title || 
                   subSubCat.sub_sub_category_title || 
                   subSubCat.title;
      this.adDetails.subSubCategoryTitle = title;
      
      // Check if this is "Others" sub-sub-category
      this.adDetails.isOtherSubSubCategory = title === "Others";
      
      console.log("Selected sub-sub-category:", subSubCat);
      // Automatically advance to next step
      this.handleNextStep(4);
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 2rem;
  font-family: "Arial", sans-serif;
}

.stepper-content-wrapper {
  display: flex;
  gap: 2rem;
}

.custom-stepper {
  display: flex;
  flex-direction: column;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: #47509b;
}

.step-number-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-number {
  background: white;
  border: 1px solid #263238;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  color: #263238;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
}

.step-number.active-step {
  background: #47509b;
  color: white;
  border: none;
}

.vertical-progress-bar {
  width: 4px;
  height: 87px;
  background: #e5e7eb;
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
  border-radius: 2px;
  overflow: hidden;
}

.vertical-progress-bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #47509b 0%, #47509b 100%);
  transition: height 0.3s ease;
}

.step-line {
  width: 4px;
  height: 50px;
  background: #e5e7eb;
  margin-left: 13px;
  transition: background-color 0.3s ease;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.step-line.active {
  background: #47509b;
}

.step-content {
  flex: 1;
}

.step-count {
  color: #263238;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  opacity: 0.6;
}

.step-title {
  color: #1e1e1e;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
}

.content-box {
//   padding: 2rem;
  width: 100%;
  font-size: 1rem;
  color: #374151;
}
.subcategory-card{
    height: 600px;
    overflow-y: auto;
}

.next-button,
.submit-button {
  background: #47509b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.next-button:hover,
.submit-button:hover {
  background-color: #3b4a8b;
}

.back-button {
  background: #a20584;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #8b046b;
}
.justify-items-left {
  justify-items: left;
}
.object-cover {
  width: 260px;
  height: 200px;
  border-radius: 16px;
}
.object-cover-step3 {
  width: 336px;
  height: 200px;
  border-radius: 16px;
}
.object-cover-buyer-seller {
  border-radius: 16px;
}
.grid-section {
  gap: 24px;
}
.category-section {
  .card-section {
    border-radius: 24px;
    border: 1px solid #dee1e6;

    background: #fff;
  }
  .category-card-title {
    color: #284b80;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  }
  .category-subtitle {
    color: #4c4c4c;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
}
.justify-space-between {
  justify-content: space-between !important;
}
.selected-card {
  border: 1px solid #161c2d !important;
  padding: 9px;
}
.card-subcategory {
  border: 1px solid #ffffff !important;
  padding: 9px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 16px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
.selected-card-subcategory {
  border: 2px solid #47509b !important;
  border-radius: 16px;
  padding: 9px;
  background-color: rgba(71, 80, 155, 0.05);
}
.cursor-pointer {
  cursor: pointer;
}
.subcategory-card {
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  padding: 1rem;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
}
.div-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  text-align: center;
}
.subcategory-card-title {
  color: var(--color4, #383838);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
}
.float-right {
  float: right;
}
@media (max-width: 1300px) {
  .div-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 945px) {
  .main-section {
    width: fit-content;
  }
  .div-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  // .main-div{
  //     width: fit-content;
  // }
}
// .address-class{
//     width: 67.5%;
// }
.justify-content-start {
  justify-content: flex-start !important;
}

.justify-content-end {
  justify-content: flex-end !important;
}

.mb-4 {
  margin-bottom: 1rem !important;
}

.py-4 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.d-flex {
  display: flex !important;
}
</style>