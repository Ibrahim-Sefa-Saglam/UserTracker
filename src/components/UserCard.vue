<template>
  <div class="p-4 border rounded shadow hover:shadow-lg transition">
    <h2 class="font-semibold">{{ user.name }}</h2>
    <p class="text-sm text-gray-600">{{ user.email }}</p>
    <p class="text-sm text-gray-500">(@{{ user.username }})</p>
  </div>
</template>

<script lang="ts" setup>
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

defineProps<{ user: User }>();
</script>
