import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"
import Todo from "../views/Todo.vue"
import About from "../views/About.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
