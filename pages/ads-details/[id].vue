<template>
  <div class="ad-details-page">
    <headerSection/>
    <!-- Header Navigation -->
     
    <nav class="breadcrumb">
      <a href="/">Home</a> > <a href="/ads">Hospitality Spaces</a> > {{ ad.title }}
    </nav>
    <div class="heading-section">
        <div class="main-heading">Restaurant Without Bar</div>
        <div class="ad-id">Ad ID : 123456789</div>
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
        <p class="price">{{ ad.price }}</p>
        <p class="description">{{ ad.description }}</p>

        <!-- Key Features -->
        <div class="key-features">
          <span v-for="feature in ad.features" :key="feature" class="feature-badge">
            {{ feature }}
          </span>
        </div>
      </div>

      <!-- Right Section: Seller Info and Location -->
      <div class="right-section">
        <!-- Seller Info -->
        <div class="seller-info">
          <h3>About Seller</h3>
          <div class="seller-details">
            <img :src="ad.seller.image || '/default-profile.jpg'" alt="Seller Profile" class="seller-image" />
            <div>
              <p class="seller-name">{{ ad.seller.name }}</p>
              <button class="contact-button">{{ ad.seller.contact }}</button>
            </div>
          </div>
        </div>

        <!-- Location Map -->
        <div class="location-map">
          <h3>Location</h3>
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
import { ref, onMounted } from 'vue';
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
  title: 'Prime Restaurant',
  price: '₹ 52,000/- per month',
  description: 'Don’t miss this fantastic opportunity to own a fully equipped restaurant space! Ready for you to start your business right away, with everything you need already in place.',
  features: ['Fully Furnished', 'Free Wifi', '10,000 sq.ft', 'Car Parking', 'Kitchen Setup', 'Washrooms'],
  seller: { name: 'John Spencer', contact: 'Call now', image: '/default-profile.jpg' },
  location: { lat: 12.9716, lng: 77.5946 },
  images: [
    'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    'https://i.ibb.co/b536R2w/Frame-1618871933.png',
    'https://i.ibb.co/b536R2w/Frame-1618871934.png',
    'https://i.ibb.co/b536R2w/Frame-1618871935.png',
    'https://i.ibb.co/b536R2w/Frame-1618871936.png',
    'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    'https://i.ibb.co/b536R2w/Frame-1618871933.png',
    'https://i.ibb.co/b536R2w/Frame-1618871934.png',
    'https://i.ibb.co/b536R2w/Frame-1618871935.png',
    'https://i.ibb.co/b536R2w/Frame-1618871936.png',
    'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    'https://i.ibb.co/b536R2w/Frame-1618871933.png',
    'https://i.ibb.co/b536R2w/Frame-1618871934.png',
    'https://i.ibb.co/b536R2w/Frame-1618871935.png',
    'https://i.ibb.co/b536R2w/Frame-1618871936.png',
    'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    'https://i.ibb.co/b536R2w/Frame-1618871933.png',
    'https://i.ibb.co/b536R2w/Frame-1618871934.png',
    'https://i.ibb.co/b536R2w/Frame-1618871935.png',
    'https://i.ibb.co/b536R2w/Frame-1618871936.png'
  ]
});
const images = ref(ad.value.images);
const mainImageIndex = ref(0);

const fetchAdDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.ADS_DETAILS}/${id}`);
    ad.value = response.data;
    images.value = response.data.images.map(image => `/assets/images/${image}`);
  } catch (error) {
    console.error('Error fetching ad details:', error);
  }
};

const setMainImage = (index) => {
  mainImageIndex.value = index;
};

onMounted(() => {
  const { id } = route.params;
  fetchAdDetails(id);
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
  padding: 0px 10%;
}
.left-section {
  flex: 2;
}
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.key-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.feature-badge {
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}
.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
}
.seller-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.seller-name {
  font-size: 1.1rem;
  font-weight: bold;
}
.contact-button {
  background: #6200ea;
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
</style>