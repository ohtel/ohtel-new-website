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
        </svg> {{ pageTitle }}</a>
      </nav>
      <div class="search-container-mobile" v-if="showControls">
        <span class="search-icon-mobile">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <input 
              type="text" 
              v-model="filters.search" 
              placeholder="Search ads..." 
              class="search-input"
              @input="handleSearch"
            />
            
          </div>
      <div v-if="showControls" class="page-header">
        <h1 class="page-title">{{ pageTitle }}</h1>
       
        <div class="header-actions" v-if="showControls">
          <div class="search-container">
            <input 
              type="text" 
              v-model="filters.search" 
              placeholder="Search ads..." 
              class="search-input"
              @input="handleSearch"
            />
            <span class="search-icon">
              <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
            </span>
          </div>
          <div class="sort-section">
            <span class="sort-label-desktop">Sort by:</span>
            <span class=" sort-icon-mobile">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M3 12.5001L12.1667 12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 7.5H8.83333" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 17.5H16.3333" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.9166 2.5V12.5M15.9166 2.5C15.3331 2.5 14.2428 4.16192 13.8333 4.58333M15.9166 2.5C16.5001 2.5 17.5903 4.16192 17.9999 4.58333" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <select class="sort-select" v-model="filters.sort">
              <option value="date">Date posted</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div class="divider-line-mobile" v-if="showControls"></div>
          
       
        <!-- Mobile Filter Button -->
        <button class="mobile-filter-btn" v-if="showControls" @click="showMobileFilter = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
