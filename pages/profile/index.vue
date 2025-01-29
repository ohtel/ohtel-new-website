<template>
  <div>
    <headerSection />
    <div class="profile-container">
      <div class="user-info mb-3">
        <div class="d-flex justify-content-between mb-3">
            <h2>User Info</h2>
            <div class="d-flex gap-4">
                <button class="delete-btn" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M16.25 4.58398L15.7336 12.9382C15.6016 15.0727 15.5357 16.1399 15.0007 16.9072C14.7361 17.2866 14.3956 17.6067 14.0006 17.8473C13.2017 18.334 12.1325 18.334 9.99392 18.334C7.8526 18.334 6.78192 18.334 5.98254 17.8464C5.58733 17.6054 5.24667 17.2847 4.98223 16.9047C4.4474 16.1362 4.38287 15.0674 4.25384 12.93L3.75 4.58398" stroke="#F55959" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2.5 4.58268H17.5M13.3797 4.58268L12.8109 3.40912C12.433 2.62957 12.244 2.23978 11.9181 1.99669C11.8458 1.94277 11.7693 1.8948 11.6892 1.85327C11.3283 1.66602 10.8951 1.66602 10.0287 1.66602C9.14067 1.66602 8.69667 1.66602 8.32973 1.86112C8.24842 1.90436 8.17082 1.95427 8.09774 2.01032C7.76803 2.26327 7.58386 2.66731 7.21551 3.4754L6.71077 4.58268" stroke="#F55959" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7.91602 13.75V8.75" stroke="#F55959" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12.084 13.75V8.75" stroke="#F55959" stroke-width="1.5" stroke-linecap="round"/>
</svg> Delete
                </button>
                <button class="edit-btn"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
<path d="M13.1791 4.98597L14.3472 3.81784C14.9923 3.1727 16.0383 3.1727 16.6835 3.81784C17.3286 4.46298 17.3286 5.50897 16.6835 6.15411L15.5153 7.32224M13.1791 4.98597L6.31751 11.8476C5.44643 12.7186 5.01087 13.1542 4.71429 13.6849C4.41771 14.2157 4.11932 15.4689 3.83398 16.6673C5.03239 16.382 6.28564 16.0836 6.81639 15.787C7.34714 15.4904 7.78268 15.0549 8.65378 14.1838L15.5153 7.32224M13.1791 4.98597L15.5153 7.32224" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.66602 16.666H14.666" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg> Edit</button>
            </div>
        </div>
        <div class="user-details">
          <div class="left-section">
            <img src="/assets/images/default_profile.jpg" alt="User Photo" class="user-photo" />
            <h4 class="m-2 mt-0">Rahul Raj</h4>
          </div>
          <div class="middle-section">
            <div class="form-row">
          <label class="mb-1">Email Address:</label>
          <input
          disabled
            class="styled-input"
            type="text"
            v-model="userDetails"
            placeholder="Edit your details"
          />
        </div>
          </div>
          <div class="right-section">
            <div class="form-row">
          <label class="mb-1">Phone Number:</label>
          <input
          disabled
            class="styled-input"
            type="text"
            v-model="userDetails"
            placeholder="Edit your details"
          />
        </div>
          </div>
        </div>
      </div>
      <div class="ads-section mt-3 mb-3">
        <FeaturedAds heading="My Ads" :isProfilePage="true" />
      </div>
      <div class="favorite-ads-section mt-3 mb-3">
        <FeaturedAds heading="Favorite Ads" :isProfilePage="true" />
      </div>
    </div>
    <howToPostAdSection />
    <getTheAppSection />
    <footerSection />
  </div>
</template>

<script>
import headerSection from '../main-pages/headerSection.vue'
import howToPostAdSection from "../main-pages/howToPostAdSection.vue";
import getTheAppSection from "../main-pages/getTheAppSection.vue";
import footerSection from "../main-pages/footerSection.vue";
import FeaturedAds from "../main-pages/FeaturedAds.vue";

export default {
  components: {
    headerSection,
    howToPostAdSection,
    getTheAppSection,
    footerSection,
    FeaturedAds,
  },
  data() {
    return {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        photo: "https://via.placeholder.com/150",
      },
      userDetails: ""
    };
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2% 10%;
}



.user-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.left-section {
  flex: 2;
}

.middle-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.right-section {
  flex: 2;
}

.user-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.form-row {
  margin-top: 20px;
}

.styled-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}
.delete-btn{
    padding: 10px;
    border-radius: 4px;
border: 1px solid #F55959;
color: #F24150;
background-color: #ffff;
width: 120px;
}
.edit-btn{
    padding: 10px;
    border-radius: 4px;
    background: #47509B;
    border: 1px solid #47509B;
    color: #ffffff;
    width: 120px;
    }
</style>