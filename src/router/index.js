import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/About.vue';
import StoriesWrapper from '../components/StoriesWrapper.vue';
import Stories from '../components/Stories.vue';
import StoryDetails from '../components/StoryDetails.vue';
import StoryCreate from '../components/StoryCreate.vue';
import StoryEdit from '../components/StoryEdit.vue';
import User from '../components/User.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import NotFound from '../components/NotFound.vue';

import { getCurrentUser } from '../services/user';


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/about',
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/stories',
        name: 'Stories',
        component: StoriesWrapper,
        redirect: '/stories/all',
        children: [
            {
                path: '/stories/all',
                component: Stories,
            },
            {
                path: '/stories/create',
                name: 'StoryCreate',
                component: StoryCreate
            },
            {
                path: '/stories/:id',
                name: 'StoryDetails',
                component: StoryDetails
            },
            {
                path: '/stories/edit/:id',
                name: 'StoryEdit',
                component: StoryEdit
            },
        ]
    },
    {
        path: '/user',
        component: User,
        redirect: '/user/login',
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login
            },
            {
                path: 'register',
                name: 'Register',
                component: Register
            },
            {
                path: 'profile/:id',
                name: 'Profile',
                component: Profile
            }
        ]
    },
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
    const currUser = getCurrentUser();

    if (
        currUser == null &&
        to.name !== 'Login' &&
        to.name !== 'Register' &&
        to.name !== 'About'
    ) {
        next({ name: 'Login' });
    } else if (currUser && (to.name == 'Login' || to.name == "Register")) {
        next({name: 'NotFound'});
    }
    else {
        next()
    }
})

export default router;