<template>
  <div class="flex flex-row h-screen w-screen border bg-[#FFFFFF] ">
    <Sidebar />

    <div class="flex-1 flex flex-col">  
      <header class="px-10 py-8 text-xl font-bold">All Users</header>
      
      <!-- Scrollable grid -->
      <div class="grid grid-cols-3 gap-4 mt-4 place-items-center
                  h-4/5 overflow-y-auto p-2 pl-5">
         <UserCard v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import UserCard from "../components/UserCard.vue";
import Sidebar from "../components/Sidebar.vue";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  company: { name: string; catchPhrase: string; bs: string };
}

const users = ref<User[]>([]);

onMounted(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  users.value = await res.json();
});
</script>
