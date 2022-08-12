import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Search from '../views/Search/Search.vue'

const routes = [
    { path: '/', name: 'Home' ,component: Home },
    { path: '/search', name: 'Search' ,component: Search }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;