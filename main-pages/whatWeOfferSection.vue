<template>
<div class="main-div">
   <div class="heading">
       <h1 class="heading-h1">What we Offer</h1>
       <p class="heading-p">Discover our diverse range of offerings designed to support every aspect of your hospitality business.</p>
   </div>
   <div class="grid-section">
    <div class="grid-container">
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage1.png" alt="Text 1" class="grid-image" />
      <p class="grid-text-head">Hospitality Spaces</p>
      <p class="grid-text-sub-head">Sellers can advertise hospitality properties, and buyers can easily search by location from home.</p>
    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage2.png" alt="Text 2" class="grid-image" />
      <p class="grid-text-head">Used Equipment</p>
      <p class="grid-text-sub-head">Buying or selling used hospitality equipment? Advertise on OHTEL APP.</p>
    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage3.png" alt="Text 3" class="grid-image" />
      <p class="grid-text-head">Hospitality & Allied Industries Jobs</p>
      <p class="grid-text-sub-head">Short on hotel staff? Recruiters can advertise jobs, & applicants can upload resumes on OHTEL APP.</p>
    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage4.png" alt="Text 4" class="grid-image" />
      <p class="grid-text-head">Shared Spaces</p>
      <p class="grid-text-sub-head">List or find shared spaces for food counters and more on OHTEL APP.</p>

    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage5.png" alt="Text 5" class="grid-image" />
      <p class="grid-text-head">Market Deals</p>
      <p class="grid-text-sub-head">Connect with vendors and markets for exciting deals on daily inventory supplies.</p>
    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage6.png" alt="Text 6" class="grid-image" />
      <p class="grid-text-head">Food Factories and Home Chefs</p>
      <p class="grid-text-sub-head">Advertise food products or outsource needs to hotels and restaurants on Ohtel-all from home.</p>
    </div>
  </div>
   </div>
</div>
</template>

<script setup>

</script>

<style scoped>
.heading {
  padding-top: 80px;
  padding-bottom: 55px;
  text-align: center;

}
.heading-h1 {
  margin: 0px;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
}
.heading-p {
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  color: #161C2D;
  margin-bottom: 0px;
}
.grid-container {
  gap: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.grid-section {
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 80px;
}
.grid-item {
  text-align: center;
}

.grid-image {
  width: 350px;
  height: 230px;
  border-radius: 10px;
  margin-bottom: 19px;
  object-fit: cover;
}

.grid-text {
  font-size: 14px;
  color: #333;
}
.grid-text-head {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 19px;
}
.grid-text-sub-head {
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: rgba(22, 28, 45, 0.70);
}
@media (max-width: 1400px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* Tablet Adjustments */
@media (max-width: 1024px) {
  .heading {
    padding-top: 70px;
  }
  .grid-section {
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 100px;
  }
  .grid-image {
    width: 280px;
    height: 180px;
  }
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
  .heading {
    padding-top: 50px;
  }
  .grid-section {
    padding-left: 3%;
    padding-right: 3%;
    padding-bottom: 50px;
  }
  .grid-image {
    width: 70%;
    max-width: 100%;
    height: auto;
  }
}
</style>