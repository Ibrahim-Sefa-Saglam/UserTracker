<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const router = useRouter()
const todos = ref<Todo[]>([])

// fetch todos when component mounts
onMounted(async () => {
  const selectedUserId = localStorage.getItem("selectedUserId")
  if (!selectedUserId) return

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}/todos`)
    todos.value = await res.json()
  } catch (err) {
    console.error("Failed to fetch todos:", err)
  }
})

// navigate back to /users
const goHome = () => {
  router.push('/users')
}

const toggleTodo = async (todo: Todo) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ completed: todo.completed })
    })
    const data = await res.json()
    console.log('Updated todo:', data)
  } catch (err) {
    console.error('Failed to update todo:', err)
  }
}
</script>

<template>
  <div class="flex flex-row h-screen w-screen border bg-[#FFFFFF]">
    <Sidebar /> 

    <div class="flex-1 flex flex-col">  
      <!-- Header with back button -->
      <header class="px-10 py-8 text-xl font-bold flex items-center gap-2">
        <button 
          class="px-1  border border-black border-2   text-white rounded rounded-[15px]  hover:border-purple-800 transition "
          @click="goHome"
        >
          <svg aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000 " 
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
          <path d="M9 14l-4 -4l4 -4" />
          <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
          </svg>

        </button>
        <span class="ml-10">Go Home</span>
      </header>	
      
      <!-- Scrollable grid -->
      <div 
        class="grid grid-cols-1  mt-4 place-items-start h-4/5 overflow-y-auto p-2 pl-5"
      >
        <div 
          v-for="todo in todos" 
          :key="todo.id"
          class="flex flex-row w-full p-3 "
        >
          <!-- Checkbox (7.5%) -->
          <div class="flex items-start justify-center" style="width: 7.5%;">
            <input 
              type="checkbox" 
              v-model="todo.completed"  
              class="h-5 w-5 accent-[#4F359B] rounded cursor-pointer"
              @change="toggleTodo(todo)"
            />

          </div>

          <!-- Text (92.5%) -->
          <div class="text-gray-800 leading-snug" style="width: 92.5%;">
            {{ todo.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
