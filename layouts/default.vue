<template>
    <div>
      <Header />
      <div class="layout">
        <Sidebar />
        <div class="main-content">
          <nuxt /> <!-- This will render the current route's component -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '@/pages/header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    components: {
      Header,
      Sidebar,
    },
  };
  </script>
  
  <style scoped>
  .layout {
    display: flex;
  }
  
  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 20px;
    height: calc(100vh - 73px); /* Adjust based on header height */
    position: absolute;
  }
  
  .main-content {
    flex-grow: 1;
    margin-left: 200px; /* Make space for the sidebar */
  }

  </style>