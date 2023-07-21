import { createRouter, createWebHistory } from 'vue-router';
import list from './routerConfig';
import { setupErrorHandler } from "@/errorHandler";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: list,
});

setupErrorHandler(router);
export default router;
