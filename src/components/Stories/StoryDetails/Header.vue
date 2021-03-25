<template>
   <article class="story-details-header">
      <h1>{{ story.title }}</h1>
      <article class="story-details-header-likes">
        <i class="fas fa-heart"></i>
        <p class="story-details-header-likes-count">{{ story.likes }}</p>
      </article>
      <p class="story-details-header-initiator">
        Initiator: {{ initiatorDisplayName || "No username provided" }}
      </p>
    </article>
</template>

<script>
export default {
    props: {
        story: Object,
        initiatorDisplayName: String
    }
}
</script>

<style>

</style>