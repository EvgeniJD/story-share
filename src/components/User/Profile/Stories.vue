<template>
  <article class="profile-stories">
    <article class="profile-data-heading">
      <h2>My stories</h2>
      <router-link to="/stories/create">
        <el-button type="success" size="mini" class="profile-mini-add-btn">
          +
        </el-button>
      </router-link>
    </article>
    <el-carousel :interval="4000" height="300px" indicator-position="outside">
      <el-carousel-item v-for="story in myStories" :key="story.id">
        <router-link :to="`/stories/${story.id}`">
          <img :src="story.image" alt="" class="carousel-image" />
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </article>
</template>

<script>
export default {
  props: {
    myStories: Array,
  },
};
</script>

<style>
</style>