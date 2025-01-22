<template>
    <div class="main-div">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Featured Ads</h2>
        <button class="btn view-all" @click="viewAllAds">View All</button>
      </div>
      <!-- Horizontal Scroll Section -->
      <div class="scroll-container">
        <div class="d-flex flex-nowrap gap-4">
          <div
            v-for="(ad, index) in ads"
            :key="index"
            class="card h-100 shadow-sm hover-effect flex-shrink-0"
            style="width: 18rem"
          >
            <div class="position-relative">
              <img
                src="/assets/images/posted.png"
                :alt="ad.title"
                class="card-img-top"
              />
              <span
                class="ad-label"
              >
                {{ ad.label }}
              </span>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title mb-2">{{ ad.title }}</h5>
                    <img src="/assets/images/love-blue.png" alt="">
                </div>
              
              <p class="card-text text-primary fw-bold mb-1 price-text">
                ₹ {{ ad.price }} / month
              </p>
              <p class="card-text small text-muted mb-3">
                {{ ad.description }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">
                  <span><img src="/assets/images/locationIcon.svg" alt=""></span> {{ ad.location }}
                </small>
                <small class="text-muted">{{ ad.date }}</small>
              </div>
            </div>
            <div class="card-footer bg-white border-0">
              <button @click="viewDetails(123)" class="btn view-details w-100">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';

  export default {
    data() {
      return {
        ads: [
          {
            image: "/assets/images/posted.png",
            label: "For Rent",
            title: "Prime Restaurant",
            price: "52,000",
            description: "Fully Furnished 4 Cabin and 20 Workspaces office space",
            location: "Bengaluru",
            date: "3 days ago",
          },
          {
            image: "/assets/images/posted.png",
            label: "For Rent",
            title: "Prime Restaurant",
            price: "52,000",
            description: "Fully Furnished 4 Cabin and 20 Workspaces office space",
            location: "Bengaluru",
            date: "3 days ago",
          },
          {
            image: "/assets/images/posted.png",
            label: "For Rent",
            title: "Prime Restaurant",
            price: "52,000",
            description: "Fully Furnished 4 Cabin and 20 Workspaces office space",
            location: "Bengaluru",
            date: "3 days ago",
          },
          {
            image: "/assets/images/posted.png",
            label: "For Rent",
            title: "Prime Restaurant",
            price: "52,000",
            description: "Fully Furnished 4 Cabin and 20 Workspaces office space",
            location: "Bengaluru",
            date: "3 days ago",
          },
          {
            image: "/assets/images/posted.png",
            label: "For Rent",
            title: "Prime Restaurant",
            price: "52,000",
            description: "Fully Furnished 4 Cabin and 20 Workspaces office space",
            location: "Bengaluru",
            date: "3 days ago",
          },
          {
            image: "/assets/images/posted.png",
            label: "For Rent",
            title: "Prime Restaurant",
            price: "52,000",
            description: "Fully Furnished 4 Cabin and 20 Workspaces office space",
            location: "Bengaluru",
            date: "3 days ago",
          },
          // Add more ad objects as needed...
        ],
      };
    },
    methods: {
      viewAllAds() {
        this.$router.push('../view-ads');
      },
      viewDetails(adId) {
      this.$router.push(`/ads-details/${adId}`);
    },
    },
    mounted() {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    },
  };
  </script>
  
  <style scoped>
  /* Add horizontal scroll */
  .scroll-container {
    overflow-x: auto;
    padding-bottom: 10px; /* Optional: Add padding for better scrolling */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
  }
  
  .scroll-container::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  
  /* Custom hover effect */
  .hover-effect:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
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
  .card-body{
    padding: 20px;
  }
  .card{
    border: none;
  }
  .view-all{
    border: 1px solid var(--Primary, #47509B);
    color: #47509B;
  }
  .price-text {
    font-family: 'Poppins', sans-serif;
  }
  </style>