<path d="M3 5.83203H5.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 14.168H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.5 14.168H18" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 5.83203H18" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.5 5.83203C5.5 5.05546 5.5 4.66718 5.62687 4.36089C5.79602 3.95251 6.12048 3.62806 6.52886 3.4589C6.83515 3.33203 7.22343 3.33203 8 3.33203C8.77657 3.33203 9.16483 3.33203 9.47117 3.4589C9.8795 3.62806 10.204 3.95251 10.3732 4.36089C10.5 4.66718 10.5 5.05546 10.5 5.83203C10.5 6.6086 10.5 6.99688 10.3732 7.30317C10.204 7.71155 9.8795 8.03601 9.47117 8.20516C9.16483 8.33203 8.77657 8.33203 8 8.33203C7.22343 8.33203 6.83515 8.33203 6.52886 8.20516C6.12048 8.03601 5.79602 7.71155 5.62687 7.30317C5.5 6.99688 5.5 6.6086 5.5 5.83203Z" stroke="black" stroke-width="1.5"/>
<path d="M10.5 14.168C10.5 13.3914 10.5 13.0031 10.6268 12.6968C10.796 12.2885 11.1205 11.964 11.5288 11.7948C11.8352 11.668 12.2234 11.668 13 11.668C13.7766 11.668 14.1648 11.668 14.4712 11.7948C14.8795 11.964 15.204 12.2885 15.3732 12.6968C15.5 13.0031 15.5 13.3914 15.5 14.168C15.5 14.9446 15.5 15.3328 15.3732 15.6391C15.204 16.0475 14.8795 16.372 14.4712 16.5411C14.1648 16.668 13.7766 16.668 13 16.668C12.2234 16.668 11.8352 16.668 11.5288 16.5411C11.1205 16.372 10.796 16.0475 10.6268 15.6391C10.5 15.3328 10.5 14.9446 10.5 14.168Z" stroke="black" stroke-width="1.5"/>
</svg>
          Filter
        </button>
      </div>

      <div class="ads-container">
        <!-- Filters Section (Sidebar, hidden on mobile) -->
        <aside class="filters" v-if="showControls">
          <h2>Filters</h2>

          <!-- Rest of the filters -->
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

          <!-- <div class="filter-section">
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
                <span>20000</span>
              </div>
            </div>
          </div> -->
        </aside>

        <!-- Mobile Filter Modal -->
        <div v-if="showMobileFilter && showControls" class="mobile-filter-modal">
          <div class="mobile-filter-content">
            <div class="mobile-filter-header">
              <span>Filters</span>
              <button class="close-btn" @click="showMobileFilter = false">&times;</button>
            </div>
            <!-- Full filter form (same as sidebar) -->
            <div class="filter-section">
              <h3>Location</h3>
              <div class="filter-options">
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
              <h3>Radius (km)</h3>
              <input type="range" min="1" max="50" v-model="filters.radius" />
              <div>
                <span>1 km</span>
                <span>{{ filters.radius }} km</span>
                <span>50 km</span>
              </div>
            </div>
            <!-- <div class="filter-section">
              <h3>Area (Sq.ft)</h3>
              <input type="range" min="0" max="20000" v-model="filters.area" />
              <div>
                <span>0</span>
                <span>{{ filters.area }}</span>
                <span>20000</span>
              </div>
            </div> -->
            <!-- Add more filter fields as needed -->
            <button class="apply-btn" @click="applyFilters(); showMobileFilter = false">Apply</button>
          </div>
        </div>

        <!-- Main Content Section -->
        <main class="main-content">
          <!-- Show category selection only if not in favorites or my ads -->
          <div v-if="!isSpecialPage && !formSubmitted" class="post-ad-form">
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
                  <div class="ml-4 text-left card-content">
                    <h3 class="category-card-title">
                      {{ category.category_title }}
                    </h3>
                    <p class="category-subtitle">
                      {{ category.category_description }}
                    </p>
                  </div>
                  <div class="arrow-icon">
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
                  <!-- <button @click="clearFilter('category')" class="clear-filter">×</button> -->
                </div>
                <div v-if="filters.type && filters.type !== 'all_ads'" class="filter-tag">
                  <span>{{ filters.type }}</span>
                  <!-- <button @click="clearFilter('type')" class="clear-filter">×</button> -->
                </div>
                <div v-if="filters.subCategory && filters.subCategory.length > 0" class="filter-tag">
                  <span>{{ getSubCategoryName(filters.subCategory[0]) }}</span>
                  <!-- <button @click="clearFilter('subCategory')" class="clear-filter">×</button> -->
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
                <button @click="clearAllAndGoToCategory" class="clear-all-button">Clear All</button>
              </div>
            </div>

            <div class="ads-header" v-if="!isSpecialPage">
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
        favourite_only: false,
        search: '', // Add search field
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
        favourite_only: false,
        search: '', // Add search field
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
      isDragging: false,
      debounceTimer: null,
      showMobileFilter: false,
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

    // Handle filter state from details page
    const filterState = this.$route.query.filterState;
    if (filterState) {
      try {
        const state = JSON.parse(filterState);
        // Restore all filter states
        this.filters = {
          ...this.filters,
          category: state.category,
          subCategory: state.subCategory,
          type: state.type,
          search: state.search,
          radius: state.radius,
          area: state.area,
          sort: state.sort,
          coordinates: state.coordinates,
          budget: state.budget || this.filters.budget
        };
        this.locationDetails = state.locationDetails;
        this.selectedCategory = state.selectedCategory;
        this.selectedSubCategory = state.selectedSubCategory;
        this.selectedType = state.selectedType;
        this.selectedSubSubCategory = state.selectedSubSubCategory;
        this.currentStep = state.currentStep;
        this.formSubmitted = state.formSubmitted;
        this.currentPage = state.currentPage || 1;

        // Fetch subcategories if we have a selected category
        if (this.selectedCategory) {
          await this.fetchSubCategories(this.selectedCategory);
          
          // If we have a selected subcategory, find and set the currentSubCategory
          if (this.selectedSubCategory) {
            this.currentSubCategory = this.subCategories.find(sub => sub.id === this.selectedSubCategory);
          }
        }

        // Apply all filters and fetch the correct page
        await this.fetchPage(this.currentPage);
      } catch (error) {
        console.error('Error parsing filter state:', error);
      }
    } else {
      // If no filter state, check for page number in URL
      const page = this.$route.query.page;
      if (page) {
        this.currentPage = parseInt(page);
        await this.fetchPage(this.currentPage);
      } else {
        await this.fetchInitialAds();
      }
    }
    
    // Set formSubmitted to true for special pages
    if (this.isSpecialPage) {
      this.formSubmitted = true;
    }
    
    // Add event listeners for range inputs
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
      input.style.setProperty('--value-percent', (input.value - input.min) / (input.max - input.min) * 100 + '%');
      
      input.addEventListener('mousedown', this.handleRangeStart);
      input.addEventListener('touchstart', this.handleRangeStart);
      
      input.addEventListener('mouseup', this.handleRangeEnd);
      input.addEventListener('touchend', this.handleRangeEnd);
      
      input.addEventListener('input', (e) => {
        e.target.style.setProperty('--value-percent', (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100 + '%');
      });
    });
    this.refreshRangeInputs();

    // Restore filter state from localStorage if present
    const savedState = localStorage.getItem('adsFilterState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        this.filters = state.filters || this.filters;
        this.selectedCategory = state.selectedCategory || null;
        this.selectedSubCategory = state.selectedSubCategory || null;
        this.selectedSubSubCategory = state.selectedSubSubCategory || null;
        this.selectedType = state.selectedType || null;
        this.formSubmitted = state.formSubmitted || false;
        this.currentStep = state.currentStep || 1;
        // Optionally restore locationDetails, etc.
        if (state.locationDetails) this.locationDetails = state.locationDetails;

        // Fetch subcategories if we have a selected category
        if (this.selectedCategory) {
          await this.fetchSubCategories(this.selectedCategory);
          // If we have a selected subcategory, find and set the currentSubCategory
          if (this.selectedSubCategory) {
            this.currentSubCategory = this.subCategories.find(
              sub => sub.id === this.selectedSubCategory
            );
          }
        }

        // If we restored to ads list, fetch ads
        if (this.formSubmitted) {
          await this.applyFilters();
        }
      } catch (e) {
        // If error, clear the saved state
        localStorage.removeItem('adsFilterState');
      }
    }
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
              sub_sub_category_list: item.sub_sub_category_list?.length > 0 
                ? item.sub_sub_category_list.map(subItem => ({
                    ...subItem,
                    title: subItem.applicant_role_title                    ,
                    image: subItem.sub_category_images
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
        this.applyFilters(); // Apply filters immediately when location changes
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
        // Create a state object with all current filters
        const filterState = {
          category: this.filters.category,
          subCategory: this.filters.subCategory,
          type: this.filters.type,
          search: this.filters.search,
          radius: this.filters.radius,
          area: this.filters.area,
          sort: this.filters.sort,
          coordinates: this.filters.coordinates,
          locationDetails: this.locationDetails,
          selectedCategory: this.selectedCategory,
          selectedSubCategory: this.selectedSubCategory,
          selectedType: this.selectedType,
          selectedSubSubCategory: this.selectedSubSubCategory,
          currentStep: this.currentStep,
          formSubmitted: this.formSubmitted,
          currentPage: this.currentPage // Add current page to filter state
        };

        this.$router.push({
          path: `/ads-details/${adId}`,
          query: {
            category_id: ad.category.id,
            type: ad.ad.type,
            ad_uuid: ad.ad.uuid,
            filterState: JSON.stringify(filterState), // Pass filter state as query parameter
            page: this.currentPage // Add page number to URL
          }
        });
      }
    },
    async fetchInitialAds() {
      const params = new URLSearchParams();
      
      // Add search parameter
      if (this.filters.search) {
        params.append('search', this.filters.search);
      }
      
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
          this.currentPage = 1;
          debugger;
        }
      } catch (error) {
        console.error("Error fetching initial ads:", error);
      }
    },
    async applyFilters() {
      try {
        const token = localStorage.getItem('accessToken');
        const params = new URLSearchParams();
        
        // Add search parameter
        if (this.filters.search) {
          params.append('search', this.filters.search);
        }
        
        params.append('page', 1); // Reset to first page when applying filters
        this.currentPage = 1;
        if (this.selectedCategory) {
          params.append('category', this.selectedCategory);
        }
        
        // Handle subcategory and level type parameters
        if (this.selectedSubCategory) {
          params.append('sub_category', this.selectedSubCategory);
          
          // Find the selected subcategory object
          const selectedSubCategoryObj = this.subCategories.find(sub => sub.id === this.selectedSubCategory);
          
          if (selectedSubCategoryObj) {
            // Check if the subcategory has levels or sub_sub_category_list
            if (selectedSubCategoryObj.levels && selectedSubCategoryObj.levels.length > 0) {
              // If selected sub-sub category exists and it's from levels
              if (this.selectedSubSubCategory) {
                params.append('level_type', this.selectedSubSubCategory.id); // Using levels.code as level_type
              }
            } else if (selectedSubCategoryObj.sub_sub_category_list && selectedSubCategoryObj.sub_sub_category_list.length > 0) {
              // If selected sub-sub category exists and it's from sub_sub_category_list
              if (this.selectedSubSubCategory) {
                params.append('sub_sub_category', this.selectedSubSubCategory.id);
              }
            }
          }
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
        
        if (this.selectedType) {
          params.append('type', this.selectedType=='seller' ? 'Seller' :this.selectedType=='recruiter' ? 
          'Recruiter' :this.selectedType=='buyer' ? 'Buyer' :'Applicant');
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
          
          // Update filters state to match current selections
          this.filters = {
            ...this.filters,
            category: this.selectedCategory,
            subCategory: this.selectedSubCategory ? [this.selectedSubCategory] : [],
            type: this.selectedType
          };
        }
      } catch (error) {
        console.error("Error applying filters:", error);
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
          params.append('sub_category', this.filters.subCategory[0]);
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
          params.append('type', this.filters.type=='seller' ? 'Seller' :this.filters.type=='recruiter' ? 
          'Recruiter' :this.filters.type=='buyer' ? 'Buyer' :'Applicant');
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
    resetFilters(clearSelection = false) {
      // If clearSelection is true, also clear category/subcategory/sub-subcategory
      this.filters = JSON.parse(JSON.stringify(this.defaultFilters));
      if (clearSelection) {
        this.selectedCategory = null;
        this.selectedSubCategory = null;
        this.selectedSubSubCategory = null;
        this.currentStep = 1;
      }
      this.locationDetails = null;
      this.showMobileFilter = false;
      this.refreshRangeInputs();
    },
    clearAllAndGoToCategory() {
      // Clear all filters and selections, go to category selection page
      this.resetFilters(true);
      this.formSubmitted = false;
      this.currentStep = 1;
      this.clearFilterState();
    },
    goToAdsList() {
      // Called when moving forward to ads list
      // Keep only the selection, clear other filters
      const keep = {
        category: this.selectedCategory,
        subCategory: this.selectedSubCategory ? [this.selectedSubCategory] : [],
        type: this.selectedType,
      };
      this.filters = {
        ...JSON.parse(JSON.stringify(this.defaultFilters)),
        ...keep
      };
      this.refreshRangeInputs();
      this.formSubmitted = true;
      this.saveFilterState();
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

      // Clear URL parameters
      const query = { ...this.$route.query };
      delete query.filterState;
      delete query.page;
      delete query.category;
      delete query.sub_category;
      delete query.type;
      delete query.search;
      delete query.radius;
      delete query.area;
      delete query.sort;
      delete query.coordinates;
      delete query.locationDetails;
      delete query.selectedCategory;
      delete query.selectedSubCategory;
      delete query.selectedType;
      delete query.selectedSubSubCategory;
      delete query.currentStep;
      delete query.formSubmitted;
      delete query.currentPage;

      // Update URL without filter state
      this.$router.replace({ 
        path: this.$route.path,
        query: query
      });

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
        await this.selectType('recruiter');
      } else if (category.seller && category.buyer) {
        // For other categories, use seller/buyer
        this.adTypes = [
          { id: 'seller', title: category.seller.title },
          { id: 'buyer', title: category.buyer.title }
        ];
        // Set seller as default
        await this.selectType('seller');
      } else {
        // Fallback if no specific titles are available
        this.adTypes = [
          { id: 'seller', title: 'Seller' },
          { id: 'buyer', title: 'Buyer' }
        ];
        // Set seller as default
        await this.selectType('seller');
      }
      
      // Fetch subcategories after setting the type
      await this.fetchSubCategories(category.id);

      // Update filters and apply
      this.filters.category = category.id;
      await this.applyFilters();
      
      // Automatically advance to next step
      this.nextStep();
    },
    async toggleSubCategory(subcategory) {
      this.selectedSubCategory = subcategory.id;
      this.currentSubCategory = subcategory;
      
      // Update filters
      this.filters.subCategory = [subcategory.id];
      await this.applyFilters();
      
      if (this.hasSubSubCategories && subcategory.sub_sub_category_list?.length > 0) {
        this.nextStep();
      } else {
        // If no sub-sub-categories, submit the form
        this.formSubmitted = true;
      }
    },
    async selectSubSubCategory(subSubCategory) {
      this.selectedSubSubCategory = subSubCategory;
      await this.applyFilters();
    },
    async selectType(type) {
      this.selectedType = type;
      this.filters.type = type;
      this.selectedSubCategory = null;
      this.selectedSubSubCategory = null;
      
      if (this.selectedCategory === 3) {
        await this.fetchSubCategories(this.selectedCategory);
      }
      
      await this.applyFilters();
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
    async clearFilter(filterType) {
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
      await this.applyFilters();
    },
    handleRangeStart() {
      this.isDragging = true;
    },
    handleRangeEnd() {
      this.isDragging = false;
      this.applyFilters(); // Apply filters only when the user releases the slider
    },
    // Add debounced search handler
    handleSearch() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.applyFilters();
      }, 500);
    },
    refreshRangeInputs() {
      // Update the background fill of all range inputs to match their value
      this.$nextTick(() => {
        const rangeInputs = document.querySelectorAll('input[type="range"]');
        rangeInputs.forEach(input => {
          const min = parseFloat(input.min);
          const max = parseFloat(input.max);
          const val = parseFloat(input.value);
          const percent = ((val - min) / (max - min)) * 100;
          input.style.setProperty('--value-percent', percent + '%');
        });
      });
    },
    saveFilterState() {
      // Save current filter and selection state to localStorage
      const state = {
        filters: this.filters,
        selectedCategory: this.selectedCategory,
        selectedSubCategory: this.selectedSubCategory,
        selectedSubSubCategory: this.selectedSubSubCategory,
        selectedType: this.selectedType,
        formSubmitted: this.formSubmitted,
        currentStep: this.currentStep,
        locationDetails: this.locationDetails,
      };
      localStorage.setItem('adsFilterState', JSON.stringify(state));
    },
    clearFilterState() {
      localStorage.removeItem('adsFilterState');
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
    isSpecialPage() {
      return this.filters.favourite_only || this.filters.user_id;
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
    },
    showControls() {
      // Show controls only when on the ads list page (not on selection steps)
      return this.formSubmitted || this.isSpecialPage;
    },
  },
  watch: {
    'filters.sort': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.applyFilters();
        }
      }
    },
    'filters.radius': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue && !this.isDragging) {
          // Only update the visual style while dragging
          const rangeInput = document.querySelector('input[type="range"][v-model="filters.radius"]');
          if (rangeInput) {
            rangeInput.style.setProperty('--value-percent', (newValue - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100 + '%');
          }
        }
      }
    },
    'filters.area': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue && !this.isDragging) {
          // Only update the visual style while dragging
          const rangeInput = document.querySelector('input[type="range"][v-model="filters.area"]');
          if (rangeInput) {
            rangeInput.style.setProperty('--value-percent', (newValue - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100 + '%');
          }
        }
      }
    },
    'filters.budget.min': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.applyFilters();
        }
      }
    },
    'filters.budget.max': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.applyFilters();
        }
      }
    },
    currentStep(newVal, oldVal) {
      // Refresh range inputs on step change
      this.refreshRangeInputs();
    },
    filters: {
      handler() {
        if (this.formSubmitted) this.saveFilterState();
      },
      deep: true
    },
    selectedCategory() { if (this.formSubmitted) this.saveFilterState(); },
    selectedSubCategory() { if (this.formSubmitted) this.saveFilterState(); },
    selectedSubSubCategory() { if (this.formSubmitted) this.saveFilterState(); },
    selectedType() { if (this.formSubmitted) this.saveFilterState(); },
    formSubmitted() { if (this.formSubmitted) this.saveFilterState(); },
  },
  beforeDestroy() {
    // Clean up event listeners
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
      input.removeEventListener('mousedown', this.handleRangeStart);
      input.removeEventListener('touchstart', this.handleRangeStart);
      input.removeEventListener('mouseup', this.handleRangeEnd);
      input.removeEventListener('touchend', this.handleRangeEnd);
    });
  }
};
</script>

