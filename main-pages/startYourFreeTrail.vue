<template>
  <section class="free-trial-section">
    <div class="content">
      <h1>Start Your Free Trial Today!</h1>
      <p>Experience all the premium features with no commitment—absolutely free!</p>
      <button class="start-trial-button">Start Free Trial</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StartYourFreeTrial',
};
</script>

<style scoped>
.free-trial-section {
  background-image: url('/assets/images/startYourFreeTrail.png');
  background-size: cover;
  background-position: center;
  padding: 100px 20px;
  text-align: center;
  color:#161C2D;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.content {
  max-width: 600px;
}

h1 {
    color: var(--Main-text, #161C2D);
text-align: center;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: 58px; /* 161.111% */
letter-spacing: -1.8px;
  margin-bottom: 20px;
}

p {
    color: var(--Sub-text, #161C2D);
text-align: center;
font-size: 16px;
font-weight: 500;
line-height: 32px; /* 200% */
letter-spacing: -0.2px;
margin-bottom: 3rem;
}

.start-trial-button {
  background-color: #A20584;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 20px;
font-style: normal;
font-weight: 600;
}

.start-trial-button:hover {
  background-color: #e904bf;
}
</style>
