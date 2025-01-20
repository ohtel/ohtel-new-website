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
</svg>Restaurant without bar</span>
      </nav>

      <h1 class="page-title">Restaurant without bar</h1>

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

          <div class="filter-section" v-if="filters.category">
            <h3 @click="toggleSection('subcategory')">Sub-Category <span class="arrow" :class="{ 'open': isOpen('subcategory') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('subcategory')" class="filter-options">
              <label v-for="subcategory in subCategories" :key="subcategory.id">
                <input type="checkbox" :value="subcategory.id" v-model="filters.subCategory" />
                {{ subcategory.sub_category_title }}
              </label>
            </div>
          </div>

          <div class="filter-section">
            <h3 @click="toggleSection('budget')">Budget <span class="arrow" :class="{ 'open': isOpen('budget') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('budget')">
              <label for="budget">Budget</label>
              <div class="slider-container">
                <input
                  id="budget"
                  type="range"
                  v-model="filters.budget"
                  :min="minBudget"
                  :max="maxBudget"
                  step="1000"
                />
                <div class="budget-labels">
                  <span>{{ minBudget }}</span>
                  <span>{{ filters.budget.toLocaleString() }}</span>
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
              <label><input type="radio" name="location" value="Rajajinagar" /> Rajajinagar</label>
              <label><input type="radio" name="location" value="Mahatma Gandhi Road" /> Mahatma Gandhi Road</label>
              <label><input type="radio" name="location" value="HSR Layout" /> HSR Layout</label>
              <label><input type="radio" name="location" value="Koramangala" /> Koramangala</label>
            </div>
          </div>

          <div class="filter-section">
            <h3 @click="toggleSection('furnishing')">Furnishing <span class="arrow" :class="{ 'open': isOpen('furnishing') }">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M13 6.99995C13 6.99995 8.5811 1 7 1C5.4188 1 1 7 1 7" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span></h3>
            <div v-if="isOpen('furnishing')" class="filter-options">
              <label><input type="radio" name="furnishing" value="Furnished" /> Furnished</label>
              <label><input type="radio" name="furnishing" value="Semi-Furnished" /> Semi-Furnished</label>
              <label><input type="radio" name="furnishing" value="Unfurnished" /> Unfurnished</label>
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

          <button class="apply-button">Apply</button>
        </aside>

        <!-- Ads List Section -->
        <main class="ads-list">
          <div class="sort-section">
            <span>Sort by:</span>
            <select v-model="filters.sort">
              <option value="date">Date posted</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div class="ads-grid">
            <div class="card h-100 shadow-sm hover-effect" v-for="(ad, index) in ads" :key="index" style="width: 18rem">
              <div class="position-relative">
                <img src="/assets/images/posted.png" :alt="ad.title" class="card-img-top" />
                <span class="ad-label">{{ ad.label }}</span>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title mb-2">{{ ad.title }}</h5>
                  <img src="/assets/images/love-blue.png" alt="">
                </div>
                <p class="card-text text-primary fw-bold mb-1 price-text">₹ {{ ad.price }} / month</p>
                <p class="card-text small text-muted mb-3">{{ ad.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    <span><img src="/assets/images/locationIcon.svg" alt=""></span> {{ ad.location }}
                  </small>
                  <small class="text-muted">{{ ad.date }}</small>
                </div>
              </div>
              <div class="card-footer bg-white border-0">
                <button class="btn view-details w-100">View Details</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import headerSection from '../main-pages/headerSection.vue'
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../environment.js';

export default {
  components: {
    headerSection,
  },
  data() {
    return {
      filters: {
        category: null,
        subCategory: [],
        budget: 50000, // default value
        area: 20000,
        sort: "date",
      },
      minBudget: 0,
      maxBudget: 100000,
      categories: [],
      subCategories: [],
      ads: [
        {
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },
        {
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },
        {
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },
        {
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },{
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },{
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },
        {
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },
        {
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },
        {
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },
        {
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },{
          image: "https://via.placeholder.com/150",
          label: "For Rent",
          title: "Prime Restaurant",
          description: "Fully Furnished with Cabin and 20 Workspaces",
          price: 52000,
          location: "Bengaluru",
          date: "3 days ago",
        },
        // Add more ad objects here
      ],
      openSections: {
        category: true,
        subcategory: true,
        budget: true,
        location: true,
        furnishing: true,
        area: true,
      },
    };
  },
  async mounted() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}${ENDPOINTS.CATEGORY}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.categories = response.data.result.category_list;
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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Ads Page Layout */
.ads-container {
  display: flex;
  gap: 20px;
}

.filters {
  flex: 1;
  max-width: 390px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.filter-section {
  margin-bottom: 20px;
  cursor: pointer;
}

.filter-section h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-options {
  display: grid;
  flex-wrap: wrap;
  gap: 10px;
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.apply-button {
  display: block;
  width: 100%;
  background: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.ads-list {
  flex: 3;
  overflow-y: auto;
  height: 100vh;
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

.hover-effect:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}

.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

.budget-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>