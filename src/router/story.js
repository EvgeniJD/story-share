import StoriesWrapper from '../components/Stories/StoriesWrapper.vue';
import Stories from '../components/Stories/Stories.vue';

const storyRoutes = [
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
                component: () => import(/* webpackChunkName: "StoryCreate" */ '../components/Stories/StoryCreate.vue')

            },
            {
                path: '/stories/:id',
                name: 'StoryDetails',
                component: () => import(/* webpackChunkName: "StoryDetails" */ '../components/Stories/StoryDetails/StoryDetails.vue')
            },
            {
                path: '/stories/edit/:id',
                name: 'StoryEdit',
                component: () => import(/* webpackChunkName: "StoryEdit" */ '../components/Stories/StoryEdit.vue')
            },
            {
                path: '/stories/add-proposal/:id',
                name: 'StoryAddProposal',
                component: () => import(/* webpackChunkName: "StoryAddProposal" */ '../components/Stories/StoryAddProposal.vue')
            },
        ]
    },
]

export default storyRoutes;