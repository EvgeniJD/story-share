<template>
  <section class="create-story">
    <h2>Your proposal for</h2>
    <h1>{{ title }}</h1>

    <article class="editor-wrapper">
      <VueEditor v-model="content" />
      <article class="editor-image">
        <img :src="image" alt="" />
        <el-button
          type="success"
          id="create-btn"
          @click="onAddProposal"
          :disabled="this.$v.$invalid"
          >Add Proposal</el-button
        >
      </article>
    </article>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { required, minLength } from "vuelidate/lib/validators";
import { addProposalToStory } from '../../services/story';
import { addProposalToUser } from '../../services/user';

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
    content: {
      required,
      minLength: minLength(5),
    },
  },
  methods: {
    async onAddProposal() {
      const user = this.$store.getters.getUser;
      const authorID = user.uid;
      const authorEmail = user.email;

      const proposal = {
        authorID,
        authorEmail,
        content: `\n ( ${user.email} ) Start: \n ${this.content} \n ( ${user.email} ) End`,
        likes: 0,
      }

      const storyID = this.$route.params.id;

      try {
        await addProposalToStory(storyID, proposal);
        await addProposalToUser(authorID, proposal);
        this.$router.push(`/stories/${storyID}`);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
  },
  created() {
    const story = this.$store.getters.getCurrStory;

    this.title = story.title;
    this.image = story.image;
  },
};
</script>

<style>
</style>