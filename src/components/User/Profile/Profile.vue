<template>
  <section class="profile">
    <ImageName
      :userEmail="userEmail"
      :userImage="userImage"
      :userUsername="userUsername"
      @addNameAndImage="addNameAndImage"
    />

    <Stories v-if="userData" :myStories="userData.stories" />

    <Inspirations
      v-if="userData"
      :myInspirations="userData.inspirations"
      @addInspiration="addInspiration"
    />

    <Proposals v-if="userData" :myProposals="userData.proposals" />
  </section>
</template>

<script>
import ImageName from "./ImageName.vue";
import Stories from "./Stories.vue";
import Inspirations from "./Inspirations.vue";
import Proposals from "./Proposals.vue";

import { updateUserInfo, getCurrentAuthUser, addInspirationToUser, getUserData } from "../../../services/user.js";

export default {
  components: {
    ImageName,
    Stories,
    Inspirations,
    Proposals,
  },
  data() {
    return {
      myProposals: [
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets.americanliterature.com/al/images/story/three-little-pigs.jpg",
        },
        {
          storyTitle: "Maria`s Story",
          storyImage:
            "https://mrandmrshalal.com/wp-content/uploads/2018/07/beautiful-places-in-the-world-to-visit-for-muslims-featured-700x438.jpg",
        },
        {
          storyTitle: "The Ant And The Grasshopper",
          storyImage:
            "https://assets.americanliterature.com/al/images/story/aesops-fables/the-ants-and-the-grasshopper.jpg",
        },
        {
          storyTitle: "Nineteen Eighty-Four 1984",
          storyImage:
            "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532714506l/40961427._SX318_.jpg",
        },
        {
          storyTitle: "Borrowed Magic",
          storyImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKHykzmizSB_uyjV5_P9B6FB0lLmuJpCktIQ&usqp=CAU",
        },
      ],
    };
  },
  methods: {
    async addNameAndImage({ username, imageURL }) {
      try {
        await updateUserInfo(username, imageURL);
        const user = getCurrentAuthUser();
        const currUser = { ...user.providerData[0], uid: user.uid };

        this.$notify({
          group: "app",
          text: "User updated",
          type: "success",
        });

        this.$store.commit("setUser", currUser);
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
    async addInspiration(userID, inspirationURL) {
      try {
        await addInspirationToUser(userID, inspirationURL);
        const userData = await getUserData(userID);

        this.$notify({
          group: "app",
          text: "Inspiration added successfully",
          type: "success",
        });

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
    },
  },
  computed: {
    userData() {
      const userData = this.$store.getters.getUserData;
      console.log('USER DATA FROM PROFILE COMPUTED: ', userData);
      return userData;
    },
    user() {
      return this.$store.getters.getUser;
    },
    userUsername() {
      if (this.user) {
        return this.user.displayName;
      }
      return "";
    },
    userImage() {
      if (this.user) {
        return this.user.photoURL;
      }
      return "";
    },
    userEmail() {
      if (this.user) {
        return this.user.email;
      }
      return "";
    },
  },
};
</script>

<style>
</style>