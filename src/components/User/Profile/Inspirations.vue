<template>
  <article class="profile-inspirations">
    <article class="profile-data-heading">
      <h2>My inspirations</h2>
      <el-button
        type="success"
        size="mini"
        class="profile-mini-add-btn"
        @click="onAddInspiration"
      >
        +
      </el-button>
    </article>

    <el-carousel
      :interval="4000"
      height="300px"
      indicator-position="outside"
      v-if="!isInUpdateInspirationMode"
    >
      <el-carousel-item v-for="(img, i) in myInspirations" :key="i">
        <img :src="img" alt="" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
  </article>
</template>

<script>
export default {
    props: {
        myInspirations: Array
    },
  data() {
    return {
      isInUpdateInspirationMode: false,
    };
  },
  methods: {
    onAddInspiration() {
      this.isInUpdateInspirationMode = true;
    },
  },
};
</script>

<style>
</style>