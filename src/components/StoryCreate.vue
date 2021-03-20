<template>
  <section class="create-story">
    <h1>Create new story</h1>
    <article class="create-story-inputs">
      <label>
        Title:
        <input type="text" v-model="title" />
      </label>
      <label>
        Image URL:
        <input type="text" v-model="image" />
      </label>
    </article>
    <h2 class="create-story-title" v-if="title">{{ title }}</h2>
    <article class="editor-wrapper">
      <VueEditor v-model="content" />
      <article class="editor-image">
        <img :src="image" alt="" v-if="image" />
        <button class="create-btn" @click="createStorie">Create</button>
      </article>
    </article>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { required, minLength, url, alphaNum } from "vuelidate/lib/validators";
import { saveStory } from "../services/story";
import { addStoryToUser } from "../services/user";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      image: "",
      title: "",
      content: "",
    };
  },
  validations: {
    image: {
      required,
      url,
    },
    title: {
      required,
      minLength: minLength(2),
      alphaNum,
    },
    content: {
      required,
      minLength: minLength(5),
    },
  },
  methods: {
    async createStorie() {
      const currUser = this.$store.getters.getUser;

      const story = {
        image: this.image,
        content: this.content,
        title: this.title,
        proposals: [],
        contributors: [],
        initiator: { displayName: currUser.displayName, uid: currUser.uid },
        created: new Date().toLocaleDateString(),
        likes: 0,
      };

      try {
        const savedStory = await saveStory(story);
        console.log("SAVED STORY IS: ", savedStory);

        const storyInfo = {
          image: this.image,
          id: savedStory.id,
        };

        const updatedInfo = await addStoryToUser(currUser.uid, storyInfo);
        console.log('UPDATED INFO', updatedInfo);

        this.$router.push({name: 'Stories'});
      } catch (e) {
        console.log(e);
        alert(e.message);
      }

      // storiesCollection.doc('u7Zrulemh5fAcUD3ZUop').delete().then((res) => { console.log(res); console.log("Deleted"); }).catch((e) => { console.log(e);})
    },
  },
};
</script>

<style>
</style>