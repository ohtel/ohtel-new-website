<template>
  <div class="ad-details-page">
    <!-- Header Navigation -->
    <nav class="breadcrumb">
      <a href="/">Home</a> > <a href="/ads">Hospitality Spaces</a> > {{ ad.title }}
    </nav>

    <div class="content-wrapper">
      <!-- Left Section: Ad Details -->
      <div class="left-section">
        <!-- Image Gallery -->
        <div class="image-gallery">
          <img :src="images[mainImageIndex]" alt="Main Image" class="main-image" />
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
          <googleMap ref="googleMapComponent" :mapCenter="ad.location"></googleMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../environment.js';
import googleMap from '../../components/googleMap.vue';

const route = useRoute();
const ad = ref({
  title: 'Prime Restaurant',
  price: '₹ 52,000/- per month',
  description: 'Don’t miss this fantastic opportunity to own a fully equipped restaurant space! Ready for you to start your business right away, with everything you need already in place.',
  features: ['Fully Furnished', 'Free Wifi', '10,000 sq.ft', 'Car Parking', 'Kitchen Setup', 'Washrooms'],
  seller: { name: 'John Spencer', contact: 'Call now', image: '/default-profile.jpg' },
  location: { lat: 12.9716, lng: 77.5946 },
  images: ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image5.jpg']
});
const images = ref(ad.value.images);
const mainImageIndex = ref(0);

const fetchAdDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.ADS_DETAILS}/${id}`);
    ad.value = response.data;
    images.value = response.data.images;
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
  padding: 1rem 2rem;
}
.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 1rem;
}
.breadcrumb a {
  color: #007bff;
  text-decoration: none;
}
.content-wrapper {
  display: flex;
  gap: 2rem;
}
.left-section {
  flex: 2;
}
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.main-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.thumbnail-gallery {
  display: flex;
  gap: 0.5rem;
}
.thumbnail {
  width: 100px;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
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
</style>