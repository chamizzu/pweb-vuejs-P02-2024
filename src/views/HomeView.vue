<template>
  <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">Available Books</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="book in booksData" :key="book.id" class="mb-2">
      <a
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
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


  <div v-if="selectedBook">
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="selectedBook = null">
      <div class="bg-cyan-800 p-6 rounded shadow-lg text-center" @click.stop>
        <img class="object-cover w-full rounded-t-lg h-96 " :src="selectedBook.coverImage" alt="">
        <h2 class="text-xl font-bold mb-4">{{ selectedBook.title }}</h2>
        <p class="mb-4">{{ selectedBook.description }}</p>
        <button @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const booksData = ref([]);
const selectedBook = ref(null);

const getBooks = async () => {
  try {
    const response = await fetch('http://localhost:4000/books');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    booksData.value = data;
  } catch (error) {
    console.error('Fetch error:', error);
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

</script>
