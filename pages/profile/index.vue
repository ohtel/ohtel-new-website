<template>
  <div>
    <headerSection />
    <div class="profile-container">
      <div class="user-info mb-3">
        <div class="d-flex justify-content-between mb-3">
            <h2>User Info</h2>
            <div class="d-flex gap-4">
                <button class="delete-btn" @click="handleDelete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M16.25 4.58398L15.7336 12.9382C15.6016 15.0727 15.5357 16.1399 15.0007 16.9072C14.7361 17.2866 14.3956 17.6067 14.0006 17.8473C13.2017 18.334 12.1325 18.334 9.99392 18.334C7.8526 18.334 6.78192 18.334 5.98254 17.8464C5.58733 17.6054 5.24667 17.2847 4.98223 16.9047C4.4474 16.1362 4.38287 15.0674 4.25384 12.93L3.75 4.58398" stroke="#F55959" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2.5 4.58268H17.5M13.3797 4.58268L12.8109 3.40912C12.433 2.62957 12.244 2.23978 11.9181 1.99669C11.8458 1.94277 11.7693 1.8948 11.6892 1.85327C11.3283 1.66602 10.8951 1.66602 10.0287 1.66602C9.14067 1.66602 8.69667 1.66602 8.32973 1.86112C8.24842 1.90436 8.17082 1.95427 8.09774 2.01032C7.76803 2.26327 7.58386 2.66731 7.21551 3.4754L6.71077 4.58268" stroke="#F55959" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7.91602 13.75V8.75" stroke="#F55959" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12.084 13.75V8.75" stroke="#F55959" stroke-width="1.5" stroke-linecap="round"/>
</svg> Delete
                </button>
                <button class="edit-btn" @click="openEditPopup">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
<path d="M13.1791 4.98597L14.3472 3.81784C14.9923 3.1727 16.0383 3.1727 16.6835 3.81784C17.3286 4.46298 17.3286 5.50897 16.6835 6.15411L15.5153 7.32224M13.1791 4.98597L6.31751 11.8476C5.44643 12.7186 5.01087 13.1542 4.71429 13.6849C4.41771 14.2157 4.11932 15.4689 3.83398 16.6673C5.03239 16.382 6.28564 16.0836 6.81639 15.787C7.34714 15.4904 7.78268 15.0549 8.65378 14.1838L15.5153 7.32224M13.1791 4.98597L15.5153 7.32224" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.66602 16.666H14.666" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg> Edit
                </button>
            </div>
        </div>
        <div class="user-details">
          <div class="left-section">
            <img v-if="user.profile_picture==''" src="/assets/images/default_profile.jpg" alt="User Photo" class="user-photo" />
            <img v-if="user.profile_picture!=''" :src="user.profile_picture" alt="User Photo" class="user-photo" />
            <h4 class="m-2 mt-0">{{ user.full_name }}</h4>
          </div>
          <div class="middle-section">
            <div class="form-row">
              <label class="mb-1">Email Address:</label>
              <input
                disabled
                class="styled-input"
                type="text"
                :value="user.email"
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
                :value="user.phone"
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

    <!-- Edit Popup Modal -->
    <div v-if="showEditPopup" class="edit-popup-modal">
      <div class="edit-popup-content">
        <div class="edit-popup-header">
          <h3>Edit Profile</h3>
          <span class="close-icon" @click="closeEditPopup">✖</span>
        </div>
        <form @submit.prevent="handleSubmit" class="edit-form">
          <div class="form-group">
            <label>Profile Picture</label>
            <div class="profile-picture-upload">
              <img :src="editForm.profile_picture ? editForm.profile_picture : (user.profile_picture ? user.profile_picture : '/assets/images/default_profile.jpg')" alt="Profile" class="preview-image" />
              <input 
                type="file" 
                @change="handleImageUpload" 
                accept="image/*"
                class="file-input"
              />
              <button type="button" class="upload-btn" @click="triggerFileInput">Upload Picture</button>
            </div>
          </div>

          <div class="form-group">
            <label>Name</label>
            <input 
              type="text" 
              v-model="editForm.full_name" 
              required
              :class="{ 'error': errors.full_name }"
            />
            <span class="error-message" v-if="errors.full_name">{{ errors.full_name }}</span>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              v-model="editForm.email" 
              required
              :class="{ 'error': errors.email }"
            />
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              v-model="editForm.phone" 
              required
              pattern="[0-9]{10}"
              :class="{ 'error': errors.phone }"
            />
            <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeEditPopup">Cancel</button>
            <button type="submit" class="save-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- OTP Popup Modal -->
    <div v-if="showOtpPopup" class="otp-popup-modal">
      <div class="otp-popup-content">
        <div class="otp-popup-header">
          <h3>Verify OTP</h3>
          <span class="close-icon" @click="closeOtpPopup">✖</span>
        </div>
        <form @submit.prevent="verifyOtp" class="otp-form">
          <div class="form-group">
            <label>Enter OTP sent to your {{ otpType === 'email' ? 'email' : 'phone' }}</label>
            <input 
              type="text" 
              v-model="otpForm.otp" 
              required
              :class="{ 'error': otpErrors.otp }"
              placeholder="Enter OTP"
            />
            <span class="error-message" v-if="otpErrors.otp">{{ otpErrors.otp }}</span>
          </div>

          <div class="resend-otp">
            <button 
              type="button" 
              class="resend-btn" 
              @click="sendOtp(otpType)"
              :disabled="isOtpSent"
            >
              {{ isOtpSent ? `Resend OTP in ${otpCountdown}s` : 'Resend OTP' }}
            </button>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeOtpPopup">Cancel</button>
            <button type="submit" class="save-btn">Verify</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast-notification" :class="toastType">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
