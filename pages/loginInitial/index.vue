<template>
  <div class="main">
    <div class="login-inputs d-flex">
      <div class="inputs col-md-6 d-flex flex-column justify-content-center align-items-center">
        <LoginInitial />
      </div>
      <!-- Carousel Section -->
      <div class="carousel-section col-md-6 d-flex">
        <img :src="images[currentIndex]" alt="Carousel Image" />
        <div class="heading-class">
          <h2 class="changing-head">{{ headings[currentIndex] }}</h2>
        </div>
        <div class="carousel-dots">
          <span
            v-for="(image, index) in images"
            :key="index"
            :class="{ active: index === currentIndex }"
            class="dot"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image1 from "../../assets/images/caurosel/caurosel1.svg";
import image2 from "../../assets/images/caurosel/caurosel2.svg";
import image3 from "../../assets/images/caurosel/caurosel1.svg";
import image4 from "../../assets/images/caurosel/caurosel2.svg";
import LoginInitial from '../../components/loginInitial.vue';

export default {
  components: {
    LoginInitial
  },
  data() {
    return {
      images: [image1, image2, image3, image4],
      headings: [
        "",
        "From Cook to Manager, From rented space to owning a property we got your back.",
        "Jobs",
        "From Cook to Manager, From rented space to owning a property we got your back.",
      ],
      currentIndex: 0
    };
  },
  methods: {
    updateIndex() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  },
  mounted() {
    this.interval = setInterval(this.updateIndex, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style>
.main {
  padding: 0;
  height: 100vh;
  padding: 16px;
}

.login-inputs {
  height: 100%;
  justify-content: space-between;
}

.inputs {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.carousel-section {
  border-radius: 15px;
  height: 100%;
  display: flex;
  justify-content: right;
  width: fit-content;
  position: relative;
}

.center-section {
  width: 500px;
}

.carousel-dots {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #d6d6d6fc;
  border-radius: 50%;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out, background-color 0.5s ease-in-out,
    transform 0.4s ease, box-shadow 0.4s ease;
}

.dot.active {
  opacity: 1;
  border-radius: 15px;
  background-color: #ffffff;
}

.heading-class {
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: center;
  color: white;
}

.changing-head {
  font-size: 24px;
  font-weight: 500;
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 66px;
}
</style> 