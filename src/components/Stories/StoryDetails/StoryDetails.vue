<template>
  <article class="story-details">
    <Header :story="story" :initiatorDisplayName="initiatorDisplayName" />

    <Content :story="story" :contributors="contributors" />

    <CTA
      :isInitiator="isInitiator"
      :isLiked="isLiked"
      @onLike="onLike"
      @onUnlike="onUnlike"
      @handleInitiatorDelete="handleInitiatorDelete"
    />

    <Proposals
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
} from "../../../services/story";

import {
  deleteStoryFromUser,
  addLikedStoryToUser,
  removeLikedStoryFromUser,
  getUserData,
} from "../../../services/user";

import Header from "./Header";
import Content from "./Content.vue";
import Proposals from "./Proposals";
import CTA from "./CTA.vue";

export default {
  components: {
    Header,
    Content,
    Proposals,
    CTA,
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
      const user = this.$store.getters.getUser;

      const objToDelete = {
        image: this.story.image,
        id: this.$route.params.id,
      };

      try {
        await deleteStory(this.$route.params.id);
        await deleteStoryFromUser(user.uid, objToDelete);
        const userData = await getUserData(user.uid);
        this.$store.commit("setUserData", userData);

        this.$notify({
          group: "app",
          text: "Story deleted",
          type: "success",
        });

        this.$router.push({ name: "Stories" });
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
    async onLike() {
      const user = this.$store.getters.getUser;
      const storyID = this.$route.params.id;

      try {
        await likeStory(storyID);
        await addLikedStoryToUser(user.uid, storyID);
        this.story.likes += 1;
        this.isLiked = true;

        this.$notify({
          group: "app",
          text: "You successfully liked this story",
          type: "success",
        });

        this.$store.commit("setCurrStory", this.story);
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
    async onUnlike() {
      const user = this.$store.getters.getUser;
      const storyID = this.$route.params.id;

      try {
        await unlikeStory(storyID);
        await removeLikedStoryFromUser(user.uid, storyID);
        this.story.likes -= 1;
        this.isLiked = false;

        this.$notify({
          group: "app",
          text: "You no longer like this story",
          type: "success",
        });

        this.$store.commit("setCurrStory", this.story);
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
      this.$notify({
        group: "app",
        title: "Error",
        text: e.message,
        type: "error",
      });
    }

    try {
      const currStory = await getStory(storyID);
      this.story = currStory.data();
      this.initiatorDisplayName =
        this.story.initiator.displayName || user.displayName;
      this.storyInitiatorID = this.story.initiator.uid;
      if (this.storyInitiatorID === user.uid) {
        this.isInitiator = true;
      }
      this.$store.commit("setCurrStory", this.story);
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
};
</script>

<style>
</style>