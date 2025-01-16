<template>
    <div>
        <headerSection/>
    <section class="blogs-section">
      <div class="container">
        <!-- Title and Subtitle -->
        <h1 class="section-title">Blogs</h1>
        <p class="section-subtitle text-center">Insights, Tips, and Trends to Help You Stay Ahead.</p>
  
        <!-- Blog Cards Grid -->
        <div class="blog-grid">
          <div v-for="blog in paginatedBlogs" :key="blog.id" class="blog-card">
            <h3 class="title">{{ blog.title }}</h3>
            <p class="description">{{ blog.description }}</p>
            <div class="meta">
              <span class="author">{{ blog.author }}</span>
              <span class="date">{{ blog.date }}</span>
            </div>
            <button class="view-button">View</button>
          </div>
        </div>
  
        <!-- Pagination -->
        <div class="pagination">
          <button
            class="page-button"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Prev
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            class="button-inactive"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="page-button"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </section>
    <frequentlyAskedQuestions/>
    <getTheAppSection/>
        <footerSection/>
    </div>
  </template>
  
  <script>
  import headerSection from '../main-pages/headerSection.vue'
  import getTheAppSection from '../main-pages/getTheAppSection.vue'
  import footerSection from '../main-pages/footerSection.vue'
  import frequentlyAskedQuestions from '~/main-pages/frequentlyAskedQuestions.vue';
  
  export default {
    components: {
      headerSection,
      getTheAppSection,
      footerSection,
      frequentlyAskedQuestions
    },
    data() {
      return {
        blogs: [
          {
            id: 1,
            title: "Blog Post 1",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 2,
            title: "Blog Post 2",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 3,
            title: "Blog Post 3",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 4,
            title: "Blog Post 4",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 5,
            title: "Blog Post 5",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 6,
            title: "Blog Post 6",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 7,
            title: "Blog Post 7",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 8,
            title: "Blog Post 8",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 9,
            title: "Blog Post 9",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 10,
            title: "Blog Post 10",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 11,
            title: "Blog Post 11",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 12,
            title: "Blog Post 12",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 13,
            title: "Blog Post 13",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 14,
            title: "Blog Post 14",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 15,
            title: "Blog Post 15",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 16,
            title: "Blog Post 16",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 17,
            title: "Blog Post 17",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 18,
            title: "Blog Post 18",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 19,
            title: "Blog Post 19",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 20,
            title: "Blog Post 20",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 21,
            title: "Blog Post 21",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 22,
            title: "Blog Post 22",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 23,
            title: "Blog Post 23",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 24,
            title: "Blog Post 24",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 25,
            title: "Blog Post 25",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 26,
            title: "Blog Post 26",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 27,
            title: "Blog Post 27",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
          {
            id: 28,
            title: "Blog Post 28",
            description:
              "Lorem ipsum is a dummy placeholder text commonly used in graphic design.",
            author: "Luis Hamilton",
            date: "Oct 23, 2014",
          },
        ],
        currentPage: 1,
        blogsPerPage: 9,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.blogs.length / this.blogsPerPage);
      },
      paginatedBlogs() {
        const start = (this.currentPage - 1) * this.blogsPerPage;
        const end = start + this.blogsPerPage;
        return this.blogs.slice(start, end);
      },
    },
    methods: {
      goToPage(page) {
        this.currentPage = page;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .blogs-section {
    padding: 90px 20px;
    background-color: #f8f9fa;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section-title {
    color: #161C2D;
    text-align: center;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
  }
  
  .section-subtitle {
    color: #161C2DB2;
font-size: 12px;
font-style: normal;
font-weight: 400;
    margin-bottom: 64px;
  }
  
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .blog-card {
    /* border: 1px solid #e3e3e3; */
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    background: #fff;
    border-radius: 6px;
    border: 1px solid rgba(22, 28, 45, 0.20);
    max-width: 350px;
  }
  
  .title {
    color: #161C2D;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: left;
  }
  
  .description {
    font-size: 14px;
    color: #555;
    text-align: left;
    margin-bottom: 24px;
  }
  
  .meta {
    font-size: 12px;
    color: #999;
    margin-bottom: 22px;
    display: flex;
    justify-content: space-between;

  }
  .button-inactive{
    width: 40px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid #F1F1F1;
    background: #FFF;
  }
  .view-button {
    border-radius: 4px;
    background-color: #47509B;
    cursor: pointer;
    color: var(--White, #FFF);
font-size: 16px;
font-style: normal;
font-weight: 500;
width: 100%;
height: 40px;
border: none;
  }
  
  .view-button:hover {
    background-color: #545daf;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 64px;
    gap: 16px;
    justify-content: right;
    right: 35px;
    margin-right: 30px;
  }
  
  .page-button {
    cursor: pointer;
    width: 100px;
    border-radius: 8px;
    background-color: #47509B;
    border: none;
    color: white;
    padding: 10px 4px;
  }
  .date{
    color: #161C2D;
font-size: 12px;
font-style: normal;
font-weight: 500;
  }
  .page-button:disabled {
    width: 100px;
    padding: 10px 4px;
    border-radius: 8px;
    background: #EAEAEA;
    color: black;
    cursor: not-allowed;
  }
  
  .page-button:hover:not(:disabled) {
    background: #4b3dcc;
  }
  
  button.active {
    width: 40px;
    border-radius: 8px;
    background-color: #47509B;
    border: none;
    color: white;
    color: white;
  }
  .author{
    color: #161C2D;
font-size: 14px;
font-style: normal;
font-weight: 600;
  }
  </style>