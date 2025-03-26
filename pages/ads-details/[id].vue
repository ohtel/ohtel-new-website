<template>
  <div class="ad-details-page">
    <headerSection/>
    <!-- Header Navigation -->
     
    <nav class="breadcrumb">
      <a href="/">Home</a> > <a href="/ads">Hospitality Spaces</a> > {{ ad.title }}
    </nav>
    <div class="heading-section">
        <div class="main-heading">{{ ad.title }}</div>
        <div class="ad-id">Ad ID : {{route.query.ad_uuid}}</div>
     </div>
    <div class="content-wrapper">
      <!-- Left Section: Ad Details -->
      <div class="left-section">
        <!-- Image Gallery -->
        <div class="image-gallery">
            <div class="position-relative">
                <img :src="images[mainImageIndex]" alt="Main Image" class="main-image" />
                <div class="carousel-dots">
            <span 
              v-for="(image, index) in images" 
              :key="index" 
              :class="{ 'active': index === mainImageIndex }" 
              class="dot"
            ></span>
          </div>
            </div>
         
          <div class="thumbnail-gallery">
            <img
              v-for="(image, index) in images"
              :key="index"
              :src="image"
              alt="Thumbnail"
              class="thumbnail"
              @click="setMainImage(index)"
            />
          </div>
        
        </div>

        <!-- Ad Description -->
        <h1 class="ad-title">{{ ad.title }}</h1>
        <p class="description">{{ ad.description }}</p>
      </div>

      <!-- Right Section: Seller Info and Location -->
      <div class="right-section">
        <div class="seller-info">
         
          <div class="restaurant-card">
            <div >
              <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h3>{{ restaurantAd.title }}</h3>
                    <div class="heart-icon" @click="toggleFavorite(restaurantAd.id, restaurantAd.is_favourite)">
                <svg v-if="restaurantAd.is_favourite" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M24.3282 4.99269C20.9761 2.93654 18.0505 3.76514 16.293 5.08501C15.5722 5.6262 15.212 5.89679 15 5.89679C14.788 5.89679 14.4277 5.6262 13.707 5.08501C11.9495 3.76514 9.02386 2.93654 5.6718 4.99269C1.27259 7.69118 0.27715 16.5936 10.4244 24.1043C12.3571 25.5348 13.3235 26.25 15 26.25C16.6765 26.25 17.6429 25.5348 19.5756 24.1043C29.7229 16.5936 28.7274 7.69118 24.3282 4.99269Z" fill="#47509B"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.22172 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="black" stroke-linecap="round"/>
                </svg>
              </div>
                </div>
                <p v-if="route.query.category_id != 7 && route.query.category_id != 8" class="card-text text-primary fw-bold mb-1 price-text">₹ {{ restaurantAd.price }} / month</p>
                <p class="card-text small text-muted mb-3">{{ restaurantAd.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    <span><img src="/assets/images/locationIcon.svg" alt=""></span> {{ restaurantAd.location }}
                  </small>
                  <small class="text-muted">{{ restaurantAd.date }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Seller Info -->
        <h3 class="about-seller">About Seller</h3>
        <div class="seller-info">
         
          <div class="seller-details d-flex">
            <img :src="ad.seller.image || '/default-profile.jpg'" alt="Seller Profile" class="seller-image" />
            <p class="seller-name">{{ ad.seller.name }}</p>
            
          </div>
          <div >
             
             <button v-if="ad.seller.contact_number" class="contact-button w-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
</svg> {{ ad.seller.contact_number }}</button>
             <a v-if="ad.seller.contact_email" :href="'mailto:' + ad.seller.contact_email" class="contact-button mt-2 w-100 d-block text-decoration-none"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.01577 13.4756C2.08114 16.5411 2.11383 18.0739 3.24496 19.2093C4.37609 20.3448 5.95034 20.3843 9.09884 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.755 19.2093C21.8862 18.0739 21.9189 16.5411 21.9842 13.4756C22.0053 12.4899 22.0053 11.51 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.755 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95034 3.61566 4.37609 3.65521 3.24496 4.79065C2.11383 5.92608 2.08114 7.45885 2.01577 10.5243C1.99474 11.51 1.99474 12.4899 2.01577 13.4756Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
</svg> {{ ad.seller.contact_email }}</a>
           </div>
        </div>
        <h3 class="about-seller">Location :</h3>
        <!-- Location Map -->
        <div class="location-map">
          <googleMap ref="googleMapComponent" :mapCenter="ad.location" :showControls="false"></googleMap>
        </div>
      </div>
    </div>
    <FeaturedAds/>
    <howToPostAdSection/>
        <!-- <whyOtelSection/> -->
        <!-- <aboutUsSection/> -->
        <getTheAppSection/>
        <footerSection/>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../environment.js';
import googleMap from '../../components/googleMap.vue';
import headerSection from '../main-pages/headerSection.vue'
  import FeaturedAds from '~/main-pages/FeaturedAds.vue'
  import getTheAppSection from '../main-pages/getTheAppSection.vue'
    import footerSection from '../main-pages/footerSection.vue'
    import howToPostAdSection from '../main-pages/howToPostAdSection.vue'

const route = useRoute();
const ad = ref({
  title: '',
  price: '',
  description: '',
  seller: { name: '', contact: '', image: '' },
  location: { lat: 12.9716, lng: 77.5946 },
  images: []
});

const images = ref([]);
const mainImageIndex = ref(0);
const restaurantAd = ref({
  id: '',
  title: '',
  description: '',
  price: '',
  location: '',
  date: '',
  is_favourite: false
});

const googleMapComponent = ref(null);

// Add watch effect for ad location
watch(() => ad.value.location, (newLocation) => {
  if (googleMapComponent.value && newLocation) {
    googleMapComponent.value.setLocation(newLocation.lat, newLocation.lng);
  }
}, { deep: true });

const fetchAdDetails = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const { category_id, type, ad_uuid } = route.query;
    
    const response = await axios.get(
      `${BASE_URL}ads/get_ads_detail/?category_id=${category_id}&type=${type}&ad_uuid=${ad_uuid}`,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.result) {
      const adData = response.data.result.ad;
      
      // Update the ad ref with the API response data
      ad.value = {
        title: adData.ad_title,
        price: adData.price,
        description: adData.ad_description,
        seller: { 
          name: adData.contact_person,
          contact_number: adData.contact_number,
          contact_email: adData.contact_email,
          image: adData.company_logo || '/default-profile.jpg'
        },
        location: {
          lat: adData.coordinate.latitude,
          lng: adData.coordinate.longitude
        },
        images: adData.image_ids.map(img => img.ad_image)
      };

      // Update the restaurantAd ref with the API response data
      restaurantAd.value = {
        id: adData.ad_id,
        title: adData.ad_title,
        description: adData.ad_description,
        price: adData.price,
        location: adData.address,
        date: adData.ad_posted_on,
        is_favourite: adData.is_favourite
      };

      // Update the images array for the gallery
      images.value = adData.image_ids.map(img => img.ad_image);
    }
  } catch (error) {
    console.error('Error fetching ad details:', error);
  }
};

const toggleFavorite = async (adId, currentStatus) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    const response = await axios.post(
      `${BASE_URL}ads/favourite/`,
      { 
        ad_id: adId,
        category_id: route.query.category_id
      },
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data) {
      // Update the is_favourite status in the restaurantAd ref
      restaurantAd.value.is_favourite = !currentStatus;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    // Revert the UI state if the API call fails
    restaurantAd.value.is_favourite = currentStatus;
  }
};

