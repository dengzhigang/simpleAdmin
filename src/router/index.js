import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/home/system',
        meta: {
            title: '首页',
        },
        children: [
            {
                path: 'system',
                name: 'system',
                component: () => import('../views/About.vue'),
                meta: {
                    title: '系统状态',
                },
            },
            {
                path: 'classification',
                name: 'classification',
                component: () => import('../views/tabs/classification.vue'),
                meta: {
                    title: '分类列表',
                },
            },
            {
                path: 'article',
                name: 'article',
                component: () => import('../views/tabs/article.vue'),
                meta: {
                    title: '文章管理',
                },
            },
            {
                path: 'addarticle',
                name: 'addarticle',
                component: () => import('../views/write/addarticle.vue'),
            },
            {
                path: 'videolist',
                name: 'videolist',
                component: () => import('../views/tabs/videolist.vue'),
                meta: {
                    title: '视频管理',
                },
            },
            {
                path: 'addvideo',
                name: 'addvideo',
                component: () => import('../views/write/addvideo.vue'),
            },
            {
                path: 'itemvideo/:id',
                name: 'itemvideo',
                component: () => import('../views/tabs/itemvideo.vue'),
            },
            {
                path: '/articleitem/:id',
                name: 'articleitem',
                component: () => import('../views/tabs/articleitem.vue'),
            },
            {
                path: 'postlist',
                name: 'postlist',
                component: () => import('../views/tabs/postlist.vue'),
                meta: {
                    title: '帖子列表',
                },
            },
            {
                path: 'userlist',
                name: 'userlist',
                component: () => import('../views/tabs/userlist.vue'),
                meta: {
                    title: '用户列表',
                },
            },
        ],
    },
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
