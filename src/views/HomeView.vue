<script lang="ts">
import CardBook from '../components/CardBook.vue';

interface BookObject {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  publishedDate: string;
  initialQty: number;
  qty: number;
  publisher: string;
}

export default {
  name: "HomeView",
  data : () => ({
    booksData: [] as BookObject[],
    fetchError: false,
  }),
  async mounted() {
    try {
      const response = await fetch("http://localhost:4000/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books data");
      }
      const data = await response.json();
      this.booksData = [...data.data];
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    }
  },
  components: {
    CardBook,
  },
};

</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Available Books</h1>

    <!-- Error Message -->
    <div v-if="fetchError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      Failed to load books. Please try again later.
    </div>

    <!-- Loading State -->
    <div v-if="booksData.length === 0 && !fetchError" class="text-center py-8">
      <p class="text-gray-600">Loading books...</p>
    </div>

    <!-- Books Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CardBook
        v-for="book in booksData"
        :key="book._id"
        :book="book"
      />
    </div>
  </main>
</template>