const setMainImage = (index) => {
  mainImageIndex.value = index;
};

const viewDetails = (adId) => {
  // Implement the logic to view ad details
  console.log("View details for ad ID:", adId);
};

onMounted(() => {
  fetchAdDetails();
});
</script>

<style scoped>
.ad-details-page {
  font-family: Arial, sans-serif;
}
.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 1rem;
  padding: 0px 10%;
}
.breadcrumb a {
  color: #007bff;
  text-decoration: none;
}
.content-wrapper {
  display: flex;
  gap: 2rem;
  padding: 0px 10% 64px;
}
.left-section {
  flex: 2;
}
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: relative;
}
.main-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.thumbnail-gallery {
    display: inline-flex
;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 10px;
    /* flex-direction: row; */
    flex-wrap: wrap;
}
.thumbnail {
  width: 100px;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
  flex: 0 0 auto; /* Prevent flex items from shrinking */
}
.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
}
.dot {
  width: 8px;
  height: 8px;
  background-color: #D6D6D6FC;
  border-radius: 50%;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out, background-color 0.5s ease-in-out, transform 0.4s ease, box-shadow 0.4s ease;
}
.dot.active {
  width: 50px;
  height: 8px;
  opacity: 1;
  border-radius: 15px;
  background-color: #ffffff;
}
.ad-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
}
.price {
  font-size: 1.2rem;
  color: #6200ea;
}
.description {
  font-size: 1rem;
  margin: 1rem 0;
}
.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.seller-info {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.seller-details {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 18px;
}
.seller-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.seller-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0px;
}
.contact-button {
  background: #47509B;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}
.location-map {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.map {
  width: 100%;
  height: 300px;
  border-radius: 8px;
}
.heading-section{
    padding: 7px 10% 32px 10%;
    display: flex;
    justify-content: space-between;
    }
    .main-heading{
        color: #161C2D;
        text-align: center;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
    }
    .ad-id{
        color: var(--Main-text, #161C2D);
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
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
.love-icon{
    object-fit: none;
}
.about-seller{
    color: var(--Main-text, #161C2D);
    font-size: 24px;
    font-style: normal;
}
.key-features-title{
    color: var(--Main-text, #161C2D);
font-size: 24px;
font-style: normal;
font-weight: 600;
margin-bottom: 24px;
}
/* Mobile Adjustments */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 0 5%;
  }
  .heading-section {
    flex-direction: column;
    align-items: flex-start;
    padding: 7px 5% 32px 5%;
  }
  .main-heading {
    font-size: 28px;
    text-align: left;
  }
  .ad-id {
    font-size: 14px;
    margin-top: 10px;
  }
  .breadcrumb {
    padding: 0 5%;
  }
  .right-section {
    order: -1; /* Move the right section above the left section */
  }
  .main-image {
    height: auto;
  }
  .thumbnail-gallery {
    justify-content: center;
  }
  .ad-title {
    font-size: 1.2rem;
  }
  .price {
    font-size: 1rem;
  }
  .description {
    font-size: 0.9rem;
  }
  .seller-info {
    padding: 0.5rem;
  }
  .seller-name {
    font-size: 1rem;
  }
  .contact-button {
    padding: 0.3rem 0.8rem;
  }
  .location-map {
    padding: 0.5rem;
  }
  .map {
    height: 200px;
  }
}
</style>