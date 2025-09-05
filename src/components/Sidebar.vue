<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const section = computed(() => {
  const parts = route.path.split("/");
  return parts[1] || ""; // e.g. /todos/1 -> "todos"
});

const navItems = [
  { name: "todos", label: "Todos" },
  { name: "posts", label: "Posts" },
  { name: "albums", label: "Albums" },
];
</script>

<template>
  <div class="w-1/7 bg-[#F5F5F5] border border-[#D8D9DD] flex flex-col py-8">
    <!-- USERS PAGE -->
    <template v-if="section === 'users'">
      <router-link
        to="/users"
        class="gap-2 flex flex-row mb-2 py-2 px-2 items-center 
              bg-white text-[#4F359B] hover:bg-gray-600 rounded"
      >
        <div class="w-1 h-full rounded-tr-[4px] rounded-br-[4px] bg-[#4F359B]"></div>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4F359B"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        </svg>
        <span>Users</span>
      </router-link>
    </template>

    <!-- TODOS / POSTS / ALBUMS PAGES -->
    <template v-else> 
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="`/${item.name}`"
        class="gap-2 flex flex-row mb-2 py-2 px-2 items-center rounded transition"
        :class="section === item.name 
          ? 'bg-white text-[#4F359B]' 
          : 'text-gray-500 hover:text-[#4F359B] hover:bg-gray-200'"
      >
        <div
          v-if="section === item.name"
          class="w-1 h-full rounded-tr-[4px] rounded-br-[4px] bg-[#4F359B]"
        ></div>
        <span>{{ item.label }}</span>
      </router-link>
    </template>
  </div>
</template>
