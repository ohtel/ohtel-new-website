<template>
  <div class="card p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
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
                  :class="{ 'active-step': progress >= 33 }"
                  >1</span
                >
                <div class="vertical-progress-bar">
                  <div
                    class="vertical-progress-bar-fill"
                    :style="{ height: `${progress >= 33 ? 100 : 0}%` }"
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
        <div class="step-line" :class="{ active: progress >= 33 }"></div>
        <StepItem value="2">
          <Step>
            <div class="step-header">
              <div class="step-number-container">
                <span
                  class="step-number"
                  :class="{ 'active-step': progress >= 66 }"
                  >2</span
                >
                <div class="vertical-progress-bar">
                  <div
                    class="vertical-progress-bar-fill"
                    :style="{ height: `${progress >= 66 ? 100 : 0}%` }"
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
        <div class="step-line" :class="{ active: progress >= 66 }"></div>
        <StepItem value="3">
          <Step>
            <div class="step-header">
              <div class="step-number-container">
                <span
                  class="step-number"
                  :class="{ 'active-step': progress === 100 }"
                  >3</span
                >
                <div class="vertical-progress-bar">
                  <div
                    class="vertical-progress-bar-fill"
                    :style="{ height: `${progress === 100 ? 100 : 0}%` }"
                  ></div>
                </div>
              </div>
              <div class="justify-items-left">
                <span class="step-count">Step 3:</span>
                <div class="step-title">Review & Submit</div>
              </div>
            </div>
          </Step>
        </StepItem>
      </Stepper>
      <div class="step-content">
        <div v-if="progress === 33">
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
                      class="d-flex items-start bg-white shadow rounded-lg p-4 card-section"
                    >
                      <!-- Image -->
                      <img
                        :src="card.image"
                        alt="Card Image"
                        class="w-28 h-20 rounded object-cover"
                      />
                      <!-- Content -->
                      <div class="ml-4">
                        <h3 class="text-lg font-bold text-gray-800">
                          {{ card.title }}
                        </h3>
                        <p class="text-sm text-gray-600">
                          {{ card.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div class="flex justify-end py-4">
            <Button
              label="Next"
              class="next-button"
              @click="handleNextStep(2)"
            />
          </div>
        </div>
        <div v-if="progress === 66">
          <div class="flex flex-col items-center h-48">
            <div class="content-box">Content for Step 2</div>
          </div>
          <div class="flex justify-between py-4">
            <Button
              label="Back"
              class="back-button"
              severity="secondary"
              @click="handleNextStep(1)"
            />
            <Button
              label="Next"
              class="next-button"
              @click="handleNextStep(3)"
            />
          </div>
        </div>
        <div v-if="progress === 100">
          <div class="flex flex-col items-center h-48">
            <div class="content-box">Content for Step 3</div>
          </div>
          <div class="flex justify-between py-4">
            <Button
              label="Back"
              class="back-button"
              severity="secondary"
              @click="handleNextStep(2)"
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
</template>

<script setup>
import Stepper from "primevue/stepper";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import Button from "primevue/button";
import { ref } from "vue";
const cards = ref([
  {
    id: 1,
    title: "Hospitality Spaces",
    description:
      "Advertise your Restaurants, Hotels, Cafes, etc. in the 'Spaces' category to Sell, Buy, Rent, Lease, Partner, or Invest in Hospitality Spaces.",
    image: "https://i.ibb.co/b536R2w/Frame-1618871932.png",
  },
  {
    id: 2,
    title: "Used Equipments",
    description:
      "Advertise your Used Equipment from Restaurants, Cruise Lines, Hotels, etc. in the 'Used Equipment' category to Sell, Buy, Rent, or Lease your Used Equipment.",
    image: "https://i.ibb.co/b536R2w/Frame-1618871932.png",
  },
  {
    id: 3,
    title: "Jobs",
    description:
      "Advertise Staff Requirements for your Hospitality Business or Post your Resume as an Applicant.",
    image: "https://i.ibb.co/b536R2w/Frame-1618871932.png",
  },
  {
    id: 4,
    title: "Market Deals in Your City",
    description:
      "Farmers / Supermarkets / Mega markets... Vegetable / Fruit / Grocery / Meat... vendors of perishable and non-perishable goods can showcase their deals here.",
    image: "https://i.ibb.co/b536R2w/Frame-1618871932.png",
  },
  {
    id: 5,
    title: "Shared Spaces",
    description:
      "Have a Free Space in your Hotel, Book Store, Bakery to share OR Looking for Space to set-up your Food Counter / Display Food Products. Advertise in the 'Shared Spaces' category.",
    image: "https://i.ibb.co/b536R2w/Frame-1618871932.png",
  },
]);
const progress = ref(33); // Default to Step 1 (33%)

function handleNextStep(step) {
  progress.value = step === 1 ? 33 : step === 2 ? 66 : 100;
}

function handleSubmit() {
  // Implement the submit logic here
  console.log("Form submitted");
}
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
  height: 100px;
  background: #e5e7eb;
  position: absolute;
  left: 50%;
  top: 35px;
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
  text-align: center;
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
.object-cover{
    width: 400px;
height: 200px;
}
.grid-section{
    gap: 24px;
}
.category-section{
.card-section{
    border-radius: 24px;
border: 1px solid #DEE1E6;

background: #FFF;
}
}
</style>