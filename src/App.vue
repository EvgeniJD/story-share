<template>
  <div id="app">
    <Header />
    <!-- <Register v-if="chosenMethod == 'Register'" @switchMethod="switchMethod" />
    <Login v-else @switchMethod="switchMethod" /> -->

    <!-- <Stories/> -->

    <!-- <StoryDetails /> -->

    <router-view></router-view>

    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
// import Register from './components/Register.vue';
// import Login from './components/Login.vue';
// import Stories from './components/Stories.vue';
// import StoryDetails from './components/StoryDetails.vue';
import Footer from "./components/Footer.vue";

import firebase from "firebase/app";

export default {
  name: "App",
  components: {
    Header,
    // Register,
    // Login,
    // Stories,
    // StoryDetails,
    Footer,
  },
  data() {
    return {
      chosenMethod: "Register",
    };
  },
  methods: {
    switchMethod(method) {
      this.chosenMethod = method;
    },
  },
  async mounted() {
    const res = await firebase.auth().currentUser;
    let currUser = null; 

    if (res) {
      currUser = {
        email: res.email,
        id: res.uid,
        username: res.displayName,
        avatar: res.photoURL,
      };
    }

    this.$store.commit("setUser", currUser);
  },
};
</script>

<style>
@import "./assets/styles.css";
</style>
