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

      <article class="story-details-contributers" v-if="story.contributors">
        <h3>Contributors</h3>
        <el-table
          :data="story.contributors"
          style="width: 100%"
          height="340"
          id="contributors"
        >
          <el-table-column prop="username" label="Username" width="120">
          </el-table-column>
          <el-table-column
            prop="contributions"
            label="Contributions"
            width="120"
          >
          </el-table-column>
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

    <article class="story-details-proposals" v-if="story.proposals">
      <article class="story-details-proposals-heading">
        <h2>Proposals</h2>
        <router-link :to="`/stories/add-proposal/${this.$route.params.id}`">
          <el-button type="success">+</el-button>
        </router-link>
      </article>
      <el-table
        :data="story.proposals"
        style="width: 100%"
        max-height="400"
        id="proposals"
      >
        <el-table-column label="Author email" prop="authorEmail" width="150">
        </el-table-column>

        <el-table-column label="Likes">
          <template slot-scope="props">
            <div class="table-likes">
              <i class="fas fa-heart"></i>
              <p>{{ props.row.likes }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column type="expand" label="Review Content" width="150">
          <template slot-scope="props">
            <p v-html="props.row.content" class="proposials-table-textarea"></p>

            <article class="buttons-cta">
              <article class="proposials-table-not-user-cta" v-if="!isAuthor">
                <el-button type="success" size="mini" v-if="!isLiked">
                  Like
                </el-button>
                <el-button type="danger" size="mini" v-else> Unlike </el-button>
              </article>

              <article class="proposials-table-user-cta" v-if="isAuthor">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                >
              </article>

              <article
                class="proposials-table-initiator-cta"
                v-if="isInitiator"
              >
                <el-button
                  size="mini"
                  type="success"
                  @click="handleMergeProposal(scope.$index, scope.row)"
                  >Merge</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteProposal(scope.$index, scope.row)"
                  >Delete</el-button
                >
              </article>
            </article>
          </template>
        </el-table-column>
      </el-table>
    </article>
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

export default {
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
  methods: {
    handleMergeProposal() {
      // console.log("Index: ", index);
      // console.log("Row: ", row);
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
      console.log("USERDATA ", userData);
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