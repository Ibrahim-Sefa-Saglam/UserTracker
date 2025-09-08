<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import Header from "../components/Header.vue";

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const router = useRouter()
const todos = ref<Todo[]>([])

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
      <Header></Header>
      
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
          <div class="font-poppins text-gray-800 leading-snug" style="width: 92.5%;">
            {{ todo.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
