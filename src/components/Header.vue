<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/users");
};
</script>

<template>
  <header class="px-10 py-8 text-xl font-bold flex items-center gap-2">
    <button
      class="px-1 border border-black border-2 text-white rounded-[15px] hover:border-purple-800 transition flex items-center justify-center"
      @click="goHome"
    >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 14l-4 -4l4 -4" />
          <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
        </svg>
    </button>

    <span class="ml-10 font-poppins font-regular">Go Home</span>
  </header>
</template>
