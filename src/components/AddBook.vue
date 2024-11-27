<template>
  <div class="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-gray-50" :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' , borderRadius: '15px' }">
    
    <!-- Lapisan hitam transparan hanya di belakang gambar -->
    <div class="absolute inset-0 bg-black opacity-50 z-0" style="border-radius: 15px;"></div>

    <form 
      @submit.prevent="submitForm" 
      class="w-full max-w-4xl p-6 bg-gray-100 rounded-lg shadow-lg z-10 relative"
    >
      <h1 class="text-3xl font-bold mb-6 text-center text-black">Create Book</h1>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-4">
          <label class="block text-black text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input 
            id="title"
            v-model="book.title"
            type="text" 
            placeholder="Enter book title"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="mb-4">
          <label class="block text- text-sm font-bold mb-2" for="author">
            Author
          </label>
          <input 
            id="author"
            v-model="book.author"
            type="text" 
            placeholder="Enter book author"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="publishedDate">
            Published Date
          </label>
          <input 
            id="publishedDate"
            v-model="book.publishedDate"
            type="date" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="publisher">
            Publisher
          </label>
          <input 
            id="publisher"
            v-model="book.publisher"
            type="text" 
            placeholder="Enter book publisher"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="col-span-2 mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Description
          </label>
          <textarea 
            id="description"
            v-model="book.description"
            placeholder="Enter book description"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            rows="4"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="coverImage">
            Cover Image URL
          </label>
          <input 
            id="coverImage"
            v-model="book.coverImage"
            type="url" 
            placeholder="Enter cover image URL"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="tags">
            Tags
          </label>
          <input 
            id="tags"
            v-model="book.tags"
            type="text" 
            placeholder="Enter tags (comma-separated)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="initialQty">
            Initial Quantity
          </label>
          <input 
            id="initialQty"
            v-model.number="book.initialQty"
            type="number" 
            min="0"
            placeholder="Enter initial quantity"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="qty">
            Current Quantity
          </label>
          <input 
            id="qty"
            v-model.number="book.qty"
            type="number" 
            min="0"
            placeholder="Enter current quantity"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="rating">
            Average Rating
          </label>
          <input 
            id="rating"
            v-model.number="book.rating.average"
            type="number" 
            step="0.1"
            min="0"
            max="5"
            placeholder="Enter average rating"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="ratingCount">
            Rating Count
          </label>
          <input 
            id="ratingCount"
            v-model.number="book.rating.count"
            type="number" 
            min="0"
            placeholder="Enter rating count"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <button 
          type="submit" 
          class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          Submit Book
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
        publishedDate: '',
        publisher: '',
        description: '',
        coverImage: '',
        tags: '',
        initialQty: 0,
        qty: 0,
        rating: {
          average: 0,
          count: 0
        }
      }
    };
  },
  methods: {
    submitForm() {
      // Prepare tags by splitting and trimming
      const processedTags = this.book.tags 
        ? this.book.tags.split(',').map(tag => tag.trim()) 
        : [];

      // Create a copy of book data with processed tags
      const bookData = {
        ...this.book,
        tags: processedTags
      };

      // Send data to API using Axios
      axios.post('http://localhost:4000/books', bookData)
        .then(response => {
          alert('Book created successfully!');
          this.resetForm();
        })
        .catch(error => {
          console.error('Error creating book:', error);
          alert('Failed to create book.');
        });
    },
    resetForm() {
      // Reset book object to initial state
      this.book = {
        title: '',
        author: '',
        publishedDate: '',
        publisher: '',
        description: '',
        coverImage: '',
        tags: '',
        initialQty: 0,
        qty: 0,
        rating: {
          average: 0,
          count: 0
        }
      };
    }
  }
};
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>