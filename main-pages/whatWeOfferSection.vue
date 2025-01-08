<template>
<div class="main-div">
   <div class="heading">
       <h1 class="heading-h1">What we Offer</h1>
       <p class="heading-p">Discover our diverse range of offerings designed to support every aspect of <br/> your hospitality business.</p>
   </div>
   <div class="grid-section">
    <div class="grid-container">
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage1.png" alt="Text 1" class="grid-image" />
      <p class="grid-text-head">Hospitality Spaces for Rent and Sale</p>
      <p class="grid-text-sub-head">Advertise hospitality properties effortlessly, and connect buyers with spaces by location. Make your property search convenient and accessible from anywhere.</p>
    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage2.png" alt="Text 2" class="grid-image" />
      <p class="grid-text-head">Used Equipment for Hotels and Restaurants</p>
      <p class="grid-text-sub-head">Buying or selling used hospitality equipment? List or find high-quality, affordable items on the OHTEL APP, catering to all hotel and restaurant needs.</p>
    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage3.png" alt="Text 3" class="grid-image" />
      <p class="grid-text-head">Hospitality and Allied Industry Jobs</p>
      <p class="grid-text-sub-head">Short on hotel staff? Recruiters can post job listings, and applicants can upload resumes seamlessly on the OHTEL APP.</p>
    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage4.png" alt="Text 4" class="grid-image" />
      <p class="grid-text-head">Shared Hospitality Spaces</p>
      <p class="grid-text-sub-head">Discover and list shared spaces for food counters, pop-ups, and more. Ohtel connects businesses looking to optimize space and reduce costs.</p>

    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage5.png" alt="Text 5" class="grid-image" />
      <p class="grid-text-head">Exclusive Market Deals for Hoteliers</p>
      <p class="grid-text-sub-head">Access unbeatable deals on inventory and daily supplies directly from trusted vendors. Ensure savings and quality for your hospitality business.</p>
    </div>
    <div class="grid-item">
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/gridImage6.png" alt="Text 6" class="grid-image" />
      <p class="grid-text-head">Food Factories and Home Chef Services</p>
      <p class="grid-text-sub-head">Advertise food products or find home chefs for culinary outsourcing. Perfect for hotels and restaurants looking to expand their food offerings.</p>
    </div>
  </div>
   </div>
</div>
</template>

<script setup>

</script>

<style  scoped>
.heading{
    padding-top: 101px;
    padding-bottom: 55px;
    text-align: center;
}
.heading-h1{
    margin: 0px;
    font-size: 48px;
    font-weight: 700;
}
.heading-p{
    font-size: 19px;
    font-weight: 400;
    line-height: 32px;
    color: #161C2D;
    margin-bottom: 0px;
}
.grid-container {
  gap: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.grid-section{
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 147px;
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
.grid-text-head{
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 19px;
}
.grid-text-sub-head{
    font-weight: 400;
    font-size: 21px;
    line-height: 32px;
    color: #161C2D;
}
@media (max-width: 1024px) {
    .heading{
        padding-top: 70px;
    }
    .grid-container{
        grid-template-columns: repeat(2, 1fr);
    }
    .grid-section{
        padding-bottom: 70px;
    }
  }
  @media (max-width: 768px) {
    .grid-container{
        grid-template-columns: repeat(1, 1fr);
    }
    .heading{
        padding-top: 50px;
    }
  }
</style>