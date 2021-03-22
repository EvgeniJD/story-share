import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/Core/About.vue';
import StoriesWrapper from '../components/Stories/StoriesWrapper.vue';
import Stories from '../components/Stories/Stories.vue';
import StoryDetails from '../components/Stories/StoryDetails.vue';
import StoryCreate from '../components/Stories/StoryCreate.vue';
import StoryEdit from '../components/Stories/StoryEdit.vue';
import StoryAddProposal from '../components/Stories/StoryAddProposal.vue';
import User from '../components/User/User.vue';
import Login from '../components/User/Login.vue';
import Register from '../components/User/Register.vue';
import Profile from '../components/User/Profile.vue';
import NotFound from '../components/Core/NotFound.vue';

import { getCurrentAuthUser } from '../services/user';


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
                component: StoryDetails,
            },
            {
                path: '/stories/edit/:id',
                name: 'StoryEdit',
                component: StoryEdit
            },
            {
                path: '/stories/add-proposal/:id',
                name: 'StoryAddProposal',
                component: StoryAddProposal
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
    const currUser = getCurrentAuthUser();

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