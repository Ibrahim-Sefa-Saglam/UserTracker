import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

// Import pages
import UsersPage from "../pages/UserPage.vue"
import TodosPage from "../pages/TodosPage.vue"

const routes : RouteRecordRaw[] =  [
  { path: "/", redirect: "/users" }, // default start
  { path: "/users", name: "Users", component: UsersPage },
  { path: "/todos", name: "Todos", component: TodosPage, },
  { path: "/posts", name: "Posts", component: UsersPage, },
  { path: "/albums", name: "Albums", component: UsersPage, },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
