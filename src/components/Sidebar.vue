<template>
    <div class="w-1/7  bg-[#F5F5F5] border border-[#D8D9DD] text-white flex flex-col py-8 ">
    <router-link 
      to="/userlist" 
      class="gap-2 flex flex-row mb-2 py-2 bg-white text-[#4F359B]  hover:bg-gray-600">    
      <div class="w-1 rounded-tr-[4px] rounded-br-[4px] bg-[#4F359B]"></div>
      <svg aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4F359B"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>

      Users
    </router-link>
  </div>
</template>
