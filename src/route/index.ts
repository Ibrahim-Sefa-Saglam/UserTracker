import { createRouter, createWebHistory } from "vue-router"

// Import pages
import UsersPage from "../pages/UserPage.vue"

const routes = [
  { path: "/", redirect: "/users" }, // default start
  { path: "/users", name: "Users", component: UsersPage },
  { path: "/todos", name: "Todos", component: UsersPage },
  { path: "/posts", name: "Posts", component: UsersPage },
  { path: "/albums", name: "Albums", component: UsersPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
