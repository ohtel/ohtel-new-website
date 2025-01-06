<template>
    <div class="main-div">
        <div class="heading">
            <h1 class="heading-h1">About Us</h1>
            <p class="heading-p">Empowering the hospitality industry through tailored services and <br>seamless connections.</p>
        </div>
        <div class="about-description-section">
            <div class="about-description-container">
                <div class="d-flex main-section">
                        <img  src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/aboutUs/aboutUsImage.svg" alt="Text 1" class="grid-image" />
                    <!-- <div class="content-main">
                        <div class="contents d-flex">
                            <span><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/aboutUs/tick.svg" alt=""></span><p class="grid-text-sub-head">Ohtel is a Location-based Classified App for the Hospitality and Allied Service Industry. </p>
                        </div>
                        <div class="contents d-flex">
                            <span><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/aboutUs/tick.svg" alt=""></span><p class="grid-text-sub-head">Hire as a Recruiter or Find Hotel Jobs as an Applicant.  </p>
                        </div>
                        <div class="contents d-flex">
                            <span><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/aboutUs/tick.svg" alt=""></span><p class="grid-text-sub-head">Discover country-wide Hospitality Properties, Shared Spaces, and Food Products. </p>
                        </div>
                        <div class="contents d-flex">
                            <span><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/aboutUs/tick.svg" alt=""></span><p class="grid-text-sub-head">Get connected with ‘People in Hospitality’ with a Simple & Intuitive User Interface. </p>
                        </div>
                        <div class="contents d-flex">
                            <span><img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/aboutUs/tick.svg" alt=""></span><p class="grid-text-sub-head">Find a wide range of Profiles & Deals.</p>
                        </div>
                    </div> -->
                    <div class="content-main grid-text-sub-head">
                        Ohtel is a dedicated platform built for the hospitality industry, connecting professionals, businesses, and vendors to streamline operations and growth. Our app offers a comprehensive solution for listing hospitality jobs, advertising used equipment, sourcing home chefs, and accessing market deals on essential supplies. By bringing together job seekers, recruiters, property owners, and suppliers, Ohtel helps the industry thrive with ease and efficiency. With a commitment to connecting every need of the hotel and restaurant sector, we empower hoteliers to succeed in an evolving marketplace
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script setup>

</script>

<style  scoped>
.heading{
    padding-top: 86px;
    padding-bottom: 35px;
    text-align: center;
}
.heading-h1{
    margin: 0px;
    font-size: 48px;
    font-weight: 700;
    color: #161C2D;
    margin-bottom: 20px;
}
.heading-p{
    font-size: 19px;
    font-weight: 400;
    line-height: 32px;
    color: #161C2D;

}
.about-description-section{
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 242px;
    
}
.about-description-section .about-description-container .contents span{
    padding-right: 20px;
}
.content-main{
    align-content: center;
    margin-left: 80px;
    line-height: 35px;
}
@media (max-width: 1440px) {
.main-section .grid-image{
    width:50%
}
}
@media (max-width: 1024px) {
   .heading{
    padding-top: 70px;
   }
   .main-section{
    display: block  !important;;
   }
   .content-main{
    margin-left: 0px;
    margin-top: 50px;
   }
   .main-section .grid-image{
    width:100%
   }
   .about-description-section{
    padding-bottom: 70px;
   }
   .contents{
    display: flex;
   }
}
</style>