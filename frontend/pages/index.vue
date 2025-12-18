<template>
    <Loader v-if="isloading" />
    <div
        class="bg-white dark:bg-gray-800 text-slate-900 dark:text-white font-display overflow-hidden">
        <div class="flex h-screen w-full">
            <!-- Side Navigation -->
            <div
                class="hidden md:flex flex-col w-64 h-full bg-card-light dark:bg-gray-700 border-r border-gray-400 dark:border-[#282b39] shrink-0">
                <div class="p-6 flex items-center gap-3">
                    <div class="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-primary flex items-center justify-center text-white"
                        data-alt="Library Logo Abstract">
                        <img src="../assets/image/logo.svg" alt="">
                    </div>
                    <h1 class="text-xl font-bold tracking-tight">Library Management</h1>
                </div>
                <div class="px-4 py-2 flex flex-col gap-2 flex-1 overflow-y-auto">
                    <a class="flex items-center gap-3 px-4 py-3 rounded-full bg-primary text-white shadow-md shadow-primary/30 transition-all"
                        href="#">
                        <img src="../assets/image/dashboard.svg" alt="">
                        <span class="text-sm font-medium">Dashboard</span>
                    </a>
                    <a class="flex items-center gap-3 px-4 py-3 rounded-full text-slate-600 dark:text-text-secondary hover:bg-slate-100 dark:hover:bg-[#282b39] transition-all"
                        href="#">
                        <img src="../assets/image/books.svg" alt="">
                        <span class="text-sm font-medium">Books</span>
                    </a>
                    <a class="flex items-center gap-3 px-4 py-3 rounded-full text-slate-600 dark:text-text-secondary hover:bg-slate-100 dark:hover:bg-[#282b39] transition-all"
                        href="#">
                        <img src="../assets/image/member.svg" alt="">
                        <span class="text-sm font-medium">Members</span>
                    </a>
                </div>
                <div class="p-4 border-t border-slate-200 dark:border-[#282b39]">
                    <div class="flex items-center gap-3 px-2 py-2">
                        <div class="bg-center bg-no-repeat bg-cover rounded-full size-10"
                            data-alt="Librarian profile picture"
                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgqSQow_uJN7dTHnwCZ-rlEgUVGXzgBGtVbAKSoXVQx6yDC-K4p1ClVhE1UTBYrrnyC7m0jdLKTmVNWpiYURdV333am4Z40EVqikaDnHY1yv8hS95qHUZ-fqRLFda2hkL0OTZsPloVQUJuSg-cxamUnm_fUJyKwg2OCE4q71EWAIrfznjtfS1oKmJfpE3cp6rbh3EyGnGe1SGfQ9-XOLOI3PAXrD76-fR421YuMgqBv-Z99BRoOhpK3iWzGjuEAJ1D-37Ux2oSPkU");'>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-900 dark:text-white">Jane Doe</p>
                            <p class="text-xs text-text-secondary">Head Librarian</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Main Content -->
            <main class="flex-1 flex flex-col h-full overflow-hidden relative">
                <!-- Top Header & Search -->
                <header
                    class="w-full px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                    <div class="flex flex-col gap-1">
                        <h2 class="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">Good
                            Morning, Jane</h2>
                        <p class="text-sm text-text-secondary">Here is what's happening in the library today.</p>
                    </div>
                    <div class="w-full md:w-96">
                        <label
                            class="flex gap-2 items-center w-full h-12 rounded-full bg-white dark:bg-gray-700 border border-slate-200 dark:border-none shadow-sm px-4 focus-within:ring-2 focus-within:ring-primary transition-all">
                            <img src="../assets/image/search.svg" alt="">
                            <input
                                class="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-text-secondary dark:text-white"
                                placeholder="Search book title, ISBN, or member..." type="text" />
                        </label>
                    </div>
                </header>
                <!-- Scrollable Content -->
                <div class="flex-1 overflow-y-auto px-6 pb-6">
                    <div class="max-w-7xl mx-auto flex flex-col gap-6">
                        <!-- Stats Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <!-- Total Books -->
                            <div
                                class="bg-white dark:bg-gray-700 rounded-xl p-5 flex flex-col justify-between h-40 shadow-sm border border-slate-100 dark:border-none relative overflow-hidden">
                                <div
                                    class="absolute right-0 top-0 p-4 opacity-5 dark:opacity-10 transition-transform group-hover:scale-110">
                                    <span
                                        class="material-symbols-outlined text-[100px] leading-none text-primary">library_books</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="bg-primary/10 p-2 rounded-lg text-primary">
                                        <span class="material-symbols-outlined">inventory_2</span>
                                    </div>
                                    <p class="text-sm font-medium text-text-secondary">Total Books</p>
                                </div>
                                <div>
                                    <p class="text-3xl font-bold text-slate-900 dark:text-white">12,450</p>
                                </div>
                            </div>
                            <!-- Available -->
                            <div
                                class="bg-white dark:bg-gray-700 rounded-xl p-5 flex flex-col justify-between h-40 shadow-sm border border-slate-100 dark:border-none relative overflow-hidden group">
                                <div
                                    class="absolute right-0 top-0 p-4 opacity-5 dark:opacity-10 transition-transform group-hover:scale-110">
                                    <span
                                        class="material-symbols-outlined text-[100px] leading-none text-white">check_circle</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="bg-blue-500/10 p-2 rounded-lg text-blue-500">
                                        <span class="material-symbols-outlined">check_circle</span>
                                    </div>
                                    <p class="text-sm font-medium text-text-secondary">Available</p>
                                </div>
                                <div>
                                    <p class="text-3xl font-bold text-slate-900 dark:text-white">10,128</p>
                                </div>
                            </div>
                            <!-- Borrowed -->
                            <div
                                class="bg-white dark:bg-gray-700 rounded-xl p-5 flex flex-col justify-between h-40 shadow-sm border border-slate-100 dark:border-none relative overflow-hidden group">
                                <div
                                    class="absolute right-0 top-0 p-4 opacity-5 dark:opacity-10 transition-transform group-hover:scale-110">
                                    <span
                                        class="material-symbols-outlined text-[100px] leading-none text-orange-400">bookmark</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="bg-orange-500/10 p-2 rounded-lg text-orange-500">
                                        <span class="material-symbols-outlined">bookmark</span>
                                    </div>
                                    <p class="text-sm font-medium text-text-secondary">Borrowed</p>
                                </div>
                                <div>
                                    <p class="text-3xl font-bold text-slate-900 dark:text-white">2,310</p>
                                </div>
                            </div>
                            <!-- Overdue -->
                            <div
                                class="bg-white dark:bg-gray-700 rounded-xl p-5 flex flex-col justify-between h-40 shadow-sm border border-slate-100 dark:border-none relative overflow-hidden group">
                                <div
                                    class="absolute right-0 top-0 p-4 opacity-5 dark:opacity-10 transition-transform group-hover:scale-110">
                                    <span
                                        class="material-symbols-outlined text-[100px] leading-none text-red-500">warning</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="bg-red-500/10 p-2 rounded-lg text-red-500">
                                        <span class="material-symbols-outlined">warning</span>
                                    </div>
                                    <p class="text-sm font-medium text-text-secondary">Overdue Returns</p>
                                </div>
                                <div>
                                    <p class="text-3xl font-bold text-slate-900 dark:text-white">12</p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-slate-100 dark:border-none overflow-hidden">
                            <div
                                class="p-6 border-b border-slate-100 dark:border-[#282b39] flex flex-row justify-between items-center">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                                <div @click="showBookModal" class="border border-slate-200 px-4 py-2 rounded-full cursor-pointer hover:shadow-md hover:border-slate-300 transition-all">   
                                    <button
                                        class="bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 cursor-pointer">+ Add Books</button>
                                </div>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-sm">
                                    <thead
                                        class="bg-slate-50 dark:bg-[#1a1d2e] text-text-secondary uppercase text-xs font-bold tracking-wider">
                                        <tr>
                                            <th class="px-6 py-4">Book Title</th>
                                            <th class="px-6 py-4">Member</th>
                                            <th class="px-6 py-4">Category</th>
                                            <th class="px-6 py-4">isBN</th>
                                            <th class="px-6 py-4">TotalCopies</th>
                                            <th class="px-6 py-4">AvailableCopies</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="bookdata in books" :key="bookdata.id" class="divide-y divide-slate-100 dark:divide-[#282b39]">
                                        <tr class="hover:bg-slate-50 dark:hover:bg-[#282b39]/50 transition-colors">
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-3">
                                                    <div class="size-10 rounded bg-slate-200 dark:bg-slate-700 bg-cover bg-center shrink-0"
                                                        data-alt="The Great Gatsby book cover"
                                                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbmOgGmlypd9Mir0yFfWIpuLgBwTCvawyr6IVaFP-zHSHo4K4r112W8-pVWDqgJQBtTpnyjK5p4gBCI8OP3BP7N_dr-LT3ywXOnIIHDGBRZp9cQTNmHUYdsysqWxrUxH0w6WVhkHFl0IzyWvrwdl9qkLk4o1FaawoDMiH_14txK-oRYI2H33dyzWkX3YfK1FrysvTS0ub98yuptozrU_4BJneUJkYUNjMHnl-K_U6Gbg5YYbij5NfaeFflSTHjmd3u6MD7fFKDbT8')">
                                                    </div>
                                                    <span class="font-medium text-slate-900 dark:text-white">{{ bookdata.title }}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-2">
                                                    <div class="size-6 rounded-full bg-slate-300 dark:bg-slate-600 bg-cover bg-center"
                                                        data-alt="Member portrait"
                                                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBV2baPwZdiv2y2qaSkf3zfpWouITTv_HLD9RelriN69j5lDL4ae3J_1T91EmfInfEJj1qCG8SE4cc7BkxSqL-Wy5vBjhT7QodhaWu0h-3biEBNl3T5OkcFwtEkcWl2x_kONWSk5CeE9Hy63WTkv8PBXUAEb9gssK6qXq9SWkIjbOjB4Zqu-XJKqojRedaVUgB7wK6y9S-vFPavC6yAPLdJqrevFTYX2s0XEJI4VvwOqaac6w_Twhq4yrxSbDX72wLEjmaX0N3kOpE')">
                                                    </div>
                                                    <span class="text-slate-600 dark:text-slate-300">{{ bookdata.author }}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-slate-600 dark:text-slate-300">{{ bookdata.category }}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-slate-600 dark:text-slate-300">{{ bookdata.isbn }}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-slate-600 dark:text-slate-300">{{ bookdata.totalCopies }}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-2">
                                                    <span class="text-slate-600 dark:text-slate-300">{{ bookdata.availableCopies }}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-2">
                                                <button class="bg-blue-300 text-white p-2 rounded-md cursor-pointer">Edit</button>
                                                <button @click="RemoveBooks(bookdata.id)" class="bg-red-500 text-white p-2 rounded-md cursor-pointer">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
