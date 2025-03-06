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
                    :class="{ 'active-step': progress === 70 }"
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
                        this.selectedCategoryDetails?.id === 7 ||
                        this.selectedCategoryDetails?.id === 8
                      "
                      ref="form1Ref"
                      :dataFromParent="adDetails"
                    ></form1>
                    <form2
                      v-if="
                        this.selectedCategoryDetails?.id === 5 ||
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
        canBeCalledForInterview: false
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
        } else if ([5, 6].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form2Ref;
        } else if ([3].includes(this.selectedCategoryDetails?.id) && this.adType === 'Applicant') {
          formRef = this.$refs.form3Ref;
        } else if ([3].includes(this.selectedCategoryDetails?.id) && this.adType === 'Recruiter') {
          formRef = this.$refs.form4Ref;
        } else if ([11].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form5Ref;
        } else if ([12].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form6Ref;
        }
        
        // Get form data if form reference exists
        if (formRef && typeof formRef.getFormData === 'function') {
          const formData = formRef.getFormData();
          console.log("Step 4 to 5: Form data collected:", formData);
          
          // Update adDetails with values from the form
          if (formData.title) this.adDetails.title = formData.title;
          if (formData.description) this.adDetails.description = formData.description;
          if (formData.price !== undefined) this.adDetails.price = formData.price;
          if (formData.area !== undefined) this.adDetails.area = formData.area;
          if (formData.dealType) this.adDetails.dealType = formData.dealType;
          
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
        } else if ([5, 6].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form2Ref;
        } else if ([3].includes(this.selectedCategoryDetails?.id) && this.adType === 'Applicant') {
          formRef = this.$refs.form3Ref;
        } else if ([3].includes(this.selectedCategoryDetails?.id) && this.adType === 'Recruiter') {
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
      
      // If we're at sub-sub-category step and going back to step 3
      if (this.progress === 70 && step === 3) {
        this.selectedSubSubCategory = null; // Clear sub-sub-category selection
        this.progress = 60; // Go back to sub-category selection
        return;
      }
      
      if (step === 1) {
        this.selectedStep2Card = null;
      } else if (step === 2) {
        this.selectedStep3Card = null;
        this.selectedSubSubCategory = null; // Also clear sub-sub-category when going back to step 2
        this.showSubSubCategoryStep = false;
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
        // Get the appropriate form reference based on the selected category
        let formRef = null;
        
        // Determine which form to use based on category ID
        if ([1, 7, 8].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form1Ref;
        } else if ([5, 6].includes(this.selectedCategoryDetails?.id)) {
          formRef = this.$refs.form2Ref;
        } else if ([3].includes(this.selectedCategoryDetails?.id) && this.adType === 'Applicant') {
          formRef = this.$refs.form3Ref;
        } else if ([3].includes(this.selectedCategoryDetails?.id) && this.adType === 'Recruiter') {
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
          
          // Update adDetails with form values to ensure they're present
          if (formData.title) this.adDetails.title = formData.title;
          if (formData.description) this.adDetails.description = formData.description;
        } else {
          console.warn(`Form reference is missing or getFormData method not available for category ID ${this.selectedCategoryDetails?.id}`);
        }

        // Try to get personal details from the component if available
        let personalDetails = {};
        const personalDetailsRef = this.$refs.personalDetailsRef;
        
        if (personalDetailsRef && typeof personalDetailsRef.getFormData === 'function') {
          personalDetails = personalDetailsRef.getFormData();
          console.log("Personal details collected from component:", personalDetails);
        } else {
          // If component is not available, use existing data from adDetails
          console.warn("Personal details component reference is missing, using existing data from adDetails");
          personalDetails = {
            fullName: this.adDetails.fullName || '',
            contact: this.adDetails.contact || '',
            email: this.adDetails.email || '',
            organizationName: this.adDetails.organizationName || '',
            preferredContactMethodsPhone: this.adDetails.preferredContactMethodsPhone || false,
            preferredContactMethodsEmail: this.adDetails.preferredContactMethodsEmail || false
          };
        }

        console.log("Before combining data - Current adDetails:", this.adDetails);

        // Combine all data
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
          fullName: personalDetails.fullName,
          contact: personalDetails.contact,
          email: personalDetails.email,
          organizationName: personalDetails.organizationName,
          preferredContactMethodsPhone: personalDetails.preferredContactMethodsPhone,
          preferredContactMethodsEmail: personalDetails.preferredContactMethodsEmail
        };

        console.log("Complete data for submission:", completeData);
        console.log("Title value being submitted:", completeData.title);
        console.log("Description value being submitted:", completeData.description);
        console.log("Area value being submitted:", completeData.area);
        console.log("Price value being submitted:", completeData.price);
        
        // Submit the ad to the API
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
        console.log("submitAdToApi - Title:", adData.title);
        console.log("submitAdToApi - Description:", adData.description);
        
        const token = localStorage.getItem("accessToken");
        
        // Different endpoint and payload structure for categories 1, 2, 5
        if (this.selectedCategoryDetails?.id === 1 || 
            this.selectedCategoryDetails?.id === 2 || 
            this.selectedCategoryDetails?.id === 5) {
          
          // Create FormData for handling binary image uploads
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
          
          // Use the correct field names for city, state, title and description
          formData.append('ad_city', adData.city || '');
          formData.append('state', adData.state || '');
          
          // Ensure title and description are passed correctly
          const adTitle = adData.title || '';
          const adDescription = adData.description || '';
          
          // Ensure area and price are passed correctly
          const area = adData.area || '';
          const price = adData.price || '';
          
          console.log("FormData values being set:");
          console.log("ad_name:", adTitle);
          console.log("ad_description:", adDescription);
          console.log("area:", area);
          console.log("price:", price);
          
          formData.append('ad_name', adTitle);
          formData.append('ad_description', adDescription);
          formData.append('area', area);
          formData.append('price', price);
          
          formData.append('sub_category', this.adDetails.subCategory);
          
          // Add sub-sub-category if available
          if (this.adDetails.subSubCategory) {
            formData.append('sub_sub_category', this.adDetails.subSubCategory);
          }
          
          formData.append('deal_type', adData.dealType || 'Rent');
          formData.append('address', this.adDetails.address || '');
          
          // Convert expiry date to ISO format if available
          if (adData.expiryDate) {
            const expiryDate = new Date(adData.expiryDate);
            formData.append('expiry', expiryDate.toISOString());
          }
          
          // Add other fields
          if (adData.otherSubCategoryText) {
            formData.append('other_sub_category_text', adData.otherSubCategoryText);
          }
          
          // Handle image uploads
          if (adData.images && adData.images.length > 0) {
            adData.images.forEach(image => {
              formData.append('image_ids', image);
            });
          }
          
          // Add contact information using the correct field names
          formData.append('contact_person', adData.fullName || '');
          formData.append('contact_number', adData.contact || '');
          formData.append('contact_email', adData.email || '');
          formData.append('organization_name', adData.organizationName || '');
          
          // Contact preferences
          formData.append('can_be_contacted_via_call', adData.preferredContactMethodsPhone !== false);
          formData.append('can_be_contacted_via_email', adData.preferredContactMethodsEmail !== false);
          formData.append('can_be_contacted_via_message', adData.canBeContactedViaMessage === true);
          formData.append('can_be_called_for_interview', adData.canBeCalledForInterview === true);
          
          // Log all FormData entries for debugging
          console.log("FormData entries:");
          for (let entry of formData.entries()) {
            console.log(entry[0], ":", entry[1]);
          }
          
          // Send the request to the specific endpoint
          const response = await fetch(`${BASE_URL}web/ads/post-ads-under-sus/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              // Don't set Content-Type for FormData, browser will set it with the boundary
            },
            body: formData
          });
          
          const result = await response.json();
          if (result.success) {
            alert("Ad published successfully!");
            this.$router.push('/my-ads');
          } else {
            alert("Failed to publish ad: " + (result.message || 'Unknown error'));
          }
        } else {
          // Original endpoint for other categories
          
          // Ensure the correct field names are used in the JSON payload for all categories
          const jsonPayload = {
            ...adData,
            ad_city: adData.city,
            state: adData.state,
            ad_name: adData.title,
            ad_description: adData.description,
            area: adData.area,
            price: adData.price
          };
          
          console.log("JSON Payload for non-special categories:", jsonPayload);
          console.log("Area in JSON payload:", jsonPayload.area);
          console.log("Price in JSON payload:", jsonPayload.price);
          
          const response = await fetch(`${BASE_URL}${ENDPOINTS.CREATE_AD}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonPayload)
          });
          
          const result = await response.json();
          if (result.success) {
            alert("Ad published successfully!");
            this.$router.push('/my-ads');
          } else {
            alert("Failed to publish ad: " + result.message);
          }
        }
      } catch (error) {
        console.error("API error:", error);
        alert("An error occurred while publishing your ad.");
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
      this.adDetails.subSubCategoryTitle = subSubCat.applicant_role_title || 
                                         subSubCat.sub_sub_category_title || 
                                         subSubCat.title;
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