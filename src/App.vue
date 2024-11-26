<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue';

export default defineComponent({
  name: "app",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  components: {
    RouterLink,
    RouterView,
  },
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
    <nav class="bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo
          <div class="flex items-center">
            <img alt="Vue logo" class="h-10 w-10 bg-white rounded-full p-1" src="@/assets/logo.svg" />
          </div> -->

          <!-- Desktop Menu -->
          <div class="hidden md:flex space-x-6">
            <RouterLink
              to="/"
              class="text-white hover:text-pink-200 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/add-book"
              class="text-white hover:text-pink-200 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
            >
              Add New Book
            </RouterLink>

            <RouterLink
              to="/detail-book"
              class="text-white hover:text-pink-200 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
            >
              Books Detail
            </RouterLink>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="toggleMenu"
              class="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-white/10 focus:outline-none transition-all duration-300"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  v-if="!isMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="isMenuOpen"
        class="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        @click="closeMenu"
      >
        <div class="fixed inset-y-0 right-0 max-w-xs w-full bg-gradient-to-b from-violet-600 to-indigo-700 shadow-lg transform transition-transform duration-300">
          <div class="flex flex-col h-full">
            <div class="px-4 py-6 space-y-4">
              <RouterLink
                to="/"
                class="block text-white hover:text-pink-200 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                @click="closeMenu"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/add-book"
                class="block text-white hover:text-pink-200 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                @click="closeMenu"
              >
                Add New Book
              </RouterLink>
              <RouterLink
                to="/detail-book"
                @click="closeMenu"
              >
                Book's Detail
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>

