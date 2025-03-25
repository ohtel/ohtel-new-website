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
                  <img class="love-icon" src="/assets/images/love-blue.png" alt="">
                </div>
                <p class="card-text text-primary fw-bold mb-1 price-text">₹ {{ restaurantAd.price }} / month</p>
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
             
             <button class="contact-button w-100">{{ ad.seller.contact }}</button>
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
  date: ''
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
          contact: adData.contact_number || adData.contact_email,
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
        date: adData.ad_posted_on
      };

      // Update the images array for the gallery
      images.value = adData.image_ids.map(img => img.ad_image);
    }
  } catch (error) {
    console.error('Error fetching ad details:', error);
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