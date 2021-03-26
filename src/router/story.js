import StoriesWrapper from '../components/Stories/StoriesWrapper.vue';
import Stories from '../components/Stories/Stories.vue';
import StoryCreate from '../components/Stories/StoryCreate.vue';
import StoryDetails from '../components/Stories/StoryDetails/StoryDetails.vue';
import StoryEdit from '../components/Stories/StoryEdit.vue';
import StoryAddProposal from '../components/Stories/StoryAddProposal.vue';

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
]

export default storyRoutes;