<template>
  <div>
    <h1 v-if="booksData.length === 0">No books available</h1>
    <div v-for="book in booksData">
      <h1>{{ book.title }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const booksData = ref([]);

const getBooks = async () => {
  try {
    const response = await fetch('http://localhost:4000/books');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    booksData.value = data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

onMounted(() => {
  getBooks();
});
</script>