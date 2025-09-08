<script setup lang="ts">
import { ref, onMounted } from "vue";
import Sidebar from "../components/Sidebar.vue";
import AlbumCard from "../components/AlbumCard.vue";
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

const router = useRouter();

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

const goHome = () => {
  router.push("/users");
};
</script>

<template>
  <div class="flex flex-row h-screen w-screen border bg-[#F5F5F5]">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <!-- Header with back button -->
      <header class="px-10 py-8 text-xl font-bold flex items-center gap-3">
        <button
          @click="goHome"
          class="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        >
          ⬅
        </button>
        <span>Go Home</span>
      </header>

      <!-- Scrollable grid -->
      <div
        class="grid grid-cols-3 gap-4 mt-4 place-items-center
               h-4/5 overflow-y-auto p-2 pl-5"
      >
        <!-- Album list -->
        <template v-if="!selectedAlbumId">
          <AlbumCard
            v-for="album in albums"
            :key="album.id"
            :album="album"
            @select="selectAlbum"
          />
        </template>

        <!-- Photo list -->
        <template v-else>
          <img
            v-for="photo in photos"
            :key="photo.id"
            :src="photo.thumbnailUrl"
            :alt="photo.title"
            class="w-40 h-40 object-cover rounded shadow"
          />
        </template>
      </div>
    </div>
  </div>
</template>
