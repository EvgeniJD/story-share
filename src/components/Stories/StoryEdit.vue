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
        <el-button
          id="edit-button"
          type="success"
          class="create-btn"
          @click="onUpdate"
          :disabled="this.$v.$invalid"
          >Update</el-button
        >
      </article>
    </article>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { required, minLength, url } from "vuelidate/lib/validators";
import { isAlphaNum } from "../../customValidators/storyTitle";
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
      this.initialStory = currStory;
      this.image = currStory.image;
      this.title = currStory.title;
      this.content = currStory.content;
    } catch (e) {
      console.log(e);
      this.$notify({
          group: "app",
          title: "Error",
          text: e.message,
          type: "error",
        });
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
          await updateStory(id, dataToUpdate);

          if (this.initialStory.image !== this.image) {
            await deleteStoryFromUser(currUser.uid, initialInfo);

            const storyInfo = {
              image: this.image,
              id,
            };

            await addStoryToUser(currUser.uid, storyInfo);
          }

          this.$notify({
          group: "app",
          text: "You successfully edited your story",
          type: "success",
        });

          this.$router.push(`/stories/${id}`);
        } catch (e) {
          console.log(e);
          this.$notify({
          group: "app",
          title: "Error",
          text: e.message,
          type: "error",
        });
        }
      
    },
  },
};
</script>

<style>
</style>