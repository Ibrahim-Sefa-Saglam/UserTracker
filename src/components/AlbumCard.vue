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
    class="p-2 border rounded shadow hover:shadow-lg transition cursor-pointer"
    @click="emit('select', props.album.id)"
  >
    <div class="grid grid-cols-2 gap-1">
      <img
        v-for="(thumb, idx) in thumbnails"
        :key="idx"
        :src="thumb.thumbnailUrl"
        class="w-20 h-20 object-cover rounded"
      />
    </div>
    <p class="mt-2 text-center text-sm font-medium">{{ props.album.title }}</p>
  </div>
</template>
