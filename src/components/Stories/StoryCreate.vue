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
        <el-button type="success" id="create-btn" @click="createStory" :disabled="this.$v.$invalid">Create</el-button>
      </article>
    </article>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { required, minLength, url } from "vuelidate/lib/validators";
import { isAlphaNum } from '../../customValidators/storyTitle';
import { saveStory } from "../../services/story";
import { addStoryToUser, getUserData } from "../../services/user";

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
      isAlphaNum,
    },
    content: {
      required,
      minLength: minLength(5),
    },
  },
  methods: {
    async createStory() {
      const currUser = this.$store.getters.getUser;

      const story = {
        image: this.image,
        content: this.content,
        title: this.title,
        proposals: [],
        contributors: [],
        initiator: { 
          displayName: currUser.displayName || currUser.email,
          uid: currUser.uid
           },
        created: new Date().toLocaleDateString(),
        likes: 0,
      };

      try {
        const savedStory = await saveStory(story);

        const storyInfo = {
          image: this.image,
          id: savedStory.id,
        };

        await addStoryToUser(currUser.uid, storyInfo);
        const userData = await getUserData(currUser.uid);
        this.$store.commit('setUserData', userData);

        this.$router.push({name: 'Stories'});
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
  },
};
</script>

<style>
</style>