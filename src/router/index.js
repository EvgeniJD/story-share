import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/Core/About.vue';
import NotFound from '../components/Core/NotFound.vue';
import storyRoutes from './story';
import userRoutes from './user';

import { getCurrentAuthUser } from '../services/user';


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/about',
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    ...storyRoutes,
    ...userRoutes,
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

router.beforeEach((to, from, next) => {
    const currUser = getCurrentAuthUser();

    if (
        currUser == null &&
        to.name !== 'Login' &&
        to.name !== 'Register' &&
        to.name !== 'About'
    ) {
        next({ name: 'Login' });
    } else if (currUser && (to.name == 'Login' || to.name == "Register")) {
        next({name: 'Home'});
    }
    else {
        next()
    }
})

export default router;