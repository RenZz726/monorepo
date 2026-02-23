import Dashboard from "@/views/Dashboard.vue";
import Homepage from "@/views/Homepage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: Homepage,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    }
  ],
});
export { router };
