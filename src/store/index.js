import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
        currStory: null,
        userData: null
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getCurrStory(state) {
            return state.currStory;
        },
        getUserData(state) {
            return state.userData;
        }
    },
    mutations: {
       setUser(state, user) {
            state.user = user;
       },
       setCurrStory(state, story) {
            state.currStory = story;
       },
       setUserData(state, userData) {
           state.userData = userData; 
       }
    }
})

export default store;