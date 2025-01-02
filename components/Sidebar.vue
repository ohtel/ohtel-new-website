<template>
    <div class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><nuxt-link to="/dashboard" class="nav-link" active-class="active">Home</nuxt-link></li>
        <li><nuxt-link to="/dashboard/views/users" class="nav-link" active-class="active">Users</nuxt-link></li>
        <li><nuxt-link to="/dashboard/views/category" class="nav-link" active-class="active">Category</nuxt-link></li>
        <li><nuxt-link to="/dashboard/views/post" class="nav-link" active-class="active">Ads</nuxt-link></li>
        <!-- <li><nuxt-link to="/dashboard/views/subscription_plan" class="nav-link" active-class="active">Subscription Plan</nuxt-link></li> -->
        <li><nuxt-link to="/dashboard/views/feedback" class="nav-link" active-class="active">Feedback</nuxt-link></li>
        <li><nuxt-link to="/dashboard/views/sub_category" class="nav-link" active-class="active">Sub Category</nuxt-link></li>
        <!-- <li><nuxt-link to="/dashboard/views/transactions" class="nav-link" active-class="active">Transactions</nuxt-link></li> -->
        <!-- <li><nuxt-link to="/dashboard/views/notifications" class="nav-link" active-class="active">Notifications</nuxt-link></li> -->
      </ul>
      
      <button class="logout" @click="logout">Logout</button> <!-- Logout option at the bottom -->
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
    methods: {
      logout() {
        // Clear the access token from local storage
        localStorage.removeItem('accessToken');
        
        // Redirect to login page
        this.$router.push('/'); // Adjust this path if your login route is different
    
        // Clear the browser's history to prevent going back
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      }
    }
  }
  </script>
  
  <style scoped>
 .sidebar {
  width: 200px; /* Fixed width */
  background-color: #ffffff; /* White background */
  padding: 20px; /* Padding around the content */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: space-between; /* Space between menu and logout */
  box-shadow: 2px 0 5px rgba(0,0,0,0.1); /* Optional shadow for better separation */
  height: 100vh; /* Full viewport height */
  overflow: hidden; /* Prevents scrollbars from appearing */
}


  ul {
    list-style-type: none; /* Remove bullet points */
    padding: 0; /* Remove padding */
  }
  
  li {
    margin: 10px 0; /* Space between items */
  }
  
  .nav-link {
    text-decoration: none; /* Remove underline */
    color: #333; /* Change color to dark gray for better visibility */
    padding: 10px; /* Add padding for clickable area */
    display: block; /* Make the link fill the entire list item */
    border-radius: 4px; /* Optional: round the corners */
    transition: background-color 0.8s, color 0.3s; /* Smooth transition */
    font-size: 15px;
  }
  
  .nav-link:hover {
    background-color: #7b7e92; /* Light gray background on hover */
    color: #fff; /* Change text color on hover */
  }
  
  .active {
    background-color: #47509B;
    color: #fff;
  }
  
  .logout {
  margin-top: auto;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  background-color: #A20584; /* Keep the original color */
  background: linear-gradient(135deg, #A20584, #E9409A); /* Add a subtle gradient */
  border: none;
  border-radius: 12px;
  padding: 5px; /* Adjust padding for better clickability */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  transition: transform 1s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.logout:hover {
  transform: scale(1.05); /* Slight zoom-in effect */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* More pronounced shadow on hover */
  background: linear-gradient(135deg, #E9409A, #A20584); /* Reverse gradient on hover */
}

.logout:active {
  transform: scale(0.95); /* Press-down effect */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow change */
  background: #A20584; /* Solid color for active state */
}
  
  </style>