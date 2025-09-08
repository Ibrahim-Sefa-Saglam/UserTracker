<script setup lang="ts">
import { ref, watch } from 'vue'

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const props = defineProps<{
  post: { id: number; title: string; body: string }
  show: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const comments = ref<Comment[]>([])

// Fetch comments when modal is shown or post changes
watch(
  () => props.show,
  async (val) => {
    if (val && props.post) {    
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${props.post.id}/comments`)
        comments.value = await res.json()
      } catch (err) {
        console.error("Failed to fetch comments:", err)
      }
    }
  }
)
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-[#4D4D4D74] flex items-center justify-center z-50">
    <div class="bg-white w-4/5 h-4/5 rounded-[20px] shadow-lg flex flex-col p-5">
      
      <!-- Header 7% -->
      <div class="flex justify-between items-start px-6 py-2 h-[7%] ">
        <h2 class="text-2xl  font-bold">{{ post.title }}</h2>
        <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900 font-bold">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
        </button>
      </div>

      <!-- Main content 93% -->
      <div class="flex flex-row h-[93%] mt-5">
        
        <!-- Post body 5/9 -->
        <div class="w-[60%] p-4 overflow-y-auto border-r border-r-[#5C6672] pl-10">
          <p class="text-gray-800 whitespace-pre-wrap">{{ post.body }}</p>
        </div>

        <!-- Comments 4/9 -->
        <div class="px-4 pb-8 flex flex-col overflow-y-auto">
          <h1 class="font-semibold text-2xl mb-4">Comments</h1>
          
          <div v-for="comment in comments" :key="comment.id" class="flex flex-row py-2 rounded-sm">
            <!-- Profile picture 1/5 -->
            <div class="w-1/8 flex flex-col items-center ">
              <img src="https://picsum.photos/80" alt="profile" class="w-10 h-10 rounded-full object-cover mb-1" />
            </div>

            <!-- Comment content 4/5 -->
            <div class=" pl-2">
              <p class="font-semibold text-gray-700">{{ comment.name }}</p>
              <p class="text-gray-600 text-sm whitespace-pre-wrap">{{ comment.body }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
