<template>
  <div>
    <NuxtLayout>
    </NuxtLayout>
    <div class="page-container">
      <h1 class="heading-title">
        <span class="animated-text">💬 Feedbacks</span>
      </h1>
      <div v-if="feedbackList && feedbackList.length" class="card-list">
        <div
          v-for="feedback in feedbackList"
          :key="feedback.id"
          class="feedback-card"
        >
          <img
            :src="getAvatar(feedback.user.avatar)"
            alt="User Avatar"
            class="avatar-large"
          />
          <div class="card-details">
            <h2 class="user-name">{{ feedback.user.full_name }}</h2>
            <div class="detail">
              <span class="detail-title">UUID:</span>
              <span class="detail-value">{{ feedback.user.uuid }}</span>
            </div>
            <div class="detail">
              <span class="detail-title">Review:</span>
              <span class="detail-value">{{ feedback.review }}</span>
            </div>
            <div class="detail">
              <span class="detail-title">Phone:</span>
              <span class="detail-value">{{ feedback.user.phone || "N/A" }}</span>
            </div>
            <div class="detail">
              <span class="detail-title">Email:</span>
              <span class="detail-value">{{ feedback.user.email || "N/A" }}</span>
            </div>
            <div class="detail">
              <span class="detail-title">Description:</span>
              <span class="detail-value" :title="feedback.description" :data-full-text="feedback.description">
                {{ feedback.description || "No description" }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No feedback available.</p>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage" :disabled="!nextPageExists">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../environment.js";

export default {
  data() {
    return {
      feedbackList: [],
      currentPage: 1,
      nextPageExists: false,
    };
  },
  mounted() {
    this.fetchFeedback();
  },
  methods: {
    async fetchFeedback() {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${BASE_URL}${ENDPOINTS.FEEDBACK}?page=${this.currentPage}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const data = response.data;
        this.feedbackList = data.results;
        this.nextPageExists = data.next !== null;
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    },
    nextPage() {
      this.currentPage++;
      this.fetchFeedback();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchFeedback();
      }
    },
    getAvatar(avatarUrl) {
      if (avatarUrl.includes("default")) {
        return "http://demo.ohtel.in/media/default/logo.jpeg";
      }
      return avatarUrl;
    },
  },
};
</script>

<style>
.page-container {
  padding: 20px;
}

.card-list {
  display: grid;
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px; /* Ensures content stays centered */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid */
}

.feedback-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.feedback-card:hover {
  /* transform: scale(1.05); */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 15px;
  display: block;
}

.card-details {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adds space between details */
}

.user-name {
  font-size: 1.4rem;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.detail {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Aligns content vertically in the center */
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
  /* Removed white-space: nowrap and text-overflow for line break */
  word-wrap: break-word; /* Ensures text wraps to the next line */
}

.detail-value {
  color: #555;
  flex-grow: 1;
  text-align: right;
  word-wrap: break-word; /* Ensures text wraps to the next line */
  /* Removed overflow and text-overflow */
  position: relative;
  width: 0px;
}

.detail-title {
  font-weight: bold;
  color: #47509b;
  flex-basis: 40%; /* Allocates space for alignment */
}

.pagination {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #47509b;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .card-list {
    grid-template-columns: repeat(3, 1fr); /* Show 3 items per row */
  }
}

@media (max-width: 768px) {
  .card-list {
    grid-template-columns: repeat(2, 1fr); /* Show 2 items per row */
  }
}

@media (max-width: 480px) {
  .card-list {
    grid-template-columns: 1fr; /* Show 1 item per row */
  }
}
</style>