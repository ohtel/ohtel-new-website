<template>
  <div class="main-div">
    <div class="footer-section">
      <!-- Logo -->
      <img src="https://test-bucket-ohtel-1.s3.ap-south-1.amazonaws.com/images/footer-logo.svg" alt="Footer Logo" class="footer-logo">

      <!-- Address and Email in Flex Layout -->
      <div class="footer-info">
        <!-- Address -->
        <div class="info-item">
          <img class="info-icon" src="/assets/images/map.png" alt="">
          <p class="info-text">
            NO 40, RAJ NAGAR, NEAR STATE BANK OF INDIA,<br/> HUBBALLI, Dharwad, Karnataka, 580023
          </p>
        </div>

        <!-- Email -->
        <div class="info-item">
          <img class="info-icon email-icon" src="/assets/images/email.png" alt="">
          <p class="info-text">
            <a href="mailto:support@ohtel.in">support@ohtel.in</a>
          </p>
        </div>
      </div>

      <!-- Copyright Information -->
      <p class="footer-copyright">
        Copyright © 2024 | <span>ERTHEN FOODS</span>. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Main container styles */
.main-div {
  align-content: center;
  text-align: center;
  background-color: #A20584;
  padding: 20px 0;
  color: white;
}

/* Footer logo styles */
.footer-logo {
  margin-bottom: 20px;
}

/* Flex container for email and address */
.footer-info {
  display: flex;
  justify-content: center;
  gap: 20px; /* Space between address and email */
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Ensures responsiveness */
}

/* Individual info item */
.info-item {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between icon and text */
  text-align: left;
  /* max-width: 300px; */
}

/* Icons for email and address */
.info-icon {
  width: 24px; 
  color: white;
}

/* Info text styles */
.info-text {
  font-size: 12px;
  color: white;
  word-break: break-word; /* Handles long text gracefully */
  margin: 0px;
}

.info-text a {
  color: white;
  text-decoration: none;
}

.info-text a:hover {
  text-decoration: underline;
}

/* Copyright text styles */
.footer-copyright {
  font-size: 14px;
  margin: 0;
}

@media (max-width: 425px) {
  .info-text {
    font-size: 10px;
  }

  .info-item {
    flex: 1 1 100%; /* Stack items on smaller screens */
    justify-content: center;
  }
}
</style>