<style scoped lang="scss">
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-container {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 16px;
  border: 1px solid #DEE1E6;
  border-radius: 8px;
  font-size: 14px;
  color: #161C2D;
  background-color: white;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #47509B;
  box-shadow: 0 0 0 2px rgba(71, 80, 155, 0.1);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.sort-section {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-section select {
  padding: 8px 12px;
  border: 1px solid #DEE1E6;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  color: #000;
    font-weight: 600;
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
  margin-bottom: 30px; /* Updated margin to account for removed buttons */
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
  z-index: 3000;
}

.map-popup {
  background: #fff;
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 700px;
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

/* Add these new styles for the range input */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  width: 100%;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #47509B 0%, #47509B var(--value-percent, 50%), #DEE1E6 var(--value-percent, 50%));
  border-radius: 2px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #47509B;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -6px;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  background: #DEE1E6;
  border-radius: 2px;
}

input[type="range"]::-moz-range-progress {
  height: 4px;
  background: #47509B;
  border-radius: 2px;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #47509B;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-progress {
  height: 4px;
  background: #47509B;
  border-radius: 2px;
}

input[type="range"]::-ms-track {
  width: 100%;
  height: 4px;
  background: #DEE1E6;
  border-radius: 2px;
}

input[type="range"]::-ms-thumb {
  width: 16px;
  height: 16px;
  background: #47509B;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-ms-fill-lower {
  background: #47509B;
  border-radius: 2px;
}

input[type="range"]::-ms-fill-upper {
  background: #DEE1E6;
  border-radius: 2px;
}
.arrow-icon {
  position: absolute;
    right: 0px;
}
.card-content {
  margin-right:16px;
}
.sort-select{
  cursor: pointer;
}
.mobile-filter-btn {
  display: none;
  align-items: center;
  gap: 8px;
  border: none;
  background: #fff;
  color: #000;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 16px;
}
.search-container-mobile{
  display: none;
  position: relative;
}
.search-icon-mobile{
  position: absolute;
    right: 12px;
    top: 21px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    pointer-events: none;
}
.divider-line-mobile{
  display: none;
}
@media (max-width: 1024px){
.page-title{
  display: none;
}
}
@media (max-width: 700px) {
.header-actions{
  display:grid;
  gap: 12px;
}
.search-container{
  display: none;
}
.search-container-mobile{
  display: block;
}
.sort-section {
span{
  display: none;
}
.ads-page{
  padding: 0px 0%!important;
}
}
.page-header{
  border: 1px solid rgba(0, 0, 0, 0.10);
  padding: 4px;
  justify-content: space-around;
  margin-bottom: 25px;
}
.step-header{
  margin-top: 1.5rem;
}
.arrow-icon{
  display: none;
}
.sort-icon-mobile{
  display: block;
  padding-left: 12px;
}
.sort-icon-desktop{
  display: none;
}
.sort-section select{
  border: none;
}
.divider-line-mobile{
  display: block;
  border-right: 2px solid rgba(0, 0, 0, 0.10);
    height: 40px;
}
.ads-grid{
  justify-self: center;
}
.card-section{
  max-width: 366px;
  display: block!important;
  text-align-last: center;
}
.category-card-title{
  text-align: center;
}
}
@media (max-width: 768px) {
  .filters {
    display: none;
  }
  .mobile-filter-btn {
    display: flex;
  }
  .mobile-filter-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }
  .mobile-filter-content {
    background: #fff;
    border-radius: 24px;
    width: 90vw;
    max-width: 400px;
    padding: 32px 24px 24px 24px;
    position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .mobile-filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 28px;
    color: #47509B;
    cursor: pointer;
    margin-left: 16px;
  }
  .apply-btn {
    background: #47509B;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 14px 0;
    font-size: 18px;
    font-weight: 600;
    margin-top: 16px;
    cursor: pointer;
    width: 100%;
  }
}
.sort-label-desktop {
  display: inline;
}
.sort-icon-mobile {
  display: none;
  vertical-align: middle;
  margin-right: 4px;
}
@media (max-width: 700px) {
  .sort-label-desktop {
    display: none;
  }
  .sort-icon-mobile {
    display: inline-block!important;
  }
  .sort-section select {
    background: none !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    padding-right: 0 !important;
  }
}
</style>