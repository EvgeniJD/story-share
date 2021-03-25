<template>
  <article class="story-details-content">
      <article class="story-details-content-image">
        <img :src="story.image" alt="" />
      </article>

      <article
        v-html="story.content"
        class="story-details-content-text"
      ></article>

      <Contributors :contributors="contributors" />
    </article>
</template>

<script>
import Contributors from "./Contributors.vue";

export default {
  components: {
    Contributors
  },
    props: {
        story: Object,
        contributors: Array
    }
}
</script>

<style>

</style>