import headerSection from '../main-pages/headerSection.vue'
import howToPostAdSection from "../main-pages/howToPostAdSection.vue";
import getTheAppSection from "../main-pages/getTheAppSection.vue";
import footerSection from "../main-pages/footerSection.vue";
import FeaturedAds from "../main-pages/FeaturedAds.vue";
import axios from 'axios';
import { BASE_URL } from '../environment.js';

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
        full_name: "",
        email: "",
        phone: "",
        profile_picture: "",
      },
      showEditPopup: false,
      editForm: {
        full_name: "",
        email: "",
        phone: "",
        profile_picture: null,
      },
      errors: {},
      selectedFile: null,
      showOtpPopup: false,
      otpType: '',
      otpForm: {
        otp: '',
        new_value: ''
      },
      otpErrors: {},
      isOtpSent: false,
      otpTimer: null,
      otpCountdown: 0,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
    };
  },
  created() {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        this.user = {
          full_name: userData.full_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          profile_picture: userData.profile_picture || "",
        };
      }
    }
  },
  methods: {
    openEditPopup() {
      this.editForm = {
        full_name: this.user.full_name,
        email: this.user.email,
        phone: this.user.phone,
        profile_picture: this.user.profile_picture,
      };
      this.showEditPopup = true;
    },
    closeEditPopup() {
      this.showEditPopup = false;
      this.errors = {};
      this.selectedFile = null;
    },
    triggerFileInput() {
      this.$el.querySelector('.file-input').click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editForm.profile_picture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    validateForm() {
      this.errors = {};
      
      if (!this.editForm.full_name.trim()) {
        this.errors.full_name = 'Name is required';
      }

      if (!this.editForm.email.trim()) {
        this.errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.editForm.email)) {
        this.errors.email = 'Please enter a valid email address';
      }

      if (!this.editForm.phone.trim()) {
        this.errors.phone = 'Phone number is required';
      } else if (!/^[0-9]{10}$/.test(this.editForm.phone)) {
        this.errors.phone = 'Please enter a valid 10-digit phone number';
      }

      return Object.keys(this.errors).length === 0;
    },
    async sendOtp(type) {
      try {
        const token = localStorage.getItem('accessToken');
        const endpoint = type === 'email' ? 'send-otp-for-email-change/' : 'send-otp-for-phone-change/';
        const payload = type === 'email' ? { new_email: this.editForm.email } : { new_phone: this.editForm.phone };
        
        const response = await axios.post(
          `${BASE_URL}${endpoint}`,
          payload,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data) {
          this.otpType = type;
          this.otpForm.new_value = type === 'email' ? this.editForm.email : this.editForm.phone;
          this.showOtpPopup = true;
          this.isOtpSent = true;
          this.startOtpTimer();
          
          // Show success toast
          this.showToast('OTP sent successfully');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        this.showToast('Error sending OTP', 'error');
      }
    },

    startOtpTimer() {
      this.otpCountdown = 60;
      this.otpTimer = setInterval(() => {
        if (this.otpCountdown > 0) {
          this.otpCountdown--;
        } else {
          clearInterval(this.otpTimer);
          this.isOtpSent = false;
        }
      }, 1000);
    },

    async verifyOtp() {
      try {
        const token = localStorage.getItem('accessToken');
        const endpoint = this.otpType === 'email' ? 'validate-and-change-email/' : 'validate-and-change-phone/';
        
        const response = await axios.post(
          `${BASE_URL}${endpoint}`,
          {
            otp: this.otpForm.otp,
            [this.otpType === 'email' ? 'new_email' : 'new_phone']: this.otpForm.new_value
          },
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data) {
          // Update local storage and user data
          const updatedUser = {
            ...JSON.parse(localStorage.getItem('user')),
            [this.otpType]: this.otpForm.new_value
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.user = updatedUser;
          
          this.closeOtpPopup();
          this.showToast('Updated successfully');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        this.otpErrors.otp = 'Invalid OTP';
        this.showToast('Error verifying OTP', 'error');
      }
    },

    closeOtpPopup() {
      this.showOtpPopup = false;
      this.otpForm.otp = '';
      this.otpForm.new_value = '';
      this.otpErrors = {};
      this.isOtpSent = false;
      if (this.otpTimer) {
        clearInterval(this.otpTimer);
      }
    },

    showToast(message, type = 'success') {
      this.toastMessage = message;
      this.showToast = true;
      this.toastType = type;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },

    async handleSubmit() {
      if (!this.validateForm()) return;

      try {
        const token = localStorage.getItem('accessToken');
        
        // 1. Update profile picture if changed
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('avatar', this.selectedFile);
          
          await axios.put(
            `${BASE_URL}image-update/`,
            formData,
            {
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
            }
          );
        }

        // 2. Update name if changed
        if (this.editForm.full_name !== this.user.full_name) {
          const response = await axios.put(
            `${BASE_URL}user/update_user_details/`,
            { 
              full_name: this.editForm.full_name,
              email: this.user.email,
              phone: this.user.phone
            },
            {
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.data.detail === "User Data Updated") {
            // Update localStorage with new full_name
            const userData = JSON.parse(localStorage.getItem('user'));
            userData.full_name = this.editForm.full_name;
            localStorage.setItem('user', JSON.stringify(userData));
            this.user.full_name = this.editForm.full_name;
          }
        }

        // 3. Handle email change if modified
        if (this.editForm.email !== this.user.email) {
          await this.sendOtp('email');
          return; // Stop here and wait for OTP verification
        }

        // 4. Handle phone change if modified
        if (this.editForm.phone !== this.user.phone) {
          await this.sendOtp('phone');
          return; // Stop here and wait for OTP verification
        }

        // If no OTP verification needed, update local storage and close popup
        const updatedUser = {
          ...JSON.parse(localStorage.getItem('user')),
          full_name: this.editForm.full_name,
          profile_picture: this.editForm.profile_picture
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.user = updatedUser;
        
        this.closeEditPopup();
        this.showToast('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
        this.showToast('Error updating profile', 'error');
      }
    },
    async handleDelete() {
      if (confirm('Are you sure you want to delete your account?')) {
        try {
          if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            const response = await axios.post(
              `${BASE_URL}hard-delete/`,
              {},
              {
                headers: { 
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            if (response.data) {
              // Clear localStorage and redirect to login
              localStorage.clear();
              this.$router.push('/login');
            }
          }
        } catch (error) {
          console.error('Error deleting account:', error);
          this.showToast('Error deleting account', 'error');
        }
      }
    }
  }
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

/* Add these new styles for the edit popup */
.edit-popup-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.edit-popup-content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.edit-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.edit-popup-header h3 {
  margin: 0;
  color: #161C2D;
  font-size: 20px;
  font-weight: 600;
}

.close-icon {
  cursor: pointer;
  font-size: 20px;
  color: #666;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #161C2D;
  font-size: 14px;
  font-weight: 500;
}

.form-group input {
  padding: 8px 12px;
  border: 1px solid #DEE1E6;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input.error {
  border-color: #F55959;
}

.error-message {
  color: #F55959;
  font-size: 12px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn, .save-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #fff;
  border: 1px solid #DEE1E6;
  color: #161C2D;
}

.save-btn {
  background: #47509B;
  border: none;
  color: #fff;
}

.cancel-btn:hover {
  background: #f5f5f5;
}

.save-btn:hover {
  background: #3a4179;
}

/* Profile picture upload styles */
.profile-picture-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.preview-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #DEE1E6;
}

.file-input {
  display: none;
}

.upload-btn {
  background: #47509B;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.upload-btn:hover {
  background: #3a4179;
}

/* OTP Popup Modal */
.otp-popup-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.otp-popup-content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.otp-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.otp-popup-header h3 {
  margin: 0;
  color: #161C2D;
  font-size: 20px;
  font-weight: 600;
}

.close-icon {
  cursor: pointer;
  font-size: 20px;
  color: #666;
}

.otp-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #161C2D;
  font-size: 14px;
  font-weight: 500;
}

.form-group input {
  padding: 8px 12px;
  border: 1px solid #DEE1E6;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input.error {
  border-color: #F55959;
}

.error-message {
  color: #F55959;
  font-size: 12px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn, .save-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #fff;
  border: 1px solid #DEE1E6;
  color: #161C2D;
}

.save-btn {
  background: #47509B;
  border: none;
  color: #fff;
}

.cancel-btn:hover {
  background: #f5f5f5;
}

.save-btn:hover {
  background: #3a4179;
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 24px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  z-index: 1001;
  animation: slideIn 0.3s ease-out;
}

.toast-notification.success {
  background-color: #4CAF50;
}

.toast-notification.error {
  background-color: #F55959;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Resend OTP Button */
.resend-otp {
  text-align: center;
  margin: 16px 0;
}

.resend-btn {
  background: none;
  border: none;
  color: #47509B;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s;
}

.resend-btn:hover:not(:disabled) {
  color: #3a4179;
}

.resend-btn:disabled {
  color: #999;
  cursor: not-allowed;
}
</style>