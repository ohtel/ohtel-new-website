<template>
  <div v-if="visible" :class="['toaster', toasterType]" class="toaster-container">
    <p>{{ message }}</p>
    <button class="close-toast" @click="visible = false">x</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      toasterType: 'success', // Can be 'success' or 'error'
    };
  },
  methods: {
    showToast(message, type = 'success') {
      this.message = message;
      this.toasterType = type;
      this.visible = true;
      
      // Automatically hide after 3 seconds
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.toaster-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
}

.toaster.success {
  background-color: #4caf50;
}

.toaster.error {
  background-color: #f44336;
}

.close-toast {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}
</style>