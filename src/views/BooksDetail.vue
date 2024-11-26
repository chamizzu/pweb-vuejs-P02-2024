<script>
export default {
  data() {
    return {
      isOverlayVisible: false,
    };
  },
  methods: {
    toggleOverlay() {
      this.isOverlayVisible = !this.isOverlayVisible;
    },
    closeOverlay() {
      this.isOverlayVisible = false;
    },
  },
};
</script>

<template>
  <div>
    <!-- Button to toggle overlay -->
    <button @click="toggleOverlay" class="px-4 py-2 bg-blue-500 text-white rounded">
      Toggle Overlay
    </button>

    <!-- Overlay -->
    <div 
      v-if="isOverlayVisible" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeOverlay"
    >
      <!-- Content inside the overlay -->
      <div 
        class="bg-white p-6 rounded shadow-lg text-center"
        @click.stop
      >
        <h2 class="text-xl font-bold mb-4">This is an Overlay</h2>
        <p class="mb-4">Click outside to close.</p>
        <button @click="closeOverlay" class="px-4 py-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>
