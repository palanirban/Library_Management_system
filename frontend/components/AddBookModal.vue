<template>
    <Loader v-if="isloading" />
    <div class="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
        <div class="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 class="text-xl font-bold mb-4">Add New Book</h2>
            <form @submit.prevent="saveBook">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="title">Title</label>
                    <input v-model="title" type="text" id="title"
                        class="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="author">Author</label>
                    <input v-model="author" type="text" id="author"
                        class="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="isbn">ISBN</label>
                    <input v-model="isbn" type="text" id="isbn" class="w-full border border-gray-300 rounded px-3 py-2"
                        required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="isbn">Category</label>
                    <input v-model="category" type="text" id="isbn" class="w-full border border-gray-300 rounded px-3 py-2"
                        required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="availableCopies">Available Copies</label>
                    <input v-model="availableCopies" type="number" id="availableCopies"
                        class="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div class="flex justify-end gap-2">
                    <button @click="closeModal" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Add Book</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
const title = ref('');
const author = ref('');
const isbn = ref('');
const category = ref('');
const availableCopies = ref(1);
const isloading = ref(false);
import axios from 'axios';


const saveBook = async () => {
    const config = useRuntimeConfig();
    const base = config.public?.apiBase || '';
    try {
        isloading.value = true;
        console.log("book title:", title.value);
        const res = await axios.post(`${base}/books`, {title: title.value, author: author.value, isbn: isbn.value, category: category.value, availableCopies: availableCopies.value});
        console.log('Book added successfully:', res.data);
    }
    catch (error) {
        console.error('Error adding book:', error);
    }
    finally {
        isloading.value = false;
        closeModal();
    }
}


const emit = defineEmits(['close']);
const closeModal = () => emit('close');

</script>