<template>
  <article class="story-details">
    <article class="story-details-header">
      <h1>{{ story.title }}</h1>
      <article class="story-details-header-likes">
        <i class="fas fa-heart"></i>
        <p class="story-details-header-likes-count">{{ story.likes }}</p>
      </article>
      <p class="story-details-header-initiator">Initiator: {{ initiator }}</p>
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

    <article class="story-details-proposals" v-if="story.proposals">
      <h2>Proposals</h2>
      <el-table
        :data="story.proposals"
        style="width: 100%"
        max-height="400"
        id="proposals"
      >
        <el-table-column label="Username" prop="username" width="150">
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
            <textarea
              :readonly="!isAuthor"
              v-model="props.row.content"
              class="proposials-table-textarea"
            >
            </textarea>

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
                  @click="handleEdit(scope.$index, scope.row)"
                  >Merge</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
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
import { getStory, deleteStory } from "../services/story";
import { deleteStoryFromUser } from "../services/user";

export default {
  data() {
    return {
      isInitiator: true,
      isAuthor: true,
      isLiked: true,
      story: {},
      //throw me an error if i use story.initiator.displayName !!!
      initiator: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log("Index: ", index);
      console.log("Row: ", row);
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
  },
  async mounted() {
    const storyID = this.$route.params.id;

    try {
      const currStory = await getStory(storyID);
      this.story = currStory.data();
      this.initiator = this.story.initiator.displayName;
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  },
};
</script>

<style>
</style>