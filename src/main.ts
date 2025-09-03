import { createApp } from "vue"
import App from "./App.vue"
import router from "./route"
import "./style.css"  // Tailwind styles

createApp(App).use(router).mount("#app")
