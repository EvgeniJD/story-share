import User from '../components/User/User.vue';
import Login from '../components/User/Login.vue';
import Register from '../components/User/Register.vue';
import Profile from '../components/User/Profile/Profile.vue';

const userRoutes = [
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
];

export default userRoutes;