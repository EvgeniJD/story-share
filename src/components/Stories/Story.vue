<template>
  <router-link :to="`/stories/${story.id}`" class="stories-story">
    <img :src="story.image" alt="" />
    <article class="stories-story-info">
      <article class="stories-story-info-heading">
        <h3>{{ story.title }}</h3>
        <p class="stories-story-info-author">
          Initiator: {{ story.initiator.displayName }}
        </p>
      </article>
      <article class="stories-story-footer">
        <p class="stories-story-footer-created">
          {{ story.created }}
        </p>
        <div class="stories-story-footer-likes-wrapper">
          <i class="fas fa-heart"></i>
          <p class="stories-story-footer-likes">
            {{ story.likes }}
          </p>
        </div>
      </article>
    </article>
  </router-link>
</template>

<script>
export default {
  props: {
    story: {},
  },
};
</script>

<style>
</style>