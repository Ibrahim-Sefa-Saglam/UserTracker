<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import PostContentModal from '../components/PostContentModal.vue'
import Header from "../components/Header.vue";

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const router = useRouter()
const posts = ref<Post[]>([])

const showModal = ref(false)
const selectedPost = ref({
  id: 1,
  title: 'Sample Post',
  body: 'This is the body of the post...'
})

// fetch posts
onMounted(async () => {
  const selectedUserId = localStorage.getItem("selectedUserId")
  if (!selectedUserId) return

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}/posts`)
    posts.value = await res.json()
  } catch (err) {
    console.error("Failed to fetch posts:", err)
  }
})

// navigate back
const goHome = () => {
  router.push('/users')
}

// handle see more click (modal logic to be added later)
const seeMore = (post: Post) => {
  selectedPost.value = post
  showModal.value = true
}
</script>

<template>
  <div class="flex flex-row h-screen w-screen border bg-white">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header></Header>     

      <!-- Scrollable list -->
      <div class="flex flex-col mt-4 h-4/5 overflow-y-auto p-2 pl-5">
        <div 
          v-for="post in posts" 
          :key="post.id"
          class=" w-full p-4  mb-0 border-b border-gray-300  rounded-sm  relative "
        >
          <!-- Title -->
          <h3 class="font-semibold text-gray-900 mb-2">{{ post.title }}</h3>

          <!-- Body, max 3 lines -->
          <p class="mb-15  mt-5 text-gray-700 text-sm max-w-7/10 leading-snug line-clamp-3">
            {{ post.body }}
          </p>

          <!-- See more -->
          <div class="absolute bottom-2 right-2 flex items-center gap-1 text-[#4F359B] text-sm cursor-pointer"
               @click="seeMore(post)">
            <span>See more</span>
            <!-- Add your icon here -->
            <svg  xmlns="http://www.w3.org/2000/svg"  
                width="24"  height="24"  
                viewBox="0 0 24 24"  fill="none"  
                stroke="currentColor"  stroke-width="2"  
                stroke-linecap="round"  stroke-linejoin="round"  
                class="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 16l4 -4l-4 -4" /><path d="M8 12h8" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <PostContentModal 
    :post="selectedPost" 
    :show="showModal" 
    @close="showModal = false"
  />

</template>
