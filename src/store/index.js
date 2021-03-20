import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
        currStory: null
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getCurrStory(state) {
            return state.currStory;
        }
    },
    mutations: {
       setUser(state, user) {
            state.user = user;
       },
       setCurrStory(state, story) {
            state.currStory = story;
       }
    }
})

export default store;