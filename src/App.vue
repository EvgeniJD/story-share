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
import Header from "./components/Core/Header.vue";
import Footer from "./components/Core/Footer.vue";

import { getCurrentAuthUser } from './services/user';

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  created() {
    const res = getCurrentAuthUser();

    if (res) {
      const currUser = {...res.providerData[0], uid: res.uid };
      this.$store.commit("setUser", currUser);
    }
  },
};
</script>

<style>
@import "./assets/styles.css";
</style>
