<template>
    <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
      Available Books
    </h1>

    <div v-if="loading" class="flex justify-center items-center z-50">
      <div class="loader"></div>
    </div>

    <div v-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <div v-if="!loading && !error" class="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="book in booksData" :key="book.id" class="mb-2">
        <a
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out"
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
              class="inline-flex items-center w-32 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer transition ease-in-out"
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
        
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          @click="selectedBook = null"
        >
        <button @click="closeModal" class="absolute top-2 right-2 text-white rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
        </button>
        <Transition name="scale" appear>
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

                <div class="flex mt-2">
                  <span class="bg-white text-yellow-400 text-sm  py-1 rounded w-40 text-center mb-2">
                    {{ getStarRating(selectedBook.rating.average) }} ({{ selectedBook.rating.count }} reviews)
                  </span>
                  <span class="text-sm px-3 py-1">
                    Stock: {{ selectedBook.qty }} pcs
                  </span>
                </div>

                <span class="font-semibold">Author: </span>{{ selectedBook.author }}

              <p class="text-sm">
                <span class="font-semibold">Published Date: </span>{{ selectedBook.publishedDate }}
              </p>
              <p class="text-sm">
                <span class="font-semibold">Publisher: </span>{{ selectedBook.publisher }}
              </p>
              <p class="text-sm">
                <span class="font-semibold">Tags: </span>{{ selectedBook.tags.join(', ') }}
              </p>
              <p class="mt-2 mb-2 text-sm">Synopsis: <br> {{ selectedBook.description }}</p>

                <button @click="removebook(selectedBook._id)" class="mt-2 align-middle bg-red-500 p-2 rounded relative bottom-0 hover:bg-red-900 transition ease-in-out">
                Remove
              </button>
            </div>

          </div>
        </Transition>
        </div>
      
      </div>
   

      <div v-if="BookDeleted" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="text-2xl font-bold text-black text-center bg-white p-10 rounded">
          <h2 class="mb-6">Book Successfully Deleted</h2>
          <div class="animation-container mr-4">
          <div class="loader2"></div>
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path class="checkmark-check" fill="none" d="M14 27l10 10 14-22" />
          </svg>
        </div>
        </div>    
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

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease-out;
}

.scale-enter-from {
  transform: scale(0);
}

.scale-enter-to {
  transform: scale(1);
}

.scale-leave-from {
  transform: scale(1);
}

.scale-leave-to {
  transform: scale(0);
}

@keyframes spin {
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
}

.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.loader2 {
  position: absolute;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spinToX 2s linear forwards, fadeOut 2s linear forwards;
}

.checkmark {
  width: 52px;
  height: 52px;
  stroke: #4caf50;
  stroke-width: 2;
  opacity: 0;
  animation: fadeIn 0.5s linear 2s forwards;
}

.checkmark-circle {
  stroke-dasharray: 157;
  stroke-dashoffset: 157;
  stroke-linecap: round;
  animation: circle-animation 0.5s ease-out 2s forwards;
}

.checkmark-check {
  stroke-dasharray: 36;
  stroke-dashoffset: 36;
  stroke-linecap: round;
  animation: check-animation 0.3s ease-out 2.5s forwards;
}

@keyframes spinToX {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes circle-animation {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes check-animation {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const booksData = ref([]);
const selectedBook = ref(null);
const loading = ref(true);
const error = ref(null);
const BookDeleted = ref(null);

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
  setTimeout(() => {
    selectedBook.value = book;
  }, 50);
};

const closeModal = () => {
  selectedBook.value = null;
};


const getStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
};

const removebook = (bookid) => {
  axios.delete(`http://localhost:4000/books/${bookid}`)
  .then(response => {
    BookDeleted.value = true;
    selectedBook.value = null;
    setTimeout(() => {
      BookDeleted.value = false;
      getBooks();
    }, 3000);
  })
  .catch(error => {
    console.error('Error removing book:', error);
    alert('Failed to remove book.');
  });
}
</script>
