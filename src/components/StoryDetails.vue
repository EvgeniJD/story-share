<template>
  <article class="story-details">
    <article class="story-details-header">
      <h1>{{ story.title }}</h1>
      <article class="story-details-header-likes">
        <i class="fas fa-heart"></i>
        <p class="story-details-header-likes-count">{{ story.likes }}</p>
      </article>
      <p class="story-details-header-initiator">
        Initiator: {{ story.initiator }}
      </p>
    </article>

    <article class="story-details-content">
      <img :src="story.image" alt="" />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        readonly
        v-model="story.content"
      >
      </textarea>

      <article class="story-details-contributers">
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

    <article class="story-details-proposals">
      <h2>Proposals to review</h2>
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
              <el-button
                type="success"
                size="mini"
                v-if="!isLiked"
              >
                Like
              </el-button>
              <el-button type="danger" size="mini" v-else >
                Unlike
              </el-button>
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
import { storiesCollection } from "../firebase";

export default {
  data() {
    return {
      isInitiator: true,
      isAuthor: true,
      isLiked: true,
      story: {},
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log("Index: ", index);
      console.log("Row: ", row);
    },
  },
  mounted() {
    const storyId = this.$route.params.id;
    storiesCollection
      .doc(storyId)
      .get()
      .then((doc) => {
        this.story = doc.data();
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  },
};
</script>

<style>
</style>