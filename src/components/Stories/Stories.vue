<template>
  <section class="stories">
    <h1>Stories</h1>
    <Story v-for="story in stories" :key="story.id" :story="story" />
  </section>
</template>

<script>
// import { getStories } from "../services/story.js";
import { storiesCollection } from "../../firebase";
import Story from "./Story.vue";

export default {
  components: {
    Story,
  },
  data() {
    return {
      stories: [],
    };
  },
  created() {
    storiesCollection
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        this.stories = documents;
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  },
};
</script>

<style>
</style>