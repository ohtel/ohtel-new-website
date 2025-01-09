<template>
  <section class="how-to-post-ad-section">
    <div class="content">
      <img src="/assets/images/howToPost.png" alt="How to Post Ad" class="ad-image" />
      <button class="learn-more-button">Learn More</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HowToPostAdSection',
};
</script>

<style scoped>
.how-to-post-ad-section {
  background: rgba(220, 226, 238, 0.30);
  padding: 58px 20px;
  text-align: center;
}

.ad-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.learn-more-button {
  display: flex;
  width: 150px;
  height: 50px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: #47509B;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin: 0 auto; /* Center the button */
}

.learn-more-button:hover {
  background-color: darkblue;
}

@media (max-width: 768px) {
  .how-to-post-ad-section {
    padding: 58px 10px;
  }

  .learn-more-button {
    width: 100%;
    height: auto;
    padding: 10px;
    font-size: 14px;
  }
}
</style>