<AddBookModal v-if="showAddBookModal" @close="closeBookModal" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const config = useRuntimeConfig();

const books = ref([]);
const isloading = ref(false);
const showAddBookModal = ref(false);
const error = ref(null);

function showBookModal() {
    showAddBookModal.value = true;
}

async function closeBookModal() {
    showAddBookModal.value = false;
    try {
        isloading.value = true;
        const base = config.public?.apiBase || '';
        const res = await axios.get(`${base}/books`);
        books.value = res.data;
    }
    catch (err: any) {
        console.error('Failed to fetch books', err);
        error.value = err?.response?.data?.message || err?.message || 'Error loading books';
    }
    finally {
        isloading.value = false;
    }
}

const RemoveBooks = async (bookid) => {
    const base = config.public?.apiBase || '';
    try {
        isloading.value = true;
        const bookID = bookid;
        console.log("Deleting book with ID:", bookID); 
        await axios.delete(`${base}/books/${bookID}`);
        console.log('Book deleted successfully');
    }
    catch (error) {
        console.error('Error deleting book:', error);
    }
    finally {
        const res = await axios.get(`${base}/books`);
        books.value = res.data;
        isloading.value = false;
    }
}

onMounted(async () => {
    try {
        isloading.value = true;
        const base = config.public?.apiBase || '';
        const res = await axios.get(`${base}/books`);
        books.value = res.data;
        console.log('Fetched books:', books.value);
  } catch (err: any) {
    console.error('Failed to fetch books', err);
    error.value = err?.response?.data?.message || err?.message || 'Error loading books';
  } finally {
    isloading.value = false;
  }
});
</script>