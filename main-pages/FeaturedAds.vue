<template>
  <div :class="{'main-div': !isProfilePage}">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">{{ heading }}</h2>
      <button class="btn view-all" @click="viewAllAds">View All Ads</button>
    </div>
    <!-- Horizontal Scroll Section -->
    <div class="scroll-container">
      <div class="d-flex flex-nowrap gap-4">
        <div
          v-for="(ad, index) in ads"
          :key="index"
          class="card h-100 shadow-sm flex-shrink-0"
          style="width: 18rem"
        >
          <div class="position-relative">
            <img
              :src="ad.ad_image || '/assets/images/posted.png'"
              :alt="ad.ad.title"
              class="card-img-top"
            />
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
            <p v-if="ad.category.id!=8&&ad.category.id!=7&&ad.category.id!=4&&ad.category.id!=6" class="card-text text-primary fw-bold mb-1 price-text">
              ₹ {{ ad.price }} 
            </p>
            <p class="card-text small text-muted mb-3">
              {{ ad.category.name }} - {{ ad.category.sub_category }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">
                <span><img src="/assets/images/locationIcon.svg" alt=""></span> 
                <span class="location-text" :title="ad.ad_info2">{{ truncateText(ad.ad_info2, 40) }}</span>
              </small>
              <small class="text-muted">{{ getRelativeTime(ad.ad_posted_on) }}</small>
            </div>
          </div>
          <div class="card-footer bg-white border-0">
            <button @click="viewDetails(ad.ad.id)" class="btn view-details w-100">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '../environment.js';

export default {
  props: {
    heading: {
      type: String,
      default: 'Featured Ads'
    },
    isProfilePage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ads: [],
    };
  },
  methods: {
    viewAllAds() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (this.heading === 'My Ads') {
        this.$router.push({
          path: '../view-ads',
          query: { user_id: user.user_id }
        });
      } else if (this.heading === 'Favorite Ads') {
        this.$router.push({
          path: '../view-ads',
          query: { user_id: user.user_id, favourite_only: true }
        });
      } else {
        this.$router.push('../view-ads');
      }
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
    async fetchAds() {
      try {
        const token = localStorage.getItem('accessToken');
        const user = JSON.parse(localStorage.getItem('user'));
        let url;
        
        if (this.heading === 'My Ads') {
          url = `${BASE_URL}web/ads/?page=1&sort=new_to_old&user_id=${user.user_id}`;
        } else if (this.heading === 'Favorite Ads') {
          url = `${BASE_URL}web/favourite/list/`;
        } else {
          // For featured ads or other cases
          url = `${BASE_URL}web/ads/?page=1&sort=new_to_old`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.results) {
          this.ads = response.data.results;
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    },
    async toggleFavorite(adId, currentStatus) {
      try {
        const token = localStorage.getItem('accessToken');
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
    truncateText(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },
    getRelativeTime(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      // If date is invalid
      if (isNaN(date.getTime())) return '';
      
      // Less than 1 minute
      if (diffInSeconds < 60) {
        return 'just now';
      }
      
      // Less than 1 hour
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      
      // Less than 24 hours
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
      }
      
      // Less than 30 days
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
      }
      
      // Less than 12 months
      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) {
        return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
      }
      
      // Years
      const diffInYears = Math.floor(diffInMonths / 12);
      return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    }
  },
  async mounted() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    await this.fetchAds();
  },
};
</script>

<style scoped>
/* Add horizontal scroll */
.scroll-container {
  padding-left: 20px;
  overflow-x: auto;
  padding-bottom: 10px; /* Optional: Add padding for better scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.scroll-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

/* Remove hover effect styles */
.ad-label{
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background: #EDECF5;
  border-radius: 8px;
}
.view-details {
  background: #47509B;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.main-div{
  background-color: #F4F6FA;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 64px;
  padding-top: 64px;
}
.card-footer{
  padding-bottom: 20px;
}
.card {
  border: none;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card-body {
  padding: 20px;
  height: 250px; /* Fixed height for card body */
  overflow-y: auto; /* Make content scrollable if it exceeds height */
  display: flex;
  flex-direction: column;
}
.card-title {
  font-size: 1rem;
  line-height: 1.4;
  height: 2.8em; /* Fixed height for title (2 lines) */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-text {
  margin-bottom: 0.5rem;
}
.view-all{
  border: 1px solid var(--Primary, #47509B);
  color: #47509B;
}
.price-text {
  font-family: 'Poppins', sans-serif;
}
.location-text {
  display: inline-block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}

/* Custom scrollbar for card body */
.card-body::-webkit-scrollbar {
  width: 4px;
}

.card-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.card-body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.card-body::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.card-img-top {
  height: 150px;
  object-fit: contain;
  width: 100%;
}
</style>