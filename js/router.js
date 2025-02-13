import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/login.js";
import Main from "./main.js";

const routes = [
    { path: "/", component: Main },
    { path: "/login", component: Login }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
