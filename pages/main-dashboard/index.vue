<template>
    <div>
        <headerSection/>
        <carouselSection/>
        <startYourFreeTrail/>
        <whatWeOfferSection/>
        <FeaturedAds v-if="!isGuestUser"/>
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

import { ref, onMounted } from 'vue'

const isGuestUser = ref(false)

onMounted(() => {
    if (process.client) {
        const user = localStorage.getItem('user')
        isGuestUser.value = user === 'GUEST_USER'
    }
})
</script>

<style  scoped>
body{
    margin: 0px;
}

</style>