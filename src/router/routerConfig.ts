import { vue } from '@vitejs/plugin-vue';
import type { RouteRecordRaw } from 'vue-router';

const list: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/HomeView.vue'),
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/LoginView.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/RegisterView .vue'),
            },
            {
                path: 'edit',
                name: 'edit',
                component: () => import('@/views/EditView.vue'),
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/ProfileView.vue'),
            },
            {
                path: 'server-error',
                component: () => import('@/components/VueServerError.vue'),
            },
        ],
    },
    {
        path: '/book',
        name: 'book',
        children: [
            {
                path: '',
                name: 'book',
                component: () => import('@/views/BookView.vue'),
            },
            {
                path: ':id',
                component: () => import('@/views/BookDetailView.vue'),
            },
            {
                path: '/mybook',
                component: () => import('@/views/BookShelfView.vue'),
            },
        ],
    },
    {
        path: '/payment',
        component: () => import('@/views/PaymentView.vue'),
        name: 'payment',
    },
    {
        path: '/about',
        component: () => import('@/views/AboutView.vue'),
        name: 'about',
    },
    // ...accessRoutes,
];

export default list;
