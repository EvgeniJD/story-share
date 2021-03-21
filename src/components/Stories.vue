<template>
  <section class="stories">
    <h1>Stories</h1>
    <Story v-for="story in stories" :key="story.id" :story="story" />
  </section>
</template>

<script>
// import { getStories } from "../services/story.js";
import { storiesCollection } from "../firebase";
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
    // getStories().then((data) => {
    //   console.log(data);
    // })

    storiesCollection
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        console.log("LOG FROM GET STORIES: ", documents);
        this.stories = documents;
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });

    // storiesCollection.doc().set({
    //   content: "San Francisco...",
    //   created: new Date().toLocaleDateString(),
    //   image: "https://i.pinimg.com/originals/87/26/ff/8726ff3556a8edb54088c0bf5c48af60.gif",
    //   initiator: 'Peter',
    //   likes: 86,
    //   title: 'My life story',
    // });
  },
};
</script>

<style>
</style>