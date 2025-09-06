<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

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
const expandedComments = ref<number[]>([]) // ids of expanded comments

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

const toggleCommentExpand = (commentId: number) => {
  if (expandedComments.value.includes(commentId)) {
    expandedComments.value = expandedComments.value.filter(id => id !== commentId)
  } else {
    expandedComments.value.push(commentId)
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-[#4D4D4D74] bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white w-4/5 h-4/5 rounded-lg shadow-lg flex flex-col">
      
      <!-- Header 7% -->
      <div class="flex justify-between items-start px-6 py-2 h-[7%] border-b">
        <h2 class="text-lg font-bold">{{ post.title }}</h2>
        <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900 font-bold">x</button>
      </div>

      <!-- Main content 93% -->
      <div class="flex flex-row h-[93%]">
        
        <!-- Post body 5/9 -->
        <div class="w-5/9 p-4 overflow-y-auto border-r">
          <p class="text-gray-800 whitespace-pre-wrap">{{ post.body }}</p>
        </div>

        <!-- Comments 4/9 -->
        <div class="w-4/9 p-4 flex flex-col overflow-y-auto">
          <h3 class="font-semibold mb-4">Comments</h3>
          
          <div v-for="comment in comments" :key="comment.id" class="flex flex-row mb-4 border p-2 rounded-sm relative">
            <!-- Profile picture 1/5 -->
            <div class="w-1/5 flex flex-col items-center">
              <img src="https://placekitten.com/40/40" alt="profile" class="w-10 h-10 rounded-full object-cover mb-1" />
              <button 
                v-if="comment.body.length > 100"
                class="text-xs text-blue-500 mt-1"
                @click="toggleCommentExpand(comment.id)"
              >
                {{ expandedComments.includes(comment.id) ? 'Collapse' : 'Expand' }}
              </button>
            </div>

            <!-- Comment content 4/5 -->
            <div 
              class="w-4/5 pl-2 overflow-hidden"
              :style="{ maxHeight: expandedComments.includes(comment.id) ? 'none' : '33%' }"
            >
              <p class="font-semibold text-gray-700">{{ comment.name }}</p>
              <p class="text-gray-600 text-sm whitespace-pre-wrap">{{ comment.body }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
