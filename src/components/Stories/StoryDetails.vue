<template>
  <article class="story-details">
    <article class="story-details-header">
      <h1>{{ story.title }}</h1>
      <article class="story-details-header-likes">
        <i class="fas fa-heart"></i>
        <p class="story-details-header-likes-count">{{ story.likes }}</p>
      </article>
      <p class="story-details-header-initiator">
        Initiator: {{ initiatorDisplayName }}
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

      <article class="story-details-contributers" >
        <h3>Contributors</h3>
        <el-table
          :data="contributors"
          style="width: 100%"
          height="340"
          id="contributors"
        >
          <el-table-column prop="email" label="Email" width="240">
          </el-table-column>
          <!-- <el-table-column
            label="Contributions"
            width="100"
          >
          </el-table-column> -->
        </el-table>
      </article>
    </article>

    <article class="story-details-initiator-cta" v-if="isInitiator">
      <router-link :to="`/stories/edit/${this.$route.params.id}`">
        <el-button>Edit</el-button>
      </router-link>
      <el-button type="danger" @click="handleInitiatorDelete">Delete</el-button>
    </article>

    <article
      class="story-details-initiator-cta"
      v-if="!isLiked && !isInitiator"
    >
      <el-button type="success" @click="onLike"
        ><i class="fas fa-thumbs-up"></i
      ></el-button>
    </article>

    <article class="story-details-initiator-cta" v-if="isLiked && !isInitiator">
      <el-button type="danger" @click="onUnlike"
        ><i class="fas fa-thumbs-down"></i
      ></el-button>
    </article>

    <StoryDetailsProposals
    :story="story"
    @mergeProposal="mergeProposal"
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

import StoryDetailsProposals from './StoryDetailsProposals' 

export default {
  components: {
    StoryDetailsProposals
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
      if(this.story.contributors) {
        return this.story.contributors.reduce((acc, email) => {
          return acc.concat({email});
        }, [])
      } else {
        return [{email: 'No Data'}];
      }
    }
  },
  methods: {
    mergeProposal(updatedStory, udpadedUserData) {
      this.story = updatedStory.data();
      console.log('UDPADED STORY: ', this.story);
      this.$store.commit('setCurrStory', updatedStory);

      this.userData = udpadedUserData;
      this.$store.commit('setUserData', udpadedUserData);
    },
    //  handlemergeProposal(index, row) {
    //   console.log("Index: ", index);
    //   console.log("Row: ", row);
    // },
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
      console.log('STORY', this.story);
      this.initiatorDisplayName = this.story.initiator.displayName;
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