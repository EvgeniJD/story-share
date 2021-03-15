import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/About.vue';
import Stories from '../components/Stories.vue';
import StoryDetails from'../components/StoryDetails.vue';
import User from '../components/User.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import NotFound from '../components/NotFound.vue';




Vue.use(VueRouter)

const routes = [
    {
        path: '/about',
        component: About
    },
    {
        path: '/stories',
        component: Stories
    },
    {
        path: '/stories/:id',
        component: StoryDetails
    },
    {
        path: '/user',
        component: User,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Register
            },
            {
                path: ':id/profile',
                component: Profile
            }
        ]
    },
    {
        path: '*',
        component: NotFound
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router;