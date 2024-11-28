<template>
  <div>
    <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
      Available Books
    </h1>

    <div v-if="loading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <div v-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <div v-if="!loading && !error" class="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="book in booksData" :key="book.id" class="mb-2">
        <a
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 "
        >
          <img
            class="object-cover w-full rounded-t-lg h-96 md:h-96 md:w-auto md:rounded-none md:rounded-s-lg"
            :src="book.coverImage"
            alt=""
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ book.title }}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ book.author }}
            </p>
            <a
              @click="showBookDetails(book)"
              class="inline-flex items-center w-32 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </a>
      </div>
    </div>

    <Transition>
      <div v-if="selectedBook">
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          @click="selectedBook = null"
        >
          <div
            class="flex flex-col bg-indigo-900 p-4 rounded-lg shadow md:flex-row md:max-w-3xl w-3/4"
            @click.stop
          >
            <img
              class="object-cover rounded-t-lg w-auto h-96"
              :src="selectedBook.coverImage"
              alt=""
            />
            <div class="ml-2 text-white bg-cyan-950 w-5/6 p-4 rounded-md">
              <h2 class="text-2xl font-bold">{{ selectedBook.title }}</h2>
              <p class="text-sm">
                <div class="flex mt-2">
                  <span class="bg-white text-yellow-400 text-s font-semibold py-1 rounded w-40 text-center mb-2">
                    {{ getStarRating(selectedBook.rating.average) }} ({{ selectedBook.rating.count }} reviews)
                  </span>
                  <span class="text-s font-semibold px-3 py-1">
                    Stock: {{ selectedBook.qty }} pcs
                  </span>
                </div>
                <span class="font-semibold">Author: </span>{{ selectedBook.author }}
              </p>
              <p class="text-sm">
                <span class="font-semibold">Published Date: </span>{{ selectedBook.publishedDate }}
              </p>
              <p class="text-sm">
                <span class="font-semibold">Publisher: </span>{{ selectedBook.publisher }}
              </p>
              <p class="text-sm">
                <span class="font-semibold">Tags: </span>{{ selectedBook.tags.join(', ') }}
              </p>
              <p class="mt-2 mb-2">Synopsis: <br> {{ selectedBook.description }}</p>
            <button class="bg-red mt-2 align-middle">
              Remove
            </button>
            </div>

            <button @click="closeModal" class="absolute top-2 right-2 text-white rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<script setup>
import { ref, onMounted } from 'vue';

const booksData = ref([]);
const selectedBook = ref(null);
const loading = ref(true);
const error = ref(null);

const getBooks = async () => {
  try {
    const response = await fetch('http://localhost:4000/books');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    booksData.value = data;
  } catch (err) {
    error.value = 'Failed to load books. Please try again later.';
    console.error('Fetch error:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getBooks();
});

const showBookDetails = (book) => {
  selectedBook.value = book;
};

const closeModal = () => {
  selectedBook.value = null;
};

const getStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
};
</script>
