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
        <button class="create-btn" v-if="allGood" @click="createStorie">
          Create
        </button>
      </article>
    </article>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { storiesCollection } from "../firebase";

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
  computed: {
    allGood() {
      if (this.image && this.title && this.content) {
        return true;
      }
      return false;
    },
  },
  methods: {
    createStorie() {
      const newStorie = {
        image: this.image,
        content: this.content,
        title: this.title,
      };

      storiesCollection
        .add(newStorie)
        .then((doc) => {
          console.log("I DID IT!!!", doc, doc.id);
        })
        .catch((e) => {
          console.log(e);
          alert(e.message);
        });

    // storiesCollection.doc('u7Zrulemh5fAcUD3ZUop').delete().then((res) => { console.log(res); console.log("Deleted"); }).catch((e) => { console.log(e);})

    },
  },
};
</script>

<style>
</style>