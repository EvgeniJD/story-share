<template>
  <article class="story-details">
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

    <article class="story-details-content">
      <article class="story-details-content-image">
        <img :src="story.image" alt="" />
      </article>

      <article
        v-html="story.content"
        class="story-details-content-text"
      ></article>

      <StoryDetailsContributors :contributors="contributors" />
    </article>

    <StoryCTA
      :isInitiator="isInitiator"
      :isLiked="isLiked"
      @onLike="onLike"
      @onUnlike="onUnlike"
      @handleInitiatorDelete="handleInitiatorDelete"
    />

    <StoryDetailsProposals
      :story="story"
      @mergeProposal="updateData"
      @handleDeleteProposal="updateData"
    />
  </article>
</template>

<script>
import {
  getStory,
  deleteStory,
  likeStory,
  unlikeStory,
} from "../../services/story";

import {
  deleteStoryFromUser,
  addLikedStoryToUser,
  removeLikedStoryFromUser,
  getUserData,
} from "../../services/user";

import StoryDetailsProposals from "./StoryDetailsProposals";
import StoryDetailsContributors from "./StoryDetailsContributors.vue";
import StoryCTA from "./StoryCTA.vue";

export default {
  components: {
    StoryDetailsProposals,
    StoryDetailsContributors,
    StoryCTA,
  },
  data() {
    return {
      isAuthor: false,
      story: {},
      //throw me an error if i use story.initiator.displayName !!!
      initiatorDisplayName: "",
      storyInitiatorID: "",
      userData: null,
      isLiked: false,
      isInitiator: false,
    };
  },
  computed: {
    contributors() {
      if (this.story.contributors) {
        return this.story.contributors.map((email) => {
          return { email };
        });
      } else {
        return [{ email: "No Data" }];
      }
    },
  },
  methods: {
    updateData(updatedStory, udpadedUserData) {
      this.story = updatedStory.data();
      this.$store.commit("setCurrStory", updatedStory);

      this.userData = udpadedUserData;
      this.$store.commit("setUserData", udpadedUserData);
    }, 
    async handleInitiatorDelete() {
      const confirmResult = window.confirm(
        "Do you really want to delete this story?"
      );

      if (confirmResult) {
        const user = this.$store.getters.getUser;

        const objToDelete = {
          image: this.story.image,
          id: this.$route.params.id,
        };

        try {
          await deleteStory(this.$route.params.id);
          await deleteStoryFromUser(user.uid, objToDelete);
          this.$router.push({ name: "Stories" });
        } catch (e) {
          console.log(e);
          alert(e.message);
        }
      } else {
        return;
      }
    },
    async onLike() {
      const user = this.$store.getters.getUser;
      const storyID = this.$route.params.id;

      try {
        await likeStory(storyID);
        await addLikedStoryToUser(user.uid, storyID);
        this.story.likes += 1;
        this.isLiked = true;
        this.$store.commit("setCurrStory", this.story);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
    async onUnlike() {
      const user = this.$store.getters.getUser;
      const storyID = this.$route.params.id;

      try {
        await unlikeStory(storyID);
        await removeLikedStoryFromUser(user.uid, storyID);
        this.story.likes -= 1;
        this.isLiked = false;
        this.$store.commit("setCurrStory", this.story);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
  },
  async created() {
    const storyID = this.$route.params.id;
    const user = this.$store.getters.getUser;
    let userData = null;

    try {
      userData = await getUserData(user.uid);
      this.userData = userData;
      if (userData.storiesLiked.includes(storyID)) {
        this.isLiked = true;
      }
      this.$store.commit("setUserData", userData);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }

    try {
      const currStory = await getStory(storyID);
      this.story = currStory.data();
      this.initiatorDisplayName = this.story.initiator.displayName || user.displayName;
      this.storyInitiatorID = this.story.initiator.uid;
      if (this.storyInitiatorID === user.uid) {
        this.isInitiator = true;
      }
      this.$store.commit("setCurrStory", this.story);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  },
};
</script>

<style>
</style>