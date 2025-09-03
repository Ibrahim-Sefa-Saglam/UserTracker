<template>
  <div class="p-4 border border-[#DADADBFF] bg-white w-[95%] h-auto rounded-[15px] shadow hover:shadow-lg/20 transition ">
    <!-- User Photo -->
    <div class="flex flex-column">
      <img 
        src="https://via.placeholder.com/80" 
        alt="User Photo" 
        class="w-20 h-20  rounded-full object-cover border"
      />
      <div class=" px-5 ">
        <h2 class="font-semibold text-lg">{{ user.name }}</h2>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
        <p class="text-sm text-gray-600">{{ user.phone }}</p>
      </div>

    </div>

    <!-- User Info -->
    <div class="mt-4 ml-4 flex flex-col justify-center space-y-1">


      <p class="text-sm font-[500] flex gap-3">
        <svg aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
        </svg>
        Location
      </p>
      <p class="text-sm font-[300]">
        {{ user.address.street }}<br>
        {{ user.address.city }}
      </p>

      <p class="text-sm font-[500] flex gap-3">
      
      <svg aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 21l18 0" />
        <path d="M9 8l1 0" />
        <path d="M9 12l1 0" />
        <path d="M9 16l1 0" />
        <path d="M14 8l1 0" />
        <path d="M14 12l1 0" />
        <path d="M14 16l1 0" />
        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
      </svg>

        Company location
      </p>
       <p class="text-sm font-[300]">
        {{ user.address.street }}<br>
        {{ user.address.city }}
      </p>

      <p class="text-sm font-[500] flex gap-3">
  
      <svg aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
        <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" />
        <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
        <path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" />
        <path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
        <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4" />
        <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" />
        <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
        <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />
      </svg>

        Website
      </p>
      <p class="text-sm font-[300]">
        <a :href="'https://' + user.website" target="_blank">{{ user.website }}</a>
      </p>

      <p class="text-sm text-gray-500">
      </p>
      <p class="text-sm text-blue-600">
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

defineProps<{ user: User }>();
</script>
