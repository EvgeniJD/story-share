<template>
  <div id="app">
    <Header />

    <router-view></router-view>

    <Footer />
  </div>
</template>

<script>
import Header from "./components/Core/Header.vue";
import Footer from "./components/Core/Footer.vue";

import { getCurrentAuthUser, getUserData } from './services/user';

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  async created() {
     try {
      const res = getCurrentAuthUser();
      const currUser = {...res.providerData[0], uid: res.uid };
      this.$store.commit("setUser", currUser);
      const userData = await getUserData(res.uid);
      this.$store.commit("setUserData", userData);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  },
};
</script>

<style>
@import "../public/styles/index.css";
</style>
