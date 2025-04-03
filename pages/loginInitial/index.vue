<template>
  <div class="main">
    <div class="login-inputs d-flex">
      <div class="inputs col-md-6 d-flex flex-column justify-content-center align-items-center">
        <LoginInitial />
      </div>
      <!-- Carousel Section -->
      <div v-if="showCarousel" class="carousel-section col-md-6 d-flex">
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
  name: 'LoginInitialPage',
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
      currentIndex: 0,
      windowWidth: window.innerWidth
    };
  },
  computed: {
    showCarousel() {
      return this.windowWidth > 1024;
    }
  },
  methods: {
    updateIndex() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    this.interval = setInterval(this.updateIndex, 3000);
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style>
.main {
  min-height: 100vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.login-inputs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inputs {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: all 0.3s ease;
}

.carousel-section {
  border-radius: 15px;
  height: 100%;
  display: flex;
  justify-content: right;
  width: fit-content;
  position: relative;
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

/* Responsive styles */
@media (max-width: 1024px) {
  .inputs {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }

  .col-md-6 {
    width: 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }

  .login-inputs {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .main {
    padding: 24px;
  }

  .inputs {
    padding: 16px;
  }
}

@media (max-width: 600px) {
  .main {
    padding: 16px;
  }

  .inputs {
    padding: 20px;
  }

  .login-inputs {
    padding: 0 16px;
  }
}

/* Transitions */
.carousel-section,
.inputs {
  transition: all 0.3s ease-in-out;
}
</style> 