<template>
  <div>
    <headerSection/>
    <div class="ads-page">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M20.5725 12L3.42969 12" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10"/>
<path d="M9.42969 18L3.42969 12L9.42969 6" stroke="#323743" stroke-width="2.05714" stroke-miterlimit="10" stroke-linecap="square"/>
</svg> Home</a> &gt; <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_1041_2215)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7083 11.2932C15.8958 11.4807 16.0011 11.735 16.0011 12.0002C16.0011 12.2653 15.8958 12.5197 15.7083 12.7072L10.0513 18.3642C9.95907 18.4597 9.84873 18.5359 9.72672 18.5883C9.60472 18.6407 9.4735 18.6683 9.34072 18.6694C9.20794 18.6706 9.07626 18.6453 8.95337 18.595C8.83047 18.5447 8.71882 18.4705 8.62492 18.3766C8.53103 18.2827 8.45678 18.171 8.4065 18.0481C8.35622 17.9252 8.33092 17.7936 8.33207 17.6608C8.33322 17.528 8.36081 17.3968 8.41322 17.2748C8.46563 17.1528 8.54181 17.0424 8.63732 16.9502L13.5873 12.0002L8.63732 7.05018C8.45516 6.86158 8.35437 6.60898 8.35665 6.34678C8.35892 6.08458 8.46409 5.83377 8.6495 5.64836C8.83491 5.46295 9.08572 5.35778 9.34792 5.35551C9.61011 5.35323 9.86272 5.45402 10.0513 5.63618L15.7083 11.2932Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_1041_2215">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg> View Ads</a> &gt; <span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_1041_2215)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7083 11.2932C15.8958 11.4807 16.0011 11.735 16.0011 12.0002C16.0011 12.2653 15.8958 12.5197 15.7083 12.7072L10.0513 18.3642C9.95907 18.4597 9.84873 18.5359 9.72672 18.5883C9.60472 18.6407 9.4735 18.6683 9.34072 18.6694C9.20794 18.6706 9.07626 18.6453 8.95337 18.595C8.83047 18.5447 8.71882 18.4705 8.62492 18.3766C8.53103 18.2827 8.45678 18.171 8.4065 18.0481C8.35622 17.9252 8.33092 17.7936 8.33207 17.6608C8.33322 17.528 8.36081 17.3968 8.41322 17.2748C8.46563 17.1528 8.54181 17.0424 8.63732 16.9502L13.5873 12.0002L8.63732 7.05018C8.45516 6.86158 8.35437 6.60898 8.35665 6.34678C8.35892 6.08458 8.46409 5.83377 8.6495 5.64836C8.83491 5.46295 9.08572 5.35778 9.34792 5.35551C9.61011 5.35323 9.86272 5.45402 10.0513 5.63618L15.7083 11.2932Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_1041_2215">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>All Ads</span>
      </nav>

      <h1 class="page-title">All Ads</h1>

      <div class="ads-container">
        <!-- Filters Section -->
        <aside class="filters">
          <h2>Filters</h2>

          <div class="filter-section">
            <h3 @click="toggleSection('category')">Category <span class="arrow" :class="{ 'open': isOpen('category') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('category')" class="filter-options">
              <label v-for="category in categories" :key="category.id">
                <input type="radio" name="category" :value="category.id" v-model="filters.category" @change="fetchSubCategories(category.id)" />
                {{ category.category_title }}
              </label>
            </div>
          </div>
          <div class="border-class"></div>
          <div class="filter-section" >
            <h3 @click="toggleSection('subcategory')">Sub-Category <span class="arrow" :class="{ 'open': isOpen('subcategory') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('subcategory')&&filters.category" class="filter-options">
              <label v-for="subcategory in subCategories" :key="subcategory.id">
                <input type="checkbox" :value="subcategory.id" v-model="filters.subCategory" />
                {{ subcategory.sub_category_title }}
              </label>
            </div>
            <div class="no-subcategory" v-if="!filters.category">
            Please select a category to view its sub category
          </div>
          </div>
          
          <div class="border-class"></div>
          <div v-if="filters.category!=3&&filters.category!=4&&filters.category!=6&&filters.category!=7&&filters.category!=8" class="filter-section">
            <h3 @click="toggleSection('budget')">Budget {{filters.category}} <span class="arrow" :class="{ 'open': isOpen('budget') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('budget')">
              <div class="slider-container">
                <MultiRangeSlider
                  :min="minBudget"
                  :max="maxBudget"
                  :minValue="filters.budget.min"
                  :maxValue="filters.budget.max"
                  :step="1000"
                  @input="handleBudgetChange"
                />
                <div class="budget-labels">
                  <span>{{ minBudget.toLocaleString() }}</span>
                  <span>{{ filters.budget.min.toLocaleString() }} - {{ filters.budget.max.toLocaleString() }}</span>
                  <span>{{ maxBudget.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h3 @click="toggleSection('location')">Location <span class="arrow" :class="{ 'open': isOpen('location') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('location')" class="filter-options">
              <div class="location-search" @click="openGoogleMap">
                <h2><span class="location-icon"><img src="/assets/images/locationIcon.svg" alt=""></span>select location</h2>
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

        <!-- Ads List Section -->
        <main class="ads-list">
          <div class="sort-section">
            <span>Sort by:</span>
            <select v-model="filters.sort">
              <option value="date">Date posted</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          <div class="ads-grid">
            <div class="card h-100 shadow-sm hover-effect" v-for="(ad, index) in ads" :key="index" style="width: 18rem">
              <div class="position-relative">
                <img :src="ad.ad_image || '/assets/images/posted.png'" :alt="ad.ad.title" class="card-img-top" />
                <span class="ad-label">{{ ad.ad.type }}</span>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title mb-2">{{ ad.ad.title }}</h5>
                  <img src="/assets/images/love-blue.png" alt="">
                </div>
                <p class="card-text text-primary fw-bold mb-1 price-text">₹ {{ ad.price }} / month</p>
                <p class="card-text small text-muted mb-3">{{ ad.category.name }} - {{ ad.category.sub_category }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    <span><img src="/assets/images/locationIcon.svg" alt=""></span> {{ ad.ad_info2 }}
                  </small>
                  <small class="text-muted">{{ ad.ad_posted_on }}</small>
                </div>
              </div>
              <div class="card-footer bg-white border-0">
                <button class="btn view-details w-100" @click="viewDetails(ad.ad.id)">View Details</button>
              </div>
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
        budget: { min: 0, max: 100000 },
        area: 20000,
        radius: 10,
        sort: "date",
        type: "all_ads",
        coordinates: null
      },
      defaultFilters: {
        category: null,
        subCategory: [],
        budget: { min: 0, max: 100000 },
        area: 20000,
        radius: 10,
        sort: "date",
        type: "all_ads",
        coordinates: null
      },
      minBudget: 0,
      maxBudget: 100000,
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
    };
  },
  async mounted() {
    await this.fetchCategories();
    this.fetchCurrentLocation();
    await this.fetchInitialAds(); // Changed to fetchInitialAds
  },
  methods: {
    async fetchCategories() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.CATEGORY}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filter out category with id 3
        this.categories = response.data.result.category_list.filter(category => category.id !== 3);
        
        // Add additional categories
        const additionalCategories = [
          {
            id: 8,
            category_title: "Applicant",
            category_images: "http://localhost:8000/media/MasterCategory_images/spaces_home_cate_Mc3pDUL.png",
            category_description: "",
            sub_category: [],
            short_title: "",
            short_description: ""
          },
          {
            id: 7,
            category_title: "Recruiter",
            category_images: "http://localhost:8000/media/MasterCategory_images/home_used_eq.png",
            category_description: "",
            sub_category: [],
            short_title: "",
            short_description: ""
          }
        ];
        
        // Add the additional categories to the existing categories array
        this.categories = [...this.categories, ...additionalCategories];
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchSubCategories(categoryId) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.SUBCATEGORY}?category_id=${categoryId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.subCategories = response.data.results;
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
      this.$router.push(`/ads-details/${adId}`);
    },
    async fetchInitialAds() {
      debugger
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}web/ads/`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if ( response.data.results) {
          debugger;
          this.ads = response.data.results;
        }
      } catch (error) {
        console.error("Error fetching initial ads:", error);
      }
    },
    async applyFilters() {
      try {
        const token = localStorage.getItem('accessToken');
        
        // Build query parameters
        const params = new URLSearchParams();
        
        // Add category if selected
        if (this.filters.category) {
          params.append('category', this.filters.category);
        }
        
        // Add sub-categories if selected
        if (this.filters.subCategory && this.filters.subCategory.length > 0) {
          params.append('sub_category', this.filters.subCategory.join(','));
        }
        
        // Always add budget range values
        params.append('min_price', this.filters.budget.min);
        params.append('max_price', this.filters.budget.max);
        
        // Add coordinates if available
        if (this.filters.coordinates) {
          params.append('lat', this.filters.coordinates.lat);
          params.append('lng', this.filters.coordinates.lng);
        } else {
          params.append('lat', this.mapCenter.lat);
          params.append('lng', this.mapCenter.lng);
        }
        
        // Add radius
        params.append('radius', this.filters.radius);
        
        // Add area if set
        if (this.filters.area) {
          params.append('area', this.filters.area);
        }
        
        // Add sort parameter
        if (this.filters.sort) {
          let sortValue = this.filters.sort;
          // Convert sort values to match API expectations
          switch(this.filters.sort) {
            case 'lowToHigh':
              sortValue = 'lowToHigh';
              break;
            case 'highToLow':
              sortValue = 'highToLow';
              break;
            case 'date':
              sortValue = 'date';
              break;
          }
          params.append('sort', sortValue);
        }
        
        // Add type parameter
        if (this.filters.type) {
          params.append('type', this.filters.type);
        }

        console.log("Filter params:", params.toString());
        const response = await axios.get(`${BASE_URL}web/ads/?${params.toString()}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.result) {
          this.ads = response.data.result;
        }
      } catch (error) {
        console.error("Error fetching filtered ads:", error);
      }
    },
    resetFilters() {
      // Reset all filters to default values
      this.filters = JSON.parse(JSON.stringify(this.defaultFilters));
      this.subCategories = []; // Clear subcategories
      this.applyFilters(); // Apply the reset filters
    },
  },
  computed: {
    hasActiveFilters() {
      return (
        this.filters.category !== null ||
        this.filters.subCategory.length > 0 ||
        this.filters.budget.min !== 50000 ||
        this.filters.budget.max !== 100000 ||
        this.filters.area !== 20000 ||
        this.filters.radius !== 10 ||
        this.filters.coordinates !== null ||
        this.filters.sort !== 'date'
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

.page-title {
  color: #161C2D;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
  margin-top: 32px;
  margin-bottom: 59px;
}

/* Ads Page Layout */
.ads-container {
  display: flex;
  gap: 20px;
}

.filters {
  flex: 1;
  max-width: 390px;
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

.sort-section {
  margin-bottom: 20px;
  text-align: right;
}

.ads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
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

.card-text {
  font-size: 14px;
  margin-bottom: 16px;
  color: #555;
}

.ad-label {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background: #EDECF5;
  border-radius: 8px;
}

.price-text {
  font-family: 'Poppins', sans-serif;
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
</style>