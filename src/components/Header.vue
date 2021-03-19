<template>
  <header class="header">
    <router-link to="/about" tag="article" class="header-logo hover">
      <p>
        Story Share
        <i class="fas fa-feather-alt"></i>
        <span>Let's make incredible stories together</span>
      </p>
    </router-link>
    
    <p v-if="isLoggedIn" class="header-profile hover">
      <router-link to="/user/12345/profile">
        <img
          src="https://ffrf.org/media/k2/items/cache/ed4b166fb36e2c27e16d3f79160bb2ac_XL.jpg"
          alt=""
        />
        Hi, Isaac
      </router-link>
    </p>
    <nav>
      <ul class="header-list" v-if="isLoggedIn">
        <li>
          <router-link to="/stories" class="hover">Stories</router-link>
        </li>
        <li>
          <router-link to="/stories/create" class="hover">Create Story</router-link>
        </li>
        <li>
          <a href="" class="hover">Logout</a>
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
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
};
</script>

<style>
</style>