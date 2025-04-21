<template>
  <div>
    <headerSection/>
    <div class="ads-page">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.5725 12L3.42969 12" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10"/>
            <path d="M9.42969 18L3.42969 12L9.42969 6" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10" stroke-linecap="square"/>
          </svg> 
          Home
        </router-link> 
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clip-path="url(#clip0_1041_2215)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7083 11.2932C15.8958 11.4807 16.0011 11.735 16.0011 12.0002C16.0011 12.2653 15.8958 12.5197 15.7083 12.7072L10.0513 18.3642C9.95907 18.4597 9.84873 18.5359 9.72672 18.5883C9.60472 18.6407 9.4735 18.6683 9.34072 18.6694C9.20794 18.6706 9.07626 18.6453 8.95337 18.595C8.83047 18.5447 8.71882 18.4705 8.62492 18.3766C8.53103 18.2827 8.45678 18.171 8.4065 18.0481C8.35622 17.9252 8.33092 17.7936 8.33207 17.6608C8.33322 17.528 8.36081 17.3968 8.41322 17.2748C8.46563 17.1528 8.54181 17.0424 8.63732 16.9502L13.5873 12.0002L8.63732 7.05018C8.45516 6.86158 8.35437 6.60898 8.35665 6.34678C8.35892 6.08458 8.46409 5.83377 8.6495 5.64836C8.83491 5.46295 9.08572 5.35778 9.34792 5.35551C9.61011 5.35323 9.86272 5.45402 10.0513 5.63618L15.7083 11.2932Z" fill="black"/>
          </g>
          <defs>
            <clipPath id="clip0_1041_2215">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg> View Ads</a>
      </nav>

      <div class="page-header">
        <h1 class="page-title">{{ pageTitle }}</h1>
        <div class="sort-section">
          <span>Sort by:</span>
          <select v-model="filters.sort">
            <option value="date">Date posted</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div class="ads-container">
        <!-- Filters Section -->
        <aside class="filters">
          <h2>Filters</h2>

          <div class="filter-section">
            <h3 @click="toggleSection('location')">Location <span class="arrow" :class="{ 'open': isOpen('location') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('location')" class="filter-options">
              <div class="location-search" @click="openGoogleMap">
                <h2 v-if="!locationDetails">
                  <span class="location-icon"><img src="/assets/images/locationIcon.svg" alt=""></span>select location
                </h2>
                <h2 v-else>
                  <span class="location-icon"><img src="/assets/images/locationIcon.svg" alt=""></span>{{ locationDetails.address }}
                </h2>
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h3 @click="toggleSection('radius')">Radius (km) <span class="arrow" :class="{ 'open': isOpen('radius') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('radius')">
              <input type="range" min="1" max="50" v-model="filters.radius" />
              <div>
                <span>1 km</span>
                <span>{{ filters.radius }} km</span>
                <span>50 km</span>
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h3 @click="toggleSection('area')">Area (Sq.ft) <span class="arrow" :class="{ 'open': isOpen('area') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('area')">
              <input type="range" min="0" max="20000" v-model="filters.area" />
              <div>
                <span>0</span>
                <span>{{ filters.area }}</span>
              </div>
            </div>
          </div>

          <button class="apply-button" @click="applyFilters">Apply</button>
          <button v-if="hasActiveFilters" class="reset-button" @click="resetFilters">Reset Filters</button>
        </aside>

        <!-- Main Content Section -->
        <main class="main-content">
          <!-- Post Ad Form Section (First 3 steps) -->
          <div v-if="!formSubmitted" class="post-ad-form">
            <!-- Step 1: Category Selection -->
            <div v-if="currentStep === 1" class="form-step">
              <div class="step-header">
                <h3>Select Category</h3>
              </div>
              <div class="d-grid grid-cols-1 md:grid-cols-1 grid-section">
                <div
                  v-for="category in categories"
                  :key="category.id"
                  :class="[
                    'd-flex items-start bg-white p-4 card-section align-items-center gap-3',
                    { 'selected-card': selectedCategory === category.id },
                  ]"
                  @click="selectCategory(category)"
                >
                  <!-- Image -->
                  <img
                    :src="category.category_images"
                    alt="Category Image"
                    class="w-28 h-20 object-cover"
                  />
                  <!-- Content -->
                  <div class="ml-4 text-left">
                    <h3 class="category-card-title">
                      {{ category.category_title }}
                    </h3>
                    <p class="category-subtitle">
                      {{ category.category_description }}
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

            <!-- Step 2: Sub Category Selection -->
            <div v-if="currentStep === 2" class="form-step">
              <div class="step-header">
                <button class="back-button" @click="previousStep">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.5725 12L3.42969 12" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10"/>
                    <path d="M9.42969 18L3.42969 12L9.42969 6" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10" stroke-linecap="square"/>
                  </svg>
                  Back
                </button>
                <h3>Select Sub Category</h3>
              </div>

              <div class="ad-type-tabs">
                <button 
                  v-for="type in adTypes" 
                  :key="type.id"
                  class="tab-button"
                  :class="{ 'active': selectedType === type.id }"
                  @click="selectType(type.id)"
                >
                  {{ type.title }}
                </button>
              </div>

              <div class="subcategory-grid">
                <div 
                  v-for="subcategory in subCategories" 
                  :key="subcategory.id"
                  class="subcategory-card"
                  :class="{ 'selected': selectedSubCategory === subcategory.id }"
                  @click="toggleSubCategory(subcategory)"
                >
                  <img v-if="subcategory.sub_category_images" :src="subcategory.sub_category_images" :alt="subcategory.sub_category_title">
                  <span>{{ subcategory.sub_category_title }}</span>
                </div>
              </div>
            </div>

            <!-- Step 3: Sub-Sub Category Selection -->
            <div v-if="currentStep === 3" class="form-step">
              <div class="step-header">
                <button class="back-button" @click="previousStep">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.5725 12L3.42969 12" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10"/>
                    <path d="M9.42969 18L3.42969 12L9.42969 6" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10" stroke-linecap="square"/>
                  </svg>
                  Back
                </button>
                <h3>Select Specific Category</h3>
              </div>

              <div class="subcategory-grid">
                <div 
                  v-for="subSubCategory in currentSubCategory?.sub_sub_category_list" 
                  :key="subSubCategory.id"
                  class="subcategory-card"
                  :class="{ 'selected': selectedSubSubCategory?.id === subSubCategory.id }"
                  @click="selectSubSubCategory(subSubCategory); submitForm()"
                >
                  <img v-if="subSubCategory.image" :src="subSubCategory.image" :alt="subSubCategory.title">
                  <span>{{ subSubCategory.title }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ads Grid Section -->
          <div v-else class="ads-section">
            <!-- Applied Filters Section -->
            <div v-if="hasActiveFilters" class="applied-filters-section">
              <div class="applied-filters">
                <div v-if="filters.category" class="filter-tag">
                  <span>{{ getCategoryName(filters.category) }}</span>
                  <button @click="clearFilter('category')" class="clear-filter">×</button>
                </div>
                <div v-if="filters.type && filters.type !== 'all_ads'" class="filter-tag">
                  <span>{{ filters.type }}</span>
                  <button @click="clearFilter('type')" class="clear-filter">×</button>
                </div>
                <div v-if="filters.subCategory && filters.subCategory.length > 0" class="filter-tag">
                  <span>{{ getSubCategoryName(filters.subCategory[0]) }}</span>
                  <button @click="clearFilter('subCategory')" class="clear-filter">×</button>
                </div>
                <div v-if="selectedSubSubCategory" class="filter-tag">
                  <span>{{ selectedSubSubCategory.title }}</span>
                  <button @click="clearFilter('subSubCategory')" class="clear-filter">×</button>
                </div>
                <div v-if="locationDetails" class="filter-tag">
                  <span>{{ extractCityName(locationDetails.address) }}</span>
                  <button @click="clearFilter('location')" class="clear-filter">×</button>
                </div>
                <div v-if="filters.radius !== defaultFilters.radius" class="filter-tag">
                  <span>{{ filters.radius }}km radius</span>
                  <button @click="clearFilter('radius')" class="clear-filter">×</button>
                </div>
                <div v-if="filters.area !== defaultFilters.area" class="filter-tag">
                  <span>{{ filters.area }} sq.ft</span>
                  <button @click="clearFilter('area')" class="clear-filter">×</button>
                </div>
                <button @click="resetFilters" class="clear-all-button">Clear All</button>
              </div>
            </div>

            <div class="ads-header">
              <button class="back-to-form" @click="backToForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.5725 12L3.42969 12" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10"/>
                  <path d="M9.42969 18L3.42969 12L9.42969 6" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10" stroke-linecap="square"/>
                </svg>
                Back
              </button>
            </div>
            <div v-if="ads.length > 0" class="ads-grid">
              <div class="card h-100 shadow-sm hover-effect" v-for="(ad, index) in ads" :key="index" style="width: 18rem">
                <div class="position-relative">
                  <img :src="ad.ad_image || '/assets/images/posted.png'" :alt="ad.ad.title" class="card-img-top" />
                  <span class="ad-label">{{ ad.ad.type }}</span>
                </div>
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <h5 class="card-title mb-2">{{ ad.ad.title }}</h5>
                    <div class="heart-icon" @click="toggleFavorite(ad.ad.id, ad.is_liked)">
                      <svg v-if="ad.is_liked" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M24.3282 4.99269C20.9761 2.93654 18.0505 3.76514 16.293 5.08501C15.5722 5.6262 15.212 5.89679 15 5.89679C14.788 5.89679 14.4277 5.6262 13.707 5.08501C11.9495 3.76514 9.02386 2.93654 5.6718 4.99269C1.27259 7.69118 0.27715 16.5936 10.4244 24.1043C12.3571 25.5348 13.3235 26.25 15 26.25C16.6765 26.25 17.6429 25.5348 19.5756 24.1043C29.7229 16.5936 28.7274 7.69118 24.3282 4.99269Z" fill="#47509B"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.22172 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="black" stroke-linecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <p v-if="ad.price" class="fw-bold card-text price-text">₹ {{ ad.price }}/- <span v-if="ad.category.id === 1" class="per-mnth">per month</span></p>
                  <p class="card-text small text-muted mb-3">{{ ad.category.name }} - {{ ad.category.sub_category }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                      <span><img src="/assets/images/locationIcon.svg" alt=""></span> {{ extractCityName(ad.ad_info2) }}
                    </small>
                    <small class="text-muted">{{ formatTimeAgo(ad.ad_posted_on) }}</small>
                  </div>
                </div>
                <div class="card-footer bg-white border-0">
                  <button class="btn view-details w-100" @click="viewDetails(ad.ad.id)">View Details</button>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <h3>No Ads Found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>

            <!-- Add pagination controls -->
            <div v-if="hasNextPage || currentPage > 1" class="pagination">
              <button 
                :disabled="currentPage === 1" 
                @click="changePage(currentPage - 1)"
                class="page-button"
              >
                Previous
              </button>
              <span class="page-info">
                Page {{ currentPage }}
              </span>
              <button 
                :disabled="!hasNextPage" 
                @click="changePage(currentPage + 1)"
                class="page-button"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
    <howToPostAdSection/>
        <!-- <whyOtelSection/> -->
        <!-- <aboutUsSection/> -->
        <getTheAppSection/>
        <footerSection/>
    <div v-if="showMap" class="map-modal">
      <div class="map-popup">
        <span class="close-icon" @click="closeGoogleMap">✖</span>
        <googleMap ref="googleMapComponent" @mapEvent="handleMapEvent" :mapCenter="mapCenter"></googleMap>
      </div>
    </div>
  </div>
</template>

<script>
import headerSection from '../main-pages/headerSection.vue'
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../environment.js';
import googleMap from '../../components/googleMap.vue';
import MultiRangeSlider from "multi-range-slider-vue";
import getTheAppSection from '../main-pages/getTheAppSection.vue'
    import footerSection from '../main-pages/footerSection.vue'
    import howToPostAdSection from '../main-pages/howToPostAdSection.vue'

export default {
  components: {
    headerSection,
    googleMap,
    MultiRangeSlider,
    getTheAppSection,
    footerSection,
    howToPostAdSection
  },
  data() {
    return {
      filters: {
        category: null,
        subCategory: [],
        budget: { min: 0, max: 10000000 },
        area: 20000,
        radius: 10,
        sort: "date",
        type: "all_ads",
        coordinates: null,
        user_id: null,
        favourite_only: false
      },
      defaultFilters: {
        category: null,
        subCategory: [],
        budget: { min: 0, max: 10000000 },
        area: 20000,
        radius: 10,
        sort: "date",
        type: "all_ads",
        coordinates: null,
        user_id: null,
        favourite_only: false
      },
      minBudget: 0,
      maxBudget: 10000000,
      categories: [],
      subCategories: [],
      ads: [],
      openSections: {
        category: true,
        subcategory: true,
        budget: true,
        location: true,
        radius: true,
        area: true,
      },
      showMap: false,
      mapCenter: { lat: 12.9716, lng: 77.5946 }, // Default location
      locationDetails: null, // To store location details
      currentPage: 1,
      hasNextPage: false,
      currentStep: 1,
      formSubmitted: false,
      selectedCategory: null,
      selectedSubCategory: null,
      selectedType: null,
      adTypes: [], // Will be populated from category data
      totalSteps: 3,
      selectedSubSubCategory: null,
      hasSubSubCategories: false,
      currentSubCategory: null,
    };
  },
  async mounted() {
    await this.fetchCategories();
    this.fetchCurrentLocation();
    
    // Get user_id and favourite_only from URL if present
    const user_id = this.$route.query.user_id;
    const favourite_only = this.$route.query.favourite_only === 'true';
    
    if (user_id) {
      this.filters.user_id = user_id;
    }
    
    if (favourite_only) {
      this.filters.favourite_only = true;
    }
    
    await this.fetchInitialAds();
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    async fetchCategories() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.CATEGORY}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Get the category list directly from the response
        this.categories = response.data.result.category_list;
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchSubCategories(categoryId) {
      try {
        const token = localStorage.getItem('accessToken');
        let url;
        let response;

        if (categoryId === 3) {
          if (this.selectedType === 'applicant') {
            url = `${BASE_URL}${ENDPOINTS.APPLICANT_SUBCATEGORY}?category_id=3&type=Applicant`;
          } else if (this.selectedType === 'recruiter') {
            url = `${BASE_URL}${ENDPOINTS.APPLICANT_SUBCATEGORY}?category_id=3&type=Recruiter`;
          } else {
            url = `${BASE_URL}${ENDPOINTS.SUBCATEGORY}?category_id=${categoryId}`;
          }
        } else {
          url = `${BASE_URL}${ENDPOINTS.SUBCATEGORY}?category_id=${categoryId}`;
        }

        response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (categoryId === 3) {
          if (this.selectedType === 'applicant') {
            this.subCategories = response.data.result.data.map(item => ({
              ...item,
              sub_category_title: item.job_category_title || item.sub_category_title,
              sub_sub_category_list: item.job_sub_category_list?.length > 0 
                ? item.job_sub_category_list.map(subItem => ({
                    ...subItem,
                    title: subItem.job_sub_category_title,
                    image: subItem.job_sub_category_images
                  }))
                : (item.levels?.map(level => ({
                    id: level.code,
                    title: level.title,
                    image: null
                  })) || [])
            }));
          } else if (this.selectedType === 'recruiter') {
            this.subCategories = response.data.result.data.map(item => ({
              ...item,
              sub_sub_category_list: item.sub_sub_category_list?.length > 0
                ? item.sub_sub_category_list.map(subItem => ({
                    ...subItem,
                    title: subItem.sub_sub_category_title,
                    image: subItem.sub_sub_category_images
                  }))
                : (item.levels?.map(level => ({
                    id: level.code,
                    title: level.title,
                    image: null
                  })) || [])
            }));
          }
        } else if (categoryId === 4) { // Food Factory
          this.subCategories = response.data.results.map(item => ({
            ...item,
            sub_sub_category_list: item.food_factory_list?.length > 0
              ? item.food_factory_list.map(subItem => ({
                  ...subItem,
                  title: subItem.food_factory_title,
                  image: subItem.food_factory_images
                }))
              : (item.levels?.map(level => ({
                  id: level.code,
                  title: level.title,
                  image: null
                })) || [])
          }));
        } else if (categoryId === 5) { // Service Provider
          this.subCategories = response.data.results.map(item => ({
            ...item,
            sub_sub_category_list: item.service_provider_list?.length > 0
              ? item.service_provider_list.map(subItem => ({
                  ...subItem,
                  title: subItem.service_provider_title,
                  image: subItem.service_provider_images
                }))
              : (item.levels?.map(level => ({
                  id: level.code,
                  title: level.title,
                  image: null
                })) || [])
          }));
        } else {
          this.subCategories = response.data.results.map(item => ({
            ...item,
            sub_sub_category_list: item.sub_sub_category_list?.length > 0
              ? item.sub_sub_category_list.map(subItem => ({
                  ...subItem,
                  title: subItem.sub_sub_category_title,
                  image: subItem.sub_sub_category_images
                }))
              : (item.levels?.map(level => ({
                  id: level.code,
                  title: level.title,
                  image: null
                })) || [])
          }));
        }

        this.hasSubSubCategories = this.subCategories.some(
          item => (item.sub_sub_category_list && item.sub_sub_category_list.length > 0) || 
                 (item.levels && item.levels.length > 0)
        );

        this.totalSteps = this.hasSubSubCategories ? 3 : 2;
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    },
    toggleSection(section) {
      this.openSections[section] = !this.openSections[section];
    },
    isOpen(section) {
      return this.openSections[section];
    },
    formatCurrency(value) {
      return `₹${value}`;
    },
    openGoogleMap() {
      this.showMap = true;
      this.$nextTick(() => {
        if (this.mapCenter) {
          const googleMapComponent = this.$refs.googleMapComponent;
          if (googleMapComponent && googleMapComponent.setLocation) {
            googleMapComponent.setLocation(this.mapCenter.lat, this.mapCenter.lng);
          }
        }
      });
    },
    closeGoogleMap() {
      this.showMap = false;
    },
    handleMapEvent(eventData) {
      if (eventData.mapClosed) {
        this.showMap = false;
      }
      if (eventData.address) {
        this.mapCenter = eventData.locationInformation;
        this.locationDetails = eventData;
        this.filters.coordinates = {
          lat: eventData.locationInformation.lat,
          lng: eventData.locationInformation.lng
        };
        this.fetchFilteredAds(); // Fetch ads with new location
      }
    },
    fetchCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.mapCenter = { lat: latitude, lng: longitude };
          },
          (error) => {
            console.error("Error fetching current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
    handleBudgetChange({ minValue, maxValue }) {
      this.filters.budget.min = minValue;
      this.filters.budget.max = maxValue;
    },
    viewDetails(adId) {
      const ad = this.ads.find(ad => ad.ad.id === adId);
      if (ad) {
        this.$router.push({
          path: `/ads-details/${adId}`,
          query: {
            category_id: ad.category.id,
            type: ad.ad.type,
            ad_uuid: ad.ad.uuid
          }
        });
      }
    },
    async fetchInitialAds() {
      const params = new URLSearchParams();
      
      // Add sort parameter
      if (this.filters.sort) {
        let sortValue = this.filters.sort;
        switch(this.filters.sort) {
          case 'lowToHigh':
            sortValue = 'price_low_to_high';
            break;
          case 'highToLow':
            sortValue = 'price_high_to_low';
            break;
          case 'date':
            sortValue = 'new_to_old';
            break;
        }
        params.append('sort', sortValue);
      }

      // Add user_id if present
      if (this.filters.user_id) {
        params.append('user_id', this.filters.user_id);
      }

      // Add favourite_only if true
      if (this.filters.favourite_only) {
        params.append('favourite_only', 'true');
      }

      try {
        const token = localStorage.getItem('accessToken');
        const url = `${BASE_URL}web/ads/?page=1&${params.toString()}`;

        const response = await axios.get(url, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data) {
          this.ads = response.data.results;
          this.hasNextPage = !!response.data.next;
        }
      } catch (error) {
        console.error("Error fetching initial ads:", error);
      }
    },
    async applyFilters() {
      try {
        const token = localStorage.getItem('accessToken');
        const params = new URLSearchParams();
        
        // Reset page to 1 when applying filters
        this.currentPage = 1;
        params.append('page', 1);
        
        // Add all existing filter parameters
        if (this.filters.category) {
          params.append('category', this.filters.category);
        }
        
        if (this.filters.subCategory && this.filters.subCategory.length > 0) {
          this.filters.subCategory.forEach(subCategoryId => {
            params.append('sub_category', subCategoryId);
          });
        }
        
        params.append('min_price', this.filters.budget.min);
        params.append('max_price', this.filters.budget.max);
        
        if (this.locationDetails && this.filters.coordinates) {
          params.append('lat', this.filters.coordinates.lat);
          params.append('lng', this.filters.coordinates.lng);
        }
        
        params.append('radius', this.filters.radius);
        
        if (this.filters.area) {
          params.append('area', this.filters.area);
        }
        
        if (this.filters.sort) {
          let sortValue = this.filters.sort;
          switch(this.filters.sort) {
            case 'lowToHigh':
              sortValue = 'price_low_to_high';
              break;
            case 'highToLow':
              sortValue = 'price_high_to_low';
              break;
            case 'date':
              sortValue = 'new_to_old';
              break;
          }
          params.append('sort', sortValue);
        }
        
        if (this.filters.type) {
          params.append('type', this.filters.type);
        }

        // Add user_id if present
        if (this.filters.user_id) {
          params.append('user_id', this.filters.user_id);
        }

        // Add favourite_only if true
        if (this.filters.favourite_only) {
          params.append('favourite_only', 'true');
        }

        const url = `${BASE_URL}web/ads/?${params.toString()}`;

        const response = await axios.get(url, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data) {
          this.ads = response.data.results;
          this.hasNextPage = !!response.data.next;
        }
      } catch (error) {
        console.error("Error fetching filtered ads:", error);
      }
    },
    async changePage(page) {
      this.currentPage = page;
      await this.fetchPage(page);
      this.scrollToTop();
    },
    async fetchPage(page) {
      try {
        const token = localStorage.getItem('accessToken');
        const params = new URLSearchParams();
        
        params.append('page', page);
        
        // Add all existing filter parameters
        if (this.filters.category) {
          params.append('category', this.filters.category);
        }
        
        if (this.filters.subCategory && this.filters.subCategory.length > 0) {
          this.filters.subCategory.forEach(subCategoryId => {
            params.append('sub_category', subCategoryId);
          });
        }
        
        params.append('min_price', this.filters.budget.min);
        params.append('max_price', this.filters.budget.max);
        
        if (this.locationDetails && this.filters.coordinates) {
          params.append('lat', this.filters.coordinates.lat);
          params.append('lng', this.filters.coordinates.lng);
        }
        
        params.append('radius', this.filters.radius);
        
        if (this.filters.area) {
          params.append('area', this.filters.area);
        }
        
        if (this.filters.sort) {
          let sortValue = this.filters.sort;
          switch(this.filters.sort) {
            case 'lowToHigh':
              sortValue = 'price_low_to_high';
              break;
            case 'highToLow':
              sortValue = 'price_high_to_low';
              break;
            case 'date':
              sortValue = 'new_to_old';
              break;
          }
          params.append('sort', sortValue);
        }
        
        if (this.filters.type) {
          params.append('type', this.filters.type);
        }

        // Add user_id if present
        if (this.filters.user_id) {
          params.append('user_id', this.filters.user_id);
        }

        // Add favourite_only if true
        if (this.filters.favourite_only) {
          params.append('favourite_only', 'true');
        }

        const url = `${BASE_URL}web/ads/?${params.toString()}`;

        const response = await axios.get(url, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data) {
          this.ads = response.data.results;
          this.hasNextPage = !!response.data.next;
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    },
    resetFilters() {
      // Reset all filters to default values
      this.filters = JSON.parse(JSON.stringify(this.defaultFilters));
      this.subCategories = []; // Clear subcategories
      this.currentPage = 1; // Reset to first page
      this.hasNextPage = false; // Reset hasNextPage
      this.locationDetails = null; // Clear location details
      this.filters.coordinates = null; // Clear coordinates
      this.selectedCategory = null;
      this.selectedSubCategory = null;
      this.selectedType = null;
      this.selectedSubSubCategory = null;
      this.currentStep = 1;
      this.formSubmitted = false;
      this.applyFilters(); // Apply the reset filters
    },
    backToForm() {
      if (this.selectedSubSubCategory) {
        // If we have a sub-sub-category selected, go back to sub-sub-category selection
        this.formSubmitted = false;
        this.currentStep = 3;
      } else if (this.selectedSubCategory) {
        // If we have a sub-category selected but no sub-sub-category, go back to sub-category selection
        this.formSubmitted = false;
        this.currentStep = 2;
      } else {
        // If neither is selected, go back to category selection
        this.formSubmitted = false;
        this.currentStep = 1;
      }
      this.scrollToTop();
    },
    async toggleFavorite(adId, currentStatus) {
      try {
        const token = localStorage.getItem('accessToken');
        // Find the ad to get its category_id
        const ad = this.ads.find(ad => ad.ad.id === adId);
        if (!ad) return;

        const response = await axios.post(
          `${BASE_URL}ads/favourite/`,
          { 
            ad_id: adId,
            category_id: ad.category.id==8 || ad.category.id==7? 3 : ad.category.id,
            type: ad.ad.type
          },
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Update the is_liked status in the ads array
        const adIndex = this.ads.findIndex(ad => ad.ad.id === adId);
        if (adIndex !== -1) {
          this.ads[adIndex].is_liked = !currentStatus;
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    },
    formatTimeAgo(timestamp) {
      if (!timestamp) return '';
      
      const now = new Date();
      const postedDate = new Date(timestamp);
      const diffInSeconds = Math.floor((now - postedDate) / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);

      if (diffInYears > 0) {
        return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
      } else if (diffInMonths > 0) {
        return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
      } else if (diffInDays > 0) {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
      } else if (diffInHours > 0) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
      } else if (diffInMinutes > 0) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
      } else {
        return 'Just now';
      }
    },
    extractCityName(address) {
      if (!address) return '';
      
      // Split the address by commas and remove any leading/trailing spaces
      const parts = address.split(',').map(part => part.trim());
      
      // Get the third item from last (city name)
      // If there aren't enough parts, return the last available part
      if (parts.length >= 3) {
        return parts[parts.length - 3];
      } else if (parts.length > 0) {
        return parts[parts.length - 1];
      }
      return '';
    },
    async selectCategory(category) {
      this.selectedCategory = category.id;
      this.selectedSubCategory = null;
      this.selectedSubSubCategory = null;
      
      // Reset selected type
      this.selectedType = null;
      
      // Update ad types based on category's applicant and recruiter titles for jobs
      if (category.id === 3) { // Jobs category
        this.adTypes = [
          { id: 'recruiter', title: category.recruiter?.title || 'Recruiter' },
          { id: 'applicant', title: category.applicant?.title || 'Applicant' }
        ];
        // Set recruiter as default for jobs
        this.selectType('recruiter');
      } else if (category.seller && category.buyer) {
        // For other categories, use seller/buyer
        this.adTypes = [
          { id: 'seller', title: category.seller.title },
          { id: 'buyer', title: category.buyer.title }
        ];
        // Set seller as default
        this.selectType('seller');
      } else {
        // Fallback if no specific titles are available
        this.adTypes = [
          { id: 'seller', title: 'Seller' },
          { id: 'buyer', title: 'Buyer' }
        ];
        // Set seller as default
        this.selectType('seller');
      }
      
      // Fetch subcategories after setting the type
      await this.fetchSubCategories(category.id);
      
      // Automatically advance to next step
      this.nextStep();
    },
    toggleSubCategory(subcategory) {
      this.selectedSubCategory = subcategory.id;
      this.currentSubCategory = subcategory;
      
      if (this.hasSubSubCategories && subcategory.sub_sub_category_list?.length > 0) {
        this.nextStep();
      } else {
        // If no sub-sub-categories, submit the form
        this.submitForm();
      }
    },
    selectSubSubCategory(subSubCategory) {
      this.selectedSubSubCategory = subSubCategory;
    },
    async selectType(type) {
      this.selectedType = type;
      this.filters.type = type;
      this.selectedSubCategory = null;
      this.selectedSubSubCategory = null;
      
      if (this.selectedCategory === 3) {
        await this.fetchSubCategories(this.selectedCategory);
      }
    },
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.scrollToTop();
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.scrollToTop();
      }
    },
    async submitForm() {
      // Set all filter values
      this.filters = {
        ...this.filters,
        category: this.selectedCategory,
        subCategory: this.selectedSubCategory ? [this.selectedSubCategory] : [],
        type: this.selectedType || 'all_ads',
      };
      
      // Set coordinates if location is selected
      if (this.locationDetails) {
        this.filters.coordinates = {
          lat: this.locationDetails.locationInformation.lat,
          lng: this.locationDetails.locationInformation.lng
        };
      }
      
      // Set form submitted state
      this.formSubmitted = true;
      
      // Apply filters and fetch ads
      await this.applyFilters();
      this.scrollToTop();
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.category_title : '';
    },
    getSubCategoryName(subCategoryId) {
      const subCategory = this.subCategories.find(sub => sub.id === subCategoryId);
      return subCategory ? subCategory.sub_category_title : '';
    },
    clearFilter(filterType) {
      switch(filterType) {
        case 'category':
          this.filters.category = null;
          this.filters.subCategory = [];
          this.selectedCategory = null;
          this.selectedSubCategory = null;
          this.selectedSubSubCategory = null;
          break;
        case 'type':
          this.filters.type = 'all_ads';
          this.selectedType = null;
          break;
        case 'subCategory':
          this.filters.subCategory = [];
          this.selectedSubCategory = null;
          this.selectedSubSubCategory = null;
          break;
        case 'subSubCategory':
          this.selectedSubSubCategory = null;
          break;
        case 'location':
          this.locationDetails = null;
          this.filters.coordinates = null;
          break;
        case 'radius':
          this.filters.radius = this.defaultFilters.radius;
          break;
        case 'area':
          this.filters.area = this.defaultFilters.area;
          break;
      }
      this.applyFilters();
    },
  },
  computed: {
    pageTitle() {
      if (this.filters.favourite_only) {
        return 'All Favorite Ads';
      } else if (this.filters.user_id) {
        return 'My Ads';
      }
      return 'All Ads';
    },
    hasActiveFilters() {
      return (
        this.filters.category !== this.defaultFilters.category ||
        this.filters.subCategory.length > 0 ||
        this.filters.type !== this.defaultFilters.type ||
        this.filters.area !== this.defaultFilters.area ||
        this.filters.radius !== this.defaultFilters.radius ||
        this.filters.coordinates !== this.defaultFilters.coordinates ||
        this.filters.sort !== this.defaultFilters.sort ||
        this.locationDetails !== null ||
        this.selectedSubSubCategory !== null
      );
    }
  },
  watch: {
    'filters.sort': {
      handler(newValue, oldValue) {
        // Only trigger if the value actually changed
        if (newValue !== oldValue) {
          this.applyFilters();
        }
      }
    }
  },
};
</script>

<style scoped>
.ads-page{
  padding: 0px 5%;
}
/* Breadcrumb */
.breadcrumb {
  margin-bottom: 10px;
  color: #777;
  font-size: 14px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 59px;
  margin-top: 32px;
}

.page-title {
  color: #161C2D;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
  margin: 0; /* Remove margins since we're handling it in the container */
}

.sort-section {
  margin-bottom: 0; /* Remove bottom margin */
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-section select {
  padding: 8px 12px;
  border: 1px solid #DEE1E6;
  border-radius: 6px;
  font-size: 14px;
  color: #161C2D;
  background-color: white;
}

/* Ads Page Layout */
.ads-container {
  display: flex;
  gap: 20px;
}

.filters {
  flex: 1;
  max-width: 293px;
  background: #ffffff;
  border-radius: 10px;
  position: sticky;
  top: 0;
  /* height: 100vh; */
  overflow-y: auto;
  padding-right: 15px;
}
.filters h2{
  margin-bottom: 26px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
}

.filter-section {
  margin-bottom: 20px;
  cursor: pointer;
  padding-left: 10px;
}

.filter-section h3 {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
}
.filter-section h2 {
  color: #161C2D80;
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  justify-content:left;
  align-items: center;
  margin: 0px;
}
.border-class{
  border-top: 1px solid #161C2D80;
  margin-bottom: 24px;
}
.filter-options {
  display: grid;
  flex-wrap: wrap;
  gap: 20px;
}

.arrow {
  transition: transform 0.3s ease;
}
.location-search{
  padding: 10px;
  border-radius: 4px;
  background: rgba(217, 217, 217, 0.50);
}
.location-icon{
  margin-right: 10px;
}
.arrow.open {
  transform: rotate(180deg);
}

.apply-button {
  display: block;
  width: 100%;
  border-radius: 8px;
  background: #47509B;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-bottom: 30px;
}

.ads-list {
  flex: 3;
  overflow-y: auto;
  /* height: 100vh; */
}

.ads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    justify-items: end;
}

.card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #DEE1E6;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}



.ad-label {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background: #EDECF5;
  border-radius: 8px;
  background: linear-gradient(180deg, #47509B 0%, #A20584 100%);
  color: white;
}



.card-footer {
  padding-bottom: 20px;
}

.view-details {
  background: #47509B;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.hover-effect {
  border-radius: 8px;
}

.slider-container {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  padding: 0px 20px;
}

.multi-range-slider {
  padding: 0 !important;
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}

.multi-range-slider .track {
  height: 4px !important;
  background: #47509B !important;
}

.multi-range-slider .thumb {
  width: 16px !important;
  height: 16px !important;
  background: #47509B !important;
  border: none !important;
  box-shadow: none !important;
  cursor: pointer !important;
}

.multi-range-slider .thumb:hover {
  background: #3a4179 !important;
}

.multi-range-slider .range {
  background: #47509B !important;
}

.budget-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.map-modal {
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
}

.map-popup {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}
.ruler {
  display: none!important;
}
.no-subcategory {
  color: #161C2D;
font-size: 15px;
font-style: normal;
font-weight: 400;
opacity: 0.7;
}

.filter-section input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

.filter-section input[type="range"] + div {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
  font-size: 14px;
  color: #666;
}

.reset-button {
  display: block;
  width: 100%;
  border-radius: 8px;
  background: #fff;
  color: #47509B;
  padding: 10px;
  border: 1px solid #47509B;
  cursor: pointer;
  margin-bottom: 30px;
}

.reset-button:hover {
  background: #f5f5f5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  margin-top: 20px;
}

.empty-state-image {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #161C2D;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.empty-state p {
  color: #666;
  font-size: 16px;
  margin: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px 0;
}

.page-button {
  padding: 8px 16px;
  border: 1px solid #47509B;
  background: #fff;
  color: #47509B;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-button:hover:not(:disabled) {
  background: #47509B;
  color: #fff;
}

.page-button:disabled {
  border-color: #ccc;
  color: #ccc;
  cursor: not-allowed;
}

.page-info {
  color: #666;
  font-size: 14px;
}

.heart-icon {
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 5px;
}

.heart-icon:hover {
  transform: scale(1.1);
}

.heart-icon svg {
  transition: all 0.2s ease;
}

.heart-icon:hover svg {
  filter: brightness(1.2);
}
.card-text {
  color: black;
  font-size: 14px;
  margin-bottom: 16px;
  color: black;
}
.per-mnth{
  font-size: 12px;
font-style: normal;
font-weight: 500;
}

.breadcrumb-link {
  text-decoration: none;
  color: #777;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.breadcrumb-link:hover {
  color: #47509B;
}

.breadcrumb-link svg {
  vertical-align: middle;
}
.price-text {
  color:black;
  font-family: 'Poppins', sans-serif;
  font-size:20px;
  margin-bottom:18px;
}

.main-content {
  flex: 3;
  overflow-y: auto;
}

.post-ad-form {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-step {
  margin-bottom: 2rem;
}

.form-step h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #161C2D;
}

.category-grid, .subcategory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-card, .subcategory-card {
  border: 1px solid #DEE1E6;
  border-radius: 8px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  height: 180px;
}

.category-card img, .subcategory-card img {
  width: 100%;
  height: 75%;
  object-fit: cover;
  margin: 0;
}

.category-card span, .subcategory-card span {
  font-size: 14px;
  font-weight: 500;
  color: #161C2D;
  padding: 12px;
  text-align: center;
  background: white;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-card.selected, .subcategory-card.selected {
  border-color: #47509B;
  background-color: white;
}

.category-card.selected span, .subcategory-card.selected span {
  background-color: #F5F6FF;
}

.category-grid, .subcategory-grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.ad-type-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #DEE1E6;
  padding-bottom: 1rem;
}

.tab-button {
  padding: 0.75rem 2rem;
  border: none;
  background: none;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.tab-button.active {
  color: #47509B;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #47509B;
}

.tab-button:hover {
  color: #47509B;
}

.applied-filters-section {
  margin: 0 0 20px 0;
  padding: 15px 0;
  border-bottom: 1px solid #DEE1E6;
}

.applied-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F5F6FF;
  border: 1px solid #47509B;
  border-radius: 20px;
  font-size: 14px;
  color: #47509B;
}

.clear-filter {
  background: none;
  border: none;
  color: #47509B;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.clear-filter:hover {
  background: rgba(71, 80, 155, 0.1);
}

.clear-all-button {
  padding: 6px 12px;
  background: white;
  border: 1px solid #47509B;
  border-radius: 20px;
  color: #47509B;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.clear-all-button:hover {
  background: #F5F6FF;
}

.ads-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-to-form {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #47509B;
  border-radius: 8px;
  color: #47509B;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-to-form:hover {
  background: #F5F6FF;
}

.back-to-form svg {
  width: 20px;
  height: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.next-button, .back-button {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-button {
  background: #47509B;
  color: white;
  border: none;
}

.next-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.back-button {
  background: white;
  color: #47509B;
  border: 1px solid #47509B;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.type-card {
  border: 1px solid #DEE1E6;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.type-card img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.type-card span {
  font-size: 16px;
  font-weight: 500;
  color: #161C2D;
}

.type-card.selected {
  border-color: #47509B;
  background-color: #F5F6FF;
}

.type-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.step-header h3 {
  margin: 0;
  flex-grow: 1;
}

.step-header .back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 16px;
  background: white;
  border: 1px solid #47509B;
  border-radius: 8px;
  color: #47509B;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.step-header .back-button:hover {
  background: #F5F6FF;
}

.step-header .back-button svg {
  width: 20px;
  height: 20px;
}

.grid-section {
  display: grid;
  gap: 1rem;
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card-section {
  border: 1px solid #DEE1E6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.card-section:hover {
  border-color: #47509B;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.selected-card {
  border-color: #47509B;
  background-color: #F5F6FF !important;
}

.category-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #161C2D;
  margin-bottom: 4px;
}

.category-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.w-28 {
  width: 112px;
}

.h-20 {
  height: 80px;
}

.object-cover {
  object-fit: cover;
}

.d-flex {
  display: flex;
}

.items-start {
  align-items: flex-start;
}

.align-items-center {
  align-items: center;
}

.gap-3 {
  gap: 12px;
}

.ml-4 {
  margin-left: 16px;
}

.text-left {
  text-align: left;
}

.p-4 {
  padding: 16px;
}

.bg-white {
  background-color: white;
}

/* Update subcategory and sub-subcategory styles to original grid layout */
.subcategory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.subcategory-card {
  border: 1px solid #DEE1E6;
  border-radius: 8px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  height: 180px;
}

.subcategory-card img {
  width: 100%;
  height: 75%;
  object-fit: cover;
  margin: 0;
}

.subcategory-card span {
  font-size: 14px;
  font-weight: 500;
  color: #161C2D;
  padding: 12px;
  text-align: center;
  background: white;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subcategory-card.selected {
  border-color: #47509B;
  background-color: white;
}

.subcategory-card.selected span {
  background-color: #F5F6FF;
}
</style>