<template>
    <div class="main-section">
        <headerSection/>
        <div class="card p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto main-div">
   
   <h1 class="text-3xl font-bold text-gray-800 mb-4 text-center">
     Post Your Ad
   </h1>
   <p class="text-gray-500 mb-10 text-center">
     Ready to Scale? Let’s Build Something Great Together!
   </p>
   <div class="stepper-content-wrapper">
     <Stepper value="1" class="custom-stepper">
       <StepItem value="1">
         <Step>
           <div class="step-header">
             <div class="step-number-container">
               <span
                 class="step-number"
                 :class="{ 'active-step': progress >= 20 }"
                 >1</span
               >
               <div class="vertical-progress-bar">
                 <div
                   class="vertical-progress-bar-fill"
                   :style="{ height: `${progress >= 20 ? 100 : 0}%` }"
                 ></div>
               </div>
             </div>
             <div class="justify-items-left">
               <span class="step-count">Step 1:</span>
               <div class="step-title">Select Category</div>
             </div>
           </div>
         </Step>
       </StepItem>
       <div class="step-line" :class="{ active: progress >= 20 }"></div>
       <StepItem value="2">
         <Step>
           <div class="step-header">
             <div class="step-number-container">
               <span
                 class="step-number"
                 :class="{ 'active-step': progress >= 40 }"
                 >2</span
               >
               <div class="vertical-progress-bar">
                 <div
                   class="vertical-progress-bar-fill"
                   :style="{ height: `${progress >= 40 ? 100 : 0}%` }"
                 ></div>
               </div>
             </div>
             <div class="justify-items-left">
               <span class="step-count">Step 2:</span>
               <div class="step-title">Fill Details</div>
             </div>
           </div>
         </Step>
       </StepItem>
       <div class="step-line" :class="{ active: progress >= 40 }"></div>
       <StepItem value="3">
         <Step>
           <div class="step-header">
             <div class="step-number-container">
               <span
                 class="step-number"
                 :class="{ 'active-step': progress >= 60 }"
                 >3</span
               >
             </div>
             <div class="justify-items-left">
               <span class="step-count">Step 3:</span>
               <div class="step-title">Review & Submit</div>
             </div>
           </div>
         </Step>
       </StepItem>
       <div class="step-line" :class="{ active: progress >= 60 }"></div>
       <StepItem value="4">
         <Step>
           <div class="step-header">
             <div class="step-number-container">
               <span
                 class="step-number"
                 :class="{ 'active-step': progress >= 80 }"
                 >4</span
               >
             </div>
             <div class="justify-items-left">
               <span class="step-count">Step 4:</span>
               <div class="step-title">Additional Info</div>
             </div>
           </div>
         </Step>
       </StepItem>
       <div class="step-line" :class="{ active: progress >= 80 }"></div>
       <StepItem value="5">
         <Step>
           <div class="step-header">
             <div class="step-number-container">
               <span
                 class="step-number"
                 :class="{ 'active-step': progress === 100 }"
                 >5</span
               >
             </div>
             <div class="justify-items-left">
               <span class="step-count">Step 5:</span>
               <div class="step-title">Confirmation</div>
             </div>
           </div>
         </Step>
       </StepItem>
     </Stepper>
     <div class="step-content">
       <div v-if="progress === 20">
         <div class="flex flex-col items-center h-48">
           <div class="content-box">
             <section class="category-section py-12 px-6 bg-gray-50">
               <div class="max-w-6xl mx-auto">
                 <!-- Header -->

                 <!-- Card List -->
                 <div class="d-grid grid-cols-1 md:grid-cols-2 grid-section">
                   <div
                     v-for="card in cards"
                     :key="card.id"
                     :class="['d-flex items-start bg-white p-4 card-section align-items-center gap-3', { 'selected-card': selectedCategory === card.id }]"
                     @click="selectCategory(card)"
                   >
                     <!-- Image -->
                     <img
                       :src="card.category_images"
                       alt="Card Image"
                       class="w-28 h-20 object-cover"
                     />
                     <!-- Content -->
                     <div class="ml-4 text-left">
                       <h3 class="category-card-title">
                         {{ card.category_title }}
                       </h3>
                       <p class="category-subtitle">
                         {{ card.category_description }}
                       </p>
                     </div>
                     <div><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M12.0001 8C12.0001 8 20 13.8919 20 16C20 18.1083 12 24 12 24" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
                   </div>
                 </div>
               </div>
             </section>
           </div>
         </div>
         <div class="d-flex justify-end float-right py-4">
           <Button
             label="Next"
             class="next-button"
             :disabled="!selectedCategory"
             @click="handleNextStep(2)"
           >Next</Button>
         </div>
       </div>
       <div v-if="progress === 40">
         <div class="flex flex-col items-center h-48">
           <div class="content-box">
             <section class="category-section py-12 px-6 bg-gray-50">
               <div class="max-w-6xl mx-auto">
                 <!-- Header -->

                 <!-- Card List -->
                 <div class="d-grid grid-cols-1 md:grid-cols-2 grid-section">
                   <div
                     v-for="card in step2Cards"
                     :key="card.id"
                     :class="['d-flex items-start bg-white p-4 card-section align-items-center gap-3 justify-space-between', { 'selected-card': selectedStep2Card === card.id }]"
                     @click="selectStep2Card(card)"
                   >
                     <!-- Image -->
                    <div class="d-flex">
                       <img
                       src="/assets/images/ohtel_logo.png"
                       alt="Card Image"
                       class="w-28 h-20 object-cover-buyer-seller"
                     />
                     <!-- Content -->
                     <div class="ml-4 text-left">
                       <h3 class="category-card-title">
                         {{ card.title }}
                       </h3>
                       <p class="category-subtitle">
                         {{ card.description }}
                       </p>
                     </div>
                    </div>
                     <div><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M12.0001 8C12.0001 8 20 13.8919 20 16C20 18.1083 12 24 12 24" stroke="#161C2D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
                   </div>
                 </div>
               </div>
             </section>
           </div>
         </div>
         <div class="d-flex justify-space-between py-4">
           <button
             label="Back"
             class="back-button"
             severity="secondary"
             @click="handleBackStep(1)">Back</button>
           <button
             label="Next"
             class="next-button"
             :disabled="!selectedStep2Card"
             @click="handleNextStep(3)">Next</button>
         </div>
       </div>
       <div v-if="progress === 60">
             <section class="category-section py-12 px-6 bg-gray-50 div-grid">
               
                   <div
                     v-for="card in step3Cards"
                     :key="card.id"
                     :class="['', { 'selected-card-subcategory': selectedStep3Card === card.id }]"
                     @click="selectStep3Card(card.id)"
                   >
                     <!-- Image -->
                     <img
                       :src="card.sub_category_images"
                       alt="Card Image"
                       class="w-28 h-20 object-cover-step3"
                     />
                     <!-- Content -->
                     <div class="ml-4 text-left">
                       <h3 class="subcategory-card-title">
                         {{ card.sub_category_title }}
                       </h3>
                     </div>
                   </div>
                
             </section>
          
         <div class="d-flex justify-content-between py-4">
           <Button
             label="Back"
             class="back-button"
             severity="secondary"
             @click="handleBackStep(2)"
           >Back</Button>
           <Button
             label="Next"
             class="next-button"
             :disabled="!selectedStep3Card"
             @click="handleNextStep(4)"
           >Next</Button>
         </div>
       </div>
       <div v-if="progress === 80">
         <div class="flex flex-col items-center h-48">
           <div class="content-box">
             <section class="category-section py-12 px-6 bg-gray-50">
               <div class="max-w-6xl mx-auto">
                 <!-- Dynamic Form Component -->
                 <form1
                   v-if="this.adType === 'Spaces' || selectedCategoryDetails?.category_title === 'Used Equipments' || selectedCategoryDetails?.category_title === 'Shared Spaces'"
                   ref="form1Ref"
                   :dataFromParent="adDetails"
                 ></form1>
                 <form2
                   v-if="this.adType === 'Market Deals' || selectedCategoryDetails?.category_title === 'Foods Factory/Home Chef'"
                   ref="form2Ref"
                   :dataFromParent="adDetails"
                 ></form2>
                 <form3
                   v-if="this.adType === 'Applicant'"
                   ref="form3Ref"
                   :dataFromParent="adDetails"
                 ></form3>
                 <form4
                   v-if="this.adType === 'Recruiter'"
                   ref="form4Ref"
                   :dataFromParent="adDetails"
                 ></form4>
               </div>
             </section>
           </div>
         </div>
         <div class="d-flex justify-space-between py-4">
           <button
             label="Back"
             class="back-button"
             severity="secondary"
             @click="handleBackStep(3)">Back</button>
           <button
             label="Next"
             class="next-button"
             :disabled="!selectedStep4Card"
             @click="handleNextStep(5)">Next</button>
         </div>
       </div>
       <div v-if="progress === 100">
             <section class="category-section py-12 px-6 bg-gray-50 div-grid">
               
                   <div
                     v-for="card in step5Cards"
                     :key="card.id"
                     :class="['', { 'selected-card': selectedStep5Card === card.id }]"
                     @click="selectStep5Card(card.id)"
                   >
                     <!-- Image -->
                     <img
                       :src="card.sub_category_images"
                       alt="Card Image"
                       class="w-28 h-20 object-cover-step3"
                     />
                     <!-- Content -->
                     <div class="ml-4 text-left">
                       <h3 class="subcategory-card-title">
                         {{ card.sub_category_title }}
                       </h3>
                     </div>
                   </div>
                
             </section>
          
         <div class="flex justify-between py-4">
           <Button
             label="Back"
             class="back-button"
             severity="secondary"
             @click="handleBackStep(4)"
           />
           <Button
             label="Submit"
             class="submit-button"
             @click="handleSubmit"
           />
         </div>
       </div>
     </div>
   </div>
 </div>
 <howToPostAdSection/>
 <getTheAppSection/>
 <footerSection/>
    </div>

