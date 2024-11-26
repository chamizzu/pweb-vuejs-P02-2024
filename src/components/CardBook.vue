<script lang="ts">
import { RouterLink } from 'vue-router';
import type { PropType } from 'vue';

export interface BookObject {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  tags: string[];
  initialQty: number;
  qty: number;
  publisher: string;
}

export default {
  name: "CardBook",
  components: {
    RouterLink,
  },
  props: {
    book: {
      type: Object as PropType<BookObject>,
      required: true,
    },
  },
  methods: {
    getReadMoreLink(id: string) {
      return `/detail/${id}`;
    },
  },
};

</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <div class="flex flex-col h-full">
      <div class="mb-2">
        <span class="text-sm text-gray-500">Published: {{ book.publishedDate }}</span>
      </div>

      <h2 class="text-xl font-semibold mb-2">{{ book.title }}</h2>
      <p class="text-gray-600 mb-2">Author: {{ book.author }}</p>

      <div class="mb-2">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="tag in book.tags"
            :key="tag"
            class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <div class="text-gray-600 mt-auto">
        <p>Quantity: {{ book.qty }}/{{ book.initialQty }}</p>
      </div>

      <RouterLink
        :to="getReadMoreLink(book._id)"
        class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Read More
      </RouterLink>
    </div>
  </div>
</template>
