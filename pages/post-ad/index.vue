<template>
    <div class="post-ad-page">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="/">Home</a> > <span>Post Your Ad</span>
      </nav>
  
      <div class="content-wrapper">
        <!-- Left Side: Stepper -->
        <div class="stepper">
          <h3>Steps</h3>
          <ul>
            <li v-for="(step, index) in steps" :key="index" :class="{ active: index === currentStep }">
              <span>Step {{ index + 1 }}</span>
              <p>{{ step }}</p>
            </li>
          </ul>
          <button class="next-step">Next Step →</button>
        </div>
  
        <!-- Right Side: Category Cards -->
        <div class="categories">
          <h1>Post Your Ad</h1>
          <p class="subheading">Ready to Scale? Let's Build Something Great Together!</p>
  
          <div class="card-list">
            <div v-for="(category, index) in categories" :key="index" class="card">
              <img :src="category.image" alt="Category Image" class="card-image" />
              <div class="card-content">
                <h2>{{ category.title }}</h2>
                <p>{{ category.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Data for stepper
  const steps = [
    'Select Category',
    'Select Type',
    'Select Subcategory',
    'Available Packages',
    'Enter Details',
    'Select Packages',
    'Review & Publish',
  ];
  const currentStep = 0;
  
  // Data for categories
  const categories = [
    {
      title: 'Hospitality Spaces',
      description:
        'Advertise your Restaurants, Hotels, Cafes, etc. in the “Spaces” category to Sell, Buy, Rent, Lease, Partner, or Invest in Hospitality Spaces.',
      image: 'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    },
    {
      title: 'Used Equipments',
      description:
        'Advertise your Used Equipment from Restaurants, Cruise Lines, Hotels, etc. to Sell, Buy, Rent, or Lease your Used Equipment.',
      image: 'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    },
    {
      title: 'Jobs',
      description:
        'Advertise Staff Requirements for your Hospitality Business or Post your Resume as an Applicant.',
      image: 'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    },
    {
      title: 'Market Deals in Your City',
      description:
        'Farmers / Supermarkets / Mega markets... Vendors of perishable and non-perishable goods can showcase their deals here.',
      image: 'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    },
    {
      title: 'Shared Spaces',
      description:
        'Have a Free Space in your Hotel, Book Store, Bakery to share OR Looking for Space to Rent?',
      image: 'https://i.ibb.co/b536R2w/Frame-1618871932.png',
    },
  ];
  </script>
  
  <style scoped>
  .post-ad-page {
    font-family: Arial, sans-serif;
    padding: 1.5rem 2rem;
  }
  .breadcrumb {
    font-size: 14px;
    color: #666;
    margin-bottom: 1.5rem;
  }
  .breadcrumb a {
    color: #007bff;
    text-decoration: none;
  }
  .content-wrapper {
    display: flex;
    gap: 2rem;
  }
  
  /* Stepper Section */
  .stepper {
    flex: 1;
    border-right: 1px solid #ddd;
    padding-right: 2rem;
  }
  .stepper h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .stepper ul {
    list-style: none;
    padding: 0;
  }
  .stepper li {
    margin-bottom: 1rem;
    font-size: 14px;
    color: #666;
  }
  .stepper li.active {
    font-weight: bold;
    color: #007bff;
  }
  .next-step {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  /* Categories Section */
  .categories {
    flex: 3;
  }
  .categories h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  .subheading {
    font-size: 14px;
    color: #666;
    margin-bottom: 2rem;
  }
  .card-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  .card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1rem;
  }
  .card-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
  .card-content {
    padding: 1rem;
  }
  .card-content h2 {
    font-size: 1rem;
    margin: 0;
    color: #333;
  }
  .card-content p {
    font-size: 14px;
    color: #666;
    margin-top: 0.5rem;
  }
  </style>