<template>
  <header class="header">
    <router-link to="/about" tag="article" class="header-logo hover">
      <p>
        Story Share
        <i class="fas fa-feather-alt"></i>
        <span>Let's make incredible stories together</span>
      </p>
    </router-link>

      <router-link :to="`/user/profile/${user.uid}`" class="header-profile hover" v-if="user">
        <img v-if="user.photoURL" :src="user.photoURL" alt="" />
        <span v-if="user.displayName">Welcome, {{ user.displayName }}</span>
        <span v-else>Welcome, {{ user.email }}</span>
      </router-link>
    <nav>
      <ul class="header-list" v-if="user">
        <li>
          <router-link to="/stories" class="hover">Stories</router-link>
        </li>
        <li>
          <router-link to="/stories/create" class="hover"
            >Create Story</router-link
          >
        </li>
        <li>
          <a class="hover" @click.prevent="logout">Logout</a>
        </li>
      </ul>
      <ul class="header-list" v-else>
        <li>
          <router-link to="/user/login" class="hover">Login</router-link>
        </li>
        <li>
          <router-link to="/user/register" class="hover">Register</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { logoutUser } from '../services/user';
export default {
  methods: {
    async logout() {
      try {
        await logoutUser();
        this.$store.commit('setUser', null);
          this.$router.push({name: 'Login'});
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
  },
  computed: {
    user() {
      const user = this.$store.getters.getUser;
      console.log("FROM HEADER COMPUTED:", user);
      return user;
    },
  },
};
</script>

<style>
</style>