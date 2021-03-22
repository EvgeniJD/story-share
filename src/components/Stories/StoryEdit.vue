<template>
  <section class="create-story">
    <h1>Update story</h1>
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
        <el-button id="edit-button" type="success" class="create-btn" @click="onUpdate" :disabled="this.$v.$invalid">Update</el-button>
      </article>
    </article>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { required, minLength, url } from "vuelidate/lib/validators";
import { isAlphaNum } from '../../customValidators/storyTitle';
import { getStory, updateStory } from "../../services/story";
import { addStoryToUser, deleteStoryFromUser } from "../../services/user";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      image: "",
      title: "",
      content: "",
      initialStory: null,
    };
  },
  async created() {
    const storyID = this.$route.params.id;

    try {
      const storyResponse = await getStory(storyID);
      const currStory = storyResponse.data();
      console.log("CURR STORY: ", currStory);
      this.initialStory = currStory;
      this.image = currStory.image;
      this.title = currStory.title;
      this.content = currStory.content;
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
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
    async onUpdate() {
      const confirmResult = window.confirm("Do you really want to update this story?");

      if(confirmResult) {
        const currUser = this.$store.getters.getUser;

      const id = this.$route.params.id;

      const initialInfo = {
        image: this.initialStory.image,
        id,
      };

      const dataToUpdate = {
        image: this.image,
        content: this.content,
        title: this.title,
      };

      try {
        const res = await updateStory(id, dataToUpdate);
        console.log("UPDATED: ", res);

        if (this.initialStory.image !== this.image) {
          const deleteRes = await deleteStoryFromUser(
            currUser.uid,
            initialInfo
          );
          console.log("deleteRes: ", deleteRes);

          const storyInfo = {
            image: this.image,
            id,
          };

          const updatedInfo = await addStoryToUser(currUser.uid, storyInfo);
          console.log("UPDATED INFO", updatedInfo);
        }

        this.$router.push({ name: 'Stories' });

      } catch (e) {
        console.log(e);
        alert(e.message);
      }
      }
    },
  },
};
</script>

<style>
</style>