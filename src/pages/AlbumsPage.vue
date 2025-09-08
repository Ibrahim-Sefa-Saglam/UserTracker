<script setup lang="ts">
import { ref, onMounted } from "vue";
import Sidebar from "../components/Sidebar.vue";
import AlbumCard from "../components/AlbumCard.vue";
import Header from "../components/Header.vue";
import { useRouter } from "vue-router";

interface Album {
  id: number;
  title: string;
  userId: number;
}
interface Photo {
  id: number;
  url: string;
  thumbnailUrl: string;
  title: string;
}

const albums = ref<Album[]>([]);
const photos = ref<Photo[]>([]);
const selectedAlbumId = ref<number | null>(null);

onMounted(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums");
  albums.value = await res.json();
});

const selectAlbum = async (albumId: number) => {
  selectedAlbumId.value = albumId;
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  photos.value = await res.json();
};


</script>

<template>
  <div class="flex flex-row h-screen w-screen border bg-[#F5F5F5]">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <template v-if="!selectedAlbumId">
        <Header/>
      </template>
      <template v-else>
        <header class="px-10 py-8 text-xl font-bold flex items-center gap-2">
          <button 
            class="px-1 border border-black border-2 text-white rounded-[15px] hover:border-purple-800 transition flex items-center justify-center"
            @click="selectedAlbumId = null"
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
          <span class="ml-4">Go Albums</span>
        </header>
      </template>
 

   <!-- Conditional container -->
<template v-if="!selectedAlbumId">
  <div class="grid grid-cols-3 gap-4 mt-4 place-items-center h-4/5 overflow-y-auto p-2 pl-5">
    <AlbumCard
      v-for="album in albums"
      :key="album.id"
      :album="album"
      @select="selectAlbum"
    />
  </div>
</template>

<template v-else>
  <div class="flex flex-wrap gap-4 mt-4 h-4/5 overflow-y-auto p-2 pl-5">
    <img
      v-for="photo in photos"
      :key="photo.id"
      src="https://picsum.photos/200"
      :alt="photo.title"
      class="w-40 h-40 object-cover rounded shadow"
    />
  </div>
</template>
    </div>
  </div>
</template>
