<template>
    <section class="faq-section">
      <div class="container">
        <h2 class="faq-title">Frequently Asked Questions</h2>
        <div class="faq-item" v-for="(item, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleAnswer(index)">
            <p>{{ item.question }}</p>
            <span :class="{ rotated: activeIndex === index }"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M24 12.0001C24 12.0001 18.1081 20 16 20C13.8917 20 8 12 8 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span>
          </div>
          <div class="faq-answer" v-if="activeIndex === index">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: null, // Tracks the currently open FAQ item
        faqs: [
          {
            question: "What is Lorem Ipsum?",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          },
          {
            question: "Why do we use Lorem Ipsum?",
            answer: "It is a long-established fact that a reader will be distracted by readable content.",
          },
          {
            question: "Where does Lorem Ipsum come from?",
            answer: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
          },
          // Add more FAQ items as needed
        ],
      };
    },
    methods: {
      toggleAnswer(index) {
        this.activeIndex = this.activeIndex === index ? null : index; // Toggle the active question
      },
    },
  };
  </script>
  
  <style scoped>
  .faq-section {
    padding: 86px 100px;
  }
  
  .container {
    margin: 0 auto;
  }
  
.faq-title {
    color: #161C2D;
font-size: 36px;
font-style: normal;
font-weight: 700;
text-align: center;
margin-bottom: 64px;
}

.faq-item:first-of-type {
    border-top: 1px solid #ddd;
}
  
  .faq-item {
    border-bottom: 1px solid #ddd;
    padding: 27px 24px;
  }
  
  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
  }
  
  .faq-question p {
    margin: 0;
  }
  
  .faq-answer {
    padding: 10px 0;
    font-size: 14px;
    color: #555;
  }
  
  span {
    transition: transform 0.3s ease;
  }
  
  span.rotated {
    transform: rotate(180deg);
  }
  </style>