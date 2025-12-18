<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add New Book</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block mb-1">Title</label>
        <input v-model="form.title" class="border rounded w-full px-3 py-2" required />
      </div>

      <div>
        <label class="block mb-1">Author</label>
        <input v-model="form.author" class="border rounded w-full px-3 py-2" required />
      </div>

      <div>
        <label class="block mb-1">ISBN</label>
        <input v-model="form.isbn" class="border rounded w-full px-3 py-2" required />
      </div>

      <div>
        <label class="block mb-1">Category</label>
        <input v-model="form.category" class="border rounded w-full px-3 py-2" />
      </div>

      <div>
        <label class="block mb-1">Total Copies</label>
        <input
          v-model.number="form.totalCopies"
          type="number"
          min="1"
          class="border rounded w-full px-3 py-2"
        />
      </div>

      <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const router = useRouter();

const form = reactive({
  title: '',
  author: '',
  isbn: '',
  category: '',
  totalCopies: 1,
});

const loading = ref(false);
const errorMsg = ref('');

const submit = async () => {
  try {
    loading.value = true;
    errorMsg.value = '';
    await $fetch(`${config.public.apiBase}/books`, {
      method: 'POST',
      body: form,
    });
    router.push('/books');
  } catch (err: any) {
    errorMsg.value = err?.data?.message || 'Failed to create book';
  } finally {
    loading.value = false;
  }
};
</script>
