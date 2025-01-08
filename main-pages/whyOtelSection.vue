<template>
    <div class="main-div">
        <div class="heading">
            <h1 class="heading-h1">Why Ohtel?</h1>
            <p class="heading-p">To give you an idea, by using Ohtel you can,</p>
        </div>
        <div class="back-image">
            <img class="top" src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/whyOhtelTop.svg" alt="">
            <img class="bottom" src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/whyOhtelBottom.svg" alt="">
        </div>
        <div class="grid-section">
            <div class="grid-container">
    <div class="grid-item">
      <div class="main d-flex">
        <div class="icon-section"><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/whyOhtel/advertisement 1.svg" alt=""></div>
        <div class="text-section"><p class="grid-text">Advertise your Spaces for Sale, Rent, Lease.
        </p></div>
      </div>
      
    </div>
    <div class="grid-item">
      <div class="main d-flex">
        <div class="icon-section"><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/whyOhtel/investing 1.svg" alt=""></div>
        <div class="text-section"><p class="grid-text">You can look for Investors/Partners for your Hospitality Business.
        </p></div>
      </div>
      
    </div>
    <div class="grid-item">
      <div class="main d-flex">
        <div class="icon-section"><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/whyOhtel/send 1.svg" alt=""></div>
        <div class="text-section"><p class="grid-text">Share a portion of your Business space to Hospitality businesses and increase footfalls.
        </p></div>
      </div>
      
    </div>
    <div class="grid-item">
      <div class="main d-flex">
        <div class="icon-section"><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/whyOhtel/payment 1.svg" alt=""></div>
        <div class="text-section"><p class="grid-text">Buy and Sell your Used Equipment in just a few clicks.
        </p></div>
      </div>
      
    </div>
    <div class="grid-item">
      <div class="main d-flex">
        <div class="icon-section"><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/whyOhtel/business 1.svg" alt=""></div>
        <div class="text-section"><p class="grid-text">Hotel Jobs - Advertise your Staff Requirements or Find Hotel Jobs as an Aspiring Applicant.
        </p></div>
      </div>
      
    </div>
    <div class="grid-item">
      <div class="main d-flex">
        <div class="icon-section"><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/whyOhtel/best-quality 1.svg" alt=""></div>
        <div class="text-section"><p class="grid-text">Food factories and hoteliers can advertise or outsource food products here</p></div>
      </div>
      
    </div>
    
  </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style  scoped>
.main-div{
    background-color:#5131C3;
    position: relative;
}
.heading-h1,.heading-p{
    color: #E1E1E1;

}
.heading-h1{
    margin-bottom: 20px;
    font-size: 48px;
    font-weight: 700;
}
.heading-p{
    margin-bottom: 0px;
}
.heading{
    text-align: center;
    padding-top: 110px;
    padding-bottom: 71px;
}
.top{
    top: 0px;
    position: absolute;

}
.bottom{
    position: absolute;
    bottom: 0px;
    right: 0px;
}
.grid-section{
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 83px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.grid-item {
  background: #ffffff;
  padding: 26px 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  /* width: 449px; */
  /* height: 132px; */
  align-content: center;
}
.grid-item .main{
    gap: 19px;
}

.grid-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 8px;
}

.grid-text {
  font-size: 14px;
  color: var(--Gray-700, #42526B);
  font-weight: 500;
  text-align: left;
}
.main .text-section p{
margin-bottom: 0px;
}
.text-section{
    align-content: center;
    align-self: center;
}
.icon-section{
    background-color: #F0F5FF;
    padding: 20px;
    border-radius: 10px;
}
@media (max-width: 1440px) {
    .grid-section{
        padding-left: 5%;
        padding-right: 5%;
    }
    .icon-section{
        padding: 20px;
    }
    .icon-section img{
        width: 35px;
    }
    .grid-item{
        padding: 13px 20px;
    }
    /* .grid-container{
        grid-template-columns: repeat(2, 1fr);
    } */
    .heading{
    padding-top: 70px;
    padding-bottom: 70px;
    }
  }
  @media (max-width: 1349px) {
    .grid-container{
        grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 1024px) {
    .grid-container{
        grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    .grid-container{
        grid-template-columns: repeat(1, 1fr);
    }
    .bottom,.top{
        display: none;
    }
  }
  .main{
    max-height: 100%;
  }
  
</style>