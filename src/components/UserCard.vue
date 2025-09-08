<template>
  <div 
    class="p-4 border border-[#DADADBFF] bg-white w-[95%] h-auto rounded-[15px] shadow hover:shadow-lg/20 transition cursor-pointer"
    @click="goToTodos"
  >
    <!-- User Photo -->
    <div class="flex flex-row items-center gap-4">
      <img 
        src="https://picsum.photos/80 " 
        alt="User Photo" 
        class="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h2 class="font-poppins font-semibold text-lg">{{ user.name }}</h2>
        <p class="font-poppins text-sm text-gray-600">{{ user.email }}</p>
        <p class="font-poppins text-sm text-gray-600">{{ user.phone }}</p>
      </div>
    </div>

    <!-- User Info -->
    <div class="mt-4 ml-4 flex flex-col justify-center space-y-1">
      <p class="font-poppins text-sm font-medium flex gap-3">
        Location
      </p>
      <p class="font-poppins text-sm font-light">
        {{ user.address.street }}<br>
        {{ user.address.city }}
      </p>

      <p class="font-poppins text-sm font-medium flex gap-3">
        Company location
      </p>
      <p class="font-poppins text-sm font-light">
        {{ user.address.street }}<br>
        {{ user.address.city }}
      </p>

      <p class="font-poppins text-sm font-medium flex gap-3">
        Website
      </p>
      <p class="font-poppins text-sm font-light">
        <a :href="'https://' + user.website" target="_blank">{{ user.website }}</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

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

const props = defineProps<{ user: User }>();

const router = useRouter();


const goToTodos = () => {
  // store user id
  localStorage.setItem("selectedUserId", String(props.user.id));
  // store placeholder profile picture  
  // logging for debug
  console.log("Selected User ID:", localStorage.getItem("selectedUserId"));
  // navigate
  router.push({ name: "Todos" });
};
</script>
