<template>
  <div class="main-div">
    <div class="carousel-heading">
      <h1 class="supporting-hotelier">SUPPORTING HOTELIER</h1>
      <!-- <h2>Supporting <span>Hotelier</span> Find </h2> -->
      <h2 class="changing-head">{{ headings[currentIndex] }}</h2>
      <h2 class="changing-head2">OHTEL APP Supporting Hoteliers </h2>
    </div>
    <div class="carousel">
      <div class="carousel-images">
        <img :src="images[currentIndex]" alt="Carousel Image">
      </div>
    </div>
    <div class="carousel-dots">
      <span 
        v-for="(image, index) in images" 
        :key="index" 
        :class="{ 'active': index === currentIndex }" 
        class="dot"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/carousel/image1.svg',
        'https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/carousel/image2.svg',
        'https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/carousel/image3.svg',
        'https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/carousel/image4.svg'
      ],
      headings: ['Market Deals for Hoteliers – Unbeatable Offers', 'Hire Talented Home Chefs for Your Culinary Needs', 'Jobs in Hotel Industry – Find Your Next Opportunity in', 'Used Equipment for Hotels and Restaurants'],
      currentIndex: 0
    };
  },
  methods: {
    updateIndex() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  },
  mounted() {
    this.interval = setInterval(this.updateIndex, 3000); 
  },
  beforeDestroy() {
    clearInterval(this.interval); 
  }
};
</script>

<style scoped>
.main-div {
  position: relative;
  background-color: #EEEAF9;
  padding-top: 136px;
  padding-bottom: 140px;
}

.carousel {
  position: relative;
  padding-left: 10%;
  padding-right: 10%;
  margin: 0 auto; /* Center the carousel */
}

.carousel-images {
  width: 100%;
  height: 100%;
}

.carousel-images img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the container without stretching */
}

.carousel-heading {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  text-align: center;
  display: grid;
}

.carousel-heading .changing-head {
  padding-bottom: 44px;
  margin-bottom: 0;

    justify-self: center;
}
.carousel-heading .changing-head2 {
  padding-bottom: 44px;
  margin-bottom: 0;
    justify-self: center;
}
.carousel-heading h2 {
  color: #100869;
  font-size: 60px;
  font-weight: 700;
}

.carousel-heading span {
  color: #A20584;
}

.carousel-dots {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #D6D6D6FC;
  border-radius: 50%;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out, background-color 0.5s ease-in-out, transform 0.4s ease, box-shadow 0.4s ease;
}

.dot.active {
  width: 100px;
  height: 15px;
  opacity: 1;
  border-radius: 15px;
  background-color: #A20584;
}

.supporting-hotelier {
  font-weight: 700;
  font-size: 20px;
  color: #A20584;
  margin-bottom: 44px;
}

@media (max-width: 1440px) {
  .carousel-images {
    width: 80%;
    height: 80%;
  }
  .carousel {
    text-align: -webkit-center;
  }
}

@media (max-width: 1024px) {
  .main-div {
    padding-top: 80px;
  }
  .carousel-heading h2 {
    font-size: 40px;
  }
  .supporting-hotelier {
    margin-bottom: 21px;
  }
  .carousel {
    padding-left: 0;
    padding-right: 0;
  }
}

@media (max-width: 768px) {
  .carousel-heading h2 {
    font-size: 27px;
  }
  .supporting-hotelier {
    font-size: 12px;
  }
  .main-div {
    padding-top: 40px;
    padding-bottom: 112px;
  }
  .dot.active {
    width: 50px;
  }
}
</style>