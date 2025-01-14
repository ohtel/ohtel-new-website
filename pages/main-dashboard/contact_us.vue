<template>
    <div>
        <headerSection/>
          <contact_us_details/>
        <whyOtelSection/>
        <getTheAppSection/>
        <footerSection/>
     
    </div>
</template>

<script setup>
import headerSection from '../main-pages/headerSection.vue'
    import aboutUsSection from '../main-pages/aboutUsSection.vue'
    import whyOtelSection from '../main-pages/whyOtelSection.vue'
   import howToPostAdSection from '../main-pages/howToPostAdSection.vue'
    import footerSection from '../main-pages/footerSection.vue'
        import getTheAppSection from '../main-pages/getTheAppSection.vue'
        import contact_us_details from '~/main-pages/contact_us_details.vue'
    
</script>

<style  scoped>
body{
    margin: 0px;
}

</style>