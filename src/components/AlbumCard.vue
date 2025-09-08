<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Album {
  id: number;
  title: string;
  userId: number;
}

interface Photo {
  thumbnailUrl: string;
}

const props = defineProps<{ album: Album }>();
const emit = defineEmits<{(e: "select", albumId: number): void}>();
const thumbnails = ref<Photo[]>([]);

onMounted(async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${props.album.id}/photos`);
  const data: Photo[] = await res.json();
  thumbnails.value = data.slice(0, 4); // only first 4
});
</script>

<template>
  <div
    class="border border-[#D8D9DD] rounded rounded-xl shadow hover:shadow-lg transition cursor-pointer w-full h-full flex flex-col"
    @click="emit('select', props.album.id)"
  >
  
    <div class="grid grid-cols-2 overflow-hidden  rounded rounded-xl">
      <img
        v-for="(thumb, idx) in thumbnails"
        :key="idx"
        src="https://picsum.photos/200 " 
        class="w-full h-full object-cover "
      />
    </div>
    <p class="mt-2 text-center text-sm font-poppins font-regular text-left py-5 pl-2">{{ props.album.title }}</p>
  </div>
</template>