</template>

<script>
 import headerSection from '../main-pages/headerSection.vue'
    import howToPostAdSection from '../main-pages/howToPostAdSection.vue'
    import getTheAppSection from '../main-pages/getTheAppSection.vue'
    import footerSection from '../main-pages/footerSection.vue'
    import form1 from '../components/forms/form-1.vue'
    import form2 from '../components/forms/form-2.vue'
    import form3 from '../components/forms/form-3.vue'
    import form4 from '../components/forms/form-4.vue'

export default {
    components: {
        headerSection,
        howToPostAdSection,
        getTheAppSection,
        footerSection,
        form1,
        form2,
        form3,
        form4
    },
  data() {
    return {
      progress: 20, // Default to Step 1 (20%)
      selectedCategory: null,
      selectedStep2Card: null,
      selectedStep3Card: null,
      selectedStep4Card: null,
      selectedStep5Card: null,
      adDetails: {
        category: "",
        sellerOrBuyer: "Seller",
        subCategory: "",
        subSubCategory: "",
        title: "",
        dealType: "",
        description: "",
        area: "",
        price: "",
        address: "",
        images: [],
        expiryDate: "",
        city: "",
        state: "",
        subCategoryTitle: "",
        subSubCategoryTitle: "",
        levelType: "",
      },
      cards: [],
      step2Cards: [],
      step3Cards: [],
      step4Cards: [],
      step5Cards: [],
    };
  },
  methods: {
    handleNextStep(step) {
        debugger
      this.progress = step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : 100;
      if (step === 3) {
        this.fetchStep3Cards();
      } else if (step === 4) {
        this.fetchStep4Cards();
      } else if (step === 5) {
        this.fetchStep5Cards();
      }
    },
    handleBackStep(step) {
      if (step === 1) {
        this.selectedStep2Card = null;
      } else if (step === 2) {
        this.selectedStep3Card = null;
      } else if (step === 3) {
        this.selectedStep4Card = null;
      }
      this.progress = step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : 100;
    },
    handleSubmit() {
      // Implement the submit logic here
      console.log("Form submitted");
    },
    selectCategory(data) {
        debugger
      this.selectedCategoryDetails = data;
      this.selectedCategory = data.id;
      this.updateStep2Cards(data);
    },
    selectStep2Card(data) {
      this.adType=data.title;
      this.selectedStep2Card = data.id;
    },
    selectStep3Card(id) {
      this.selectedStep3Card = id;
    },
    selectStep4Card(id) {
      this.selectedStep4Card = id;
    },
    selectStep5Card(id) {
      this.selectedStep5Card = id;
    },
    async fetchStep3Cards() {
      try {
        const token = localStorage.getItem('accessToken');
        let type = this.selectedStep2Card === 2 ? 'Seller' : 'Buyer';
        if (this.selectedCategory === 3) {
          type = this.selectedStep2Card === 2 ? 'Recruiter' : 'Applicant';
        }
        const response = await fetch(`https://demo.ohtel.in/api/master/get_sub_category_list/?category_id=${this.selectedCategory}&type=${this.adType}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        this.step3Cards = data.result.data;
      } catch (error) {
        console.error("Error fetching step 3 cards:", error);
      }
    },
    async fetchStep4Cards() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://demo.ohtel.in/api/master/get_sub_category_list/?category_id=${this.selectedCategory}&type=${this.adType}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        this.step4Cards = data.result.data;
      } catch (error) {
        console.error("Error fetching step 4 cards:", error);
      }
    },
    async fetchStep5Cards() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://demo.ohtel.in/api/master/get_sub_category_list/?category_id=${this.selectedCategory}&type=${this.selectedStep2Card === 2 ? 'Seller' : 'Buyer'}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        this.step5Cards = data.result.data;
      } catch (error) {
        console.error("Error fetching step 5 cards:", error);
      }
    },
    async fetchCategories() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://demo.ohtel.in/api/master/app_homepage_api/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        this.cards = data.result.category_list;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    updateStep2Cards(category) {
      this.step2Cards = [
        {
          id: 1,
          title: category.buyer.title,
          description: category.buyer.description,
          image: category.category_images,
        },
        {
          id: 2,
          title: category.seller.title,
          description: category.seller.description,
          image: category.category_images,
        },
      ];
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 2rem;
  font-family: "Arial", sans-serif;
}

.stepper-content-wrapper {
  display: flex;
  gap: 2rem;
}

.custom-stepper {
  display: flex;
  flex-direction: column;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: #47509b;
}

.step-number-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-number {
  background: white;
  border: 1px solid #263238;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  color: #263238;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
}

.step-number.active-step {
  background: #47509b;
  color: white;
  border: none;
}

.vertical-progress-bar {
  width: 4px;
  height: 87px;
  background: #e5e7eb;
  position: absolute;
  left: 50%;
  top: 28px;
  transform: translateX(-50%);
  border-radius: 2px;
  overflow: hidden;
}

.vertical-progress-bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #47509b 0%, #47509b 100%);
  transition: height 0.3s ease;
}

.step-line {
  width: 4px;
  height: 50px;
  background: #e5e7eb;
  margin-left: 13px;
  transition: background-color 0.3s ease;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.step-line.active {
  background: #47509b;
}

.step-content {
  flex: 1;
}

.step-count {
  color: #263238;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  opacity: 0.6;
}

.step-title {
  color: #1e1e1e;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
}

.content-box {
  padding: 2rem;
  width: 100%;
  font-size: 1rem;
  color: #374151;
}

.next-button,
.submit-button {
  background: #47509b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.next-button:hover,
.submit-button:hover {
  background-color: #3b4a8b;
}

.back-button {
  background: #a20584;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #8b046b;
}
.justify-items-left {
  justify-items: left;
}
.object-cover {
  width: 260px;
  height: 200px;
  border-radius: 16px;
}
.object-cover-step3 {
  width: 336px;
  height: 200px;
  border-radius: 16px;
}
.object-cover-buyer-seller {
  border-radius: 16px;
}
.grid-section {
  gap: 24px;
}
.category-section {
  .card-section {
    border-radius: 24px;
    border: 1px solid #dee1e6;

    background: #fff;
  }
  .category-card-title{
    color: #284B80;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;

  }
  .category-subtitle{
    
    color: #4C4C4C;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
}
}
.justify-space-between{
    justify-content: space-between!important;
}
.selected-card {
  border: 1px solid #161C2D!important;
}
.selected-card-subcategory{
    border: 1px solid #161C2D!important;
    border-radius: 30px;
    padding: 9px;
}
.div-grid{
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    text-align: center;
}
.subcategory-card-title{
    color: var(--color4, #383838);
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
}
.float-right{
    float: right;
}
@media (max-width: 1300px) {
.div-grid{
    grid-template-columns: repeat(2, 1fr);
}
}

@media (max-width: 945px) {
    .main-section{
        width: fit-content;
    }
    .div-grid{
    grid-template-columns: repeat(1, 1fr);
}
// .main-div{
//     width: fit-content;
// }

}
</style>