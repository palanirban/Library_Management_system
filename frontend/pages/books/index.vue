<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Library Books</h1>

    <div class="flex gap-2 mb-4">
      <!-- placeholder for search -->
      <NuxtLink
        to="/books/addBook"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Book
      </NuxtLink>
    </div>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <table v-else class="w-full border" v-if="books.length">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Title</th>
          <th class="p-2 border">Author</th>
          <th class="p-2 border">ISBN</th>
          <th class="p-2 border">Available</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id" class="hover:bg-gray-50">
          <td class="p-2 border">{{ book.title }}</td>
          <td class="p-2 border">{{ book.author }}</td>
          <td class="p-2 border">{{ book.isbn }}</td>
          <td class="p-2 border">{{ book.availableCopies ?? book.available ?? 0 }}</td>
          <td class="p-2 border">
            <NuxtLink :to="`/books/${book.id}`" class="text-blue-600 mr-2">View</NuxtLink>
            <NuxtLink :to="`/books/${book.id}/edit`" class="text-green-600 mr-2">Edit</NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <div v-else-if="!pending" class="text-gray-600">No books found.</div> -->
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const config = useRuntimeConfig();

const books = ref<Array<any>>([]);
const pending = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  pending.value = true;
  error.value = null;
  try {
    const base = config.public?.apiBase || ''; // should be set in nuxt config
    const res = await axios.get(`${base}/books`);
    // axios returns data in res.data
    console.log('Fetched books:', res.data);
    books.value = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
  } catch (err: any) {
    console.error('Failed to fetch books', err);
    error.value = err?.response?.data?.message || err?.message || 'Error loading books';
  } finally {
    pending.value = false;
  }
});
</script>