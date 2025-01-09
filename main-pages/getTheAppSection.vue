<template>
    <div class="main-div">
       <div class="about-description-section">
           <div class="about-description-container">
               <div class="contents d-flex justify-content-center">
                   <div class="get-app-main">
                       <div class="heading">
                           <h1 class="heading-h1">Get the App</h1>
                           <p class="heading-p">Download Ohtel from the Play Store or App Store and start optimizing your hotel operations with just a few taps. Experience the convenience and efficiency of our platform today!</p>
                           <div class="main-content d-flex mt-5 justify-content-center">
                               <img @click="redirectTo('appstore')" class="app-store" src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/getTheApp/appStore.svg" alt="">
                               <img @click="redirectTo('playstore')" class="play-store" src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/getTheApp/playStore.svg" alt="">
                           </div>
                       </div>
                   </div>
                   <div class="image-section">
                      <!-- <div class="image-main text-center">
                           <div class="big-image">
                               <img src="../assets/images/getTheApp/mobilePhone.svg" alt="Text 1" class="grid-image" />
                           </div>
                           <div class="small-image">
                               <img src="../assets/images/getTheApp/mobilePhone2.svg" alt="Text 1" class="grid-image" />
                           </div> -->
                           
                      <!-- </div> -->
                      <!-- <img class="phone-image" src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/getTheApp/mobile-image.svg" alt="Text 1"  /> -->
                       
                      

                   </div>
               </div>
           </div>
       </div>
</div>
</template>

<script setup>
const redirectTo = (store) => {
    const urls = {
        appstore: 'https://apps.apple.com/in/app/ohtel-app/id6451921853',
        playstore: 'https://play.google.com/store/apps/details?id=app.ohtel&pcampaignid=web_share'
    };

    if (store && urls[store]) {
        window.open(urls[store], '_blank');
    }
};
</script>

<style scoped>
.main-div{
   background-color: #EEEAF9;
   padding-top: 132px;

}
.heading{
   padding-bottom: 35px;
}
.heading-h1{
   margin: 0px;
   font-size: 48px;
   font-weight: 700;
   margin-top: 60px;
}
.heading-p{
   font-size: 16px;
   font-weight: 400;
   line-height: 32px;
   color: #161C2D;

}
.about-description-section{
   padding-left: 10%;
   padding-right: 10%;
   padding-bottom: 116px;
   
}
.about-description-section .about-description-container .contents span{
   padding-right: 20px;
}
.content-main{
   align-content: center;
   margin-left: 40px;
   line-height: 35px;
}
/* .image-section .image-main .small-image{
   position: absolute;
   top: 188px;
   right: 37px;
   }
.image-section .image-main{
   position: relative;

   }
.image-section{
   min-width: 555px;
   height: 510px;

} */
.app-store{
   margin-right: 20px;
}

@media (max-width: 1440px) {
   .top-section{
     padding-left: 100px;
     padding-right: 100px;
   }
   /* .image-section .image-main .small-image img{
   width: 137px;
   height: 278px;
   position: absolute;
   top: -69px;
   right: -48px;
   }
   .image-section .image-main .big-image img{
   width: 180px;
   height: 367px;
   }
   .image-section{
      min-width:343px;
       height:367px;
   } */
   .app-store,.play-store{
       width: 200px;

   }
 }
 @media (max-width: 1024px) {

   .main-div{
       padding-top: 70px;
   }
  
   .heading-h1{
       white-space: nowrap;
       margin-top: 0px;
   }
  .app-store,.play-store{
       width: 150px;
  }
   .about-description-section{
       padding-bottom: 70px;
   }
   .contents{
       display: block!important;
       }
    .image-section{
       text-align: center;
    }
    .phone-image{
       width: 70%;
    }
  
 }
 @media (max-width: 526px) {
   /* .main-content{
       display: block!important;
   } */
   /* .play-store{
       margin-top: 20px;
   } */
   
   .big-image{
       text-align: left;
   }
  
 }
 @media (max-width: 425px) {
   .app-store,.play-store{
       width: 100px;
  }
 }
 .get-app-main{
    text-align: center;
 }
</style>
