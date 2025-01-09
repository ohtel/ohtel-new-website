<template>
    <div>
        <headerSection/>
        <carouselSection/>
        <startYourFreeTrail/>
        <whatWeOfferSection/>
        <FeaturedAds/>
        <howToPostAdSection/>
        <!-- <whyOtelSection/> -->
        <!-- <aboutUsSection/> -->
        <getTheAppSection/>
        <footerSection/>
    </div>
</template>

<script setup>
    import headerSection from '../main-pages/headerSection.vue'
    import carouselSection from '../main-pages/carouselSection.vue'
    import whatWeOfferSection from '../main-pages/whatWeOfferSection.vue'
    import whyOtelSection from '../main-pages/whyOtelSection.vue'
    import aboutUsSection from '../main-pages/aboutUsSection.vue'
    import getTheAppSection from '../main-pages/getTheAppSection.vue'
    import footerSection from '../main-pages/footerSection.vue'
    import howToPostAdSection from '../main-pages/howToPostAdSection.vue'
    import startYourFreeTrail from '~/main-pages/startYourFreeTrail.vue'
    import FeaturedAds from '~/main-pages/FeaturedAds.vue'
    
</script>

<style  scoped>
body{
    margin: 0px;
}

</style>