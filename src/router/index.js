import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from "@/views/SearchView.vue";
import CollectionView from "@/views/CollectionView.vue";
import BoardGameView from "@/views/BoardGameView.vue";
import LoggedPlaysView from "@/views/LoggedPlaysView.vue";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionView,
    },
    {
      path: '/board_game/:id',
      name: 'board_game',
      component: BoardGameView,
    },
    {
      path: '/logged_plays',
      name: 'logged_plays',
      component: LoggedPlaysView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
  ]
})

export default router
